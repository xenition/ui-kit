/** @jest-environment jsdom */
import * as React from 'react';
import { render, within } from '@testing-library/react';
import { SPACE_MX, SPACE_MY, type SpaceKey } from './_tokens';
import { Divider } from './Divider';
import { DividerV4 } from './DividerV4';

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** `44 + spacing.md` — the row title's leading edge (BRIEF §4.3/§4.4). */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';
const LEADING_MT = 'mt-[calc(44px+var(--xen-space-md))]';

/**
 * The rendered rule, scoped to its own container — RTL binds its queries to
 * `document.body`, and several tests here render more than once.
 */
function rule(ui: React.ReactElement): HTMLElement {
  const { container } = render(ui);
  return within(container).getByRole('separator');
}

describe('DividerV4 (web)', () => {
  it('is 1px of the border token and nothing else — §4.4', () => {
    const el = rule(<DividerV4 />);
    expect(el.tagName).toBe('HR');
    expect(el.className).toContain('border-border');
    // `border-t` is the 1px; `border-0` kills the other three edges so the
    // rule can never come out as a box.
    expect(el.className).toContain('border-0');
    expect(el.className).toContain('border-t');
    // Never two weights, never a tinted rule.
    expect(el.className).not.toMatch(/border-[24]/);
    expect(el.className).not.toMatch(/bg-(primary|muted|neutral)/);
  });

  it('keeps the <hr> for its implicit separator role, on both orientations', () => {
    const h = rule(<DividerV4 />);
    expect(h.getAttribute('aria-orientation')).toBe('horizontal');
    expect(h.className).toContain('w-full');
    expect(h.className).toContain('border-t');

    const v = rule(<DividerV4 orientation="vertical" />);
    expect(v.tagName).toBe('HR');
    expect(v.getAttribute('aria-orientation')).toBe('vertical');
    expect(v.className).toContain('self-stretch');
    expect(v.className).toContain('border-l');
  });

  it('EMPTY STATE — with no props at all it is one composed hairline, not a blank box', () => {
    const { container } = render(<DividerV4 />);
    const el = container.querySelector('hr') as HTMLElement;
    expect(el).not.toBeNull();
    // Nothing inside it, and no inset margin invented for it.
    expect(el.innerHTML).toBe('');
    expect(el.className).not.toMatch(/\bm[xylt]-/);
    expect(el.getAttribute('style')).toBeNull();
  });

  it('every SpaceKey inset stays symmetric on the cross axis — horizontal', () => {
    SPACE_KEYS.forEach((key) => {
      const el = rule(<DividerV4 inset={key} />);
      expect(el.className).toContain(SPACE_MX[key]);
      expect(el.className).toContain(`mx-[var(--xen-space-${key})]`);
      expect(el.className).not.toContain(LEADING_ML);
    });
  });

  it('every SpaceKey inset stays symmetric on the cross axis — vertical', () => {
    SPACE_KEYS.forEach((key) => {
      const el = rule(<DividerV4 orientation="vertical" inset={key} />);
      expect(el.className).toContain(SPACE_MY[key]);
      expect(el.className).toContain(`my-[var(--xen-space-${key})]`);
      expect(el.className).not.toContain(LEADING_MT);
    });
  });

  it('inset="leading" clears the 44 slot, composed as 44 + spacing.md — horizontal', () => {
    const el = rule(<DividerV4 inset="leading" />);
    expect(el.className).toContain(LEADING_ML);
    // One end only: the rule aligns with the row title and still runs out to
    // the container edge.
    expect(el.className).not.toMatch(/\bmx-/);
    expect(el.className).not.toMatch(/\bmr-/);
    // The gap half is a token, never a second literal.
    expect(el.className).toContain('var(--xen-space-md)');
    expect(el.className).not.toMatch(/\b(60|16)px/);
  });

  it('inset="leading" insets the leading end on a vertical rule too', () => {
    const el = rule(<DividerV4 orientation="vertical" inset="leading" />);
    expect(el.className).toContain(LEADING_MT);
    expect(el.className).not.toMatch(/\bmy-/);
    expect(el.className).not.toMatch(/\bmb-/);
    expect(el.className).toContain('border-l');
  });

  it('44 is the only bare number, and it is the named leading slot', () => {
    const el = rule(<DividerV4 inset="leading" />);
    const numbers = el.className.match(/\d+px/g) ?? [];
    expect(numbers).toEqual(['44px']);
  });

  it('ADDITIVE — the default and every existing inset render exactly as the base does', () => {
    const cls = (ui: React.ReactElement): string[] =>
      rule(ui).className.split(/\s+/).filter(Boolean).sort();

    expect(cls(<DividerV4 />)).toEqual(cls(<Divider />));
    expect(cls(<DividerV4 orientation="vertical" />)).toEqual(cls(<Divider orientation="vertical" />));
    SPACE_KEYS.forEach((key) => {
      expect(cls(<DividerV4 inset={key} />)).toEqual(cls(<Divider inset={key} />));
      expect(cls(<DividerV4 orientation="vertical" inset={key} />)).toEqual(
        cls(<Divider orientation="vertical" inset={key} />)
      );
    });
  });

  it('paints no literal colour anywhere — every value traces to a --xen-* token', () => {
    const { container } = render(
      <>
        <DividerV4 inset="leading" />
        <DividerV4 orientation="vertical" inset="lg" />
      </>
    );
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(container.innerHTML).not.toMatch(/rgb|hsl/);
  });

  it('forwards the ref, className and the rest of the hr props', () => {
    const ref = React.createRef<HTMLHRElement>();
    const { getByTestId } = render(
      <DividerV4 ref={ref} inset="leading" className="my-lg" data-testid="rule" id="sep" />
    );
    const el = getByTestId('rule');
    expect(ref.current).toBe(el);
    expect(el.id).toBe('sep');
    expect(el.className).toContain('my-lg');
    expect(el.className).toContain(LEADING_ML);
  });
});
