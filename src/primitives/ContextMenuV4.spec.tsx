/** @jest-environment jsdom */
import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import type { ContextMenu, ContextMenuAction } from './ContextMenu';
import { ContextMenuV4 } from './ContextMenuV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ACTIONS: ContextMenuAction[] = [
  { label: 'Edit' },
  { label: 'Duplicate', disabled: true },
  { label: 'Delete', danger: true },
];

function mount(
  props: Partial<React.ComponentProps<typeof ContextMenuV4>> = {},
  depth?: ThemeSeed['depth']
) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <ContextMenuV4 actions={ACTIONS} {...props}>
        {/* A real kit `<Button>`, not a bare `<span>`. The bare element is what
            hid the responder bug on the native twin. */}
        {props.children ?? <Button>Row</Button>}
      </ContextMenuV4>
    </XenitionUIProvider>
  );
}

const panel = (): HTMLElement | null => document.querySelector('[role="menu"]');
const navCss = (): string => document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';

describe('ContextMenuV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof ContextMenu> = {
      actions: ACTIONS,
      children: <Button>Row</Button>,
      className: 'extra',
      'aria-label': 'Row actions',
    };
    const asV4: React.ComponentProps<typeof ContextMenuV4> = same;
    expect(asV4).toBe(same);
  });

  it('opens at the pointer on right-click of the child itself', () => {
    const { getByText } = mount();
    expect(panel()).toBeNull();
    fireEvent.contextMenu(getByText('Row'), { clientX: 40, clientY: 90 });
    expect(panel()).not.toBeNull();
    expect(panel()!.style.left).toBe('40px');
    expect(panel()!.style.top).toBe('90px');
  });

  it('injects the gesture into the child rather than a wrapping host', () => {
    // The native twin's bug in DOM form: with the handler on a wrapper, the
    // child is not what answers the gesture.
    const { getByText, container } = mount();
    const host = container.querySelector('[class*="relative"]') as HTMLElement;
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(panel()).not.toBeNull();
    // The host carries no gesture of its own once the child took it.
    expect(host.getAttribute('oncontextmenu')).toBeNull();
  });

  it('still runs whatever the child already did on the gesture', () => {
    const onContextMenu = jest.fn();
    const { getByText } = mount({
      children: <Button onContextMenu={onContextMenu}>Row</Button>,
    });
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(onContextMenu).toHaveBeenCalledTimes(1);
    expect(panel()).not.toBeNull();
  });

  it('falls back to the host for a child that cannot take the gesture props', () => {
    const { getByText } = mount({ children: 'Row' });
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(panel()).not.toBeNull();
  });

  it('opens on a long touch and abandons it on a move', () => {
    jest.useFakeTimers();
    const { getByText } = mount();
    fireEvent.touchStart(getByText('Row'), { touches: [{ clientX: 5, clientY: 5 }] });
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(panel()).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });

    fireEvent.touchStart(getByText('Row'), { touches: [{ clientX: 5, clientY: 5 }] });
    fireEvent.touchMove(getByText('Row'));
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(panel()).toBeNull();
    jest.useRealTimers();
  });

  it('fires onSelect and dismisses; a disabled action does neither', () => {
    const onSelect = jest.fn();
    const onDisabled = jest.fn();
    const { getByText } = mount({
      actions: [
        { label: 'Edit', onSelect },
        { label: 'Duplicate', onSelect: onDisabled, disabled: true },
      ],
    });
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect((getByText('Duplicate') as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(getByText('Duplicate'));
    expect(onDisabled).not.toHaveBeenCalled();

    fireEvent.click(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(panel()).toBeNull();
  });

  it('floats on the shared V4 panel skin, not a fixed Tailwind shadow', () => {
    const { getByText } = mount();
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(panel()!.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
    expect(navCss()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(panel()!.className).not.toContain('shadow-lg');
  });

  it('turns translucent only when the seed asks for glass', () => {
    const glass = mount({}, 'glass');
    fireEvent.contextMenu(glass.getByText('Row'), { clientX: 1, clientY: 1 });
    expect(panel()!.getAttribute('data-xen-v4-nav-panel')).toBe('glass');
  });

  it('makes the destructive row the only coloured one, in its TEXT slot', () => {
    const { getByText } = mount();
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(getByText('Delete').className).toContain('text-danger-text');
    expect(getByText('Delete').getAttribute('data-xen-v4-chrome')).toBe('danger');
    expect(getByText('Edit').className).toContain('text-on-surface');
    expect(getByText('Edit').className).not.toMatch(/text-(danger|primary|accent)/);
  });

  it('hovers with the M3 state layer, never with a ramp step', () => {
    const { getByText } = mount();
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    // The base reaches for `hover:bg-neutral-100` — a LIGHT-oriented ramp step,
    // so it paints a near-white slab across a dark row.
    expect(getByText('Edit').className).not.toContain('neutral-100');
    const css = chromeCss();
    expect(css).toContain('var(--xen-on-surface) 8%, var(--xen-surface)');
    expect(css).toContain(`opacity: 0.38;`);
  });

  it('gives every row a real tap target', () => {
    const { getByText } = mount();
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    for (const label of ['Edit', 'Duplicate', 'Delete']) {
      expect(getByText(label).className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
    }
  });

  it('survives its empty state: no actions at all', () => {
    const { getByText } = mount({ actions: [] });
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(panel()!.querySelectorAll('button')).toHaveLength(0);
  });

  it('introduces no literal colours', () => {
    const { getByText } = mount({}, 'glass');
    fireEvent.contextMenu(getByText('Row'), { clientX: 1, clientY: 1 });
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Only the pointer coordinates live inline.
    expect(panel()!.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
