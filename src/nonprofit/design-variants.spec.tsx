/** @jest-environment jsdom */
/**
 * Alternate nonprofit designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of CampaignProgress, CauseCard, DonationCard, FundraiserCard. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in inline styles beyond geometric widths), and (c)
 * honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CampaignProgressV2 } from './CampaignProgressV2';
import { CampaignProgressV3 } from './CampaignProgressV3';
import { CauseCardV2 } from './CauseCardV2';
import { CauseCardV3 } from './CauseCardV3';
import { DonationCardV2 } from './DonationCardV2';
import { DonationCardV3 } from './DonationCardV3';
import { FundraiserCardV2 } from './FundraiserCardV2';
import { FundraiserCardV3 } from './FundraiserCardV3';
import {
  CampaignProgressV4,
  CauseCardV4,
  DonationCardV4,
  DonorRowV4,
  EventTicketRowV4,
  FundraiserCardV4,
  ImpactStatV4,
  MatchingGiftBannerV4,
  PledgeRowV4,
  RecurringGiftRowV4,
  ThankYouCardV4,
  VolunteerShiftV4,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('CampaignProgress alternates (web)', () => {
  it('V2 shows the percentage', () => {
    const { getByText, container } = render(<CampaignProgressV2 raisedCents={5000} goalCents={10000} donorCount={12} />);
    expect(getByText('50%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders inline meter', () => {
    const { container } = render(<CampaignProgressV3 raisedCents={2500} goalCents={10000} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('CauseCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<CauseCardV2 title="Clean Water" category="Health" raisedCents={100} goalCents={500} onClick={onClick} />);
    expect(getByText('Clean Water')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Clean Water'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<CauseCardV3 title="Books" category="Education" description="For all" />);
    expect(getByText('Books')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('DonationCard alternates (web)', () => {
  it('V2 fires onDonate with the active amount', () => {
    const onDonate = jest.fn();
    const { getByText, container } = render(<DonationCardV2 title="Give" presets={[1000, 2500]} selected={2500} onDonate={onDonate} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText(/Donate/));
    expect(onDonate).toHaveBeenCalledWith(2500);
  });
  it('V3 selects a preset', () => {
    const onSelectAmount = jest.fn();
    const { getByText, container } = render(<DonationCardV3 title="Give" presets={[1000, 2500]} onSelectAmount={onSelectAmount} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('$25.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(2500);
  });
});

describe('FundraiserCard alternates (web)', () => {
  it('V2 fires onDonate', () => {
    const onDonate = jest.fn();
    const { getByText, container } = render(<FundraiserCardV2 title="Team Run" organizerName="Ada" raisedCents={3000} goalCents={10000} onDonate={onDonate} />);
    expect(getByText('Team Run')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Donate'));
    expect(onDonate).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense row', () => {
    const { getByText, container } = render(<FundraiserCardV3 title="Bake Sale" organizerName="Leo" raisedCents={500} goalCents={2000} donorCount={8} />);
    expect(getByText('Bake Sale')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('nonprofit V4 "rally" line (web)', () => {
  it('mounts all 12 V4 together, renders content, and stays token-pure', () => {
    const { getByText, container } = render(
      <>
        <CampaignProgressV4 raisedCents={5000} goalCents={10000} tone="success" donorCount={12} daysLeft={9} variant="thermometer" />
        <CauseCardV4 title="Reforest the Ridge" description="Plant native trees." category="Environment" raisedCents={120000} goalCents={500000} variant="featured" onClick={() => undefined} />
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
    expect(getByText('Reforest the Ridge')).toBeTruthy();
    expect(getByText('Thank you, Grace!')).toBeTruthy();
    expect(getByText('Meals served')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('CauseCardV4 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <CauseCardV4 title="Clean Water" category="Health" raisedCents={100} goalCents={500} onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Clean Water'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('DonationCardV4 selects a preset and donates the active amount', () => {
    const onSelectAmount = jest.fn();
    const onDonate = jest.fn();
    const { getByText, container } = render(
      <DonationCardV4 title="Give" presets={[1000, 2500]} selected={2500} onSelectAmount={onSelectAmount} onDonate={onDonate} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('$10.00'));
    expect(onSelectAmount).toHaveBeenCalledWith(1000);
    fireEvent.click(getByText(/Donate/));
    expect(onDonate).toHaveBeenCalledWith(2500);
  });

  it('EventTicketRowV4 fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <EventTicketRowV4 name="General Entry" priceCents={2500} remaining={20} onSelect={onSelect} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('General Entry'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
