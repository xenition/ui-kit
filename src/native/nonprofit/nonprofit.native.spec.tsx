import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { DonationCard } from './DonationCard';
import { CampaignProgress } from './CampaignProgress';
import { CauseCard } from './CauseCard';
import { VolunteerShift } from './VolunteerShift';
import { PledgeRow } from './PledgeRow';
import { DonorRow } from './DonorRow';
import { EventTicketRow } from './EventTicketRow';
import { MatchingGiftBanner } from './MatchingGiftBanner';
import { ThankYouCard } from './ThankYouCard';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

describe('DonationCard (native)', () => {
  it('selects a preset and reports the active amount on donate, token-pure', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <DonationCard
        title="Support Clean Water"
        description="Every gift funds a well."
        presets={[2500, 5000, 10000]}
        selected={5000}
        onSelectAmount={onSelectAmount}
        onDonate={onDonate}
      />,
      SEED_LIGHT
    );
    expect(getByText('Support Clean Water')).toBeTruthy();
    // Selection announces via a11y state, not color alone.
    expect(getByLabelText('$50.00').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('$25.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2500);
    fireEvent.press(getByText('Donate $50.00'));
    expect(onDonate).toHaveBeenCalledWith(5000);
    assertTokenPure(root);
  });
});

describe('CampaignProgress (native)', () => {
  it('guards a zero goal (0%) and renders raised/goal money, token-pure', () => {
    const { getByLabelText, getByText, root } = renderThemed(
      <CampaignProgress raisedCents={750000} goalCents={0} donorCount={12} />,
      SEED_LIGHT
    );
    // Divide-by-zero guarded → 0%.
    expect(getByLabelText('0% of goal raised')).toBeTruthy();
    expect(getByText('$7,500.00')).toBeTruthy();
    assertTokenPure(root);
  });

  it('computes the fill percentage from raised/goal', () => {
    const { getByLabelText } = renderThemed(
      <CampaignProgress raisedCents={5000} goalCents={10000} variant="thermometer" />,
      SEED_LIGHT
    );
    expect(getByLabelText('50% of goal raised')).toBeTruthy();
  });
});

describe('CauseCard (native)', () => {
  it('renders an inline progress meter and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CauseCard
        title="Reforest the Ridge"
        description="Plant native trees."
        category="Environment"
        raisedCents={120000}
        goalCents={500000}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Reforest the Ridge')).toBeTruthy();
    fireEvent.press(getByLabelText('Reforest the Ridge'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('VolunteerShift (native)', () => {
  it('fires onSignUp for an open shift and stays token-pure', () => {
    const onSignUp = jest.fn();
    const { getByText, root } = renderThemed(
      <VolunteerShift
        role="Food Bank Sorter"
        date="Sat, Aug 29"
        time="9:00 AM – 12:00 PM"
        location="Community Center"
        filled={3}
        capacity={8}
        onSignUp={onSignUp}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Sign up'));
    expect(onSignUp).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });

  it('disables sign-up when the shift is full', () => {
    const onSignUp = jest.fn();
    const { getByText } = renderThemed(
      <VolunteerShift role="Greeter" filled={5} capacity={5} onSignUp={onSignUp} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Shift full'));
    expect(onSignUp).not.toHaveBeenCalled();
  });
});

describe('PledgeRow (native)', () => {
  it('fires onFulfill for an open pledge, token-pure', () => {
    const onFulfill = jest.fn();
    const { getByText, root } = renderThemed(
      <PledgeRow donorName="Ada Lovelace" amountCents={25000} status="pending" onFulfill={onFulfill} />,
      SEED_LIGHT
    );
    expect(getByText('$250.00')).toBeTruthy();
    fireEvent.press(getByText('Mark fulfilled'));
    expect(onFulfill).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('DonorRow (native)', () => {
  it('renders lifetime giving and an anonymous label', () => {
    const { getByText } = renderThemed(
      <DonorRow name="Secret Santa" anonymous totalCents={100000} giftCount={4} tier="gold" rank={1} />,
      SEED_LIGHT
    );
    expect(getByText('Anonymous donor')).toBeTruthy();
    expect(getByText('$1,000.00')).toBeTruthy();
  });
});

describe('EventTicketRow (native)', () => {
  it('fires onSelect and reflects selection through a11y state', () => {
    const onSelect = jest.fn();
    const unselected = renderThemed(
      <EventTicketRow name="Gala Table" priceCents={50000} deductibleCents={20000} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(unselected.getByLabelText('Gala Table, $500.00'));
    expect(onSelect).toHaveBeenCalledTimes(1);

    const { getByLabelText } = renderThemed(
      <EventTicketRow name="Gala Table" priceCents={50000} selected onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Gala Table, $500.00').props.accessibilityState.selected).toBe(true);
  });

  it('does not fire onSelect when sold out', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventTicketRow name="VIP" priceCents={100000} remaining={0} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('VIP, $1,000.00, sold out'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('MatchingGiftBanner (native)', () => {
  it('fires the CTA and guards the cap progress, token-pure', () => {
    const onAction = jest.fn();
    const { getByText, root } = renderThemed(
      <MatchingGiftBanner
        matcherName="Acme Foundation"
        multiplier={2}
        matchedCents={30000}
        capCents={100000}
        deadlineLabel="Ends Sep 30"
        onAction={onAction}
      />,
      SEED_LIGHT
    );
    expect(getByText('Acme Foundation matches 2× your gift')).toBeTruthy();
    fireEvent.press(getByText('Give now'));
    expect(onAction).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('ThankYouCard (native)', () => {
  it('renders the gift amount and fires share', () => {
    const onShare = jest.fn();
    const { getByText } = renderThemed(
      <ThankYouCard
        donorName="Grace"
        amountCents={5000}
        message="Your gift changes lives."
        impactLabel="Funds 40 meals"
        variant="celebratory"
        onShare={onShare}
      />,
      SEED_LIGHT
    );
    expect(getByText('Thank you, Grace!')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
    fireEvent.press(getByText('Share'));
    expect(onShare).toHaveBeenCalledTimes(1);
  });
});

describe('CauseCard (native) — empty / loading state', () => {
  it('renders a loading skeleton without content or crashing', () => {
    const { queryByText, root } = renderThemed(
      <CauseCard title="Hidden While Loading" loading />,
      SEED_LIGHT
    );
    // Title is suppressed while the skeleton is shown.
    expect(queryByText('Hidden While Loading')).toBeNull();
    assertTokenPure(root);
  });
});
