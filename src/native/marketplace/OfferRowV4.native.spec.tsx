import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { OfferRowV4 } from './OfferRowV4';

const theme = compileTheme(SEED_LIGHT);
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

/** The inner row — the only node carrying the family's min-height. */
function rowBox(root: ReactTestInstance): Record<string, unknown> {
  const node = root
    .findAll((n) => typeof n.props?.style === 'object' && n.props?.style !== null)
    .map((n) => flat(n.props.style))
    .find((s) => s.minHeight === ONE_LINE || s.minHeight === TWO_LINE);
  return node ?? {};
}

describe('OfferRowV4 (native) — props', () => {
  it('keeps every base prop working and fires all three answers', () => {
    const onAccept = jest.fn();
    const onCounter = jest.fn();
    const onDecline = jest.fn();
    const { getByText } = renderThemed(
      <OfferRowV4
        party="Grace"
        amountCents={9900}
        timeLabel="2h ago"
        note="Would you take this?"
        onAccept={onAccept}
        onCounter={onCounter}
        onDecline={onDecline}
      />,
      SEED_LIGHT
    );
    expect(getByText('Grace')).toBeTruthy();
    expect(getByText('$99.00')).toBeTruthy();
    expect(getByText('2h ago')).toBeTruthy();
    expect(getByText('Would you take this?')).toBeTruthy();

    fireEvent.press(getByText('Accept'));
    fireEvent.press(getByText('Counter'));
    fireEvent.press(getByText('Decline'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onCounter).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('hides the actions unless the offer is still pending', () => {
    const { queryByText } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={9900} status="accepted" onAccept={jest.fn()} />,
      SEED_LIGHT
    );
    expect(queryByText('Accept')).toBeNull();
  });

  it('showAvatar (new) drops the monogram', () => {
    const withAvatar = renderThemed(<OfferRowV4 party="Grace" amountCents={100} />, SEED_LIGHT);
    expect(withAvatar.queryByText('G')).toBeTruthy();

    const without = renderThemed(
      <OfferRowV4 party="Grace" amountCents={100} showAvatar={false} />,
      SEED_LIGHT
    );
    expect(without.queryByText('G')).toBeNull();
  });
});

describe('OfferRowV4 (native) — the design line', () => {
  it('sets the money in tabular figures through formatMoney', () => {
    const { getByText } = renderThemed(<OfferRowV4 party="Grace" amountCents={120450} />, SEED_LIGHT);
    expect(flat(getByText('$1,204.50').props.style).fontVariant).toEqual(['tabular-nums']);
  });

  it('takes the row metric and no card of its own', () => {
    const one = renderThemed(<OfferRowV4 party="Grace" amountCents={100} />, SEED_LIGHT);
    const oneBox = rowBox(one.UNSAFE_root);
    expect(oneBox.minHeight).toBe(ONE_LINE);
    expect(oneBox.paddingHorizontal).toBe(theme.spacing.md);
    expect(oneBox.backgroundColor).toBe('transparent');

    const two = renderThemed(
      <OfferRowV4 party="Grace" amountCents={100} timeLabel="2h ago" />,
      SEED_LIGHT
    );
    expect(rowBox(two.UNSAFE_root).minHeight).toBe(TWO_LINE);
  });

  it('gives every status a glyph and a word, never a tone alone (rule 6)', () => {
    const cases = [
      { status: 'pending', glyph: resolveIconGlyph('clock'), word: 'Pending' },
      { status: 'accepted', glyph: resolveIconGlyph('check'), word: 'Accepted' },
      { status: 'declined', glyph: resolveIconGlyph('close'), word: 'Declined' },
      { status: 'countered', glyph: resolveIconGlyph('refresh'), word: 'Countered' },
      { status: 'expired', glyph: resolveIconGlyph('error'), word: 'Expired' },
    ] as const;
    cases.forEach(({ status, glyph, word }) => {
      const { getByText } = renderThemed(
        <OfferRowV4 party="Grace" amountCents={100} status={status} />,
        SEED_LIGHT
      );
      // The mark is drawn but hidden from the a11y tree — the word beside it is
      // what gets spoken, which is exactly what rule 6 asks for.
      expect(getByText(glyph, { includeHiddenElements: true })).toBeTruthy();
      expect(getByText(word)).toBeTruthy();
    });
  });

  it('does not spend warn on an offer that is merely waiting (rule 3)', () => {
    const { getByText } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={100} status="pending" />,
      SEED_LIGHT
    );
    expect(flat(getByText('Pending').props.style).color).not.toBe(theme.light.warn);
    expect(flat(getByText('Pending').props.style).color).not.toBe(theme.light.warnText);
  });
});

describe('OfferRowV4 (native) — the empty case and the label', () => {
  it('renders nothing for an offer with no party', () => {
    const { toJSON } = renderThemed(<OfferRowV4 party="  " amountCents={9900} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('survives having no time, no note and no actions', () => {
    const { getByText, queryByText } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={9900} />,
      SEED_LIGHT
    );
    expect(getByText('Grace')).toBeTruthy();
    expect(queryByText('Accept')).toBeNull();
  });

  it('announces the party, the status and the amount as one thing', () => {
    const { getByLabelText } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={9900} status="countered" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Grace, Countered, $99.00')).toBeTruthy();
  });
});
