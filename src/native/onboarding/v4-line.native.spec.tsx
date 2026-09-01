/**
 * The **V4 onboarding line** (native) — one spec per component, covering the
 * props V4 adds and, just as importantly, the empty states: no illustration,
 * no subtitle, no plans, no features, no providers, one step.
 *
 * The web twin of this file asserts the same things against the same prop
 * names. Keep the two in step — prop parity between the twins is the whole
 * reason an app can move a screen between platforms.
 */
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
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
import type { ReactTestInstance } from 'react-test-renderer';

/**
 * `Icon` marks itself decorative, so its glyph is invisible to the default
 * queries. Anything asserted about a medallion or a badge mark needs this.
 */
const HIDDEN = { includeHiddenElements: true } as const;

const ART = <RNText>hero-art</RNText>;

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
    const withMark = renderThemed(
      <GetStartedButtonV4 label="Claim offer" trailing={<RNText>sparkle</RNText>} />,
      SEED_LIGHT
    );
    expect(withMark.getByText('sparkle')).toBeTruthy();
    withMark.unmount();

    // `trailing={null}` is not the same as omitting it: omitted falls back to
    // `trailingArrow`, which defaults to the arrow.
    const bare = renderThemed(<GetStartedButtonV4 label="Done" trailing={null} />, SEED_LIGHT);
    expect(bare.queryByText('→', HIDDEN)).toBeNull();
  });

  it('still answers `trailingArrow` when `trailing` is omitted', () => {
    const { queryByText } = renderThemed(
      <GetStartedButtonV4 label="Done" trailingArrow={false} />,
      SEED_LIGHT
    );
    expect(queryByText('→', HIDDEN)).toBeNull();
  });
});

describe('ProgressDotsV4', () => {
  it('reports 1-based step positions, not indices', () => {
    // The base announced "0 of 2" on step one of three.
    const { getByLabelText } = renderThemed(
      <ProgressDotsV4 variant="bars" count={3} activeIndex={0} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Step 1 of 3')).toBeTruthy();
  });

  it('renders an empty row for a count of zero rather than throwing', () => {
    const { getByLabelText } = renderThemed(<ProgressDotsV4 count={0} activeIndex={0} />, SEED_LIGHT);
    expect(getByLabelText('Step 0 of 0')).toBeTruthy();
  });
});

describe('TrialBannerV4', () => {
  it('draws a meter only when both ends of the countdown are known', () => {
    // The house query for a progressbar: `*ByRole` does not reach a View whose
    // accessible ancestor already claimed a role (see `ProgressV4`'s spec).
    // `typeof type === 'string'` keeps it to host elements: `findAll` also
    // returns the composite that rendered them, so every match counts twice.
    const meters = (root: ReactTestInstance): ReactTestInstance[] =>
      root.findAll(
        (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'progressbar'
      );

    const withTotal = renderThemed(
      <TrialBannerV4 title="Trial" daysLeft={3} daysTotal={7} />,
      SEED_LIGHT
    );
    expect(meters(withTotal.root).length).toBe(1);
    withTotal.unmount();

    const withoutTotal = renderThemed(<TrialBannerV4 title="Trial" daysLeft={3} />, SEED_LIGHT);
    expect(meters(withoutTotal.root).length).toBe(0);
  });

  it('lets the host write the countdown copy', () => {
    const { getByText } = renderThemed(
      <TrialBannerV4 title="Trial" daysLeft={2} formatDaysLeft={(n) => `noch ${n} Tage`} />,
      SEED_LIGHT
    );
    expect(getByText('noch 2 Tage')).toBeTruthy();
  });

  it('renders nothing without a title', () => {
    const { toJSON } = renderThemed(<TrialBannerV4 title="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('FeatureLockCardV4', () => {
  it('shows the benefits it is selling, capped at three', () => {
    const { queryByText } = renderThemed(
      <FeatureLockCardV4
        title="Unlimited exports"
        benefits={['One', 'Two', 'Three', 'Four']}
        priceHint="From $4.99/mo"
      />,
      SEED_LIGHT
    );
    expect(queryByText('Three')).toBeTruthy();
    expect(queryByText('Four')).toBeNull();
    expect(queryByText('From $4.99/mo')).toBeTruthy();
  });

  it('renders nothing without a title', () => {
    const { toJSON } = renderThemed(<FeatureLockCardV4 title="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('PaywallFeatureRowsV4', () => {
  it('numbers the rows when asked', () => {
    const { getByText } = renderThemed(
      <PaywallFeatureRowsV4
        numbered
        rows={[
          { id: 'a', title: 'Connect' },
          { id: 'b', title: 'Track' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('2', HIDDEN)).toBeTruthy();
  });

  it('renders nothing for an empty list, heading included', () => {
    const { toJSON } = renderThemed(<PaywallFeatureRowsV4 heading="What you get" rows={[]} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('PlanSelectorV4', () => {
  it('lays a single offer out with its compare-at, savings pill and per-unit price', () => {
    const { getByText } = renderThemed(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[OFFER]} />,
      SEED_LIGHT
    );
    expect(getByText('$23.99')).toBeTruthy();
    expect(getByText('$29.99')).toBeTruthy();
    expect(getByText('20% OFF')).toBeTruthy();
    expect(getByText('$0.07/day')).toBeTruthy();
  });

  it('refuses a compare-at price that equals the price it is compared against', () => {
    const fake: PlanTier = { ...OFFER, compareAtAnnualPrice: '$23.99' };
    const { queryAllByText } = renderThemed(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[fake]} />,
      SEED_LIGHT
    );
    // The price itself, once — not once as the price and once struck through.
    expect(queryAllByText('$23.99').length).toBe(1);
  });

  it('announces the struck price as a past fact', () => {
    const { getByLabelText } = renderThemed(
      <PlanSelectorV4 layout="offer" billingPeriod="annual" plans={[OFFER]} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Was $29.99')).toBeTruthy();
  });

  it('shows the empty message rather than a blank box', () => {
    const { getByText } = renderThemed(<PlanSelectorV4 plans={[]} emptyMessage="Nothing yet." />, SEED_LIGHT);
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('PaywallScreenV4', () => {
  it('draws the footer stack: reassurance, CTA, secondary, restore, legal', () => {
    const { getByText } = renderThemed(
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
      />,
      SEED_LIGHT
    );
    ['No commitment · Cancel anytime', 'Claim 20% off', 'No thanks', 'Restore Purchases', 'Terms', 'Privacy'].forEach(
      (copy) => expect(getByText(copy)).toBeTruthy()
    );
  });

  it('maps the older `dismissLabel` into the secondary slot', () => {
    const onDismiss = jest.fn();
    const { getByText } = renderThemed(
      <PaywallScreenV4 title="Go Pro" dismissLabel="Maybe later" onDismiss={onDismiss} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Maybe later'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('composes with nothing but a title', () => {
    const { getByText } = renderThemed(<PaywallScreenV4 title="Go Pro" />, SEED_LIGHT);
    expect(getByText('Go Pro')).toBeTruthy();
  });
});

describe('WelcomeScreenV4', () => {
  it('carries feature rows between the headline and the CTA', () => {
    const { getByText } = renderThemed(
      <WelcomeScreenV4
        title="Your welcome deal"
        features={[
          { id: 'a', title: 'Unlock the full toolkit' },
          { id: 'b', title: 'Save 20% instantly' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Unlock the full toolkit')).toBeTruthy();
  });

  it('composes with no illustration, no subtitle and no header controls', () => {
    const { getByText } = renderThemed(<WelcomeScreenV4 title="Welcome" />, SEED_LIGHT);
    expect(getByText('Welcome')).toBeTruthy();
  });
});

describe('OnboardingSlidesV4', () => {
  const SLIDES = [
    { id: 'a', title: 'Capture anything' },
    { id: 'b', title: 'Find it instantly' },
  ];

  it('lets the host name the forward action', () => {
    const { getByText } = renderThemed(
      <OnboardingSlidesV4 slides={SLIDES} nextLabel="Weiter" />,
      SEED_LIGHT
    );
    expect(getByText('Weiter')).toBeTruthy();
  });

  it('prefers a slide’s own illustration over the carousel-wide one', () => {
    const { getByText } = renderThemed(
      <OnboardingSlidesV4
        slides={[{ id: 'a', title: 'One', illustration: <RNText>slide-art</RNText> }]}
        illustration={ART}
      />,
      SEED_LIGHT
    );
    expect(getByText('slide-art')).toBeTruthy();
  });

  it('shows the empty message for zero slides', () => {
    const { getByText } = renderThemed(
      <OnboardingSlidesV4 slides={[]} emptyMessage="Nothing to show yet." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing to show yet.')).toBeTruthy();
  });
});

describe('InterestPickerV4', () => {
  const OPTIONS = [
    { id: 'a', label: 'Design' },
    { id: 'b', label: 'Code' },
  ];

  it('explains the cap instead of silently refusing a tap', () => {
    const onChange = jest.fn();
    const { getByText } = renderThemed(
      <InterestPickerV4
        options={OPTIONS}
        selectedIds={['a']}
        maxSelections={1}
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    expect(getByText('1 of 1 selected')).toBeTruthy();
    fireEvent.press(getByText('Code'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows the empty message for zero options', () => {
    const { getByText } = renderThemed(
      <InterestPickerV4
        options={[]}
        selectedIds={[]}
        onChange={jest.fn()}
        emptyMessage="No topics."
      />,
      SEED_LIGHT
    );
    expect(getByText('No topics.')).toBeTruthy();
  });
});

describe('PermissionPromptV4', () => {
  it('offers a way to Settings once denied', () => {
    const onOpenSettings = jest.fn();
    const { getByText } = renderThemed(
      <PermissionPromptV4
        title="Turn on alerts"
        rationale="So we can tell you about price drops."
        state="denied"
        settingsLabel="Open Settings"
        onOpenSettings={onOpenSettings}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Open Settings'));
    expect(onOpenSettings).toHaveBeenCalled();
  });

  it('replaces the actions with a confirmation once granted', () => {
    const { queryByText, getByText } = renderThemed(
      <PermissionPromptV4
        title="Turn on alerts"
        rationale="So we can tell you."
        state="granted"
        allowLabel="Allow"
        grantedMessage="You're all set."
      />,
      SEED_LIGHT
    );
    expect(queryByText('Allow')).toBeNull();
    expect(getByText("You're all set.")).toBeTruthy();
  });
});

describe('ProfileSetupV4', () => {
  it('renders a field error as a message, not only a border', () => {
    const { getByText } = renderThemed(
      <ProfileSetupV4
        fields={[{ id: 'name', label: 'Name', error: 'Required' }]}
        values={{ name: '' }}
      />,
      SEED_LIGHT
    );
    expect(getByText('Required')).toBeTruthy();
  });

  it('composes with no fields at all', () => {
    const { getByText } = renderThemed(<ProfileSetupV4 title="Set up your profile" />, SEED_LIGHT);
    expect(getByText('Set up your profile')).toBeTruthy();
  });
});

describe('OtpVerifyV4', () => {
  it('announces each digit with its position in the code', () => {
    const { getByLabelText } = renderThemed(
      <OtpVerifyV4 length={4} value="" onChange={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Digit 3 of 4')).toBeTruthy();
  });

  it('lets the host write the countdown', () => {
    const { getByText } = renderThemed(
      <OtpVerifyV4
        length={4}
        value=""
        onChange={jest.fn()}
        resendCountdown={12}
        formatResendCountdown={(s) => `warte ${s}s`}
      />,
      SEED_LIGHT
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
    const { queryByText } = renderThemed(<SignInScreenV4 {...FIELDS} providers={[]} />, SEED_LIGHT);
    expect(queryByText('or continue with')).toBeNull();
  });

  it('carries the header controls the rest of the funnel has', () => {
    const onBack = jest.fn();
    const { getByLabelText } = renderThemed(
      <SignInScreenV4 {...FIELDS} onBack={onBack} stepCount={3} stepIndex={1} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Step 2 of 3')).toBeTruthy();
    fireEvent.press(getByLabelText('Go back'));
    expect(onBack).toHaveBeenCalled();
  });

  it('hides the forgot-password link on the register screen', () => {
    const { queryByText } = renderThemed(
      <SignInScreenV4 {...FIELDS} mode="register" onForgotPassword={jest.fn()} />,
      SEED_LIGHT
    );
    expect(queryByText('Forgot password?')).toBeNull();
  });
});
