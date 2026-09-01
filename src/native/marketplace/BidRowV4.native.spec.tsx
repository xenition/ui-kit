import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { BidRowV4 } from './BidRowV4';

const theme = compileTheme(SEED_LIGHT);

/** The one-line and two-line floors, composed the way the row module composes them. */
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;

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

/** The row's own box — the node carrying the accessible name. */
function rowStyle(root: ReactTestInstance, label: string): Record<string, unknown> {
  return flat(root.findAll((n) => n.props?.accessibilityLabel === label)[0]?.props?.style);
}

describe('BidRowV4 (native) — props', () => {
  it('keeps every base prop working', () => {
    const { getByText } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={4500} timeLabel="1m ago" rank={1} />,
      SEED_LIGHT
    );
    expect(getByText('Ada')).toBeTruthy();
    expect(getByText('$45.00')).toBeTruthy();
    expect(getByText('1m ago')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('renders "You" for the current user', () => {
    const { getByText } = renderThemed(
      <BidRowV4 bidder="b***7" amountCents={100} isYou />,
      SEED_LIGHT
    );
    expect(getByText('You')).toBeTruthy();
  });

  it('showAvatar (new) drops the monogram without losing the row', () => {
    const withAvatar = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} />, SEED_LIGHT);
    expect(withAvatar.queryByText('A')).toBeTruthy();

    const without = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={100} showAvatar={false} />,
      SEED_LIGHT
    );
    expect(without.queryByText('A')).toBeNull();
    expect(without.getByText('Ada')).toBeTruthy();
  });

  it('a rank wins the leading slot over the avatar — one slot, one thing', () => {
    const { getByText, queryByText } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={100} rank={3} />,
      SEED_LIGHT
    );
    expect(getByText('3')).toBeTruthy();
    expect(queryByText('A')).toBeNull();
  });
});

describe('BidRowV4 (native) — the design line', () => {
  it('sets the money in tabular figures (rule 2) through formatMoney (rule 1)', () => {
    const { getByText } = renderThemed(<BidRowV4 bidder="Ada" amountCents={120450} />, SEED_LIGHT);
    const amount = getByText('$1,204.50');
    expect(flat(amount.props.style).fontVariant).toEqual(['tabular-nums']);
  });

  it('takes the row metric, not a card of its own', () => {
    const one = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} />, SEED_LIGHT);
    const oneStyle = rowStyle(one.UNSAFE_root, 'Ada, $1.00');
    expect(oneStyle.minHeight).toBe(ONE_LINE);
    expect(oneStyle.paddingHorizontal).toBe(theme.spacing.md);
    expect(oneStyle.backgroundColor).toBe('transparent');
    // No border, no radius — the container owns the card.
    expect(oneStyle.borderWidth).toBeUndefined();
    expect(oneStyle.borderRadius).toBeUndefined();

    const two = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={100} timeLabel="1m ago" />,
      SEED_LIGHT
    );
    expect(rowStyle(two.UNSAFE_root, 'Ada, $1.00').minHeight).toBe(TWO_LINE);
  });

  it('marks the leading bid with the selected ground, never the success tone (rule 3)', () => {
    const { UNSAFE_root, getByText } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={4500} leading />,
      SEED_LIGHT
    );
    expect(getByText('Leading')).toBeTruthy();
    const style = rowStyle(UNSAFE_root, 'Leading bid, Ada, $45.00');
    expect(style.backgroundColor).toBe(theme.light.selected);
    expect(style.backgroundColor).not.toBe(theme.light.success);
    // Nothing in the row is painted with the success slot.
    expect(renderedStyleHexes(UNSAFE_root)).not.toContain(theme.light.success.toLowerCase());
  });

  it('paints only colours that exist in the compiled theme', () => {
    // Scoped to what this file draws: `BadgeV4` and `AvatarV4` composite their
    // own grounds with `mixToken`, and a mix of two tokens is not itself a
    // token — asserting over them would be asserting about them.
    const { UNSAFE_root } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={4500} rank={1} timeLabel="1m ago" showAvatar={false} />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(UNSAFE_root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('BidRowV4 (native) — the empty case and the label', () => {
  it('renders nothing when there is no one to attribute the bid to', () => {
    const { toJSON } = renderThemed(<BidRowV4 bidder="" amountCents={4500} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it("still renders for an empty bidder when the bid is the user's own", () => {
    const { getByText } = renderThemed(<BidRowV4 bidder="" amountCents={4500} isYou />, SEED_LIGHT);
    expect(getByText('You')).toBeTruthy();
  });

  it('announces the bidder and the amount as one thing', () => {
    const plain = renderThemed(<BidRowV4 bidder="Ada" amountCents={4500} />, SEED_LIGHT);
    expect(plain.getByLabelText('Ada, $45.00')).toBeTruthy();

    const top = renderThemed(<BidRowV4 bidder="Ada" amountCents={4500} leading />, SEED_LIGHT);
    expect(top.getByLabelText('Leading bid, Ada, $45.00')).toBeTruthy();
  });
});
