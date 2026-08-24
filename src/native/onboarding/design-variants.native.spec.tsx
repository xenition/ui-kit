import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { OnboardingSlidesV2 } from './OnboardingSlidesV2';
import { OnboardingSlidesV3 } from './OnboardingSlidesV3';
import { WelcomeScreenV2 } from './WelcomeScreenV2';
import { WelcomeScreenV3 } from './WelcomeScreenV3';
import { PlanSelectorV2 } from './PlanSelectorV2';
import { PlanSelectorV3 } from './PlanSelectorV3';
import { PaywallScreenV2 } from './PaywallScreenV2';
import { PaywallScreenV3 } from './PaywallScreenV3';
import type { OnboardingSlide, PlanTier } from './types';
import type { ThemeSeed } from '../../theme/types';
import type { ReactTestInstance } from 'react-test-renderer';

/** Every rendered hex must trace to a compiled-theme token (no literals). */
const assertTokenPure = (root: ReactTestInstance, seed: ThemeSeed): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

const SLIDES: OnboardingSlide[] = [
  { id: 'a', title: 'Capture anything', description: 'One inbox for every idea.', icon: '💡' },
  { id: 'b', title: 'Find it instantly', description: 'Search across everything.', icon: '🔍' },
];

const PLANS: PlanTier[] = [
  { id: 'free', name: 'Free', monthlyPrice: '$0', annualPrice: '$0', features: ['Basics'] },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: '$12',
    annualPrice: '$120',
    priceCaption: '/mo',
    badge: 'Popular',
    highlighted: true,
    features: ['Unlimited projects', 'Priority support'],
  },
];

const VALUE_PROPS = [{ text: 'Work offline anywhere' }, { text: 'Export to PDF', icon: '⚡' }];

const SEEDS: ReadonlyArray<[string, ThemeSeed]> = [
  ['light', SEED_LIGHT],
  ['dark', SEED_DARK],
];

describe('OnboardingSlides V2/V3 (design variants)', () => {
  it.each(SEEDS)('V2 mounts + token-pure (%s) and advances on Next', (_name, seed) => {
    const onIndexChange = jest.fn();
    const { getByText, root } = renderThemed(
      <OnboardingSlidesV2 slides={SLIDES} onIndexChange={onIndexChange} />,
      seed
    );
    expect(getByText('Capture anything')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByText('Next'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('Find it instantly')).toBeTruthy();
  });

  it.each(SEEDS)('V3 mounts + token-pure (%s) and advances on Next', (_name, seed) => {
    const onIndexChange = jest.fn();
    const { getByText, root } = renderThemed(
      <OnboardingSlidesV3 slides={SLIDES} onIndexChange={onIndexChange} />,
      seed
    );
    expect(getByText('Capture anything')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByText('Next'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('Find it instantly')).toBeTruthy();
  });

  it('both variants render the empty state for an empty list', () => {
    expect(renderThemed(<OnboardingSlidesV2 slides={[]} />, SEED_LIGHT).getByText('Nothing to show yet.')).toBeTruthy();
    expect(renderThemed(<OnboardingSlidesV3 slides={[]} />, SEED_LIGHT).getByText('Nothing to show yet.')).toBeTruthy();
  });
});

describe('WelcomeScreen V2/V3 (design variants)', () => {
  it.each(SEEDS)('V2 renders headline + CTA, token-pure (%s), fires CTA', (_name, seed) => {
    const onGetStarted = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <WelcomeScreenV2 title="Xenition" subtitle="Your work, unified." logoGlyph="⚡" onGetStarted={onGetStarted} primaryLabel="Create my account" />,
      seed
    );
    expect(getByText('Xenition')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Create my account'));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });

  it.each(SEEDS)('V3 renders headline + CTA, token-pure (%s), fires CTA', (_name, seed) => {
    const onGetStarted = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <WelcomeScreenV3 title="Xenition" subtitle="Your work, unified." logoGlyph="⚡" onGetStarted={onGetStarted} primaryLabel="Create my account" />,
      seed
    );
    expect(getByText('Xenition')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Create my account'));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });
});

describe('PlanSelector V2/V3 (design variants)', () => {
  it.each(SEEDS)('V2 exposes a radiogroup, token-pure (%s), selects on press', (_name, seed) => {
    const onSelectPlan = jest.fn();
    const { getByLabelText, getAllByRole, root } = renderThemed(
      <PlanSelectorV2 plans={PLANS} selectedPlanId="free" onSelectPlan={onSelectPlan} />,
      seed
    );
    expect(getByLabelText('Choose a plan')).toBeTruthy();
    assertTokenPure(root, seed);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    fireEvent.press(radios[1]);
    expect(onSelectPlan).toHaveBeenCalledWith('pro');
  });

  it.each(SEEDS)('V3 exposes a radiogroup, token-pure (%s), selects on press', (_name, seed) => {
    const onSelectPlan = jest.fn();
    const { getByLabelText, getAllByRole, root } = renderThemed(
      <PlanSelectorV3 plans={PLANS} selectedPlanId="free" onSelectPlan={onSelectPlan} />,
      seed
    );
    expect(getByLabelText('Choose a plan')).toBeTruthy();
    assertTokenPure(root, seed);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    fireEvent.press(radios[1]);
    expect(onSelectPlan).toHaveBeenCalledWith('pro');
  });

  it('V3 swaps to the annual price', () => {
    const { getByText } = renderThemed(
      <PlanSelectorV3 plans={PLANS} billingPeriod="annual" selectedPlanId="pro" />,
      SEED_LIGHT
    );
    expect(getByText('$120')).toBeTruthy();
  });

  it('both variants render the empty state', () => {
    expect(renderThemed(<PlanSelectorV2 plans={[]} />, SEED_LIGHT).getByText('No plans available.')).toBeTruthy();
    expect(renderThemed(<PlanSelectorV3 plans={[]} />, SEED_LIGHT).getByText('No plans available.')).toBeTruthy();
  });
});

describe('PaywallScreen V2/V3 (design variants)', () => {
  it.each(SEEDS)('V2 leads with value + fires onSubscribe, token-pure (%s)', (_name, seed) => {
    const onSubscribe = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <PaywallScreenV2
        title="Do your best work"
        subtitle="Unlock the full kit."
        valueProps={VALUE_PROPS}
        plans={PLANS}
        selectedPlanId="pro"
        trial={{ title: '7 days free', subtitle: 'No charge yet', daysLeft: 7 }}
        ctaLabel="Start free trial"
        onSubscribe={onSubscribe}
        footnote="Cancel anytime."
        dismissLabel="Maybe later"
        onDismiss={jest.fn()}
      />,
      seed
    );
    expect(getByText('Work offline anywhere')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Start free trial'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });

  it.each(SEEDS)('V3 comparison table + fires onSubscribe, token-pure (%s)', (_name, seed) => {
    const onSubscribe = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <PaywallScreenV3
        title="Do your best work"
        subtitle="Unlock the full kit."
        valueProps={VALUE_PROPS}
        plans={PLANS}
        selectedPlanId="pro"
        trial={{ title: '7 days free', subtitle: 'No charge yet', daysLeft: 7 }}
        ctaLabel="Start free trial"
        onSubscribe={onSubscribe}
        footnote="Cancel anytime."
      />,
      seed
    );
    expect(getByText('Work offline anywhere')).toBeTruthy();
    assertTokenPure(root, seed);
    fireEvent.press(getByLabelText('Start free trial'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });
});
