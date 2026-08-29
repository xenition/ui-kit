/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { Flex, type FlexDirection, type FlexProps } from './Flex';
import { FlexV4 } from './FlexV4';
import type { Align, Justify, SpaceKey } from './_tokens';

const SPACE_KEYS: SpaceKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: Align[] = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES: Justify[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
const DIRECTIONS: FlexDirection[] = ['row', 'column', 'row-reverse', 'column-reverse'];

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

describe('FlexV4 (web)', () => {
  it('STRUCTURE ONLY — with shrink left off it paints exactly what the base paints', () => {
    // §5 marks Flex "structure only" apart from the added `shrink`; asserted
    // against the base rather than promised in a comment.
    const cases: FlexProps[] = [
      {},
      { direction: 'column' },
      { gap: 'md' },
      { align: 'baseline' },
      { justify: 'between' },
      { wrap: true },
      { grow: 1 },
      { direction: 'row-reverse', gap: 'xl', align: 'end', justify: 'evenly', wrap: true, grow: 2 },
    ];
    cases.forEach((props) => {
      const base = el(<Flex {...props} />);
      const v4 = el(<FlexV4 {...props} />);
      expect(classes(v4)).toEqual(classes(base));
      expect(v4.getAttribute('style')).toBe(base.getAttribute('style'));
    });
  });

  it('defaults to a stretched, non-wrapping row that starts its content — and pays no gap', () => {
    const node = el(<FlexV4 />);
    const c = classes(node);
    expect(c.has('flex')).toBe(true);
    expect(c.has('flex-row')).toBe(true);
    expect(c.has('items-stretch')).toBe(true);
    expect(c.has('justify-start')).toBe(true);
    expect(c.has('flex-nowrap')).toBe(true);
    expect(node.className).not.toMatch(/gap-/);
    // No flex factors unless asked for: the CSS initial values stand.
    expect(node.getAttribute('style')).toBeNull();
  });

  it('maps every direction the type offers', () => {
    const expected: Record<FlexDirection, string> = {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    };
    DIRECTIONS.forEach((direction) => {
      expect(classes(el(<FlexV4 direction={direction} />)).has(expected[direction])).toBe(true);
    });
  });

  it('binds gap to the spacing tokens for every key on the scale', () => {
    SPACE_KEYS.forEach((gap) => {
      expect(el(<FlexV4 gap={gap} />).className).toContain(`gap-[var(--xen-space-${gap})]`);
    });
  });

  it('maps align (baseline included) and justify across both vocabularies', () => {
    const alignClass: Record<Align, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };
    ALIGNS.forEach((align) => {
      expect(classes(el(<FlexV4 align={align} />)).has(alignClass[align])).toBe(true);
    });

    const justifyClass: Record<Justify, string> = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    JUSTIFIES.forEach((justify) => {
      expect(classes(el(<FlexV4 justify={justify} />)).has(justifyClass[justify])).toBe(true);
    });
  });

  it('wrap toggles between flex-wrap and an explicit flex-nowrap', () => {
    expect(classes(el(<FlexV4 wrap />)).has('flex-wrap')).toBe(true);
    expect(classes(el(<FlexV4 wrap={false} />)).has('flex-nowrap')).toBe(true);
  });

  it('NEW IN V4 — shrink sets flexShrink, the missing half of grow (§5)', () => {
    // The case §4.3 needs: a slot that holds its size while the title beside it
    // absorbs the overflow.
    expect(el(<FlexV4 shrink={0} />).style.flexShrink).toBe('0');
    expect(el(<FlexV4 shrink={2} />).style.flexShrink).toBe('2');
    // Absent by default, so nothing that exists today moves (§1.4).
    expect(el(<FlexV4 />).style.flexShrink).toBe('');
    expect(el(<FlexV4 grow={1} />).style.flexShrink).toBe('');
  });

  it('grow and shrink coexist, and the caller style still wins over both', () => {
    const both = el(<FlexV4 grow={1} shrink={0} />);
    expect(both.style.flexGrow).toBe('1');
    expect(both.style.flexShrink).toBe('0');

    // The base merges the caller's style last; V4 keeps that order.
    const overridden = el(<FlexV4 grow={1} shrink={0} style={{ flexShrink: 3, flexGrow: 4 }} />);
    expect(overridden.style.flexShrink).toBe('3');
    expect(overridden.style.flexGrow).toBe('4');
  });

  it('keeps an unrelated caller style even when no flex factor is set', () => {
    const node = el(<FlexV4 style={{ order: 2 }} />);
    expect(node.style.order).toBe('2');
    expect(node.style.flexShrink).toBe('');
  });

  it('§1.1 — flex factors are the only bare numbers; every arbitrary class is a token', () => {
    const node = el(<FlexV4 gap="lg" align="baseline" justify="between" wrap grow={1} shrink={0} />);
    const arbitrary = node.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
    expect(node.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // No literal measurement reached the DOM — the inline style is ratios only.
    expect(node.getAttribute('style')).not.toMatch(/\d+(px|rem|em|%)/);
  });

  it('carries the V4 marker so a sheet or a spec can find it', () => {
    expect(el(<FlexV4 />).hasAttribute('data-xen-v4-flex')).toBe(true);
    expect(el(<Flex />).hasAttribute('data-xen-v4-flex')).toBe(false);
  });

  it('forwards the ref and merges className, and passes the rest of the div props through', () => {
    const ref = createRef<HTMLDivElement>();
    const node = el(
      <FlexV4 ref={ref} data-testid="flex" className="mt-lg" role="group" aria-label="Filters" />
    );
    expect(ref.current).toBe(node);
    expect(node.className).toContain('mt-lg');
    expect(node.getAttribute('data-testid')).toBe('flex');
    expect(node.getAttribute('role')).toBe('group');
    expect(node.getAttribute('aria-label')).toBe('Filters');
  });

  it('EMPTY STATE — with no children it is an empty box: no text, no ground, no edge', () => {
    const node = el(<FlexV4 gap="md" grow={1} shrink={0} />);
    expect(node.childNodes).toHaveLength(0);
    expect(node.textContent).toBe('');
    expect(node.innerHTML).toBe('');
    // §4.5: nothing to show must never render a blank bordered box.
    expect(node.className).not.toMatch(/\bborder\b|\bbg-|\bshadow/);
  });

  it('EMPTY STATE — a falsy or empty child list renders just as empty, and never throws', () => {
    const actions: string[] = [];
    const node = el(
      <FlexV4 gap="sm" shrink={0}>
        {actions.map((a) => (
          <span key={a}>{a}</span>
        ))}
        {null}
        {false}
      </FlexV4>
    );
    expect(node.innerHTML).toBe('');
  });

  it('lays its children out in source order when it has some', () => {
    const node = el(
      <FlexV4 direction="column" gap="sm">
        <span>One</span>
        <span>Two</span>
      </FlexV4>
    );
    expect(node.childNodes).toHaveLength(2);
    expect(node.textContent).toBe('OneTwo');
  });
});
