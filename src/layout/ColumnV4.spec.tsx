/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { Column, type ColumnProps } from './Column';
import { ColumnV4 } from './ColumnV4';
import type { Align, Justify, SpaceKey } from './_tokens';

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Array<Exclude<Align, 'baseline'>> = ['start', 'center', 'end', 'stretch'];
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

describe('ColumnV4 (web)', () => {
  it('STRUCTURE ONLY — paints exactly what the base paints, for every prop it takes', () => {
    // §5 marks Column "structure only, no visual change" — tested against the
    // base rather than promised in a comment.
    const cases: ColumnProps[] = [
      {},
      { gap: 'md' },
      { align: 'center' },
      { justify: 'between' },
      { gap: 'xl', align: 'end', justify: 'evenly' },
    ];
    cases.forEach((props) => {
      const base = el(<Column data-testid="col" {...props} />);
      const v4 = el(<ColumnV4 data-testid="col" {...props} />);
      expect(classes(v4)).toEqual(classes(base));
    });
  });

  it('defaults to a stretched column that starts its content — and pays no gap', () => {
    const node = el(<ColumnV4 data-testid="col" />);
    const c = classes(node);
    expect(c.has('flex')).toBe(true);
    expect(c.has('flex-col')).toBe(true);
    expect(c.has('items-stretch')).toBe(true);
    expect(c.has('justify-start')).toBe(true);
    // §5: gap stays undefined by default — §4.1's rhythm is the caller's.
    expect(node.className).not.toMatch(/gap-/);
  });

  it('binds gap to the spacing tokens for every key on the scale', () => {
    SPACE_KEYS.forEach((gap) => {
      const node = el(<ColumnV4 data-testid="col" gap={gap} />);
      expect(node.className).toContain(`gap-[var(--xen-space-${gap})]`);
    });
  });

  it('maps align across the narrowed vocabulary — no baseline on a column', () => {
    const expected: Record<Exclude<Align, 'baseline'>, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    ALIGNS.forEach((align) => {
      expect(classes(el(<ColumnV4 data-testid="col" align={align} />)).has(expected[align])).toBe(
        true
      );
    });
    // §5's parity fix, asserted where it can be: `baseline` is not a value this
    // component accepts on either twin. `@ts-expect-error` fails the build if
    // the type ever widens back out.
    // @ts-expect-error — 'baseline' is meaningless on a column and is not offered.
    expect(classes(el(<ColumnV4 data-testid="col" align="baseline" />)).size).toBeGreaterThan(0);
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
      expect(
        classes(el(<ColumnV4 data-testid="col" justify={justify} />)).has(expected[justify])
      ).toBe(true);
    });
  });

  it('never emits a row direction — a column is a column', () => {
    const node = el(<ColumnV4 data-testid="col" gap="md" />);
    expect(node.className).toContain('flex-col');
    expect(classes(node).has('flex-row')).toBe(false);
  });

  it('§1.1 — every arbitrary value traces to a --xen-* token; no literals anywhere', () => {
    const node = el(<ColumnV4 data-testid="col" gap="lg" align="center" justify="between" />);
    const arbitrary = node.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
    expect(node.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(node.outerHTML).not.toMatch(/\d+px/);
    expect(node.getAttribute('style')).toBeNull();
  });

  it('carries the V4 marker so a sheet or a spec can find it', () => {
    expect(el(<ColumnV4 data-testid="col" />).hasAttribute('data-xen-v4-column')).toBe(true);
    expect(el(<Column data-testid="col" />).hasAttribute('data-xen-v4-column')).toBe(false);
  });

  it('forwards the ref and merges className, and passes the rest of the div props through', () => {
    const ref = createRef<HTMLDivElement>();
    const node = el(
      <ColumnV4 ref={ref} data-testid="col" className="mt-lg" role="list" aria-label="Steps" />
    );
    expect(ref.current).toBe(node);
    expect(node.className).toContain('mt-lg');
    expect(node.className).toContain('flex-col');
    expect(node.getAttribute('role')).toBe('list');
    expect(node.getAttribute('aria-label')).toBe('Steps');
  });

  it('EMPTY STATE — with no children it is an empty box: no text, no ground, no edge', () => {
    const node = el(<ColumnV4 data-testid="col" gap="md" />);
    expect(node.childNodes).toHaveLength(0);
    expect(node.textContent).toBe('');
    expect(node.innerHTML).toBe('');
    // §4.5: nothing to show must never render a blank bordered box.
    expect(node.className).not.toMatch(/\bborder\b|\bbg-|\bshadow/);
  });

  it('EMPTY STATE — a falsy or empty child list renders just as empty, and never throws', () => {
    const steps: string[] = [];
    const node = el(
      <ColumnV4 data-testid="col" gap="lg">
        {steps.map((s) => (
          <span key={s}>{s}</span>
        ))}
        {null}
        {false}
      </ColumnV4>
    );
    expect(node.innerHTML).toBe('');
  });

  it('stacks its children in source order when it has some', () => {
    const node = el(
      <ColumnV4 data-testid="col" gap="xs">
        <span>Title</span>
        <span>Supporting</span>
      </ColumnV4>
    );
    expect(node.childNodes).toHaveLength(2);
    expect(node.textContent).toBe('TitleSupporting');
  });
});
