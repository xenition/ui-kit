/**
 * Alternate crypto designs (v2 / v3) — the drop-in redesigns of the four
 * most-used native crypto blocks (WalletCard, TokenRow, NFTCard,
 * PortfolioSummary). Each variant keeps the base component's exact props, so
 * these specs prove they (a) mount, (b) stay token-pure under BOTH seeds (no
 * hardcoded hex — every color traces to a compiled token), and (c) remain
 * interactive where the base was.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { WalletCardV2 } from './WalletCardV2';
import { WalletCardV3 } from './WalletCardV3';
import { TokenRowV2 } from './TokenRowV2';
import { TokenRowV3 } from './TokenRowV3';
import { NFTCardV2 } from './NFTCardV2';
import { NFTCardV3 } from './NFTCardV3';
import { PortfolioSummaryV2 } from './PortfolioSummaryV2';
import { PortfolioSummaryV3 } from './PortfolioSummaryV3';

const ADDR = '0x1234abcd5678ef901234abcd5678ef9012349999';

describe('WalletCard alternates (native)', () => {
  it('V2 renders a gradient face with balance + custody badge and copies the full address', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WalletCardV2
        address={ADDR}
        label="Main Wallet"
        balanceCents={482355}
        nativeAmount={1.245}
        nativeSymbol="ETH"
        kind="hot"
        onCopy={onCopy}
      />,
      SEED_LIGHT
    );
    expect(getByText('Main Wallet')).toBeTruthy();
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByText('Hot')).toBeTruthy();
    fireEvent.press(getByLabelText(`Copy address ${ADDR}`));
    expect(onCopy).toHaveBeenCalledWith(ADDR);
  });

  it('V3 renders a minimal row with a copyable address chip and honors loading', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WalletCardV3 address={ADDR} label="Cold Store" balanceCents={90000} kind="hardware" onCopy={onCopy} />,
      SEED_DARK
    );
    expect(getByText('Cold Store')).toBeTruthy();
    expect(getByText('$900.00')).toBeTruthy();
    fireEvent.press(getByLabelText(`Copy address ${ADDR}`));
    expect(onCopy).toHaveBeenCalledWith(ADDR);

    const loading = renderThemed(<WalletCardV3 address={ADDR} loading />, SEED_LIGHT);
    expect(loading.getByLabelText('Loading balance')).toBeTruthy();
  });
});

describe('TokenRow alternates (native)', () => {
  it('V2 renders a card with a sparkline + toned change and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TokenRowV2 symbol="ETH" name="Ethereum" amount={1.245} valueCents={482355} changePct={2.4} icon="⧫" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('ETH')).toBeTruthy();
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByLabelText('ETH trend')).toBeTruthy();
    fireEvent.press(getByLabelText('ETH holding'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with amount + change and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TokenRowV3 symbol="BTC" amount={0.5} changePct={-1.1} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('0.5 BTC')).toBeTruthy();
    fireEvent.press(getByLabelText('BTC holding'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('NFTCard alternates (native)', () => {
  it('V2 renders a full-bleed scrim tile and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <NFTCardV2
        name="Punk #4231"
        collection="CryptoPunks"
        image="https://example.com/a.png"
        floorAmount={12.4}
        floorSymbol="ETH"
        network="Ethereum"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Punk #4231')).toBeTruthy();
    expect(getByText('Floor')).toBeTruthy();
    fireEvent.press(getByLabelText('Punk #4231, CryptoPunks'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a grid tile with a bottom strip and shows a no-image placeholder', () => {
    const { getByText } = renderThemed(
      <NFTCardV3 name="Bored Ape #99" collection="BAYC" floorAmount={30} floorSymbol="ETH" />,
      SEED_DARK
    );
    expect(getByText('Bored Ape #99')).toBeTruthy();
    expect(getByText('No image')).toBeTruthy();
  });
});

describe('PortfolioSummary alternates (native)', () => {
  const ALLOC = [
    { label: 'ETH', value: 60 },
    { label: 'BTC', value: 30 },
    { label: 'USDC', value: 10 },
  ];

  it('V2 renders a hero total with a donut + share legend', () => {
    const { getByText } = renderThemed(
      <PortfolioSummaryV2 totalCents={1250000} changeCents={24000} changePct={1.9} allocations={ALLOC} />,
      SEED_LIGHT
    );
    expect(getByText('$12,500.00')).toBeTruthy();
    expect(getByText('60.0%')).toBeTruthy();
  });

  it('V3 renders a minimal total with a compact allocation bar; guards empty', () => {
    const { getByText, getByLabelText } = renderThemed(
      <PortfolioSummaryV3 totalCents={1250000} changePct={-0.8} allocations={ALLOC} />,
      SEED_DARK
    );
    expect(getByText('$12,500.00')).toBeTruthy();
    expect(getByLabelText('Allocation across 3 assets')).toBeTruthy();

    const empty = renderThemed(<PortfolioSummaryV3 totalCents={0} />, SEED_LIGHT);
    expect(empty.getByText('$0.00')).toBeTruthy();
  });
});

describe('token purity — crypto alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <WalletCardV2 address={ADDR} label="Main" balanceCents={482355} nativeAmount={1.24} nativeSymbol="ETH" kind="hot" onCopy={() => {}} />
          <WalletCardV2 address={ADDR} label="Watch" balanceCents={1000} kind="watch" />
          <WalletCardV3 address={ADDR} label="Cold" balanceCents={90000} kind="hardware" nativeAmount={2} nativeSymbol="ETH" onCopy={() => {}} />
          <TokenRowV2 symbol="ETH" name="Ethereum" amount={1.24} valueCents={482355} changePct={2.4} icon="⧫" onPress={() => {}} />
          <TokenRowV2 symbol="SOL" name="Solana" amount={12} valueCents={9800} changePct={-3.1} />
          <TokenRowV3 symbol="BTC" amount={0.5} changePct={-1.1} onPress={() => {}} />
          <NFTCardV2 name="Punk #1" collection="CryptoPunks" image="https://x/a.png" floorAmount={12.4} floorSymbol="ETH" network="Ethereum" onPress={() => {}} />
          <NFTCardV2 name="NoArt" floorAmount={1} floorSymbol="ETH" />
          <NFTCardV3 name="Ape #9" collection="BAYC" floorAmount={30} floorSymbol="ETH" network="Ethereum" />
          <PortfolioSummaryV2 totalCents={1250000} changeCents={24000} changePct={1.9} allocations={[{ label: 'ETH', value: 60 }, { label: 'BTC', value: 40 }]} />
          <PortfolioSummaryV3 totalCents={1250000} changePct={-0.8} allocations={[{ label: 'ETH', value: 60 }, { label: 'BTC', value: 40 }]} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
