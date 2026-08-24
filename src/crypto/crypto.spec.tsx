/** @jest-environment jsdom */
/**
 * Web crypto components (jsdom, plain expect): each renders, binds to a
 * `--xen-*` token class (never a literal color), conveys status with a glyph +
 * label (not color alone), and honors its interaction contract — including the
 * empty `TxList`, the `SwapForm` amount input + submit gate, and the
 * seed-phrase reveal that is masked by default. Money stays integer cents
 * through `MoneyAmount`; token/price/percent values are fixed-precision.
 */
import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { WalletCard } from './WalletCard';
import { TokenRow } from './TokenRow';
import { PriceTicker } from './PriceTicker';
import { GasFeeRow } from './GasFeeRow';
import { TxRow, TxList } from './TxRow';
import { SwapForm } from './SwapForm';
import { SeedPhraseGrid } from './SeedPhraseGrid';
import { NetworkBadge } from './NetworkBadge';
import { PriceAlertRow } from './PriceAlertRow';
import { formatToken, formatPrice, formatPct, truncateHash } from './internal/format';

describe('crypto (web)', () => {
  it('format helpers are stable — no float drift', () => {
    expect(formatToken(1234.56789, { decimals: 4, symbol: 'ETH' })).toBe('1,234.5679 ETH');
    expect(formatPrice(1999.5, { symbol: '$', decimals: 2 })).toBe('$1,999.50');
    expect(formatPct(2.4)).toBe('+2.40%');
    expect(formatPct(-1.5)).toBe('−1.50%');
    expect(truncateHash('0x1234567890abcdef', 6, 4)).toBe('0x1234…cdef');
    expect(truncateHash('short')).toBe('short');
  });

  it('WalletCard renders the balance, truncates the address, and copies the FULL address', () => {
    const onCopy = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const { getByText, getByLabelText } = render(
      <WalletCard
        ref={ref}
        label="Main Wallet"
        address="0x1234567890abcdef"
        balanceCents={2500000}
        nativeAmount={1.245}
        nativeSymbol="ETH"
        kind="hardware"
        onCopy={onCopy}
      />
    );
    expect(ref.current?.tagName).toBe('DIV');
    // Fiat funnelled through MoneyAmount → integer cents, no drift.
    expect(getByText('$25,000.00').className).toContain('text-on-surface');
    // Truncated on screen…
    expect(getByText('0x1234…cdef')).toBeTruthy();
    // …but the FULL address is handed back on copy.
    fireEvent.click(getByLabelText('Copy address 0x1234567890abcdef'));
    expect(onCopy).toHaveBeenCalledWith('0x1234567890abcdef');
  });

  it('TokenRow tones a gain success (not color-only — carries a ▲ glyph) and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <TokenRow symbol="ETH" name="Ethereum" amount={2.5} valueCents={500000} changePct={3.2} onClick={onClick} />
    );
    const change = getByText('▲ +3.20%');
    expect(change.className).toContain('text-success');
    // Interactive row is a keyboard-operable button.
    const row = getByRole('button');
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('PriceTicker tones a loss danger with a ▼ glyph', () => {
    const { getByText } = render(<PriceTicker symbol="BTC" price={64000} changePct={-2.4} />);
    expect(getByText('$64,000.00')).toBeTruthy();
    expect(getByText('▼ −2.40%').className).toContain('text-danger');
  });

  it('GasFeeRow is a selectable radio that reports its speed', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(<GasFeeRow speed="fast" gwei={42} costCents={310} selected onSelect={onSelect} />);
    const radio = getByRole('radio');
    expect(radio.getAttribute('aria-checked')).toBe('true');
    expect(radio.className).toContain('border-primary');
    fireEvent.click(radio);
    expect(onSelect).toHaveBeenCalledWith('fast');
  });

  it('TxRow tones a send danger and prefixes a minus', () => {
    const { getByText } = render(<TxRow hash="0xabcdef0123456789" status="confirmed" direction="send" amount={0.5} symbol="ETH" />);
    const amount = getByText('−0.5 ETH');
    expect(amount.className).toContain('text-danger');
    // Status carries a label, not color alone.
    expect(getByText('Confirmed')).toBeTruthy();
  });

  it('TxList renders an explicit empty state when there are no items', () => {
    const { getByText } = render(<TxList items={[]} emptyTitle="No transactions yet" />);
    expect(getByText('No transactions yet')).toBeTruthy();
  });

  it('TxList renders one row per item and fires onSelectItem', () => {
    const onSelectItem = jest.fn();
    const { getAllByRole } = render(
      <TxList
        items={[
          { hash: '0xaaa1', direction: 'receive', amount: 1, symbol: 'ETH' },
          { hash: '0xbbb2', direction: 'send', amount: 2, symbol: 'ETH' },
        ]}
        onSelectItem={onSelectItem}
      />
    );
    const rows = getAllByRole('button');
    expect(rows).toHaveLength(2);
    fireEvent.click(rows[1]!);
    expect(onSelectItem).toHaveBeenCalledWith(expect.objectContaining({ hash: '0xbbb2' }), 1);
  });

  it('SwapForm derives the receive amount from the rate and gates submit', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const { getByLabelText, getByText, rerender } = render(
      <SwapForm from={{ symbol: 'ETH' }} to={{ symbol: 'USDC' }} fromAmount={0} rate={3000} onChange={onChange} onSubmit={onSubmit} />
    );
    // Typing an amount emits the merged value bag.
    fireEvent.change(getByLabelText('Pay amount'), { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith({ fromSymbol: 'ETH', toSymbol: 'USDC', fromAmount: 2 });

    // Submit is blocked at zero…
    const submit = getByText('Swap') as HTMLButtonElement;
    expect(submit.disabled).toBe(true);

    // …and enabled once controlled amount is positive; receive amount is derived.
    rerender(
      <SwapForm from={{ symbol: 'ETH' }} to={{ symbol: 'USDC' }} fromAmount={2} rate={3000} onChange={onChange} onSubmit={onSubmit} />
    );
    expect(getByLabelText('Receive amount').textContent).toBe('6,000');
    const submit2 = getByText('Swap') as HTMLButtonElement;
    expect(submit2.disabled).toBe(false);
    fireEvent.click(submit2);
    expect(onSubmit).toHaveBeenCalledWith({ fromSymbol: 'ETH', toSymbol: 'USDC', fromAmount: 2 });
  });

  it('SeedPhraseGrid is masked by default and reveals on the toggle', () => {
    const words = ['alpha', 'bravo', 'charlie', 'delta'];
    const { getByText, getAllByText, queryByText, getByRole } = render(<SeedPhraseGrid words={words} />);
    // Hidden by default — the real words are not on screen; every tile is masked.
    expect(queryByText('alpha')).toBeNull();
    expect(getAllByText('••••••')).toHaveLength(words.length);
    // Reveal.
    const toggle = getByRole('button');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect(getByText('alpha')).toBeTruthy();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('NetworkBadge announces its connection status (not color alone)', () => {
    const { getByText } = render(<NetworkBadge name="Ethereum" status="congested" />);
    // Health is spelled out as a label, not conveyed by hue only.
    expect(getByText('Congested').className).toContain('text-warn');
  });

  it('PriceAlertRow toggles via the switch and reports the next state', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<PriceAlertRow symbol="BTC" condition="above" targetPrice={70000} enabled={false} onToggle={onToggle} />);
    fireEvent.click(getByRole('switch'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
