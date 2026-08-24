/** @jest-environment jsdom */
/**
 * Alternate crypto designs (v2 / v3) for the web (React DOM) — the drop-in
 * redesigns of the four most-used crypto blocks (NFTCard, PortfolioSummary,
 * TokenRow, WalletCard). Each variant keeps the base component's exact props, so
 * these specs prove they (a) mount, (b) stay token-pure (no literal hex in any
 * inline style — every color traces to a `--xen-*` token class), and (c) honor
 * their key interaction / state contract.
 */
import { fireEvent, render } from '@testing-library/react';
import { NFTCardV2 } from './NFTCardV2';
import { NFTCardV3 } from './NFTCardV3';
import { PortfolioSummaryV2 } from './PortfolioSummaryV2';
import { PortfolioSummaryV3 } from './PortfolioSummaryV3';
import { TokenRowV2 } from './TokenRowV2';
import { TokenRowV3 } from './TokenRowV3';
import { WalletCardV2 } from './WalletCardV2';
import { WalletCardV3 } from './WalletCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const ADDR = '0x1234567890abcdef';
const ALLOC = [
  { label: 'ETH', value: 60 },
  { label: 'BTC', value: 30 },
  { label: 'USDC', value: 10 },
];

describe('NFTCard alternates (web)', () => {
  it('V2 renders a full-bleed scrim tile and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <NFTCardV2
        name="Punk #4231"
        collection="CryptoPunks"
        image="https://example.com/a.png"
        floorAmount={12.4}
        floorSymbol="ETH"
        network="Ethereum"
        onClick={onClick}
      />
    );
    expect(getByText('Punk #4231')).toBeTruthy();
    expect(getByText('Floor')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Punk #4231, CryptoPunks'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a grid tile with a bottom strip and a no-image placeholder', () => {
    const { getByText, container } = render(
      <NFTCardV3 name="Bored Ape #99" collection="BAYC" floorAmount={30} floorSymbol="ETH" />
    );
    expect(getByText('Bored Ape #99')).toBeTruthy();
    expect(getByText('No image')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PortfolioSummary alternates (web)', () => {
  it('V2 renders a hero total with a donut + share legend', () => {
    const { getByText, container } = render(
      <PortfolioSummaryV2 totalCents={1250000} changeCents={24000} changePct={1.9} allocations={ALLOC} />
    );
    expect(getByText('$12,500.00')).toBeTruthy();
    expect(getByText('60.0%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 renders a minimal total with a compact allocation bar; guards empty', () => {
    const { getByText, getByLabelText, container } = render(
      <PortfolioSummaryV3 totalCents={1250000} changePct={-0.8} allocations={ALLOC} />
    );
    expect(getByText('$12,500.00')).toBeTruthy();
    expect(getByLabelText('Allocation across 3 assets')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    const empty = render(<PortfolioSummaryV3 totalCents={0} />);
    expect(empty.getByText('$0.00')).toBeTruthy();
  });
});

describe('TokenRow alternates (web)', () => {
  it('V2 renders a card with a sparkline + toned change and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <TokenRowV2 symbol="ETH" name="Ethereum" amount={1.245} valueCents={482355} changePct={2.4} icon="⧫" onClick={onClick} />
    );
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByLabelText('ETH trend')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('ETH holding'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with amount + change and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <TokenRowV3 symbol="BTC" amount={0.5} changePct={-1.1} onClick={onClick} />
    );
    expect(getByText('0.5 BTC')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('BTC holding'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('WalletCard alternates (web)', () => {
  it('V2 renders a gradient face with balance + custody badge and copies the FULL address', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <WalletCardV2 address={ADDR} label="Main Wallet" balanceCents={482355} nativeAmount={1.245} nativeSymbol="ETH" kind="hot" onCopy={onCopy} />
    );
    expect(getByText('Main Wallet')).toBeTruthy();
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByText(/Hot/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(`Copy address ${ADDR}`));
    expect(onCopy).toHaveBeenCalledWith(ADDR);
  });

  it('V3 renders a minimal row with a copyable address chip and honors loading', () => {
    const onCopy = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <WalletCardV3 address={ADDR} label="Cold Store" balanceCents={90000} kind="hardware" onCopy={onCopy} />
    );
    expect(getByText('Cold Store')).toBeTruthy();
    expect(getByText('$900.00')).toBeTruthy();
    expect(getByText('0x1234…cdef')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText(`Copy address ${ADDR}`));
    expect(onCopy).toHaveBeenCalledWith(ADDR);

    const loading = render(<WalletCardV3 address={ADDR} loading />);
    expect(loading.getByLabelText('Loading balance')).toBeTruthy();
  });
});
