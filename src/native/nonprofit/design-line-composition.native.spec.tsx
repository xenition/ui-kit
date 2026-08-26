/**
 * Design-line composition (native). The V2/V3 alternates exist so an app can
 * pick one line and stay in it — every screen it sees is drawn the same way.
 * A composite that reaches back across the line ships a V2 shell with base
 * parts inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * FundraiserCard renders the progress meter from its own line and no other.
 *
 * The native line is not shaped like the web one, so this file asserts less
 * than its web twin and says why. Only the base card and V2 compose a
 * `CampaignProgress` at all: FundraiserCardV3 — and both CauseCard alternates —
 * draw their own bar inline from the `goalPct` helper in `./internal` rather
 * than delegating to the meter. That is their design, not a reach across the
 * line, so the assertion for V3 is that it composes *no* meter — which is also
 * what stops someone "fixing" it later by dropping the base meter in.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { FundraiserCard } from './FundraiserCard';
import { FundraiserCardV2 } from './FundraiserCardV2';
import { FundraiserCardV3 } from './FundraiserCardV3';
import type { FundraiserCardProps } from './FundraiserCard';

// Each meter is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./CampaignProgress', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CampaignProgress: () => react.createElement(Text, null, 'campaign-progress-base') };
});
jest.mock('./CampaignProgressV2', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CampaignProgressV2: () => react.createElement(Text, null, 'campaign-progress-v2') };
});
jest.mock('./CampaignProgressV3', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CampaignProgressV3: () => react.createElement(Text, null, 'campaign-progress-v3') };
});

const renderFundraiser = (Card: React.ComponentType<FundraiserCardProps>) =>
  renderThemed(
    <Card title="Rebuild the library" organizerName="Ada" raisedCents={45_00} goalCents={100_00} />,
    SEED_LIGHT
  );

describe('FundraiserCard composes within its own design line (native)', () => {
  it('the base card uses the base meter', () => {
    const { queryByText } = renderFundraiser(FundraiserCard);
    expect(queryByText('campaign-progress-base')).toBeTruthy();
    expect(queryByText('campaign-progress-v2')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('V2 uses the V2 meter, never the base one', () => {
    const { queryByText } = renderFundraiser(FundraiserCardV2);
    expect(queryByText('campaign-progress-v2')).toBeTruthy();
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });

  it('V3 draws its own bar and composes no meter from any line', () => {
    const { queryByText } = renderFundraiser(FundraiserCardV3);
    expect(queryByText('campaign-progress-base')).toBeNull();
    expect(queryByText('campaign-progress-v2')).toBeNull();
    expect(queryByText('campaign-progress-v3')).toBeNull();
  });
});
