import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { WalletCard } from './WalletCard';
import { TokenRow } from './TokenRow';
import { PriceTicker } from './PriceTicker';
import { NFTCard } from './NFTCard';
import { SwapForm, type SwapValues } from './SwapForm';
import { GasFeeRow } from './GasFeeRow';
import { PortfolioSummary } from './PortfolioSummary';
import { TxRow, TxList } from './TxRow';
import { StakingCard } from './StakingCard';
import { PriceAlertRow } from './PriceAlertRow';
import { NetworkBadge } from './NetworkBadge';
import { SeedPhraseGrid } from './SeedPhraseGrid';
import { truncateHash, formatToken, formatPct } from './internal/format';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('format helpers (crypto)', () => {
  it('truncates a hash and guards short/garbage input', () => {
    expect(truncateHash('0x1234567890abcdef', 6, 4)).toBe('0x1234…cdef');
    expect(truncateHash('0x12')).toBe('0x12');
    expect(truncateHash(undefined as unknown as string)).toBe('');
  });

  it('formats token amounts and percentages with stable precision (no drift)', () => {
    expect(formatToken(1.100000001, { decimals: 4, symbol: 'ETH' })).toBe('1.1 ETH');
    expect(formatPct(2.4)).toBe('+2.40%');
    expect(formatPct(-3.1)).toBe('−3.10%');
  });
});

describe('WalletCard (native)', () => {
  it('renders label, truncated address, and copies the FULL address', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WalletCard
        address="0xabcdef0123456789abcdef0123456789abcdef01"
        label="Main Wallet"
        balanceCents={1234567}
        nativeAmount={1.245}
        nativeSymbol="ETH"
        kind="hardware"
        onCopy={onCopy}
      />,
      SEED_LIGHT
    );
    expect(getByText('Main Wallet')).toBeTruthy();
    expect(getByText('$12,345.67')).toBeTruthy();
    expect(getByText('0xabcd…ef01')).toBeTruthy();
    fireEvent.press(getByLabelText(/Copy address/));
    expect(onCopy).toHaveBeenCalledWith('0xabcdef0123456789abcdef0123456789abcdef01');
  });
});

describe('TokenRow (native)', () => {
  it('tones a positive change as success and a loss as danger', () => {
    const gain = renderThemed(
      <TokenRow symbol="ETH" name="Ethereum" amount={2.5} valueCents={500000} changePct={2.4} icon="⟠" />,
      SEED_LIGHT
    );
    expect(gain.getByText('2.5 ETH')).toBeTruthy();
    expect(flatten(gain.getByText(/\+2\.40%/).props.style).color).toBe(lightColors.success);

    const loss = renderThemed(<TokenRow symbol="SOL" amount={10} changePct={-3.1} />, SEED_LIGHT);
    expect(flatten(loss.getByText(/−3\.10%/).props.style).color).toBe(lightColors.danger);
  });
});

describe('PriceTicker (native)', () => {
  it('renders price + a token-toned change and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PriceTicker symbol="BTC" name="Bitcoin" price={64250.5} changePct={1.8} variant="detailed" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('$64,250.50')).toBeTruthy();
    expect(flatten(getByText(/\+1\.80%/).props.style).color).toBe(lightColors.success);
    fireEvent.press(getByLabelText('BTC price'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SwapForm (native)', () => {
  it('emits the typed amount on change and blocks submit until valid', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    // Invalid (amount 0) → submit is a no-op.
    const invalid = renderThemed(
      <SwapForm from={{ symbol: 'ETH' }} to={{ symbol: 'USDC' }} rate={2400} onChange={onChange} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(invalid.getByText('Swap'));
    expect(onSubmit).not.toHaveBeenCalled();

    // Typing an amount reports the merged value bag.
    fireEvent.changeText(invalid.getByLabelText('Pay amount'), '1.5');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ fromSymbol: 'ETH', toSymbol: 'USDC', fromAmount: 1.5 } satisfies Partial<SwapValues>)
    );

    // Controlled valid state → derived receive amount is shown and submit fires.
    const valid = renderThemed(
      <SwapForm from={{ symbol: 'ETH' }} to={{ symbol: 'USDC', decimals: 2 }} fromAmount={2} rate={2400} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    expect(valid.getByLabelText('Receive amount').props.children).toBe('4,800');
    fireEvent.press(valid.getByText('Swap'));
    expect(onSubmit).toHaveBeenCalledWith({ fromSymbol: 'ETH', toSymbol: 'USDC', fromAmount: 2 });
  });
});

describe('TxRow / TxList (native)', () => {
  it('renders a truncated hash with a labelled status', () => {
    const { getByText, getAllByText } = renderThemed(
      <TxRow hash="0x9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c" status="confirmed" direction="receive" amount={0.5} symbol="ETH" />,
      SEED_LIGHT
    );
    expect(getByText('0x9f8e…7d6c')).toBeTruthy();
    // status conveyed by a label, not color alone
    expect(getAllByText('Confirmed').length).toBeGreaterThan(0);
    expect(getByText('+0.5 ETH')).toBeTruthy();
  });

  it('renders an empty state when the transaction list is empty', () => {
    const { getByText, queryByText } = renderThemed(
      <TxList items={[]} emptyTitle="No transactions yet" />,
      SEED_DARK
    );
    expect(getByText('No transactions yet')).toBeTruthy();
    expect(queryByText(/0x/)).toBeNull();
  });
});

describe('SeedPhraseGrid (native)', () => {
  const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'];

  it('is hidden by default and reveals on demand', () => {
    const onToggle = jest.fn();
    const { getByLabelText, getByText, queryByText } = renderThemed(
      <SeedPhraseGrid words={words} onToggleReveal={onToggle} />,
      SEED_LIGHT
    );
    // Masked initially — no word is present in the tree.
    expect(queryByText('alpha')).toBeNull();
    // Reveal.
    fireEvent.press(getByLabelText('Reveal'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(getByText('alpha')).toBeTruthy();
    expect(getByText('foxtrot')).toBeTruthy();
  });
});

describe('PriceAlertRow (native)', () => {
  it('toggles the alert via the switch', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <PriceAlertRow symbol="BTC" condition="above" targetPrice={70000} enabled={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/BTC alert above/));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('GasFeeRow (native)', () => {
  it('marks the selected tier and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <GasFeeRow speed="fast" gwei={42} costCents={310} selected onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByText('Fast')).toBeTruthy();
    fireEvent.press(getByLabelText('Fast gas'));
    expect(onSelect).toHaveBeenCalledWith('fast');
  });
});

describe('StakingCard (native)', () => {
  it('disables Claim when there are no rewards and enables it otherwise', () => {
    const onClaim = jest.fn();
    const noRewards = renderThemed(
      <StakingCard symbol="ATOM" stakedAmount={100} apy={18.5} rewardsAmount={0} onClaim={onClaim} />,
      SEED_LIGHT
    );
    fireEvent.press(noRewards.getByText('Claim'));
    expect(onClaim).not.toHaveBeenCalled();

    const withRewards = renderThemed(
      <StakingCard symbol="ATOM" stakedAmount={100} apy={18.5} rewardsAmount={2.5} onClaim={onClaim} />,
      SEED_LIGHT
    );
    expect(withRewards.getByText(formatPct(18.5))).toBeTruthy();
    fireEvent.press(withRewards.getByText('Claim'));
    expect(onClaim).toHaveBeenCalledTimes(1);
  });
});

describe('NetworkBadge (native)', () => {
  it('announces the connection status alongside the name', () => {
    const { getByLabelText, getByText } = renderThemed(
      <NetworkBadge name="Ethereum" status="connected" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Ethereum, Connected')).toBeTruthy();
    expect(getByText('Connected')).toBeTruthy();
  });
});

describe('token purity (native crypto, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <WalletCard address="0xabcdef0123456789abcdef0123456789abcdef01" label="Main" balanceCents={100000} nativeAmount={1.2} nativeSymbol="ETH" kind="hot" variant="accent" />
          <TokenRow symbol="ETH" name="Ethereum" amount={2.5} valueCents={500000} changePct={-1.2} icon="⟠" />
          <PriceTicker symbol="BTC" name="Bitcoin" price={64000} changePct={2.1} variant="detailed" spark={[1, 3, 2, 5, 4]} />
          <NFTCard name="Punk #1" collection="Punks" floorAmount={12.3} floorSymbol="ETH" network="Ethereum" />
          <SwapForm from={{ symbol: 'ETH' }} to={{ symbol: 'USDC' }} fromAmount={1} rate={2400} />
          <GasFeeRow speed="average" gwei={30} costCents={210} selected />
          <PortfolioSummary
            totalCents={2500000}
            changeCents={12500}
            changePct={0.5}
            allocations={[
              { label: 'ETH', value: 60 },
              { label: 'BTC', value: 40 },
            ]}
          />
          <TxRow hash="0x9f8e7d6c5b4a39281706f5e4d3c2b1a09f8e7d6c" status="pending" direction="send" amount={0.5} symbol="ETH" />
          <TxList items={[]} />
          <StakingCard symbol="ATOM" stakedAmount={100} apy={18.5} stakedValueCents={90000} rewardsAmount={2.5} onClaim={() => {}} onUnstake={() => {}} />
          <PriceAlertRow symbol="BTC" condition="below" targetPrice={60000} currentPrice={64000} enabled />
          <NetworkBadge name="Polygon" status="congested" />
          <SeedPhraseGrid words={['alpha', 'bravo', 'charlie']} revealed />
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
