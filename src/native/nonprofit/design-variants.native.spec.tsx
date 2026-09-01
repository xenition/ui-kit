import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { DonationCardV2 } from './DonationCardV2';
import { DonationCardV3 } from './DonationCardV3';
import { CampaignProgressV2 } from './CampaignProgressV2';
import { CampaignProgressV3 } from './CampaignProgressV3';
import { CauseCardV2 } from './CauseCardV2';
import { CauseCardV3 } from './CauseCardV3';
import { FundraiserCardV2 } from './FundraiserCardV2';
import { FundraiserCardV3 } from './FundraiserCardV3';
import { CampaignProgressV4 } from './CampaignProgressV4';
import { CauseCardV4 } from './CauseCardV4';
import { DonationCardV4 } from './DonationCardV4';
import { DonorRowV4 } from './DonorRowV4';
import { EventTicketRowV4 } from './EventTicketRowV4';
import { FundraiserCardV4 } from './FundraiserCardV4';
import { ImpactStatV4 } from './ImpactStatV4';
import { MatchingGiftBannerV4 } from './MatchingGiftBannerV4';
import { PledgeRowV4 } from './PledgeRowV4';
import { RecurringGiftRowV4 } from './RecurringGiftRowV4';
import { ThankYouCardV4 } from './ThankYouCardV4';
import { VolunteerShiftV4 } from './VolunteerShiftV4';

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

describe('nonprofit design variants — mount + core content', () => {
  it('DonationCardV2 / V3 render the title and echo the selected amount on the CTA', () => {
    const v2 = renderThemed(
      <DonationCardV2 title="Support Clean Water" presets={[2500, 5000, 10000]} selected={5000} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Support Clean Water')).toBeTruthy();
    expect(v2.getByText('Donate $50.00')).toBeTruthy();

    const v3 = renderThemed(
      <DonationCardV3 title="Fund a Meal" presets={[500, 1000]} selected={1000} ctaLabel="Give" />,
      SEED_DARK
    );
    expect(v3.getByText('Fund a Meal')).toBeTruthy();
    expect(v3.getByText('Give')).toBeTruthy();
  });

  it('CampaignProgressV2 / V3 announce percent (progressbar) and guard a zero goal', () => {
    const v2 = renderThemed(<CampaignProgressV2 raisedCents={5000} goalCents={10000} donorCount={12} />, SEED_LIGHT);
    expect(v2.getByLabelText('50% of goal raised')).toBeTruthy();
    expect(v2.getByText('$50.00')).toBeTruthy();

    // Divide-by-zero guarded → 0%.
    const v3 = renderThemed(<CampaignProgressV3 raisedCents={750000} goalCents={0} />, SEED_DARK);
    expect(v3.getByLabelText('0% of goal raised')).toBeTruthy();
  });

  it('CauseCardV2 / V3 render the title, plus a loading skeleton that hides content', () => {
    const v2 = renderThemed(
      <CauseCardV2 title="Reforest the Ridge" category="Environment" raisedCents={120000} goalCents={500000} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Reforest the Ridge')).toBeTruthy();

    const v3 = renderThemed(
      <CauseCardV3 title="Shelter Meals" description="Warm food nightly." raisedCents={40000} goalCents={80000} />,
      SEED_DARK
    );
    expect(v3.getByText('Shelter Meals')).toBeTruthy();

    const loadingV2 = renderThemed(<CauseCardV2 title="Hidden" loading />, SEED_LIGHT);
    expect(loadingV2.queryByText('Hidden')).toBeNull();
    const loadingV3 = renderThemed(<CauseCardV3 title="Hidden" loading />, SEED_DARK);
    expect(loadingV3.queryByText('Hidden')).toBeNull();
  });

  it('FundraiserCardV2 / V3 render the organizer and title', () => {
    const v2 = renderThemed(
      <FundraiserCardV2 title="Marathon for Wells" organizerName="Ada Lovelace" raisedCents={30000} goalCents={100000} donorCount={9} onShare={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Marathon for Wells')).toBeTruthy();
    expect(v2.getByText('Organized by Ada Lovelace')).toBeTruthy();

    const v3 = renderThemed(
      <FundraiserCardV3 title="Team Trailblazers" organizerName="Grace Hopper" raisedCents={25000} goalCents={50000} />,
      SEED_DARK
    );
    expect(v3.getByText('Team Trailblazers')).toBeTruthy();
    expect(v3.getByText('$250.00 · 50%')).toBeTruthy();
  });
});

describe('nonprofit design variants — interaction', () => {
  it('DonationCardV2 selects a preset (a11y state) and reports the active amount on donate', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <DonationCardV2 title="Clean Water" presets={[2500, 5000, 10000]} selected={5000} onSelectAmount={onSelectAmount} onDonate={onDonate} />,
      SEED_LIGHT
    );
    expect(getByLabelText('$50.00').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('$25.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2500);
    fireEvent.press(getByText('Donate $50.00'));
    expect(onDonate).toHaveBeenCalledWith(5000);
  });

  it('DonationCardV3 selects a preset and donates the active amount', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <DonationCardV3 title="Give" presets={[1000, 2000]} selected={1000} onSelectAmount={onSelectAmount} onDonate={onDonate} />,
      SEED_DARK
    );
    expect(getByLabelText('$10.00').props.accessibilityState.selected).toBe(true);
    fireEvent.press(getByLabelText('$20.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2000);
    fireEvent.press(getByText('Donate'));
    expect(onDonate).toHaveBeenCalledWith(1000);
  });

  it('CauseCardV2 presses through', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <CauseCardV2 title="Reforest" raisedCents={1} goalCents={2} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Reforest'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('FundraiserCardV2 / V3 fire donate', () => {
    const onDonate2 = jest.fn();
    const v2 = renderThemed(
      <FundraiserCardV2 title="Run" organizerName="Ada" raisedCents={1} goalCents={2} onDonate={onDonate2} />,
      SEED_LIGHT
    );
    fireEvent.press(v2.getByText('Donate'));
    expect(onDonate2).toHaveBeenCalledTimes(1);

    const onDonate3 = jest.fn();
    const v3 = renderThemed(
      <FundraiserCardV3 title="Row" organizerName="Grace" raisedCents={1} goalCents={2} onDonate={onDonate3} />,
      SEED_DARK
    );
    fireEvent.press(v3.getByText('Donate'));
    expect(onDonate3).toHaveBeenCalledTimes(1);
  });
});

describe('nonprofit design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DonationCardV2 title="Clean Water" description="Every gift funds a well." presets={[2500, 5000, 10000]} selected={5000} variant="featured" />
          <DonationCardV3 title="Fund a Meal" description="Feed a family." presets={[500, 1000, 2000]} selected={1000} />
          <CampaignProgressV2 raisedCents={5000} goalCents={10000} tone="success" donorCount={12} daysLeft={9} />
          <CampaignProgressV3 raisedCents={2500} goalCents={10000} tone="accent" donorCount={4} />
          <CauseCardV2 title="Reforest the Ridge" description="Plant native trees." category="Environment" raisedCents={120000} goalCents={500000} variant="featured" onPress={() => undefined} />
          <CauseCardV3 title="Shelter Meals" description="Warm food nightly." category="Food" raisedCents={40000} goalCents={80000} onPress={() => undefined} />
          <FundraiserCardV2 title="Marathon for Wells" organizerName="Ada Lovelace" raisedCents={30000} goalCents={100000} donorCount={9} onShare={() => undefined} onDonate={() => undefined} />
          <FundraiserCardV3 title="Team Trailblazers" organizerName="Grace Hopper" raisedCents={25000} goalCents={50000} donorCount={7} onDonate={() => undefined} />
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

/** All 12 V4 "rally" components in one tree — the celebratory ThankYouCardV4
 * (the reserved brand-gradient moment) is intentionally included. */
const AllV4Rally = (
  <>
    <CampaignProgressV4 raisedCents={5000} goalCents={10000} tone="success" donorCount={12} daysLeft={9} variant="thermometer" />
    <CauseCardV4 title="Reforest the Ridge" description="Plant native trees." category="Environment" raisedCents={120000} goalCents={500000} variant="featured" onPress={() => undefined} />
    <DonationCardV4 title="Support Clean Water" description="Every gift funds a well." presets={[2500, 5000, 10000]} selected={5000} variant="featured" />
    <DonorRowV4 name="Ada Lovelace" totalCents={250000} giftCount={7} tier="platinum" rank={1} />
    <EventTicketRowV4 name="Gala Table" priceCents={50000} deductibleCents={20000} remaining={4} description="Seats 8" />
    <FundraiserCardV4 title="Marathon for Wells" organizerName="Grace Hopper" raisedCents={30000} goalCents={100000} donorCount={9} onShare={() => undefined} onDonate={() => undefined} />
    <ImpactStatV4 value="12,480" label="Meals served" unit="meals" glyph="🍲" variant="tile" tone="accent" />
    <MatchingGiftBannerV4 matcherName="Acme Foundation" multiplier={2} matchedCents={40000} capCents={100000} deadlineLabel="Ends Sep 30" actionLabel="Give now" onAction={() => undefined} variant="solid" />
    <PledgeRowV4 donorName="Alan Turing" amountCents={15000} status="pending" dueLabel="Due Sep 1" onFulfill={() => undefined} />
    <RecurringGiftRowV4 amountCents={2500} frequency="monthly" fund="General Fund" nextChargeLabel="Next: Sep 1" status="active" onPause={() => undefined} onCancel={() => undefined} />
    <ThankYouCardV4 donorName="Grace" amountCents={5000} message="You made this possible." impactLabel="Funds 40 meals" variant="celebratory" onShare={() => undefined} onViewReceipt={() => undefined} />
    <VolunteerShiftV4 role="Food Bank Sorter" date="Sat, Aug 24" time="9:00 AM – 12:00 PM" location="Downtown Depot" filled={6} capacity={10} onSignUp={() => undefined} />
  </>
);

describe('nonprofit V4 "rally" line (native)', () => {
  it('mounts all 12 V4 together under a light seed and renders core content', () => {
    const { getByText } = renderThemed(AllV4Rally, SEED_LIGHT);
    expect(getByText('Reforest the Ridge')).toBeTruthy();
    expect(getByText('Thank you, Grace!')).toBeTruthy();
    expect(getByText('Meals served')).toBeTruthy();
  });

  it('CauseCardV4 presses through', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <CauseCardV4 title="Reforest" raisedCents={1} goalCents={2} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Reforest'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('DonationCardV4 selects a preset and donates the active amount', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <DonationCardV4 title="Give" presets={[1000, 2000]} selected={1000} onSelectAmount={onSelectAmount} onDonate={onDonate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('$20.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2000);
    fireEvent.press(getByText('Donate $10.00'));
    expect(onDonate).toHaveBeenCalledWith(1000);
  });

  it('EventTicketRowV4 presses through by label', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <EventTicketRowV4 name="General Entry" priceCents={2500} remaining={20} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('General Entry, $25.00'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('nonprofit V4 "rally" line — token purity (both seeds)', () => {
  it.each(SEEDS)('every rendered hex traces to a compiled token (incl. celebratory gradient)', (seed) => {
    const { root } = renderThemed(AllV4Rally, seed);
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
