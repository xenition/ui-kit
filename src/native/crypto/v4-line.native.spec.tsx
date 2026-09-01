/**
 * The **V4 crypto line** (native) — the twin of `crypto/v4-line.spec.tsx`. The
 * amount pass is the same pure module, so the decimal finding is pinned once
 * and holds on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  amountValue,
  changeParts,
  sameAmount,
  sanitizeAmountText,
} from '../../crypto/amount-v4';
import { TokenRowV4 } from './TokenRowV4';
import { TxListV4 } from './TxListV4';
import { WalletCardV4 } from './WalletCardV4';

describe('amount-v4 — the typed draft', () => {
  it('keeps a half-typed decimal instead of eating it', () => {
    // The finding. `Number.parseFloat('1.')` is 1, so a number-controlled
    // field handed the parent `1`, re-rendered as "1", and the point vanished
    // from under the caret. Only whole token units could ever be entered.
    expect(sanitizeAmountText('1.')).toBe('1.');
    expect(sanitizeAmountText('0.2')).toBe('0.2');
    expect(sanitizeAmountText('0')).toBe('0');
    // One separator, digits only.
    expect(sanitizeAmountText('1.2.3')).toBe('1.23');
    expect(sanitizeAmountText('1a2')).toBe('12');
    expect(sanitizeAmountText('0.123456', 3)).toBe('0.123');
  });

  it('knows what a draft is worth, and when it is not yet a number', () => {
    expect(amountValue('0.25')).toBe(0.25);
    expect(amountValue('1.')).toBe(1);
    expect(amountValue('')).toBe(0);
    expect(amountValue('.')).toBe(0);
  });

  it('treats a draft and a committed number as the same amount', () => {
    // This is what stops the parent stamping on the user's half-typed value.
    expect(sameAmount('1.', 1)).toBe(true);
    expect(sameAmount('0.250', 0.25)).toBe(true);
    expect(sameAmount('', 0)).toBe(true);
    expect(sameAmount('2', 1)).toBe(false);
  });
});

describe('changeParts — direction is never colour alone, and never contradicts itself', () => {
  it('does not announce a loss as an increase', () => {
    // The base built `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}`
    // and `formatPct` re-applies a sign, so a loss read "down +3.20%".
    const down = changeParts(-3.2);
    expect(down.direction).toBe('down');
    expect(down.glyph).toBe('▼');
    expect(down.tone).toBe('danger');
  });

  it('does not call a flat change an increase', () => {
    // `>= 0` sent zero down the "up" branch while the glyph drawn beside it
    // was `•` and the tone was muted — the spoken direction contradicted the
    // drawn one.
    const flat = changeParts(0);
    expect(flat.direction).toBe('flat');
    expect(flat.word).toBe('unchanged');
    expect(flat.glyph).toBe('•');
    expect(flat.tone).toBe('neutral');
  });

  it('survives a bad payload', () => {
    expect(changeParts(undefined).direction).toBe('flat');
    expect(changeParts(Number.NaN).direction).toBe('flat');
  });

  it('takes the caller\'s words', () => {
    expect(changeParts(2, { up: 'gained' }).word).toBe('gained');
  });
});

describe('TxListV4 / TokenRowV4 / WalletCardV4', () => {
  it('tells a still-loading feed apart from an empty wallet', () => {
    const { getByLabelText } = renderThemed(
      <TxListV4 items={[]} loading loadingLabel="Loading transactions" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading transactions')).toBeTruthy();
  });

  it('renders a token row', () => {
    const { getByText } = renderThemed(
      <TokenRowV4 symbol="ETH" name="Ethereum" amount={1.5} valueCents={420000} changePct={-3.2} />,
      SEED_LIGHT
    );
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('renders a wallet card', () => {
    const { getByText } = renderThemed(
      <WalletCardV4 label="Main" address="0x1234567890abcdef" />,
      SEED_LIGHT
    );
    expect(getByText('Main')).toBeTruthy();
  });
});
