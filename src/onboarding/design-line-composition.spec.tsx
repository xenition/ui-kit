/** @jest-environment jsdom */
/**
 * Design-line composition (web). The v2/v3 alternates exist so an app can pick
 * one line and stay in it — every screen it sees is drawn the same way. A
 * composite that reaches back across the line ships a v2 shell with base cards
 * inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * PaywallScreen renders the plan selector from its own line and no other.
 * TrialBanner has no alternate — the base one IS its whole line — which is why
 * it is absent from this file.
 */
import { render } from '@testing-library/react';
import { PaywallScreen } from './PaywallScreen';
import { PaywallScreenV2 } from './PaywallScreenV2';
import { PaywallScreenV3 } from './PaywallScreenV3';
import type { PaywallScreenProps } from './PaywallScreen';

// Each selector is stubbed to a distinguishable marker so the assertion is
// about which module the composite reached for, not about how it looks.
jest.mock('./PlanSelector', () => ({ PlanSelector: () => <p>plan-selector-base</p> }));
jest.mock('./PlanSelectorV2', () => ({ PlanSelectorV2: () => <p>plan-selector-v2</p> }));
jest.mock('./PlanSelectorV3', () => ({ PlanSelectorV3: () => <p>plan-selector-v3</p> }));

const PLANS = [
  { id: 'free', name: 'Free', monthlyPrice: '$0', annualPrice: '$0', features: ['Basics'] },
  { id: 'pro', name: 'Pro', monthlyPrice: '$12', annualPrice: '$120', features: ['Everything'] },
];

const renderPaywall = (Paywall: React.ComponentType<PaywallScreenProps>) =>
  render(<Paywall title="Do your best work" plans={PLANS} />);

describe('PaywallScreen composes within its own design line (web)', () => {
  it('the base paywall uses the base plan selector', () => {
    const { queryByText } = renderPaywall(PaywallScreen);
    expect(queryByText('plan-selector-base')).toBeTruthy();
    expect(queryByText('plan-selector-v2')).toBeNull();
    expect(queryByText('plan-selector-v3')).toBeNull();
  });

  it('v2 uses the v2 plan selector, never the base one', () => {
    const { queryByText } = renderPaywall(PaywallScreenV2);
    expect(queryByText('plan-selector-v2')).toBeTruthy();
    expect(queryByText('plan-selector-base')).toBeNull();
    expect(queryByText('plan-selector-v3')).toBeNull();
  });

  it('v3 uses the v3 plan selector, never the base one', () => {
    const { queryByText } = renderPaywall(PaywallScreenV3);
    expect(queryByText('plan-selector-v3')).toBeTruthy();
    expect(queryByText('plan-selector-base')).toBeNull();
    expect(queryByText('plan-selector-v2')).toBeNull();
  });
});
