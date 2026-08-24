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
