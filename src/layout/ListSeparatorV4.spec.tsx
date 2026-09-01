/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import type { SpaceKey } from './_tokens';
import { ListSeparatorV4 } from './ListSeparatorV4';

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/** `44 + spacing.md` — the row title's leading edge (BRIEF §4.3/§4.4). */
const LEADING_ML = 'ml-[calc(44px+var(--xen-space-md))]';

function rule(ui: React.ReactElement): HTMLElement {
  const { container } = render(ui);
  return container.firstElementChild as HTMLElement;
}

/** Every hairline in a rendered tree. */
function rules(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.h-px'));
}

describe('ListSeparatorV4 (web)', () => {
  it('is 1px of the border token and nothing else — §4.4', () => {
    const el = rule(<ListSeparatorV4 />);
    expect(el.className).toContain('h-px');
    expect(el.className).toContain('bg-border');
    // Never two weights, never a tinted rule.
    expect(el.className).not.toMatch(/\bh-(0\.5|1|1\.5|px\d)/);
    expect(el.className).not.toMatch(/bg-(primary|muted|neutral|surface)/);
    // A hairline is a painted 1px block, never a box with an outline on it.
    expect(el.className).not.toMatch(/(^|\s)border(-[024]|\s|$)/);
  });

  it('stays out of the accessibility tree — the rows carry the list structure', () => {
    const el = rule(<ListSeparatorV4 />);
    expect(el.getAttribute('aria-hidden')).toBe('true');
    // Not a second announced separator between every pair of rows; that role
    // belongs to DividerV4 and its <hr>.
    expect(el.tagName).toBe('DIV');
    expect(el.getAttribute('role')).toBeNull();
  });

  it('EMPTY STATE — with no props at all it is one composed hairline, not a blank box', () => {
    const { container } = render(<ListSeparatorV4 />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.innerHTML).toBe('');
    // Flush by default: no inset invented for rows that have no leading slot.
    expect(el.className).not.toMatch(/\bml-/);
    expect(el.getAttribute('style')).toBeNull();
  });

  it('EMPTY STATE — a list of zero or one row draws no separator at all', () => {
    const list = (items: string[]): HTMLElement =>
      render(
        <div>
          {items.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 ? <ListSeparatorV4 inset="leading" /> : null}
              <div>{item}</div>
            </React.Fragment>
          ))}
        </div>
      ).container;

    expect(rules(list([]))).toHaveLength(0);
    expect(rules(list(['only']))).toHaveLength(0);
    expect(rules(list(['a', 'b']))).toHaveLength(1);
    expect(rules(list(['a', 'b', 'c']))).toHaveLength(2);
  });

  it('every SpaceKey inset is a leading inset off the token scale', () => {
    SPACE_KEYS.forEach((key) => {
      const el = rule(<ListSeparatorV4 inset={key} />);
      expect(el.className).toContain(`ml-[var(--xen-space-${key})]`);
      expect(el.className).not.toContain(LEADING_ML);
      // Leading end only — the rule still runs out to the container edge.
      expect(el.className).not.toMatch(/\bmr-/);
      expect(el.className).not.toMatch(/\bmx-/);
    });
  });

  it('inset="leading" clears the 44 slot, composed as 44 + spacing.md', () => {
    const el = rule(<ListSeparatorV4 inset="leading" />);
    expect(el.className).toContain(LEADING_ML);
    // The gap half is a token, never a second literal.
    expect(el.className).toContain('var(--xen-space-md)');
    expect(el.className).not.toMatch(/\bmr-/);
    expect(el.className).not.toMatch(/\bmx-/);
  });

  it('44 is the only bare number, and it is the named leading slot', () => {
    const el = rule(<ListSeparatorV4 inset="leading" />);
    // `h-px` is the hairline's 1 and carries no digit; 44 is all that is left.
    const numbers = el.className.match(/\d+px/g) ?? [];
    expect(numbers).toEqual(['44px']);
  });

  it('ADDITIVE — the flush default is what a caller porting from native already has', () => {
    const flush = rule(<ListSeparatorV4 />).className;
    const leading = rule(<ListSeparatorV4 inset="leading" />).className;
    expect(flush).not.toContain('ml-');
    // The only difference `'leading'` makes is the inset.
    expect(leading.replace(` ${LEADING_ML}`, '')).toBe(flush);
  });

  it('paints no literal colour anywhere — every value traces to a --xen-* token', () => {
    const { container } = render(
      <>
        <ListSeparatorV4 />
        <ListSeparatorV4 inset="leading" />
        <ListSeparatorV4 inset="md" />
      </>
    );
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(container.innerHTML).not.toMatch(/rgb|hsl/);
  });

  it('forwards the ref, className and the rest of the div props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <ListSeparatorV4 ref={ref} inset="leading" className="opacity-100" data-testid="sep" id="s" />
    );
    const el = getByTestId('sep');
    expect(ref.current).toBe(el);
    expect(el.id).toBe('s');
    expect(el.className).toContain('opacity-100');
    expect(el.className).toContain(LEADING_ML);
  });
});
