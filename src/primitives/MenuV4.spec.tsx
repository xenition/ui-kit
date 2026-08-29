/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import { MenuV4 } from './MenuV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const GLASS_SEED: ThemeSeed = { ...SEED, depth: 'glass' };

const ITEMS = [
  { label: 'Edit' },
  { label: 'Duplicate' },
  { label: 'Delete', danger: true },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

describe('MenuV4 (web)', () => {
  it('opens on trigger click and fires the item onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, queryByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={[{ label: 'Edit', onSelect }]} />
    );
    expect(queryByRole('menu')).toBeNull();
    fireEvent.click(getByText('Actions'));
    fireEvent.click(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(queryByRole('menu')).toBeNull();
  });

  /*
    The trigger-clone rule, kept alive in V4. Menu clones the element and
    injects `onClick` rather than wrapping it in a click catcher, so whatever
    the trigger says about being disabled is what actually happens — and the
    native twin, where a wrapper loses the touch responder entirely, behaves
    identically.
  */
  it('opens from a kit Button trigger, and still runs the trigger own onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <MenuV4 trigger={<Button onClick={onClick}>Actions</Button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    expect(getByRole('menu')).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not open from a disabled trigger', () => {
    const { getByText, queryByRole } = renderThemed(
      <MenuV4 trigger={<Button disabled>Actions</Button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    expect(queryByRole('menu')).toBeNull();
  });

  it('keeps a transparent wrapper for a non-element trigger', () => {
    const { getByText, getByRole } = renderThemed(<MenuV4 trigger="Actions" items={ITEMS} />);
    fireEvent.click(getByText('Actions'));
    expect(getByRole('menu')).toBeTruthy();
  });

  it('floats on `elevation.sheet` — the same altitude as the V4 sheets', () => {
    const { getByText, getByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    const panel = getByRole('menu');
    expect(panel.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
    // Not Tailwind's `shadow-lg`, which cannot know a dark page needs MORE.
    expect(panel.className).not.toContain('shadow-lg');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: var(--xen-elevation-sheet)');
  });

  it("frosts only when the seed said depth:'glass'", () => {
    const { getByText, getByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />,
      GLASS_SEED
    );
    fireEvent.click(getByText('Actions'));
    expect(getByRole('menu').getAttribute('data-xen-v4-nav-panel')).toBe('glass');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-panel="glass"]');
    expect(css).toContain('backdrop-filter');
  });

  it('makes the destructive row the only coloured thing in the list', () => {
    const { getByText } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    expect(getByText('Edit').className).toContain('text-on-surface');
    expect(getByText('Duplicate').className).toContain('text-on-surface');
    // `danger-text`, not the `danger` FILL slot the base used as text.
    expect(getByText('Delete').className).toContain('text-danger-text');
    expect(getByText('Delete').className).not.toMatch(/\btext-danger(?![-\w])/);
  });

  it('grounds hover from `border`, never a raw ramp step', () => {
    const { getByText, getAllByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    getAllByRole('menuitem').forEach((row) => {
      expect(row.className).not.toContain('neutral');
      expect(row.getAttribute('data-xen-v4-nav-item')).toBe('');
    });
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('color-mix(in srgb, var(--xen-border) 45%, transparent)');
  });

  it('gives every row a 44px target and the panel a composed minimum width', () => {
    const { getByText, getAllByRole, getByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    getAllByRole('menuitem').forEach((row) => {
      expect(row.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    });
    expect(getByRole('menu').className).toContain('min-w-[calc(var(--xen-space-2xl)_*_4)]');
  });

  it('closes on Escape', () => {
    const { getByText, queryByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    expect(queryByRole('menu')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(queryByRole('menu')).toBeNull();
  });

  it('aligns to the end when asked', () => {
    const { getByText, getByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} align="end" />
    );
    fireEvent.click(getByText('Actions'));
    expect(getByRole('menu').className).toContain('right-0');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByText, getByRole } = renderThemed(
      <MenuV4 trigger={<button>Actions</button>} items={ITEMS} />
    );
    fireEvent.click(getByText('Actions'));
    expect(getByRole('menu').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
