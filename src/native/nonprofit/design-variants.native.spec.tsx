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
