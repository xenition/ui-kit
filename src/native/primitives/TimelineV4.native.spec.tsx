import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, SEED_BOTH, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { TimelineV4 } from './TimelineV4';

const ITEMS = [
  { time: '09:05', title: 'Order placed', description: 'by Ada' },
  { time: '11:42', title: 'Shipped', description: 'DHL', tone: 'success' as const },
  { time: '14:20', title: 'Delivered', tone: 'neutral' as const },
];

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

function hostStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

describe('TimelineV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('leads with the time, in tabular figures', () => {
    const { root, getByText } = renderThemed(<TimelineV4 items={ITEMS} />, SEED_LIGHT);
    const time = flat(getByText('09:05').props.style);
    expect(time.fontVariant).toEqual(['tabular-nums']);
    expect(time.color).toBe(theme.light.muted);

    // The time is the first line of the item's content column — the base put
    // it last, under the text it stamps.
    const content = root.findAll(
      (n) => typeof n.type === 'string' && flat(n.props?.style).paddingBottom !== undefined
    )[0];
    const lines = (content?.findAll((n) => typeof n.type === 'string' && n.type === 'Text') ?? [])
      .map((n) => n.children.filter((c) => typeof c === 'string').join(''))
      .filter((t) => t !== '');
    expect(lines).toEqual(['09:05', 'Order placed', 'by Ada']);
  });

  it('ranks the title above the description by size and weight', () => {
    const { getByText } = renderThemed(<TimelineV4 items={ITEMS} />, SEED_LIGHT);
    const title = flat(getByText('Order placed').props.style);
    const desc = flat(getByText('by Ada').props.style);
    expect(title.fontSize).toBe(theme.typography.scale.base);
    expect(title.fontWeight).toBe('600');
    expect(desc.fontSize).toBe(theme.typography.scale.xs);
    expect(desc.fontSize as number).toBeLessThan(title.fontSize as number);
  });

  it('runs the rail dot-to-dot: the padding is on the content, not the row', () => {
    const { root } = renderThemed(<TimelineV4 items={ITEMS} />, SEED_LIGHT);
    const rows = hostStyles(root).filter((s) => s.flexDirection === 'row');
    expect(rows).toHaveLength(3);
    rows.forEach((s) => expect(s.paddingBottom).toBeUndefined());

    const contents = hostStyles(root).filter((s) => s.paddingBottom !== undefined);
    expect(contents.map((s) => s.paddingBottom)).toEqual([
      theme.spacing.lg,
      theme.spacing.lg,
      0,
    ]);

    // The connector fills what is left, with no margin cutting it short.
    const connectors = hostStyles(root).filter((s) => s.width === 1);
    expect(connectors).toHaveLength(2);
    connectors.forEach((s) => {
      expect(s.flex).toBe(1);
      expect(s.marginTop).toBeUndefined();
      expect(s.backgroundColor).toBe(theme.light.border);
    });
  });

  it('sizes the dot from the spacing scale, not a literal', () => {
    const { root } = renderThemed(<TimelineV4 items={ITEMS} />, SEED_LIGHT);
    const dots = hostStyles(root).filter((s) => s.borderRadius === theme.radius.full);
    expect(dots).toHaveLength(3);
    dots.forEach((s) => {
      expect(s.width).toBe(theme.spacing.sm);
      expect(s.height).toBe(theme.spacing.sm);
      expect(s.marginTop).toBe(theme.spacing.xs);
    });
  });

  it('paints warn as warn and neutral as muted — the base pointed both elsewhere', () => {
    const { root } = renderThemed(
      <TimelineV4
        items={[
          { title: 'a', tone: 'warn' },
          { title: 'b', tone: 'neutral' },
        ]}
      />,
      SEED_LIGHT
    );
    const dots = hostStyles(root).filter((s) => s.borderRadius === theme.radius.full);
    // The base mapped warn → accent, which made native and web disagree.
    expect(dots[0]?.backgroundColor).toBe(theme.light.warn);
    expect(dots[0]?.backgroundColor).not.toBe(theme.light.accent);
    // …and neutral → border, a hairline colour that vanishes as a disc.
    expect(dots[1]?.backgroundColor).toBe(theme.light.muted);
    expect(dots[1]?.backgroundColor).not.toBe(theme.light.border);
  });

  it('resolves every dot per scheme', () => {
    const both = compileTheme(SEED_BOTH);
    const dotFor = (scheme: 'light' | 'dark'): unknown =>
      hostStyles(
        renderThemed(<TimelineV4 items={[{ title: 'a', tone: 'neutral' }]} />, SEED_BOTH, scheme)
          .root
      ).filter((s) => s.borderRadius === both.radius.full)[0]?.backgroundColor;
    expect(dotFor('light')).toBe(both.light.muted);
    expect(dotFor('dark')).toBe(both.dark.muted);
    expect(dotFor('light')).not.toBe(dotFor('dark'));
  });

  it('wraps no entry in a card and lifts nothing — §11, §8', () => {
    const { root } = renderThemed(<TimelineV4 items={ITEMS} />, SEED_LIGHT);
    hostStyles(root).forEach((s) => {
      expect(s.borderWidth).toBeUndefined();
      expect(s.shadowOpacity).toBeUndefined();
      expect(s.elevation).toBeUndefined();
    });
  });

  it('renders without a time or a description', () => {
    const { getByText } = renderThemed(<TimelineV4 items={[{ title: 'Only' }]} />, SEED_LIGHT);
    expect(getByText('Only')).toBeTruthy();
  });
});
