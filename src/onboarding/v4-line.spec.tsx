/** @jest-environment jsdom */
/**
 * The **V4 onboarding line** (web) — the twin of
 * `native/onboarding/v4-line.native.spec.tsx`, asserting the same things
 * against the same prop names. Keep the two in step: prop parity between the
 * twins is the whole reason an app can move a screen between platforms.
 *
 * Every block covers the props V4 adds and the empty state that goes with
 * them — no illustration, no plans, no features, no providers, one step.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import { TrialBannerV4 } from './TrialBannerV4';
import { FeatureLockCardV4 } from './FeatureLockCardV4';
import { PaywallFeatureRowsV4 } from './PaywallFeatureRowsV4';
import { PlanSelectorV4 } from './PlanSelectorV4';
import { PaywallScreenV4 } from './PaywallScreenV4';
import { WelcomeScreenV4 } from './WelcomeScreenV4';
import { OnboardingSlidesV4 } from './OnboardingSlidesV4';
import { InterestPickerV4 } from './InterestPickerV4';
import { PermissionPromptV4 } from './PermissionPromptV4';
import { ProfileSetupV4 } from './ProfileSetupV4';
import { OtpVerifyV4 } from './OtpVerifyV4';
import { SignInScreenV4 } from './SignInScreenV4';
import type { PlanTier } from './types';

const OFFER: PlanTier = {
  id: 'yearly',
  name: 'Yearly plan',
  monthlyPrice: '$2.99',
  annualPrice: '$23.99',
  compareAtAnnualPrice: '$29.99',
  savingsLabel: '20% OFF',
  perUnitPrice: '$0.07/day',
  priceCaption: '/ year',
};

describe('GetStartedButtonV4', () => {
  it('takes any node as the trailing mark, and `null` for none', () => {
    const withMark = render(
      <GetStartedButtonV4 label="Claim offer" trailing={<span>sparkle</span>} />
    );
    expect(withMark.getByText('sparkle')).toBeTruthy();
    withMark.unmount();

    // `trailing={null}` is not the same as omitting it: omitted falls back to
    // `trailingArrow`, which defaults to the arrow.
    const bare = render(<GetStartedButtonV4 label="Done" trailing={null} />);
    expect(bare.queryByText('→')).toBeNull();
  });

  it('still answers `trailingArrow` when `trailing` is omitted', () => {
    const { queryByText } = render(<GetStartedButtonV4 label="Done" trailingArrow={false} />);
    expect(queryByText('→')).toBeNull();
  });
});

describe('ProgressDotsV4', () => {
  it('reports 1-based step positions, not indices', () => {
    // The base reported `valuemin=0 / valuemax=count-1 / valuenow=activeIndex`,
    // so a screen reader on step one of three announced "0 of 2".
    const { getByRole } = render(<ProgressDotsV4 variant="bars" count={3} activeIndex={0} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('1');
    expect(bar.getAttribute('aria-valuemax')).toBe('3');
  });

  it('renders an empty row for a count of zero rather than throwing', () => {
    const { getByRole } = render(<ProgressDotsV4 count={0} activeIndex={0} />);
    expect(getByRole('progressbar')).toBeTruthy();
  });
});

describe('TrialBannerV4', () => {
  it('draws a meter only when both ends of the countdown are known', () => {
    const withTotal = render(<TrialBannerV4 title="Trial" daysLeft={3} daysTotal={7} />);
    expect(withTotal.getAllByRole('progressbar').length).toBe(1);
    withTotal.unmount();

    const withoutTotal = render(<TrialBannerV4 title="Trial" daysLeft={3} />);
    expect(withoutTotal.queryAllByRole('progressbar').length).toBe(0);
  });

  it('lets the host write the countdown copy', () => {
    const { getByText } = render(
      <TrialBannerV4 title="Trial" daysLeft={2} formatDaysLeft={(n) => `noch ${n} Tage`} />
    );
    expect(getByText('noch 2 Tage')).toBeTruthy();
  });

  it('renders nothing without a title', () => {
    const { container } = render(<TrialBannerV4 title="" />);
    expect(container.firstChild).toBeNull();
  });
});

describe('FeatureLockCardV4', () => {
  it('shows the benefits it is selling, capped at three', () => {
    const { queryByText } = render(
      <FeatureLockCardV4
        title="Unlimited exports"
        benefits={['One', 'Two', 'Three', 'Four']}
        priceHint="From $4.99/mo"
      />
    );
    expect(queryByText('Three')).toBeTruthy();
    expect(queryByText('Four')).toBeNull();
    expect(queryByText('From $4.99/mo')).toBeTruthy();
  });

  it('renders nothing without a title', () => {
    const { container } = render(<FeatureLockCardV4 title="" />);
    expect(container.firstChild).toBeNull();
  });
});

describe('PaywallFeatureRowsV4', () => {
  it('numbers the rows when asked', () => {
    const { getByText } = render(
      <PaywallFeatureRowsV4
        numbered
        rows={[
          { id: 'a', title: 'Connect' },
          { id: 'b', title: 'Track' },
        ]}
      />
    );
    expect(getByText('2')).toBeTruthy();
  });

  it('renders nothing for an empty list, heading included', () => {
    const { container } = render(<PaywallFeatureRowsV4 heading="What you get" rows={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('PlanSelectorV4', () => {
  it('lays a single offer out with its compare-at, savings pill and per-unit price', () => {
    const { getByText } = render(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[OFFER]} />
    );
    expect(getByText('$23.99')).toBeTruthy();
    expect(getByText('$29.99')).toBeTruthy();
    expect(getByText('20% OFF')).toBeTruthy();
    expect(getByText('$0.07/day')).toBeTruthy();
  });

  it('refuses a compare-at price that equals the price it is compared against', () => {
    const fake: PlanTier = { ...OFFER, compareAtAnnualPrice: '$23.99' };
    const { queryAllByText } = render(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[fake]} />
    );
    // The price itself, once — not once as the price and once struck through.
    expect(queryAllByText('$23.99').length).toBe(1);
  });

  it('announces the struck price as a past fact', () => {
    const { getByLabelText } = render(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[OFFER]} />
    );
    expect(getByLabelText('Was $29.99')).toBeTruthy();
  });

  it('shows the empty message rather than a blank box', () => {
    const { getByText } = render(<PlanSelectorV4 plans={[]} emptyMessage="Nothing yet." />);
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('PaywallScreenV4', () => {
  it('draws the footer stack: reassurance, CTA, secondary, restore, legal', () => {
    const { getByText } = render(
      <PaywallScreenV4
        title="You're all set to save"
        ctaLabel="Claim 20% off"
        reassurance="No commitment · Cancel anytime"
        secondaryLabel="No thanks"
        onSecondary={jest.fn()}
        restoreLabel="Restore Purchases"
        onRestore={jest.fn()}
        legalLinks={[
          { id: 'terms', label: 'Terms' },
          { id: 'privacy', label: 'Privacy' },
        ]}
      />
    );
    [
      'No commitment · Cancel anytime',
      'Claim 20% off',
      'No thanks',
      'Restore Purchases',
      'Terms',
      'Privacy',
    ].forEach((copy) => expect(getByText(copy)).toBeTruthy());
  });

  it('maps the older `dismissLabel` into the secondary slot', () => {
    const onDismiss = jest.fn();
    const { getByText } = render(
      <PaywallScreenV4 title="Go Pro" dismissLabel="Maybe later" onDismiss={onDismiss} />
    );
    fireEvent.click(getByText('Maybe later'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('composes with nothing but a title', () => {
    const { getByText } = render(<PaywallScreenV4 title="Go Pro" />);
    expect(getByText('Go Pro')).toBeTruthy();
  });
});

describe('WelcomeScreenV4', () => {
  it('carries feature rows between the headline and the CTA', () => {
    const { getByText } = render(
      <WelcomeScreenV4
        title="Your welcome deal"
        features={[
          { id: 'a', title: 'Unlock the full toolkit' },
          { id: 'b', title: 'Save 20% instantly' },
        ]}
      />
    );
    expect(getByText('Unlock the full toolkit')).toBeTruthy();
  });

  it('composes with no illustration, no subtitle and no header controls', () => {
    const { getByText } = render(<WelcomeScreenV4 title="Welcome" />);
    expect(getByText('Welcome')).toBeTruthy();
  });
});

describe('OnboardingSlidesV4', () => {
  const SLIDES = [
    { id: 'a', title: 'Capture anything' },
    { id: 'b', title: 'Find it instantly' },
  ];

  it('lets the host name the forward action', () => {
    const { getByText } = render(<OnboardingSlidesV4 slides={SLIDES} nextLabel="Weiter" />);
    expect(getByText('Weiter')).toBeTruthy();
  });

  it('prefers a slide’s own illustration over the carousel-wide one', () => {
    const { getByText } = render(
      <OnboardingSlidesV4
        slides={[{ id: 'a', title: 'One', illustration: <span>slide-art</span> }]}
        illustration={<span>hero-art</span>}
      />
    );
    expect(getByText('slide-art')).toBeTruthy();
  });

  it('shows the empty message for zero slides', () => {
    const { getByText } = render(
      <OnboardingSlidesV4 slides={[]} emptyMessage="Nothing to show yet." />
    );
    expect(getByText('Nothing to show yet.')).toBeTruthy();
  });
});

describe('InterestPickerV4', () => {
  const OPTIONS = [
    { id: 'a', label: 'Design' },
    { id: 'b', label: 'Code' },
  ];

  it('explains the cap instead of silently refusing a click', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <InterestPickerV4
        options={OPTIONS}
        selectedIds={['a']}
        maxSelections={1}
        onChange={onChange}
      />
    );
    expect(getByText('1 of 1 selected')).toBeTruthy();
    fireEvent.click(getByText('Code'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows the empty message for zero options', () => {
    const { getByText } = render(
      <InterestPickerV4
        options={[]}
        selectedIds={[]}
        onChange={jest.fn()}
        emptyMessage="No topics."
      />
    );
    expect(getByText('No topics.')).toBeTruthy();
  });
});

describe('PermissionPromptV4', () => {
  it('offers a way to Settings once denied', () => {
    const onOpenSettings = jest.fn();
    const { getByText } = render(
      <PermissionPromptV4
        title="Turn on alerts"
        rationale="So we can tell you about price drops."
        state="denied"
        settingsLabel="Open Settings"
        onOpenSettings={onOpenSettings}
      />
    );
    fireEvent.click(getByText('Open Settings'));
    expect(onOpenSettings).toHaveBeenCalled();
  });

  it('replaces the actions with a confirmation once granted', () => {
    const { queryByText, getByText } = render(
      <PermissionPromptV4
        title="Turn on alerts"
        rationale="So we can tell you."
        state="granted"
        allowLabel="Allow"
        grantedMessage="You're all set."
      />
    );
    expect(queryByText('Allow')).toBeNull();
    expect(getByText("You're all set.")).toBeTruthy();
  });
});

describe('ProfileSetupV4', () => {
  it('renders a field error as a message, not only a border', () => {
    const { getByText } = render(
      <ProfileSetupV4
        fields={[{ id: 'name', label: 'Name', error: 'Required' }]}
        values={{ name: '' }}
      />
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('maps `keyboard` onto an input type, which the base dropped on this twin', () => {
    const { getByLabelText } = render(
      <ProfileSetupV4
        fields={[{ id: 'phone', label: 'Phone', keyboard: 'phone-pad' }]}
        values={{ phone: '' }}
      />
    );
    expect(getByLabelText('Phone').getAttribute('type')).toBe('tel');
  });

  it('composes with no fields at all', () => {
    const { getByText } = render(<ProfileSetupV4 title="Set up your profile" />);
    expect(getByText('Set up your profile')).toBeTruthy();
  });
});

describe('OtpVerifyV4', () => {
  it('announces each digit with its position in the code', () => {
    const { getByLabelText } = render(<OtpVerifyV4 length={4} value="" onChange={jest.fn()} />);
    expect(getByLabelText('Digit 3 of 4')).toBeTruthy();
  });

  it('lets the host write the countdown', () => {
    const { getByText } = render(
      <OtpVerifyV4
        length={4}
        value=""
        onChange={jest.fn()}
        resendCountdown={12}
        formatResendCountdown={(s) => `warte ${s}s`}
      />
    );
    expect(getByText('warte 12s')).toBeTruthy();
  });
});

describe('SignInScreenV4', () => {
  const FIELDS = {
    email: '',
    onEmailChange: jest.fn(),
    password: '',
    onPasswordChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('shows no provider divider when there are no providers', () => {
    const { queryByText } = render(<SignInScreenV4 {...FIELDS} providers={[]} />);
    expect(queryByText('or continue with')).toBeNull();
  });

  it('carries the header controls the rest of the funnel has', () => {
    const onBack = jest.fn();
    const { getByRole, getByLabelText } = render(
      <SignInScreenV4 {...FIELDS} onBack={onBack} stepCount={3} stepIndex={1} />
    );
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('2');
    fireEvent.click(getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalled();
  });

  it('hides the forgot-password link on the register screen', () => {
    const { queryByText } = render(
      <SignInScreenV4 {...FIELDS} mode="register" onForgotPassword={jest.fn()} />
    );
    expect(queryByText('Forgot password?')).toBeNull();
  });
});
