/** @jest-environment jsdom */
/**
 * Design-line composition (web). The v2/v3 alternates exist so an app can pick
 * one line and stay in it — every screen it sees is drawn the same way. A
 * composite that reaches back across the line ships a v2 shell with base parts
 * inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: both cards
 * that compose a progress meter — FundraiserCard and CauseCard — render the
 * meter from their own line and no other.
 */
import { render } from '@testing-library/react';
import { FundraiserCard } from './FundraiserCard';
import { FundraiserCardV2 } from './FundraiserCardV2';
import { FundraiserCardV3 } from './FundraiserCardV3';
import { CauseCard } from './CauseCard';
import { CauseCardV2 } from './CauseCardV2';
import { CauseCardV3 } from './CauseCardV3';
import type { FundraiserCardProps } from './FundraiserCard';
import type { CauseCardProps } from './CauseCard';

// Each meter is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./CampaignProgress', () => ({ CampaignProgress: () => <p>campaign-progress-base</p> }));
jest.mock('./CampaignProgressV2', () => ({ CampaignProgressV2: () => <p>campaign-progress-v2</p> }));
jest.mock('./CampaignProgressV3', () => ({ CampaignProgressV3: () => <p>campaign-progress-v3</p> }));

const renderFundraiser = (Card: React.ComponentType<FundraiserCardProps>) =>
  render(<Card title="Rebuild the library" organizerName="Ada" raisedCents={45_00} goalCents={100_00} />);

const renderCause = (Card: React.ComponentType<CauseCardProps>) =>
  render(<Card title="Clean water" raisedCents={45_00} goalCents={100_00} />);

describe('FundraiserCard composes within its own design line (web)', () => {
  it('the base card uses the base meter', () => {
    const { queryByText } = renderFundraiser(FundraiserCard);
    expect(queryByText('campaign-progress-base')).toBeTruthy();
    expect(queryByText('campaign-progress-v2')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('v2 uses the v2 meter, never the base one', () => {
    const { queryByText } = renderFundraiser(FundraiserCardV2);
    expect(queryByText('campaign-progress-v2')).toBeTruthy();
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('v3 uses the v3 meter, never the base one', () => {
    const { queryByText } = renderFundraiser(FundraiserCardV3);
    expect(queryByText('campaign-progress-v3')).toBeTruthy();
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v2')).toBeNull();
  });
});

describe('CauseCard composes within its own design line (web)', () => {
  it('the base card uses the base meter', () => {
    const { queryByText } = renderCause(CauseCard);
    expect(queryByText('campaign-progress-base')).toBeTruthy();
    expect(queryByText('campaign-progress-v2')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('v2 uses the v2 meter, never the base one', () => {
    const { queryByText } = renderCause(CauseCardV2);
    expect(queryByText('campaign-progress-v2')).toBeTruthy();
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('v3 uses the v3 meter, never the base one', () => {
    const { queryByText } = renderCause(CauseCardV3);
    expect(queryByText('campaign-progress-v3')).toBeTruthy();
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v2')).toBeNull();
  });
});
