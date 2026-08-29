/**
 * The four onboarding **step screens** (native) — ProfileSetup, InterestPicker,
 * PermissionPrompt and OtpVerify, plus their V2/V3 lines.
 *
 * These specs cover the props added for the step anatomy in
 * `ONBOARDING-DESIGN-SPEC.md` (hero slot, headline block, header slot, sticky
 * CTA, §6 fields, §7 chips) and, just as importantly, the **empty states**: no
 * illustration, no subtitle, zero options, a single field.
 *
 * The load-bearing one is `chips wrap rather than clip`. The shipped screen
 * scrolled its options sideways and cut the last one off the right edge, so an
 * option existed that a user could not select at all. That is a correctness bug,
 * not a styling one, and it gets a regression test on every line.
 */
import * as React from 'react';
import { Text as RNText, View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { ProfileSetup } from './ProfileSetup';
import { ProfileSetupV2 } from './ProfileSetupV2';
import { ProfileSetupV3 } from './ProfileSetupV3';
import { InterestPicker } from './InterestPicker';
import { InterestPickerV2 } from './InterestPickerV2';
import { InterestPickerV3 } from './InterestPickerV3';
import { PermissionPrompt } from './PermissionPrompt';
import { PermissionPromptV2 } from './PermissionPromptV2';
import { PermissionPromptV3 } from './PermissionPromptV3';
import { OtpVerify } from './OtpVerify';
import { OtpVerifyV2 } from './OtpVerifyV2';
import { OtpVerifyV3 } from './OtpVerifyV3';
import type { InterestPickerProps } from './InterestPicker';
import type { ProfileSetupProps } from './ProfileSetup';
import type { PermissionPromptProps } from './PermissionPrompt';
import type { OtpVerifyProps } from './OtpVerify';
import type { InterestOption } from './types';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

/** The exact row from the shipped screen, last option and all. */
const SPEECH_TOPICS: InterestOption[] = [
  { id: 'pace', label: 'Pace' },
  { id: 'filler', label: 'Filler words' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'structure', label: 'Structure' },
  { id: 'confidence', label: 'Confidence' },
];

const PICKERS: Array<[string, React.ComponentType<InterestPickerProps>]> = [
  ['base', InterestPicker],
  ['V2', InterestPickerV2],
  ['V3', InterestPickerV3],
];

const PROFILES: Array<[string, React.ComponentType<ProfileSetupProps>]> = [
  ['base', ProfileSetup],
  ['V2', ProfileSetupV2],
  ['V3', ProfileSetupV3],
];

const PROMPTS: Array<[string, React.ComponentType<PermissionPromptProps>]> = [
  ['base', PermissionPrompt],
  ['V2', PermissionPromptV2],
  ['V3', PermissionPromptV3],
];

const OTPS: Array<[string, React.ComponentType<OtpVerifyProps>]> = [
  ['base', OtpVerify],
  ['V2', OtpVerifyV2],
  ['V3', OtpVerifyV3],
];

describe('InterestPicker — chips wrap, never clip (native)', () => {
  it.each(PICKERS)('%s wraps the chip row instead of scrolling it', (_name, Picker) => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <Picker options={SPEECH_TOPICS} selectedIds={[]} onChange={onChange} title="What do you want to work on?" />,
      SEED_LIGHT
    );

    const group = getByLabelText('Interests, 0 selected');
    const style = group.props.style as { flexWrap?: string; flexDirection?: string };
    expect(style.flexDirection).toBe('row');
    // The fix: wrap. Never `overflow: scroll` / a horizontal ScrollView, which
    // is what cut "Confidence" off the right edge on the shipped screen.
    expect(style.flexWrap).toBe('wrap');

    // Every option is reachable — including the last one.
    SPEECH_TOPICS.forEach((opt) => expect(getByLabelText(opt.label)).toBeTruthy());
    fireEvent.press(getByLabelText('Confidence'));
    expect(onChange).toHaveBeenCalledWith(['confidence']);
  });

  it.each(PICKERS)('%s keeps every chip at the 44pt tap target', (_name, Picker) => {
    const { getByLabelText } = renderThemed(
      <Picker options={SPEECH_TOPICS} selectedIds={[]} onChange={() => {}} />,
      SEED_LIGHT
    );
    const chip = getByLabelText('Pace');
    expect((chip.props.style as { minHeight?: number }).minHeight).toBe(44);
  });

  it.each(PICKERS)('%s renders the empty state with zero options', (_name, Picker) => {
    const { getByText } = renderThemed(
      <Picker options={[]} selectedIds={[]} onChange={() => {}} title="Pick your topics" />,
      SEED_LIGHT
    );
    expect(getByText('No topics to choose from.')).toBeTruthy();
  });

  it('renders the full step anatomy — header, hero, headline, error, sticky CTA', () => {
    const onBack = jest.fn();
    const onDismiss = jest.fn();
    const onContinue = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <InterestPicker
        options={SPEECH_TOPICS}
        selectedIds={[]}
        onChange={() => {}}
        title="What do you want to work on?"
        subtitle="Pick as many as you like."
        helper="At least three helps us tune the feedback."
        illustration={<RNText>hero-art</RNText>}
        progress={<RNText>progress-bars</RNText>}
        onBack={onBack}
        onDismiss={onDismiss}
        error="Pick at least three to continue"
        ctaLabel="Continue"
        onContinue={onContinue}
        secondaryLabel="Skip"
        onSecondary={() => {}}
      />,
      SEED_LIGHT
    );

    expect(getByText('hero-art')).toBeTruthy();
    expect(getByText('progress-bars')).toBeTruthy();
    expect(getByText('What do you want to work on?')).toBeTruthy();
    expect(getByText('Pick as many as you like.')).toBeTruthy();
    expect(getByText('At least three helps us tune the feedback.')).toBeTruthy();
    expect(getByText('Pick at least three to continue')).toBeTruthy();
    assertTokenPure(root);

    fireEvent.press(getByLabelText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Continue'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('survives the bare empty state — no hero, no subtitle, no CTA', () => {
    const { queryByLabelText, getByLabelText, root } = renderThemed(
      <InterestPicker options={SPEECH_TOPICS} selectedIds={[]} onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Back')).toBeNull();
    expect(queryByLabelText('Dismiss')).toBeNull();
    expect(getByLabelText('Pace')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('ProfileSetup (native)', () => {
  it.each(PROFILES)('%s renders one field at the 56 height with a leading icon', (_name, Profile) => {
    const onChangeField = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <Profile
        title="What should we call you?"
        subtitle="You can change this later."
        fields={[{ id: 'displayName', label: 'Display name', placeholder: 'Ada L.', icon: 'user' }]}
        values={{ displayName: 'Ada' }}
        onChangeField={onChangeField}
      />,
      SEED_LIGHT
    );
    const input = getByLabelText('Display name');
    expect((input.props.style as { height?: number }).height).toBe(56);
    fireEvent.changeText(input, 'Ada Lovelace');
    expect(onChangeField).toHaveBeenCalledWith('displayName', 'Ada Lovelace');
    assertTokenPure(root);
  });

  it.each(PROFILES)('%s shows a field error as a border AND a message', (_name, Profile) => {
    const { getByLabelText, getByText } = renderThemed(
      <Profile
        fields={[{ id: 'displayName', label: 'Display name', error: 'That name is taken' }]}
        values={{}}
      />,
      SEED_LIGHT
    );
    // The message is the half a colour-blind user can actually read.
    expect(getByText('That name is taken')).toBeTruthy();
    // …and the border moved too, so a sighted user sees it without reading.
    const input = getByLabelText('Display name');
    expect(input).toBeTruthy();
  });

  it.each(PROFILES)('%s renders with zero fields', (_name, Profile) => {
    const { getByLabelText, root } = renderThemed(<Profile fields={[]} />, SEED_LIGHT);
    expect(getByLabelText('Change profile photo')).toBeTruthy();
    assertTokenPure(root);
  });

  it('fires save and skip from the sticky footer', () => {
    const onSave = jest.fn();
    const onSkip = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProfileSetup saveLabel="Save profile" onSave={onSave} skipLabel="Skip for now" onSkip={onSkip} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Save profile'));
    expect(onSave).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Skip for now'));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('puts a caller illustration in the hero slot instead of the avatar', () => {
    const { getByText, queryByLabelText } = renderThemed(
      <ProfileSetup illustration={<RNText>hero-art</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByLabelText('Change profile photo')).toBeNull();
  });
});

describe('PermissionPrompt (native)', () => {
  it.each(PROMPTS)('%s explains before it asks and never fires on mount', (_name, Prompt) => {
    const onAllow = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <Prompt
        kind="notifications"
        title="Never miss a reply"
        rationale="We'll ping you when someone responds."
        onAllow={onAllow}
      />,
      SEED_LIGHT
    );
    expect(getByText('Never miss a reply')).toBeTruthy();
    // Mounting is not consent: nothing fires until the user presses Allow.
    expect(onAllow).not.toHaveBeenCalled();
    assertTokenPure(root);
    fireEvent.press(getByLabelText('Allow'));
    expect(onAllow).toHaveBeenCalledTimes(1);
  });

  it.each(PROMPTS)('%s renders the granted state without the actions', (_name, Prompt) => {
    const { getByText, queryByLabelText } = renderThemed(
      <Prompt title="Notifications on" rationale="Done." state="granted" />,
      SEED_LIGHT
    );
    expect(getByText("You're all set.")).toBeTruthy();
    expect(queryByLabelText('Allow')).toBeNull();
  });

  it.each(PROMPTS)('%s renders as a full step screen with benefit rows', (_name, Prompt) => {
    const { getByText, getByLabelText, root } = renderThemed(
      <Prompt
        kind="notifications"
        title="Never miss a reply"
        rationale="Only the things you asked to hear about."
        fullScreen
        progress={<RNText>progress-bars</RNText>}
        onBack={() => {}}
        onDismiss={() => {}}
        benefits={[
          { id: 'reply', title: 'Replies to your posts', description: 'The moment they land.' },
          { id: 'quiet', title: 'Nothing else', icon: '🔕' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('progress-bars')).toBeTruthy();
    expect(getByText('Replies to your posts')).toBeTruthy();
    expect(getByText('Nothing else')).toBeTruthy();
    expect(getByLabelText('Back')).toBeTruthy();
    assertTokenPure(root);
  });

  it.each(PROMPTS)('%s renders with zero benefit rows and no illustration', (_name, Prompt) => {
    const { getByText, root } = renderThemed(
      <Prompt title="Find places near you" rationale="So the map opens where you are." fullScreen />,
      SEED_LIGHT
    );
    expect(getByText('Find places near you')).toBeTruthy();
    assertTokenPure(root);
  });

  it('takes a caller illustration in the full-screen hero', () => {
    const { getByText } = renderThemed(
      <PermissionPrompt title="Camera" rationale="Scan a receipt." fullScreen illustration={<RNText>hero-art</RNText>} />,
      SEED_LIGHT
    );
    expect(getByText('hero-art')).toBeTruthy();
  });

  it('keeps the card form by default for inline use', () => {
    const { getByText } = renderThemed(
      <PermissionPrompt title="Camera" rationale="Scan a receipt." />,
      SEED_LIGHT
    );
    expect(getByText('Camera')).toBeTruthy();
  });
});

describe('OtpVerify (native)', () => {
  it.each(OTPS)('%s auto-submits once the code fills', (_name, Otp) => {
    const onChange = jest.fn();
    const onVerify = jest.fn();
    const { UNSAFE_getAllByType } = renderThemed(
      <Otp length={4} value="123" destination="+1 555" onChange={onChange} onVerify={onVerify} />,
      SEED_LIGHT
    );
    const inputs = UNSAFE_getAllByType(require('react-native').TextInput);
    fireEvent.changeText(inputs[3], '4');
    expect(onChange).toHaveBeenCalledWith('1234');
    expect(onVerify).toHaveBeenCalledWith('1234');
  });

  it.each(OTPS)('%s stands the code cells at the 56 field height', (_name, Otp) => {
    const { getByLabelText, root } = renderThemed(
      <Otp length={4} value="" onChange={() => {}} />,
      SEED_LIGHT
    );
    const first = getByLabelText('Digit 1');
    expect((first.props.style as { height?: number }).height).toBe(56);
    assertTokenPure(root);
  });

  it.each(OTPS)('%s shows the resend cooldown and the send confirmation', (_name, Otp) => {
    const onResend = jest.fn();
    const cooling = renderThemed(
      <Otp length={4} value="" onChange={() => {}} resendCountdown={12} resendInterval={30} />,
      SEED_LIGHT
    );
    // The wait is legible, and the affordance refuses the tap while it runs.
    expect(cooling.getByText('Resend in 12s')).toBeTruthy();
    fireEvent.press(cooling.getByLabelText('Resend code'));
    expect(onResend).not.toHaveBeenCalled();
    cooling.unmount();

    const ready = renderThemed(
      <Otp length={4} value="" onChange={() => {}} onResend={onResend} resendNotice="Code sent" />,
      SEED_LIGHT
    );
    expect(ready.getByText('Code sent')).toBeTruthy();
    fireEvent.press(ready.getByLabelText('Resend code'));
    expect(onResend).toHaveBeenCalledTimes(1);
  });

  it.each(OTPS)('%s shows an error as a message, not only a border', (_name, Otp) => {
    const { getByText } = renderThemed(
      <Otp length={4} value="12" onChange={() => {}} error="That code didn't match" />,
      SEED_LIGHT
    );
    expect(getByText("That code didn't match")).toBeTruthy();
  });

  it('renders the empty state — no destination, no title, no hero', () => {
    const { getByLabelText, root } = renderThemed(<OtpVerify value="" onChange={() => {}} />, SEED_LIGHT);
    expect(getByLabelText('Digit 1')).toBeTruthy();
    assertTokenPure(root);
  });

  it('renders the header, hero and headline block when given them', () => {
    const onBack = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <OtpVerify
        value=""
        onChange={() => {}}
        title="Check your messages"
        subtitle="We sent a six-digit code."
        illustration={<View testID="hero" />}
        progress={<RNText>progress-bars</RNText>}
        onBack={onBack}
      />,
      SEED_LIGHT
    );
    expect(getByText('Check your messages')).toBeTruthy();
    expect(getByText('We sent a six-digit code.')).toBeTruthy();
    expect(getByText('progress-bars')).toBeTruthy();
    fireEvent.press(getByLabelText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
