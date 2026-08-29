/**
 * Design-line composition (native). The V2/V3 alternates exist so an app can
 * pick one line and stay in it — every screen it sees is drawn the same way.
 * A composite that reaches back across the line ships a V2 shell with base
 * cards inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * PaywallScreen renders the plan selector from its own line and no other.
 * TrialBanner has no alternate — the base one IS its whole line — which is why
 * it is absent from this file.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { PaywallScreen } from './PaywallScreen';
import { PaywallScreenV2 } from './PaywallScreenV2';
import { PaywallScreenV3 } from './PaywallScreenV3';
import type { PaywallScreenProps } from './PaywallScreen';
import type { PlanTier } from './types';

// Each selector is stubbed to a distinguishable marker so the assertion is
// about which module the composite reached for, not about how it looks.
jest.mock('./PlanSelector', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { PlanSelector: () => react.createElement(Text, null, 'plan-selector-base') };
});
jest.mock('./PlanSelectorV2', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { PlanSelectorV2: () => react.createElement(Text, null, 'plan-selector-v2') };
});
jest.mock('./PlanSelectorV3', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { PlanSelectorV3: () => react.createElement(Text, null, 'plan-selector-v3') };
});

const PLANS: PlanTier[] = [
  { id: 'free', name: 'Free', monthlyPrice: '$0', annualPrice: '$0', features: ['Basics'] },
  { id: 'pro', name: 'Pro', monthlyPrice: '$12', annualPrice: '$120', features: ['Everything'] },
];

const renderPaywall = (Paywall: React.ComponentType<PaywallScreenProps>) =>
  renderThemed(<Paywall title="Do your best work" plans={PLANS} />, SEED_LIGHT);

describe('PaywallScreen composes within its own design line (native)', () => {
  it('the base paywall uses the base plan selector', () => {
    const { queryByText } = renderPaywall(PaywallScreen);
    expect(queryByText('plan-selector-base')).toBeTruthy();
    expect(queryByText('plan-selector-v2')).toBeNull();
    expect(queryByText('plan-selector-v3')).toBeNull();
  });

  it('V2 uses the V2 plan selector, never the base one', () => {
    const { queryByText } = renderPaywall(PaywallScreenV2);
    expect(queryByText('plan-selector-v2')).toBeTruthy();
    expect(queryByText('plan-selector-base')).toBeNull();
    expect(queryByText('plan-selector-v3')).toBeNull();
  });

  it('V3 uses the V3 plan selector, never the base one', () => {
    const { queryByText } = renderPaywall(PaywallScreenV3);
    expect(queryByText('plan-selector-v3')).toBeTruthy();
    expect(queryByText('plan-selector-base')).toBeNull();
    expect(queryByText('plan-selector-v2')).toBeNull();
  });
});
