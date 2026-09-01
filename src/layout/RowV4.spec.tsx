/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { Row, type RowProps } from './Row';
import { RowV4 } from './RowV4';
import type { Align, Justify, SpaceKey } from './_tokens';

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Align[] = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES: Justify[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];

function el(ui: ReactElement): HTMLElement {
  // RTL binds its queries to `document.body`, and several tests below render
  // twice to compare against the base — so read the node off this render's own
  // container instead of querying globally.
  return render(ui).container.firstElementChild as HTMLElement;
}

/** Class list as a set, so a comparison does not depend on emission order. */
function classes(node: HTMLElement): Set<string> {
  return new Set(node.className.split(/\s+/).filter(Boolean));
}

describe('RowV4 (web)', () => {
  it('STRUCTURE ONLY — paints exactly what the base paints, for every prop it takes', () => {
    // §5 marks Row "structure only, no visual change". That is a testable
    // claim, so it is tested rather than asserted in a comment: the same props
    // through both components must produce the same class list.
    const cases: RowProps[] = [
      {},
      { gap: 'md' },
      { align: 'baseline' },
      { justify: 'between' },
      { wrap: true },
      { gap: '2xl', align: 'start', justify: 'evenly', wrap: true },
    ];
    cases.forEach((props) => {
      const base = el(<Row data-testid="row" {...props} />);
      const v4 = el(<RowV4 data-testid="row" {...props} />);
      expect(classes(v4)).toEqual(classes(base));
    });
  });

  it('defaults to a centred, non-wrapping row that starts its content — and pays no gap', () => {
    const node = el(<RowV4 data-testid="row" />);
    const c = classes(node);
    expect(c.has('flex')).toBe(true);
    expect(c.has('flex-row')).toBe(true);
    expect(c.has('items-center')).toBe(true);
    expect(c.has('justify-start')).toBe(true);
    expect(c.has('flex-nowrap')).toBe(true);
    // §5: gap stays undefined by default — §4.1's rhythm is the caller's.
    expect(node.className).not.toMatch(/gap-/);
  });

  it('binds gap to the spacing tokens for every key on the scale', () => {
    SPACE_KEYS.forEach((gap) => {
      const node = el(<RowV4 data-testid="row" gap={gap} />);
      expect(node.className).toContain(`gap-[var(--xen-space-${gap})]`);
    });
  });

  it('maps align — baseline included, because a row is where baseline means something', () => {
    const expected: Record<Align, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };
    ALIGNS.forEach((align) => {
      expect(classes(el(<RowV4 data-testid="row" align={align} />)).has(expected[align])).toBe(true);
    });
  });

  it('maps justify across the whole distribution vocabulary', () => {
    const expected: Record<Justify, string> = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    JUSTIFIES.forEach((justify) => {
      expect(classes(el(<RowV4 data-testid="row" justify={justify} />)).has(expected[justify])).toBe(
        true
      );
    });
  });

  it('wrap toggles between flex-wrap and an explicit flex-nowrap', () => {
    expect(classes(el(<RowV4 data-testid="row" wrap />)).has('flex-wrap')).toBe(true);
    expect(classes(el(<RowV4 data-testid="row" wrap={false} />)).has('flex-nowrap')).toBe(true);
  });

  it('§1.1 — every arbitrary value traces to a --xen-* token; no literals anywhere', () => {
    const node = el(<RowV4 data-testid="row" gap="lg" align="baseline" justify="between" wrap />);
    const arbitrary = node.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
    expect(node.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(node.outerHTML).not.toMatch(/\d+px/);
    expect(node.getAttribute('style')).toBeNull();
  });

  it('carries the V4 marker so a sheet or a spec can find it', () => {
    expect(el(<RowV4 data-testid="row" />).hasAttribute('data-xen-v4-row')).toBe(true);
    expect(el(<Row data-testid="row" />).hasAttribute('data-xen-v4-row')).toBe(false);
  });

  it('forwards the ref and merges className, and passes the rest of the div props through', () => {
    const ref = createRef<HTMLDivElement>();
    const node = el(
      <RowV4 ref={ref} data-testid="row" className="mt-lg" role="group" aria-label="Toolbar" />
    );
    expect(ref.current).toBe(node);
    expect(node.className).toContain('mt-lg');
    expect(node.className).toContain('flex-row');
    expect(node.getAttribute('role')).toBe('group');
    expect(node.getAttribute('aria-label')).toBe('Toolbar');
  });

  it('EMPTY STATE — with no children it is an empty box: no text, no ground, no edge', () => {
    const node = el(<RowV4 data-testid="row" gap="md" />);
    expect(node.childNodes).toHaveLength(0);
    expect(node.textContent).toBe('');
    expect(node.innerHTML).toBe('');
    // §4.5: nothing to show must never render a blank bordered box.
    expect(node.className).not.toMatch(/\bborder\b|\bbg-|\bshadow/);
  });

  it('EMPTY STATE — a falsy or empty child list renders just as empty, and never throws', () => {
    const items: string[] = [];
    const node = el(
      <RowV4 data-testid="row" gap="sm">
        {items.map((i) => (
          <span key={i}>{i}</span>
        ))}
        {null}
        {false}
      </RowV4>
    );
    expect(node.innerHTML).toBe('');
  });

  it('lays its children out in source order when it has some', () => {
    const node = el(
      <RowV4 data-testid="row" gap="sm">
        <span>Left</span>
        <span>Right</span>
      </RowV4>
    );
    expect(node.childNodes).toHaveLength(2);
    expect(node.textContent).toBe('LeftRight');
  });
});
