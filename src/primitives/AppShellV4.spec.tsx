/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { AppShell } from './AppShell';
import { AppShellV4 } from './AppShellV4';
import { SidebarV4 } from './SidebarV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';
import { scrimCss } from './internal/surface-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(props: Partial<React.ComponentProps<typeof AppShellV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <AppShellV4
        sidebar={<SidebarV4 items={[{ label: 'Overview', active: true }]} />}
        header={<span>Dashboard</span>}
        {...props}
      >
        <p>page body</p>
      </AppShellV4>
    </XenitionUIProvider>
  );
}

const drawer = (): HTMLElement | null => document.querySelector('[data-xen-v4-drawer]');
const scrim = (): HTMLElement | null => document.querySelector('[data-xen-v4-scrim]');
const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';
const surfaceCss = (): string =>
  document.getElementById('xen-surface-v4-styles')?.textContent ?? '';
const drawerCss = (): string =>
  document.getElementById('xen-surface-v4-drawer-styles')?.textContent ?? '';

describe('AppShellV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof AppShell> = {
      sidebar: <nav />,
      header: <span>Dashboard</span>,
      children: <p>page body</p>,
      sidebarWidth: 300,
      menuLabel: 'Menu',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof AppShellV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders the rail, the header and the content', () => {
    const { getByText, container } = mount();
    expect(container.querySelector('aside')).not.toBeNull();
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('page body')).toBeTruthy();
    expect(container.querySelector('main')!.className).toContain('overflow-y-auto');
  });

  it('opens and closes the drawer from the menu button', () => {
    const { getByLabelText } = mount();
    expect(drawer()).toBeNull();
    const toggle = getByLabelText('Toggle navigation');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(toggle);
    expect(drawer()).not.toBeNull();
    expect(getByLabelText('Toggle navigation').getAttribute('aria-expanded')).toBe('true');
    expect(getByLabelText('Toggle navigation').getAttribute('aria-controls')).toBe(
      drawer()!.id
    );

    fireEvent.click(getByLabelText('Close navigation'));
    expect(drawer()).toBeNull();
  });

  it('closes the drawer on Escape — a layer over a scrim must not trap', () => {
    const { getByLabelText } = mount();
    fireEvent.click(getByLabelText('Toggle navigation'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(drawer()).toBeNull();
  });

  it('gives depth to the ONE container that is genuinely a layer', () => {
    const { container, getByLabelText } = mount();
    // Not the rail: it is attached to the page edge.
    expect(container.querySelector('aside')!.className).not.toMatch(/shadow/);
    // Not the top bar: a shadow there is honest only once content is under it.
    const header = container.querySelector('header')!;
    expect(header.className).toContain('border-b');
    expect(header.className).not.toMatch(/shadow/);
    // The drawer is.
    fireEvent.click(getByLabelText('Toggle navigation'));
    expect(drawer()!.getAttribute('data-xen-v4-panel')).toBe('solid');
    expect(surfaceCss()).toContain('box-shadow: var(--xen-elevation-sheet);');
    expect(drawer()!.className).not.toContain('shadow-lg');
  });

  it('scrims from the shadow colour, which does not invert with the scheme', () => {
    const { getByLabelText } = mount();
    fireEvent.click(getByLabelText('Toggle navigation'));
    expect(surfaceCss()).toContain(scrimCss());
    expect(scrimCss()).toContain('--xen-elevation-color');
    // The bug this fixes: `bg-neutral-900/50` is a light-oriented ramp step.
    expect(scrim()!.className).not.toContain('neutral-900');
  });

  it('slides the drawer in from the edge it is anchored to', () => {
    const { getByLabelText } = mount();
    fireEvent.click(getByLabelText('Toggle navigation'));
    expect(drawer()!.getAttribute('data-xen-v4-drawer')).toBe('left');
    expect(drawerCss()).toContain('@keyframes xen-v4-drawer-left { from { transform: translateX(-100%); }');
    const reduced = drawerCss().slice(drawerCss().indexOf('@media (prefers-reduced-motion'));
    expect(reduced).toContain('xen-v4-fade-in');
  });

  it('makes the menu button a real tap target with the shared feedback', () => {
    const { getByLabelText } = mount();
    const toggle = getByLabelText('Toggle navigation');
    expect(toggle.className).toContain(
      'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
    );
    expect(toggle.getAttribute('data-xen-v4-chrome')).toBe('on-surface');
    expect(toggle.className).not.toContain('neutral-100');
    expect(chromeCss()).toContain('outline: 2px solid var(--xen-ring);');
  });

  it('honours sidebarWidth on both the rail and the drawer', () => {
    const { container, getByLabelText } = mount({ sidebarWidth: 320 });
    expect((container.querySelector('aside') as HTMLElement).style.width).toBe('320px');
    fireEvent.click(getByLabelText('Toggle navigation'));
    expect(drawer()!.style.width).toBe('320px');
  });

  it('survives its empty state: no header at all', () => {
    const { container, queryByLabelText } = mount({ header: undefined });
    expect(container.querySelector('header')).toBeNull();
    // …and with no header there is no toggle, which is the honest outcome:
    // the shell has nowhere to put one.
    expect(queryByLabelText('Toggle navigation')).toBeNull();
  });

  it('introduces no literal colours', () => {
    const { container, getByLabelText } = mount();
    fireEvent.click(getByLabelText('Toggle navigation'));
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(surfaceCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
