import * as React from 'react';
import { Pressable } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  SEED_BOTH,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle, type FlatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { FilterChipsV4 } from './FilterChipsV4';

const THEME = compileTheme(SEED_LIGHT);
const OPTIONS = ['All', 'Open', 'Closed'];

/** The chip `Pressable`s themselves, in source order. */
function chips(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(Pressable);
}

/**
 * The scroller's `contentContainerStyle`, flattened.
 *
 * It is a separate prop from `style`, so the generic style sweep below cannot
 * see it — and it is where a horizontal strip's gap and trailing pad live.
 */
function contentStyle(root: ReactTestInstance): FlatStyle {
  const scroller = root.findAll(
    (node) => node.props?.contentContainerStyle !== undefined
  )[0];
  expect(scroller).toBeDefined();
  return flatStyle(scroller?.props.contentContainerStyle);
}

/** One chip's style at rest, or under a press. */
function chipStyle(chip: ReactTestInstance, pressed = false): FlatStyle {
  return flatStyle((chip.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
}

/** Every node's flattened style, so a container can be found by what it does. */
function styles(root: ReactTestInstance): FlatStyle[] {
  return root.findAll(() => true).map((node) => flatStyle(node.props?.style));
}

describe('FilterChipsV4 (native)', () => {
  // ---------------------------------------------------------------- props --

  it('takes options as bare strings or as {value,label} objects', () => {
    const { getByText, queryByText } = renderThemed(
      <FilterChipsV4
        options={['solo', { value: 'pair', label: 'A pair' }]}
        selected=""
        onChange={() => {}}
      />,
      SEED_LIGHT
    );
    expect(getByText('solo')).toBeTruthy();
    expect(getByText('A pair')).toBeTruthy();
    // The value is never what the user reads.
    expect(queryByText('pair')).toBeNull();
  });

  it('announces the selection through accessibilityState, single or multi', () => {
    const single = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(
      chips(single.root).map((c) => (c.props.accessibilityState as { selected: boolean }).selected)
    ).toEqual([false, true, false]);

    const many = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected={['All', 'Closed']} multi onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(
      chips(many.root).map((c) => (c.props.accessibilityState as { selected: boolean }).selected)
    ).toEqual([true, false, true]);
  });

  it('keeps the base contract: a selected chip deselects, and single-select clears to ""', () => {
    const seen: Array<string | string[]> = [];
    const { getByText } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={(next) => seen.push(next)} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Closed'));
    fireEvent.press(getByText('Open'));
    expect(seen).toEqual(['Closed', '']);
  });

  it('multi adds and removes without disturbing the rest of the selection', () => {
    const seen: Array<string | string[]> = [];
    const { getByText } = renderThemed(
      <FilterChipsV4
        options={OPTIONS}
        selected={['All']}
        multi
        onChange={(next) => seen.push(next)}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open'));
    fireEvent.press(getByText('All'));
    expect(seen).toEqual([['All', 'Open'], []]);
  });

  // ----------------------------------------------------- chips WRAP (§7) --

  it('WRAPS by default — no scroller at all, so no option can be clipped', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />,
      SEED_LIGHT
    );
    // §7: "Chips wrap. Never a horizontal scroll that clips the last option —
    // a user cannot choose what they cannot see."
    const wrapping = styles(root).filter((s) => s.flexWrap === 'wrap');
    expect(wrapping.length).toBeGreaterThan(0);
    expect(wrapping[0]?.flexDirection).toBe('row');
    // §4.1's chip gap.
    expect(wrapping[0]?.gap).toBe(THEME.spacing.sm);
    expect(root.findAll((n) => n.props?.horizontal === true)).toHaveLength(0);
  });

  it('every option is rendered — wrapping means the count is the option count', () => {
    const many = Array.from({ length: 12 }, (_, i) => `Filter ${i}`);
    const { root, getByText } = renderThemed(
      <FilterChipsV4 options={many} selected="" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(chips(root)).toHaveLength(12);
    expect(getByText('Filter 11')).toBeTruthy();
  });

  it('scroll is opt-in, and even then it pays a trailing pad so the tail is reachable', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} scroll />,
      SEED_LIGHT
    );
    expect(root.findAll((n) => n.props?.horizontal === true).length).toBeGreaterThan(0);
    const content = contentStyle(root);
    expect(content.paddingEnd).toBe(THEME.spacing.md);
    expect(content.gap).toBe(THEME.spacing.sm);
  });

  it('bleed pairs the scroller with BleedV4 edge="end" — one edge, and no vertical pull', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} scroll bleed="lg" />,
      SEED_LIGHT
    );
    const bleed = styles(root).find((s) => s.marginEnd !== undefined);
    expect(bleed?.marginEnd).toBe(-THEME.spacing.lg);
    // The trailing edge only: the first chip stays on the page gutter.
    expect(bleed?.marginStart).toBeUndefined();
    expect(bleed?.marginHorizontal).toBeUndefined();
    // A chip strip escapes one HORIZONTAL edge; the vertical bleed is zeroed.
    expect(bleed?.marginVertical).toBe(0);
    // The pad inside now matches the gutter being escaped.
    expect(contentStyle(root).paddingEnd).toBe(THEME.spacing.lg);
  });

  it('bleed is ignored without scroll — a wrapping strip has no edge to escape', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} bleed="lg" />,
      SEED_LIGHT
    );
    expect(styles(root).find((s) => s.marginEnd !== undefined)).toBeUndefined();
    expect(styles(root).some((s) => s.flexWrap === 'wrap')).toBe(true);
  });

  // ------------------------------------------------------------ the floor --

  it('every chip clears the 44 tap floor, composed from the scale and never typed', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />,
      SEED_LIGHT
    );
    // 2xl (48) - xs (4) = 44, composed rather than remembered.
    const floor = THEME.spacing['2xl'] - THEME.spacing.xs;
    expect(floor).toBe(44);
    chips(root).forEach((chip) => {
      expect(chipStyle(chip).minHeight).toBe(floor);
      // Not the 48 field metric — a chip is control-shaped but not a field.
      expect(chipStyle(chip).minHeight).not.toBe(THEME.spacing['2xl']);
      expect(chipStyle(chip).alignItems).toBe('center');
      expect(chipStyle(chip).justifyContent).toBe('center');
    });
  });

  // --------------------------------------------- selected vs. unselected --

  it('selected = primary fill + onPrimary label at semibold', () => {
    const { root, getByText } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />,
      SEED_LIGHT
    );
    const active = chipStyle(chips(root)[1] as ReactTestInstance);
    expect(active.backgroundColor).toBe(THEME.light.primary);
    expect(active.borderColor).toBe(THEME.light.primary);
    const label = flatStyle(getByText('Open').props.style);
    expect(label.color).toBe(THEME.light.onPrimary);
    expect(label.fontWeight).toBe('600');
  });

  it('unselected = the card ground under a border hairline, never the muted FILL', () => {
    const { root, getByText } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />,
      SEED_LIGHT
    );
    const idle = chipStyle(chips(root)[0] as ReactTestInstance);
    // §4.2 — the card slot, not the page ground the base painted.
    expect(idle.backgroundColor).toBe(THEME.light.card);
    expect(idle.backgroundColor).not.toBe(THEME.light.surface);
    expect(idle.borderColor).toBe(THEME.light.border);
    expect(idle.borderWidth).toBe(1);
    const label = flatStyle(getByText('All').props.style);
    expect(label.color).toBe(THEME.light.onCard);
    // `muted` is a FILL; text never takes it.
    expect(label.color).not.toBe(THEME.light.muted);
  });

  it('both states are the same pill: radius.full from the token', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="All" onChange={() => {}} />,
      SEED_LIGHT
    );
    chips(root).forEach((chip) => {
      expect(chipStyle(chip).borderRadius).toBe(THEME.radius.full);
    });
  });

  // -------------------------------------------------- state, not opacity --

  it('press is the STATE LAYER over the chip’s own fill — never an opacity dim', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} />,
      SEED_LIGHT
    );
    const idle = chips(root)[0] as ReactTestInstance;
    const active = chips(root)[1] as ReactTestInstance;

    expect(chipStyle(idle, true).backgroundColor).toBe(
      mixToken(THEME.light.card, THEME.light.onCard, V4_STATE.pressed)
    );
    expect(chipStyle(active, true).backgroundColor).toBe(
      mixToken(THEME.light.primary, THEME.light.onPrimary, V4_STATE.pressed)
    );
    // The base carried `opacity: pressed ? 0.8 : 1`, which fades the LABEL —
    // the signal M3 spends 0.38 on to mean disabled.
    [idle, active].forEach((chip) => {
      expect(chipStyle(chip, true).opacity).toBeUndefined();
      expect(chipStyle(chip, false).opacity).toBeUndefined();
    });
  });

  it('the layer is re-derived per scheme, not a fixed neutral', () => {
    const both = compileTheme(SEED_BOTH);
    const pressedIn = (scheme: 'light' | 'dark'): unknown => {
      const { root } = renderThemed(
        <FilterChipsV4 options={OPTIONS} selected="" onChange={() => {}} />,
        SEED_BOTH,
        scheme
      );
      return chipStyle(chips(root)[0] as ReactTestInstance, true).backgroundColor;
    };
    expect(pressedIn('light')).toBe(
      mixToken(both.light.card, both.light.onCard, V4_STATE.pressed)
    );
    expect(pressedIn('dark')).toBe(mixToken(both.dark.card, both.dark.onCard, V4_STATE.pressed));
    // The wrong reach: ramps.neutral[50] is a near-white in BOTH schemes.
    expect(pressedIn('dark')).not.toBe(both.ramps.neutral[50]);
  });

  // ------------------------------------------------------------- purity --

  it('§1.1 — every colour it paints traces to a token, and no size is typed', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected="Open" onChange={() => {}} scroll bleed="lg" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

    const spacings = new Set(Object.values(THEME.spacing));
    chips(root).forEach((chip) => {
      const style = chipStyle(chip);
      expect(spacings.has(style.paddingHorizontal as number)).toBe(true);
      expect(style.borderRadius).toBe(THEME.radius.full);
    });
  });

  // -------------------------------------------------------- empty state --

  it('EMPTY STATE — options: [] renders nothing at all, not a blank bordered box', () => {
    const { toJSON } = renderThemed(
      <FilterChipsV4 options={[]} selected="" onChange={() => {}} />,
      SEED_LIGHT
    );
    // Not an empty flex box, not a bordered shell — nothing (§4.5).
    expect(toJSON()).toBeNull();
  });

  it('EMPTY STATE — an empty scroll strip draws neither a scroller nor a bleed', () => {
    const { toJSON } = renderThemed(
      <FilterChipsV4 options={[]} selected="" onChange={() => {}} scroll bleed="lg" />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('EMPTY STATE — an empty multi selection still renders every option, none selected', () => {
    const { root } = renderThemed(
      <FilterChipsV4 options={OPTIONS} selected={[]} multi onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(chips(root)).toHaveLength(3);
    chips(root).forEach((chip) =>
      expect((chip.props.accessibilityState as { selected: boolean }).selected).toBe(false)
    );
  });

  // ---------------------------------------------------------- plumbing --

  it('passes the caller’s style through to the strip, in both modes', () => {
    const wrapped = renderThemed(
      <FilterChipsV4
        options={OPTIONS}
        selected=""
        onChange={() => {}}
        style={{ marginTop: 12 }}
      />,
      SEED_LIGHT
    );
    expect(styles(wrapped.root).some((s) => s.marginTop === 12)).toBe(true);

    const scrolled = renderThemed(
      <FilterChipsV4
        options={OPTIONS}
        selected=""
        onChange={() => {}}
        scroll
        style={{ marginTop: 12 }}
      />,
      SEED_LIGHT
    );
    expect(styles(scrolled.root).some((s) => s.marginTop === 12)).toBe(true);
  });
});
