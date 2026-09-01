/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { Cluster, type ClusterProps } from './Cluster';
import { ClusterV4 } from './ClusterV4';
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

describe('ClusterV4 (web)', () => {
  it('STRUCTURE ONLY — with rowGap left off it paints exactly what the base paints', () => {
    const cases: ClusterProps[] = [
      {},
      { gap: 'md' },
      { align: 'baseline' },
      { justify: 'between' },
      { wrap: false },
      { gap: 'lg', align: 'start', justify: 'evenly', wrap: true },
    ];
    cases.forEach((props) => {
      const base = el(<Cluster {...props} />);
      const v4 = el(<ClusterV4 {...props} />);
      expect(classes(v4)).toEqual(classes(base));
    });
  });

  it('defaults to a wrapping, centred group at the chip gap (§4.1 spacing.sm)', () => {
    const node = el(<ClusterV4 />);
    const c = classes(node);
    expect(c.has('flex')).toBe(true);
    expect(c.has('flex-row')).toBe(true);
    expect(c.has('flex-wrap')).toBe(true);
    expect(c.has('items-center')).toBe(true);
    expect(c.has('justify-start')).toBe(true);
    // Unlike Row/Column, a cluster always pays a gap — chips touching is never
    // what the caller meant.
    expect(c.has('gap-[var(--xen-space-sm)]')).toBe(true);
  });

  it('binds gap to the spacing tokens for every key on the scale', () => {
    SPACE_KEYS.forEach((gap) => {
      expect(el(<ClusterV4 gap={gap} />).className).toContain(`gap-[var(--xen-space-${gap})]`);
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
      expect(classes(el(<ClusterV4 align={align} />)).has(alignClass[align])).toBe(true);
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
      expect(classes(el(<ClusterV4 justify={justify} />)).has(justifyClass[justify])).toBe(true);
    });
  });

  it('wrap can be turned off, and then it is a plain non-wrapping strip', () => {
    expect(classes(el(<ClusterV4 wrap={false} />)).has('flex-nowrap')).toBe(true);
    expect(classes(el(<ClusterV4 wrap />)).has('flex-wrap')).toBe(true);
  });

  it('NEW IN V4 — rowGap splits the axes into gap-x + gap-y, never gap plus an override', () => {
    const node = el(<ClusterV4 gap="sm" rowGap="md" />);
    const c = classes(node);
    expect(c.has('gap-x-[var(--xen-space-sm)]')).toBe(true);
    expect(c.has('gap-y-[var(--xen-space-md)]')).toBe(true);
    // Emitting the shorthand as well would leave which rule wins up to the
    // order Tailwind happens to emit its gap utilities in.
    expect(c.has('gap-[var(--xen-space-sm)]')).toBe(false);
  });

  it('NEW IN V4 — rowGap accepts every key on the scale, and only token values', () => {
    SPACE_KEYS.forEach((rowGap) => {
      const node = el(<ClusterV4 gap="xs" rowGap={rowGap} />);
      expect(node.className).toContain(`gap-y-[var(--xen-space-${rowGap})]`);
      expect(node.className).toContain('gap-x-[var(--xen-space-xs)]');
    });
  });

  it('rowGap is absent by default, so no cluster that exists today moves (§1.4)', () => {
    const node = el(<ClusterV4 gap="md" />);
    expect(node.className).toContain('gap-[var(--xen-space-md)]');
    expect(node.className).not.toMatch(/gap-x-|gap-y-/);
  });

  it('§1.1 — every arbitrary value traces to a --xen-* token; no literals anywhere', () => {
    const node = el(<ClusterV4 gap="sm" rowGap="lg" align="baseline" justify="between" />);
    const arbitrary = node.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
    expect(node.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(node.outerHTML).not.toMatch(/\d+px/);
    expect(node.getAttribute('style')).toBeNull();
  });

  it('carries the V4 marker so a sheet or a spec can find it', () => {
    expect(el(<ClusterV4 />).hasAttribute('data-xen-v4-cluster')).toBe(true);
    expect(el(<Cluster />).hasAttribute('data-xen-v4-cluster')).toBe(false);
  });

  it('forwards the ref and merges className, and passes the rest of the div props through', () => {
    const ref = createRef<HTMLDivElement>();
    const node = el(
      <ClusterV4 ref={ref} data-testid="cluster" className="mt-lg" role="group" aria-label="Tags" />
    );
    expect(ref.current).toBe(node);
    expect(node.className).toContain('mt-lg');
    expect(node.getAttribute('data-testid')).toBe('cluster');
    expect(node.getAttribute('role')).toBe('group');
    expect(node.getAttribute('aria-label')).toBe('Tags');
  });

  it('EMPTY STATE — no chips means an empty box: no text, no ground, no edge', () => {
    const node = el(<ClusterV4 rowGap="md" />);
    expect(node.childNodes).toHaveLength(0);
    expect(node.textContent).toBe('');
    expect(node.innerHTML).toBe('');
    // §4.5: nothing to show must never render a blank bordered box.
    expect(node.className).not.toMatch(/\bborder\b|\bbg-|\bshadow/);
  });

  it('EMPTY STATE — tags=[] renders just as empty, and never throws', () => {
    const tags: string[] = [];
    const node = el(
      <ClusterV4 gap="sm" rowGap="sm">
        {tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
        {null}
        {false}
      </ClusterV4>
    );
    expect(node.innerHTML).toBe('');
  });

  it('flows its chips in source order when it has some', () => {
    const node = el(
      <ClusterV4 rowGap="md">
        <span>New</span>
        <span>Sale</span>
        <span>Popular</span>
      </ClusterV4>
    );
    expect(node.childNodes).toHaveLength(3);
    expect(node.textContent).toBe('NewSalePopular');
  });
});
