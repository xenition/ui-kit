/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { Drawer } from './Drawer';
import { DrawerV4 } from './DrawerV4';
import { scrimCss } from './internal/surface-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function open(
  props: Partial<React.ComponentProps<typeof DrawerV4>> = {},
  depth?: ThemeSeed['depth']
) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <DrawerV4 open onClose={() => {}} title="Filters" {...props}>
        <p>drawer body</p>
      </DrawerV4>
    </XenitionUIProvider>
  );
}

/* The LAST match: a test that opens twice leaves two portals in the body. */
const last = (sel: string): HTMLElement => {
  const all = document.querySelectorAll(sel);
  return all[all.length - 1] as HTMLElement;
};
const panel = (): HTMLElement => last('[data-xen-v4-drawer]');
const scrim = (): HTMLElement => last('[data-xen-v4-scrim]');
const surfaceCss = (): string =>
  document.getElementById('xen-surface-v4-styles')?.textContent ?? '';
const drawerCss = (): string =>
  document.getElementById('xen-surface-v4-drawer-styles')?.textContent ?? '';

describe('DrawerV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Drawer> = {
      open: true,
      onClose: () => {},
      side: 'left',
      title: 'Filters',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof DrawerV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders nothing until open, then portals to the body', () => {
    const closed = render(
      <XenitionUIProvider theme={seed}>
        <DrawerV4 open={false} onClose={() => {}}>
          <p>drawer body</p>
        </DrawerV4>
      </XenitionUIProvider>
    );
    expect(closed.queryByText('drawer body')).toBeNull();

    const { getByText } = open();
    expect(getByText('Filters')).toBeTruthy();
    expect(panel().parentElement!.parentElement).toBe(document.body);
  });

  it('scrims from the shadow colour, which does not invert with the scheme', () => {
    open();
    // The bug this fixes: `bg-neutral-950/50` is a LIGHT-oriented ramp step, so
    // under [data-theme="dark"] it paints a near-white veil over a dark page.
    expect(surfaceCss()).toContain(scrimCss());
    expect(scrimCss()).toContain('--xen-elevation-color');
    expect(scrim().className).not.toContain('neutral-950');
  });

  it('floats on the sheet elevation rather than a fixed Tailwind shadow', () => {
    open();
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    expect(surfaceCss()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(panel().className).not.toContain('shadow-xl');
  });

  it('turns translucent only when the seed asks for glass', () => {
    open({}, 'soft');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
    open({}, 'glass');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('glass');
    open({}, 'flat');
    expect(panel().getAttribute('data-xen-v4-panel')).toBe('solid');
  });

  it('pins the header and scrolls the body, so a long drawer keeps its title', () => {
    const { getByText } = open();
    const header = getByText('Filters').parentElement!;
    expect(header.className).toContain('shrink-0');
    expect(header.className).toContain('border-b');
    expect(header.className).toContain('px-lg');

    const body = getByText('drawer body').parentElement!;
    expect(body.className).toContain('overflow-auto');
    expect(body.className).toContain('p-lg');
  });

  it('renders without a header when no title is given, and still pads its body', () => {
    const { getByText, container } = render(
      <XenitionUIProvider theme={seed}>
        <DrawerV4 open onClose={() => {}}>
          <p>drawer body</p>
        </DrawerV4>
      </XenitionUIProvider>
    );
    expect(container.querySelector('h2')).toBeNull();
    expect(getByText('drawer body').parentElement!.className).toContain('p-lg');
  });

  it('arrives from the edge it is anchored to, on every side', () => {
    const css = drawerCss();
    for (const [side, axis] of [
      ['left', 'translateX(-100%)'],
      ['right', 'translateX(100%)'],
      ['top', 'translateY(-100%)'],
      ['bottom', 'translateY(100%)'],
    ] as const) {
      open({ side });
      expect(panel().getAttribute('data-xen-v4-drawer')).toBe(side);
      expect(css).toContain(`@keyframes xen-v4-drawer-${side} { from { transform: ${axis}; }`);
    }
    // …and under reduced motion the travel becomes a fade, not nothing: an
    // overlay that appears with no transition at all reads as a glitch.
    const reduced = css.slice(css.indexOf('@media (prefers-reduced-motion'));
    expect(reduced).toContain('xen-v4-fade-in');
  });

  it('measures its width off the spacing scale, not a literal', () => {
    open({ side: 'right' });
    expect(panel().className).toContain('w-[calc(var(--xen-space-2xl)*7)]');
    expect(panel().className).not.toContain('w-80');
  });

  it('closes on the scrim and on Escape', () => {
    const onClose = jest.fn();
    open({ onClose });
    fireEvent.click(scrim());
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('introduces no literal colours', () => {
    open({}, 'glass');
    expect(surfaceCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(drawerCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of [panel(), scrim()]) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
