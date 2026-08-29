/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { Sidebar, SidebarGroup } from './Sidebar';
import { SidebarV4 } from './SidebarV4';
import { CHROME_V4_STYLE_ID } from './internal/chrome-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const GROUPS: SidebarGroup[] = [
  { label: 'Workspace', items: [{ label: 'Overview', active: true }, { label: 'Reports' }] },
  { label: 'Account', items: [{ label: 'Billing', href: '/billing' }] },
];

function mount(props: Partial<React.ComponentProps<typeof SidebarV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <SidebarV4 groups={GROUPS} {...props} />
    </XenitionUIProvider>
  );
}

const chromeCss = (): string => document.getElementById(CHROME_V4_STYLE_ID)?.textContent ?? '';

describe('SidebarV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Sidebar> = {
      brand: 'Xenition',
      groups: GROUPS,
      footer: <span>Sign out</span>,
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof SidebarV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders groups, headings, links and buttons', () => {
    const { getByText } = mount({ brand: 'Xenition', footer: <span>Sign out</span> });
    expect(getByText('Xenition')).toBeTruthy();
    expect(getByText('Workspace')).toBeTruthy();
    expect(getByText('Overview').closest('button')).toBeTruthy();
    expect(getByText('Billing').closest('a')!.getAttribute('href')).toBe('/billing');
    expect(getByText('Sign out')).toBeTruthy();
  });

  it('accepts a flat items list as well as groups', () => {
    const { getByText, queryByText } = mount({ groups: undefined, items: [{ label: 'Inbox' }] });
    expect(getByText('Inbox')).toBeTruthy();
    expect(queryByText('Workspace')).toBeNull();
  });

  it('says where the user is with THREE signals, not one solid fill', () => {
    const { getByText, container } = mount();
    const row = getByText('Overview').closest('button')!;
    // A tint, composited — not `bg-primary` and not `bg-primary-50`, which is a
    // light-oriented ramp step and stays palest on a dark page.
    expect(row.className).toContain('color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))');
    expect(row.className).not.toMatch(/\bbg-primary\b/);
    expect(row.className).not.toContain('bg-primary-50');
    // The brand TEXT slot, which is contrast-corrected; `primary` is a fill.
    expect(row.className).toContain('text-primary-text');
    expect(row.className).toContain('font-semibold');
    // And a rail, for a reader who cannot separate a 12% wash from the surface.
    expect(row.querySelector('span[aria-hidden="true"].bg-primary')).not.toBeNull();
    // Selection reaches the accessibility layer too.
    expect(row.getAttribute('aria-current')).toBe('page');
    expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });

  it('leaves an inactive row uncoloured', () => {
    const { getByText } = mount();
    const row = getByText('Reports').closest('button')!;
    expect(row.className).toContain('text-on-surface');
    expect(row.className).not.toContain('color-mix');
    expect(row.getAttribute('aria-current')).toBeNull();
    expect(row.querySelector('span[aria-hidden="true"].bg-primary')).toBeNull();
  });

  it('is NOT a layer: a persistent rail casts no shadow', () => {
    // §11 — the rail is attached to the page edge and separated by a hairline.
    // The drawer that slides it in over the page is AppShellV4's layer, not
    // this one's.
    const { container } = mount();
    const nav = container.querySelector('nav')!;
    expect(nav.className).toContain('border-r');
    expect(nav.className).not.toMatch(/shadow/);
    expect(nav.className).not.toContain('elevation');
  });

  it('headings use the AA-promising muted slot', () => {
    const { getByText } = mount();
    expect(getByText('Workspace').className).toContain('text-muted-text');
    expect(getByText('Workspace').className).not.toMatch(/text-muted(?!-text)/);
  });

  it('hovers with the M3 state layer and rings with the shared ring', () => {
    const { getByText } = mount();
    expect(getByText('Reports').closest('button')!.className).not.toContain('neutral-100');
    expect(getByText('Reports').closest('button')!.className).not.toContain('primary-300');
    const css = chromeCss();
    expect(css).toContain('var(--xen-on-surface) 8%, var(--xen-surface)');
    expect(css).toContain('outline: 2px solid var(--xen-ring);');
  });

  it('gives every row a real tap target', () => {
    const { getByText } = mount();
    for (const label of ['Overview', 'Reports', 'Billing']) {
      const row = getByText(label).closest('a,button')!;
      expect(row.className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
    }
  });

  it('fires onSelect from both row shapes', () => {
    const onButton = jest.fn();
    const onLink = jest.fn();
    const { getByText } = mount({
      groups: [{ items: [{ label: 'Overview', onSelect: onButton }, { label: 'Billing', href: '/b', onSelect: onLink }] }],
    });
    fireEvent.click(getByText('Overview'));
    fireEvent.click(getByText('Billing'));
    expect(onButton).toHaveBeenCalledTimes(1);
    expect(onLink).toHaveBeenCalledTimes(1);
  });

  it('survives its empty state: no brand, no groups, no footer', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <SidebarV4 />
      </XenitionUIProvider>
    );
    expect(container.querySelector('nav')).not.toBeNull();
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('introduces no literal colours', () => {
    const { container } = mount({ brand: 'Xenition' });
    expect(chromeCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
