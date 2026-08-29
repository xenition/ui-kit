/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import { PopoverV4 } from './PopoverV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const GLASS_SEED: ThemeSeed = { ...SEED, depth: 'glass' };

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

function panel(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-nav-panel]');
}

describe('PopoverV4 (web)', () => {
  it('reveals its panel when the trigger is clicked, and toggles it back', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>
    );
    expect(panel(container)).toBeNull();
    fireEvent.click(getByText('Open'));
    expect(panel(container)?.textContent).toBe('panel body');
    fireEvent.click(getByText('Open'));
    expect(panel(container)).toBeNull();
  });

  /*
    The trigger-clone rule, kept alive in V4. Popover clones the element and
    injects `onClick` rather than wrapping it in a click catcher, so whatever
    the trigger says about being disabled is what actually happens — and the
    native twin, where a wrapper loses the touch responder entirely, behaves
    identically.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<Button onClick={onClick}>Open</Button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    expect(panel(container)).not.toBeNull();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<Button disabled>Open</Button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    expect(panel(container)).toBeNull();
  });

  it('keeps a transparent wrapper for a non-element trigger', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger="Open">panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    expect(panel(container)).not.toBeNull();
  });

  it('floats on `elevation.sheet` — the same altitude as every V4 panel', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    const node = panel(container)!;
    expect(node.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
    // Not Tailwind's `shadow-lg`, which cannot know a dark page needs MORE.
    expect(node.className).not.toContain('shadow-lg');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: var(--xen-elevation-sheet)');
  });

  it("frosts only when the seed said depth:'glass'", () => {
    const glass = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>,
      GLASS_SEED
    );
    fireEvent.click(within(glass.container).getByText('Open'));
    expect(panel(glass.container)!.getAttribute('data-xen-v4-nav-panel')).toBe('glass');

    // A soft seed stays opaque — §8, no glassmorphism without purpose.
    const soft = renderThemed(<PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>);
    fireEvent.click(within(soft.container).getByText('Open'));
    expect(panel(soft.container)!.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
  });

  it('pads on the same step as CardV4 and the V4 sheets', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    // The base used `p-2`, eight pixels from a hard edge.
    expect(panel(container)!.className).toContain('p-md');
    expect(panel(container)!.className).toContain('min-w-[calc(var(--xen-space-2xl)_*_4)]');
  });

  it('closes on Escape and on an outside click', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(panel(container)).toBeNull();

    fireEvent.click(getByText('Open'));
    expect(panel(container)).not.toBeNull();
    fireEvent.mouseDown(document.body);
    expect(panel(container)).toBeNull();
  });

  it('aligns start, center and end', () => {
    (
      [
        ['start', 'left-0'],
        ['center', 'left-1/2'],
        ['end', 'right-0'],
      ] as const
    ).forEach(([align, cls]) => {
      const { container } = renderThemed(
        <PopoverV4 trigger={<button>Open</button>} align={align}>
          panel body
        </PopoverV4>
      );
      fireEvent.click(within(container).getByText('Open'));
      expect(panel(container)!.className).toContain(cls);
    });
  });

  it('names no literal colour — every value is a token', () => {
    const { getByText, container } = renderThemed(
      <PopoverV4 trigger={<button>Open</button>}>panel body</PopoverV4>
    );
    fireEvent.click(getByText('Open'));
    expect(panel(container)!.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
