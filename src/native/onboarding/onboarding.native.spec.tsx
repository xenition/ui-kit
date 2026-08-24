import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { OnboardingSlides } from './OnboardingSlides';
import { WelcomeScreen } from './WelcomeScreen';
import { PermissionPrompt } from './PermissionPrompt';
import { PlanSelector } from './PlanSelector';
import { PaywallScreen } from './PaywallScreen';
import { FeatureLockCard } from './FeatureLockCard';
import { OtpVerify } from './OtpVerify';
import { InterestPicker } from './InterestPicker';
import { ProgressDots } from './ProgressDots';
import { TrialBanner } from './TrialBanner';
import type { PlanTier, InterestOption, OnboardingSlide } from './types';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const SLIDES: OnboardingSlide[] = [
  { id: 'a', title: 'Capture anything', description: 'One inbox for every idea.', icon: '💡' },
  { id: 'b', title: 'Find it instantly', description: 'Search across everything.', icon: '🔍' },
];

const PLANS: PlanTier[] = [
  { id: 'free', name: 'Free', monthlyPrice: '$0', annualPrice: '$0' },
  { id: 'pro', name: 'Pro', monthlyPrice: '$12', annualPrice: '$120', badge: 'Popular', highlighted: true },
];

const INTERESTS: InterestOption[] = [
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'ai', label: 'AI', icon: '🤖' },
];

describe('OnboardingSlides (native)', () => {
  it('mounts, stays token-pure, and advances on Next', () => {
    const onIndexChange = jest.fn();
    const { getByText, root } = renderThemed(
      <OnboardingSlides slides={SLIDES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    expect(getByText('Capture anything')).toBeTruthy();
    assertTokenPure(root);

    fireEvent.press(getByText('Next'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    // uncontrolled → the second slide is now shown.
    expect(getByText('Find it instantly')).toBeTruthy();
  });

  it('fires onComplete on the final slide', () => {
    const onComplete = jest.fn();
    const { getByText } = renderThemed(
      <OnboardingSlides slides={SLIDES} index={1} onComplete={onComplete} finishLabel="Get started" />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Get started'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('WelcomeScreen (native)', () => {
  it('renders headline + CTA and is token-pure', () => {
    const onGetStarted = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <WelcomeScreen title="Xenition" subtitle="Your work, unified." logoGlyph="⚡" onGetStarted={onGetStarted} primaryLabel="Create my account" />,
      SEED_LIGHT
    );
    expect(getByText('Xenition')).toBeTruthy();
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Create my account'));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });
});

describe('PermissionPrompt (native)', () => {
  it('explains then fires onAllow when the user opts in', () => {
    const onAllow = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <PermissionPrompt kind="notifications" title="Never miss a reply" rationale="We'll ping you when someone responds." onAllow={onAllow} />,
      SEED_LIGHT
    );
    expect(getByText('Never miss a reply')).toBeTruthy();
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Allow'));
    expect(onAllow).toHaveBeenCalledTimes(1);
  });

  it('renders the granted state without action buttons', () => {
    const { getByText, queryByLabelText } = renderThemed(
      <PermissionPrompt title="Notifications on" rationale="Done." state="granted" />,
      SEED_LIGHT
    );
    expect(getByText("You're all set.")).toBeTruthy();
    expect(queryByLabelText('Allow')).toBeNull();
  });
});

describe('PlanSelector (native)', () => {
  it('exposes a radiogroup and selects a plan on press', () => {
    const onSelectPlan = jest.fn();
    const { getByLabelText, getAllByRole, root } = renderThemed(
      <PlanSelector plans={PLANS} selectedPlanId="free" onSelectPlan={onSelectPlan} />,
      SEED_LIGHT
    );
    // the group carries role="radiogroup" (asserted via its accessible name).
    expect(getByLabelText('Choose a plan')).toBeTruthy();
    assertTokenPure(root);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    fireEvent.press(radios[1]);
    expect(onSelectPlan).toHaveBeenCalledWith('pro');
  });

  it('swaps the price when billing switches to annual', () => {
    const { getByText } = renderThemed(
      <PlanSelector plans={PLANS} billingPeriod="annual" selectedPlanId="pro" />,
      SEED_LIGHT
    );
    expect(getByText('$120')).toBeTruthy();
  });
});

describe('PaywallScreen (native)', () => {
  it('leads with value props then fires onSubscribe', () => {
    const onSubscribe = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <PaywallScreen
        title="Do your best work"
        subtitle="Unlock the full kit."
        valueProps={[{ text: 'Unlimited projects' }, { text: 'Priority support' }]}
        plans={PLANS}
        selectedPlanId="pro"
        ctaLabel="Start free trial"
        onSubscribe={onSubscribe}
        footnote="Cancel anytime."
      />,
      SEED_LIGHT
    );
    expect(getByText('Unlimited projects')).toBeTruthy();
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Start free trial'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });
});

describe('InterestPicker (native)', () => {
  it('toggles a chip and reports the next selection set', () => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <InterestPicker options={INTERESTS} selectedIds={[]} onChange={onChange} title="What are you into?" />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Design'));
    expect(onChange).toHaveBeenCalledWith(['design']);
  });

  it('announces the selected count and honors maxSelections', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <InterestPicker options={INTERESTS} selectedIds={['design']} onChange={onChange} maxSelections={1} accessibilityLabel="Topics" />,
      SEED_LIGHT
    );
    // group announces the running count.
    expect(getByLabelText('Topics, 1 selected')).toBeTruthy();
    // at cap → pressing an unselected chip is a no-op.
    fireEvent.press(getByLabelText('Code'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('OtpVerify (native)', () => {
  it('auto-submits once the code fills', () => {
    const onVerify = jest.fn();
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <OtpVerify length={4} value="123" destination="+1 555" onChange={onChange} onVerify={onVerify} />,
      SEED_LIGHT
    );
    const inputs = UNSAFE_getAllByType(require('react-native').TextInput);
    fireEvent.changeText(inputs[3], '4');
    expect(onChange).toHaveBeenCalledWith('1234');
    expect(onVerify).toHaveBeenCalledWith('1234');
  });
});

describe('FeatureLockCard / ProgressDots / TrialBanner (native)', () => {
  it('FeatureLockCard fires onUnlock and is token-pure', () => {
    const onUnlock = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <FeatureLockCard title="Unlimited exports" description="Export as much as you like." onUnlock={onUnlock} unlockLabel="Unlock exports" />,
      SEED_LIGHT
    );
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Unlock exports'));
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('ProgressDots reports position and pressing a dot navigates', () => {
    const onDotPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProgressDots count={3} activeIndex={0} onDotPress={onDotPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Go to step 3'));
    expect(onDotPress).toHaveBeenCalledWith(2);
  });

  it('TrialBanner renders a countdown chip', () => {
    const { getByText, root } = renderThemed(
      <TrialBanner title="7 days of Pro, on us" subtitle="No charge yet" daysLeft={7} />,
      SEED_LIGHT
    );
    expect(getByText('7 days left')).toBeTruthy();
    assertTokenPure(root);
  });
});
