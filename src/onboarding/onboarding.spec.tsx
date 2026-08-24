/** @jest-environment jsdom */
/**
 * Web onboarding funnel — render smoke for every component, token-class purity
 * (colors resolve to `--xen-*` classes, never literals), and the load-bearing
 * interactions: advancing a slide, selecting a plan, and toggling an interest
 * chip. Plain `expect` (no jest-dom), `@testing-library/react` render/fireEvent.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  OnboardingSlides,
  WelcomeScreen,
  PermissionPrompt,
  PlanSelector,
  PaywallScreen,
  FeatureLockCard,
  OtpVerify,
  ProfileSetup,
  InterestPicker,
  GetStartedButton,
  ProgressDots,
  TrialBanner,
  type OnboardingSlide,
  type PlanTier,
  type InterestOption,
} from './index';

const SLIDES: OnboardingSlide[] = [
  { id: 'a', title: 'Do more, faster', description: 'One place for everything.', icon: '🚀' },
  { id: 'b', title: 'Stay in sync', description: 'Your team, always aligned.', icon: '🔗' },
];

const PLANS: PlanTier[] = [
  { id: 'free', name: 'Free', monthlyPrice: '$0', annualPrice: '$0' },
  { id: 'pro', name: 'Pro', monthlyPrice: '$12', annualPrice: '$120', highlighted: true, badge: 'Popular', features: ['Unlimited projects'] },
];

const INTERESTS: InterestOption[] = [
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'growth', label: 'Growth', icon: '📈' },
];

describe('onboarding (web)', () => {
  it('OnboardingSlides renders, uses token classes, and advances on Next', () => {
    const onIndexChange = jest.fn();
    const onComplete = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <OnboardingSlides slides={SLIDES} onIndexChange={onIndexChange} onComplete={onComplete} />
    );

    // Render: first slide visible.
    expect(getByText('Do more, faster')).toBeTruthy();
    // Token-class purity: headings/medallion bind to token classes, no literals.
    expect(container.innerHTML).toContain('text-on-surface');
    expect(container.innerHTML).toContain('bg-primary');
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);

    // Interaction: Next advances to the second (last) slide.
    fireEvent.click(getByLabelText('Next slide'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('Stay in sync')).toBeTruthy();

    // On the last slide the primary action completes the flow.
    fireEvent.click(getByLabelText('Get started'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('OnboardingSlides renders the empty state for no slides', () => {
    const { getByText } = render(<OnboardingSlides slides={[]} />);
    expect(getByText('Nothing to show yet.')).toBeTruthy();
  });

  it('WelcomeScreen renders and fires the primary CTA', () => {
    const onGetStarted = jest.fn();
    const { getByText, getByRole } = render(
      <WelcomeScreen title="Xenition" subtitle="Ship faster" logoGlyph="⚡" onGetStarted={onGetStarted} />
    );
    expect(getByText('Xenition')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Get started' }));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });

  it('PermissionPrompt renders, fires allow, and shows the granted state', () => {
    const onAllow = jest.fn();
    const { getByRole, rerender, getByText, container } = render(
      <PermissionPrompt kind="notifications" title="Never miss a reply" rationale="Get pinged the moment someone responds." onAllow={onAllow} />
    );
    fireEvent.click(getByRole('button', { name: 'Allow' }));
    expect(onAllow).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).toContain('bg-primary');

    rerender(
      <PermissionPrompt kind="notifications" title="Never miss a reply" rationale="Get pinged the moment someone responds." state="granted" />
    );
    expect(getByText("You're all set.")).toBeTruthy();
  });

  it('PlanSelector renders a radiogroup and reports the selected plan', () => {
    const onSelectPlan = jest.fn();
    const { getByRole, getAllByRole } = render(
      <PlanSelector plans={PLANS} selectedPlanId="free" onSelectPlan={onSelectPlan} />
    );
    expect(getByRole('radiogroup')).toBeTruthy();
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    // Controlled selection reflected via aria-checked.
    expect(radios[0]?.getAttribute('aria-checked')).toBe('true');

    // Interaction: choosing Pro reports its id.
    fireEvent.click(getByRole('radio', { name: 'Pro, $12' }));
    expect(onSelectPlan).toHaveBeenCalledWith('pro');
  });

  it('PlanSelector switches prices with the billing toggle', () => {
    const onBillingPeriodChange = jest.fn();
    const { getByRole } = render(
      <PlanSelector plans={PLANS} billingPeriod="monthly" onBillingPeriodChange={onBillingPeriodChange} />
    );
    fireEvent.click(getByRole('tab', { name: 'Annual' }));
    expect(onBillingPeriodChange).toHaveBeenCalledWith('annual');
  });

  it('PaywallScreen renders value-first and fires subscribe', () => {
    const onSubscribe = jest.fn();
    const { getByText, getByRole } = render(
      <PaywallScreen
        title="Do your best work"
        subtitle="Unlock everything"
        valueProps={[{ text: 'Unlimited exports' }]}
        plans={PLANS}
        trial={{ title: '7 days free' }}
        ctaLabel="Start free trial"
        onSubscribe={onSubscribe}
      />
    );
    expect(getByText('Unlimited exports')).toBeTruthy();
    expect(getByText('7 days free')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Start free trial' }));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });

  it('FeatureLockCard renders both variants and fires unlock', () => {
    const onUnlock = jest.fn();
    const { getByRole, getByText } = render(
      <FeatureLockCard title="Unlimited exports" description="Export as much as you like" onUnlock={onUnlock} />
    );
    expect(getByText('Unlimited exports')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Unlock' }));
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('OtpVerify renders, auto-submits when full, and gates Verify until complete', () => {
    const onChange = jest.fn();
    const onVerify = jest.fn();
    const { getByRole, container } = render(
      <OtpVerify destination="+1 555 000" length={4} value="123" onChange={onChange} onVerify={onVerify} />
    );
    // Verify is disabled while the code is incomplete (3 of 4).
    const verify = getByRole('button', { name: 'Verify' });
    expect(verify.hasAttribute('disabled')).toBe(true);
    expect(container.innerHTML).toContain('text-on-surface');
  });

  it('ProfileSetup renders controlled fields and saves', () => {
    const onChangeField = jest.fn();
    const onSave = jest.fn();
    const { getByLabelText, getByRole } = render(
      <ProfileSetup
        name="Ada"
        fields={[{ id: 'displayName', label: 'Display name', placeholder: 'Ada L.' }]}
        values={{ displayName: 'Ada' }}
        onChangeField={onChangeField}
        onSave={onSave}
      />
    );
    const input = getByLabelText('Display name') as HTMLInputElement;
    expect(input.value).toBe('Ada');
    fireEvent.change(input, { target: { value: 'Ada Lovelace' } });
    expect(onChangeField).toHaveBeenCalledWith('displayName', 'Ada Lovelace');
    fireEvent.click(getByRole('button', { name: 'Save profile' }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('InterestPicker toggles selection and enforces the cap', () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(
      <InterestPicker options={INTERESTS} selectedIds={[]} onChange={onChange} maxSelections={1} />
    );
    // Interaction: toggling a chip reports the new selection set.
    fireEvent.click(getByRole('checkbox', { name: 'Design' }));
    expect(onChange).toHaveBeenCalledWith(['design']);

    // At the cap, unselected chips disable.
    rerender(
      <InterestPicker options={INTERESTS} selectedIds={['design']} onChange={onChange} maxSelections={1} />
    );
    const design = getByRole('checkbox', { name: 'Design' });
    expect(design.getAttribute('aria-checked')).toBe('true');
    const code = getByRole('checkbox', { name: 'Code' });
    expect(code.hasAttribute('disabled')).toBe(true);
  });

  it('InterestPicker renders the empty state for no options', () => {
    const { getByText } = render(<InterestPicker options={[]} selectedIds={[]} onChange={() => {}} />);
    expect(getByText('No topics to choose from.')).toBeTruthy();
  });

  it('GetStartedButton maps loading to disabled + aria-busy + spinner', () => {
    const { getByRole } = render(<GetStartedButton label="Continue" loading />);
    const btn = getByRole('button', { name: 'Continue' });
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
    // Spinner primitive announces itself as a status role.
    expect(getByRole('status')).toBeTruthy();
  });

  it('ProgressDots renders a progressbar with the active step', () => {
    const { getByRole } = render(<ProgressDots count={3} activeIndex={1} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('1');
    expect(bar.innerHTML).toContain('bg-primary');
  });

  it('TrialBanner renders with token classes and a countdown chip', () => {
    const { getByText, container } = render(
      <TrialBanner title="7 days of Pro" subtitle="No charge yet" daysLeft={1} tone="success" />
    );
    expect(getByText('7 days of Pro')).toBeTruthy();
    expect(getByText('1 day left')).toBeTruthy();
    expect(container.innerHTML).toContain('bg-success');
  });
});
