/** @jest-environment jsdom */
/**
 * Web (React DOM) parity of the native nonprofit module. Renders each component
 * in jsdom, asserting: it renders, it carries `--xen-*` token classes (never a
 * hex literal in inline styles), and the core interactions fire —
 * donate / preset-select (DonationCard), volunteer sign-up (VolunteerShift),
 * ticket select (EventTicketRow) — plus the guarded empty / loading state.
 */
import { fireEvent, render } from '@testing-library/react';
import { DonationCard } from './DonationCard';
import { CampaignProgress } from './CampaignProgress';
import { CauseCard } from './CauseCard';
import { VolunteerShift } from './VolunteerShift';
import { EventTicketRow } from './EventTicketRow';
import { MatchingGiftBanner } from './MatchingGiftBanner';
import { ThankYouCard } from './ThankYouCard';
import { DonorRow } from './DonorRow';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('DonationCard (web)', () => {
  it('selects a preset and reports the active amount on donate; token-pure', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByLabelText, getByText, container } = render(
      <DonationCard
        title="Support Clean Water"
        description="Every gift funds a well."
        presets={[2500, 5000, 10000]}
        selected={5000}
        onSelectAmount={onSelectAmount}
        onDonate={onDonate}
      />
    );
    expect(getByText('Support Clean Water')).toBeTruthy();
    // Selection announces via aria-checked, not color alone.
    expect(getByLabelText('$50.00').getAttribute('aria-checked')).toBe('true');
    fireEvent.click(getByLabelText('$25.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2500);
    fireEvent.click(getByText('Donate $50.00'));
    expect(onDonate).toHaveBeenCalledWith(5000);
    // Token class present, no hex leaked into inline styles.
    expect(container.querySelector('.bg-surface')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('CampaignProgress (web)', () => {
  it('guards a zero goal (0%) and prints a percentage via role=progressbar', () => {
    const { getByRole, getByText } = render(
      <CampaignProgress raisedCents={750000} goalCents={0} donorCount={12} />
    );
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('0');
    expect(bar.getAttribute('aria-label')).toBe('0% of goal raised');
    // Percent is printed (not color-alone) and money is formatted from cents.
    expect(getByText('0%')).toBeTruthy();
    expect(getByText('$7,500.00')).toBeTruthy();
  });

  it('computes the fill percentage from raised/goal', () => {
    const { getByRole } = render(
      <CampaignProgress raisedCents={5000} goalCents={10000} variant="thermometer" />
    );
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('50');
  });
});

describe('VolunteerShift (web)', () => {
  it('fires onSignUp for an open shift; disables sign-up when full', () => {
    const onSignUp = jest.fn();
    const { getByText, rerender } = render(
      <VolunteerShift role="Food Bank Sorter" date="Sat, Aug 29" filled={3} capacity={8} onSignUp={onSignUp} />
    );
    fireEvent.click(getByText('Sign up'));
    expect(onSignUp).toHaveBeenCalledTimes(1);

    rerender(<VolunteerShift role="Greeter" filled={5} capacity={5} onSignUp={onSignUp} />);
    const full = getByText('Shift full') as HTMLButtonElement;
    expect(full.disabled).toBe(true);
    fireEvent.click(full);
    expect(onSignUp).toHaveBeenCalledTimes(1); // unchanged
  });
});

describe('EventTicketRow (web)', () => {
  it('fires onSelect via the radio button and reflects selection through aria-checked', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <EventTicketRow name="Gala Table" priceCents={50000} deductibleCents={20000} onSelect={onSelect} />
    );
    const row = getByLabelText('Gala Table, $500.00');
    expect(row.getAttribute('role')).toBe('radio');
    expect(row.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(row);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does not fire onSelect when sold out', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <EventTicketRow name="VIP" priceCents={100000} remaining={0} onSelect={onSelect} />
    );
    fireEvent.click(getByLabelText('VIP, $1,000.00, sold out'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('MatchingGiftBanner (web)', () => {
  it('fires the CTA and guards the cap progress; token-pure', () => {
    const onAction = jest.fn();
    const { getByText, getByRole, container } = render(
      <MatchingGiftBanner
        matcherName="Acme Foundation"
        multiplier={2}
        matchedCents={30000}
        capCents={100000}
        deadlineLabel="Ends Sep 30"
        onAction={onAction}
      />
    );
    expect(getByText('Acme Foundation matches 2× your gift')).toBeTruthy();
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('30');
    fireEvent.click(getByText('Give now'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ThankYouCard (web)', () => {
  it('renders the gift amount and fires share', () => {
    const onShare = jest.fn();
    const { getByText } = render(
      <ThankYouCard
        donorName="Grace"
        amountCents={5000}
        message="Your gift changes lives."
        impactLabel="Funds 40 meals"
        variant="celebratory"
        onShare={onShare}
      />
    );
    expect(getByText('Thank you, Grace!')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
    fireEvent.click(getByText('Share'));
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});

describe('DonorRow (web)', () => {
  it('renders lifetime giving and an anonymous label', () => {
    const { getByText } = render(
      <DonorRow name="Secret Santa" anonymous totalCents={100000} giftCount={4} tier="gold" rank={1} />
    );
    expect(getByText('Anonymous donor')).toBeTruthy();
    expect(getByText('$1,000.00')).toBeTruthy();
  });
});

describe('CauseCard (web) — empty / loading state', () => {
  it('renders a loading skeleton without content or a hex literal', () => {
    const { queryByText, container } = render(<CauseCard title="Hidden While Loading" loading />);
    // Title is suppressed while the skeleton is shown.
    expect(queryByText('Hidden While Loading')).toBeNull();
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
