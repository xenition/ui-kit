/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import { TooltipV4 } from './TooltipV4';

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

describe('TooltipV4 (web)', () => {
  it('reveals the tip on hover and hides it again on leave', () => {
    const { getByText, queryByRole, getByRole } = renderThemed(
      <TooltipV4 label="Archive this order">
        <button>Archive</button>
      </TooltipV4>
    );
    expect(queryByRole('tooltip')).toBeNull();
    fireEvent.mouseEnter(getByText('Archive').parentElement!);
    expect(getByRole('tooltip').textContent).toBe('Archive this order');
    fireEvent.mouseLeave(getByText('Archive').parentElement!);
    expect(queryByRole('tooltip')).toBeNull();
  });

  it('reveals on focus, so a keyboard user gets the tip too', () => {
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Archive this order">
        <button>Archive</button>
      </TooltipV4>
    );
    fireEvent.focus(getByText('Archive'));
    expect(getByRole('tooltip')).toBeTruthy();
  });

  /*
    The one member of the family that KEEPS its wrapper. Menu and Popover had to
    clone their trigger — on native a Button steals the touch responder, on web
    a wrapping click catcher makes `disabled` a lie. Hover and focus can be
    neither stolen nor faked, and they activate nothing, so the child is passed
    through exactly as written and keeps its own click.
  */
  it('leaves the child untouched, including its own click', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Saves your work">
        <Button onClick={onClick}>Save</Button>
      </TooltipV4>
    );
    fireEvent.click(getByText('Save'));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    expect(getByRole('tooltip')).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('inverts with the compiler-guaranteed pair, not a raw ramp step', () => {
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Tip">
        <button>Save</button>
      </TooltipV4>
    );
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    const tip = getByRole('tooltip');
    expect(tip.getAttribute('data-xen-v4-nav-tip')).toBe('');
    // `bg-neutral-900` / `text-neutral-50` is a pair by luck of how the dark
    // block re-emits the ramp, not by promise.
    expect(tip.className).not.toContain('neutral');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('background-color: var(--xen-on-surface)');
    expect(css).toContain('color: var(--xen-surface)');
  });

  it('lifts on `elevation.card` — the smallest of the three', () => {
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Tip">
        <button>Save</button>
      </TooltipV4>
    );
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    // Not Tailwind's `shadow`, which cannot know a dark page needs more of it.
    expect(getByRole('tooltip').className).not.toMatch(/\bshadow\b/);
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-tip]');
    expect(css).toContain('box-shadow: var(--xen-elevation-card)');
  });

  it("joins the glass family only when the seed says depth:'glass'", () => {
    const glass = renderThemed(
      <TooltipV4 label="Tip">
        <button>Save</button>
      </TooltipV4>,
      GLASS_SEED
    );
    fireEvent.mouseEnter(within(glass.container).getByText('Save').parentElement!);
    expect(
      within(glass.container).getByRole('tooltip').getAttribute('data-xen-v4-nav-tip')
    ).toBe('glass');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('[data-xen-v4-nav-tip="glass"]');
  });

  it('places the bubble on each side, with a token gap', () => {
    (
      [
        ['top', 'bottom-full'],
        ['bottom', 'top-full'],
        ['left', 'right-full'],
        ['right', 'left-full'],
      ] as const
    ).forEach(([side, cls]) => {
      const { container } = renderThemed(
        <TooltipV4 label="Tip" side={side}>
          <button>Save</button>
        </TooltipV4>
      );
      fireEvent.mouseEnter(within(container).getByText('Save').parentElement!);
      const tip = within(container).getByRole('tooltip');
      expect(tip.className).toContain(cls);
      // A token gap, not Tailwind's fixed 4px.
      expect(tip.className).toMatch(/m[btlr]-xs/);
    });
  });

  it('never intercepts the pointer — a tip is not a target', () => {
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Tip">
        <button>Save</button>
      </TooltipV4>
    );
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    expect(getByRole('tooltip').className).toContain('pointer-events-none');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByText, getByRole } = renderThemed(
      <TooltipV4 label="Tip">
        <button>Save</button>
      </TooltipV4>
    );
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    expect(getByRole('tooltip').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
