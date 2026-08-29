/** @jest-environment jsdom */
/**
 * The four onboarding **step screens** (web) — ProfileSetup, InterestPicker,
 * PermissionPrompt and OtpVerify, plus their V2/V3 lines. The native twin of
 * this file asserts the same things against the same prop names; keep the two in
 * step, because prop parity between the twins is the whole reason an app can
 * move a screen between platforms.
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
import { fireEvent, render } from '@testing-library/react';
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

/** No colour may reach the DOM as a literal — every one is a token class. */
const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

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

describe('InterestPicker — chips wrap, never clip (web)', () => {
  it.each(PICKERS)('%s wraps the chip row instead of scrolling it', (_name, Picker) => {
    const onChange = jest.fn();
    const { getByRole, container } = render(
      <Picker options={SPEECH_TOPICS} selectedIds={[]} onChange={onChange} title="What do you want to work on?" />
    );

    const group = getByRole('group');
    // The fix: wrap. Never a horizontal scroller, which is what cut
    // "Confidence" off the right edge on the shipped screen.
    expect(group.className).toContain('flex-wrap');
    expect(group.className).not.toContain('flex-nowrap');
    expect(container.innerHTML).not.toContain('overflow-x');

    // Every option is reachable — including the last one.
    SPEECH_TOPICS.forEach((opt) => expect(getByRole('checkbox', { name: opt.label })).toBeTruthy());
    fireEvent.click(getByRole('checkbox', { name: 'Confidence' }));
    expect(onChange).toHaveBeenCalledWith(['confidence']);
  });

  it.each(PICKERS)('%s keeps every chip at the 44px tap target', (_name, Picker) => {
    const { getByRole } = render(<Picker options={SPEECH_TOPICS} selectedIds={[]} onChange={() => {}} />);
    expect(getByRole('checkbox', { name: 'Pace' }).className).toContain('min-h-11');
  });

  it.each(PICKERS)('%s renders the empty state with zero options', (_name, Picker) => {
    const { getByText } = render(
      <Picker options={[]} selectedIds={[]} onChange={() => {}} title="Pick your topics" />
    );
    expect(getByText('No topics to choose from.')).toBeTruthy();
  });

  it('renders the full step anatomy — header, hero, headline, error, sticky CTA', () => {
    const onBack = jest.fn();
    const onDismiss = jest.fn();
    const onContinue = jest.fn();
    const { getByText, getByRole, container } = render(
      <InterestPicker
        options={SPEECH_TOPICS}
        selectedIds={[]}
        onChange={() => {}}
        title="What do you want to work on?"
        subtitle="Pick as many as you like."
        helper="At least three helps us tune the feedback."
        illustration={<span>hero-art</span>}
        progress={<span>progress-bars</span>}
        onBack={onBack}
        onDismiss={onDismiss}
        error="Pick at least three to continue"
        ctaLabel="Continue"
        onContinue={onContinue}
        secondaryLabel="Skip"
        onSecondary={() => {}}
      />
    );

    expect(getByText('hero-art')).toBeTruthy();
    expect(getByText('progress-bars')).toBeTruthy();
    expect(getByRole('heading', { name: 'What do you want to work on?' })).toBeTruthy();
    expect(getByText('Pick as many as you like.')).toBeTruthy();
    expect(getByText('At least three helps us tune the feedback.')).toBeTruthy();
    expect(getByRole('alert').textContent).toContain('Pick at least three to continue');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);

    fireEvent.click(getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button', { name: 'Continue' }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('survives the bare empty state — no hero, no subtitle, no CTA', () => {
    const { queryByRole, getByRole, container } = render(
      <InterestPicker options={SPEECH_TOPICS} selectedIds={[]} onChange={() => {}} />
    );
    expect(queryByRole('button', { name: 'Back' })).toBeNull();
    expect(queryByRole('button', { name: 'Dismiss' })).toBeNull();
    expect(getByRole('checkbox', { name: 'Pace' })).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('ProfileSetup (web)', () => {
  it.each(PROFILES)('%s renders one field at the 56 height with a leading icon', (_name, Profile) => {
    const onChangeField = jest.fn();
    const { getByLabelText, container } = render(
      <Profile
        title="What should we call you?"
        subtitle="You can change this later."
        fields={[{ id: 'displayName', label: 'Display name', placeholder: 'Ada L.', icon: 'user' }]}
        values={{ displayName: 'Ada' }}
        onChangeField={onChangeField}
      />
    );
    const input = getByLabelText('Display name') as HTMLInputElement;
    expect(input.value).toBe('Ada');
    expect(input.parentElement?.className).toContain('h-14');
    fireEvent.change(input, { target: { value: 'Ada Lovelace' } });
    expect(onChangeField).toHaveBeenCalledWith('displayName', 'Ada Lovelace');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it.each(PROFILES)('%s shows a field error as a border AND a message', (_name, Profile) => {
    const { getByLabelText, getByText } = render(
      <Profile fields={[{ id: 'displayName', label: 'Display name', error: 'That name is taken' }]} values={{}} />
    );
    const input = getByLabelText('Display name');
    // Both halves: the border a sighted user sees…
    expect(input.parentElement?.className).toContain('border-danger');
    // …and the message a colour-blind user can actually read.
    expect(getByText('That name is taken')).toBeTruthy();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it.each(PROFILES)('%s renders with zero fields', (_name, Profile) => {
    const { getByRole, container } = render(<Profile fields={[]} />);
    expect(getByRole('button', { name: 'Change profile photo' })).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('fires save and skip from the sticky footer', () => {
    const onSave = jest.fn();
    const onSkip = jest.fn();
    const { getByRole } = render(
      <ProfileSetup saveLabel="Save profile" onSave={onSave} skipLabel="Skip for now" onSkip={onSkip} />
    );
    fireEvent.click(getByRole('button', { name: 'Save profile' }));
    expect(onSave).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button', { name: 'Skip for now' }));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('puts a caller illustration in the hero slot instead of the avatar', () => {
    const { getByText, queryByRole } = render(<ProfileSetup illustration={<span>hero-art</span>} />);
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByRole('button', { name: 'Change profile photo' })).toBeNull();
  });
});

describe('PermissionPrompt (web)', () => {
  it.each(PROMPTS)('%s explains before it asks and never fires on mount', (_name, Prompt) => {
    const onAllow = jest.fn();
    const { getByRole, getByText, container } = render(
      <Prompt
        kind="notifications"
        title="Never miss a reply"
        rationale="We'll ping you when someone responds."
        onAllow={onAllow}
      />
    );
    expect(getByText('Never miss a reply')).toBeTruthy();
    // Mounting is not consent: nothing fires until the user clicks Allow.
    expect(onAllow).not.toHaveBeenCalled();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Allow' }));
    expect(onAllow).toHaveBeenCalledTimes(1);
  });

  it.each(PROMPTS)('%s renders the granted state without the actions', (_name, Prompt) => {
    const { getByText, queryByRole } = render(
      <Prompt title="Notifications on" rationale="Done." state="granted" />
    );
    expect(getByText("You're all set.")).toBeTruthy();
    expect(queryByRole('button', { name: 'Allow' })).toBeNull();
  });

  it.each(PROMPTS)('%s renders as a full step screen with benefit rows', (_name, Prompt) => {
    const { getByText, getByRole, container } = render(
      <Prompt
        kind="notifications"
        title="Never miss a reply"
        rationale="Only the things you asked to hear about."
        fullScreen
        progress={<span>progress-bars</span>}
        onBack={() => {}}
        onDismiss={() => {}}
        benefits={[
          { id: 'reply', title: 'Replies to your posts', description: 'The moment they land.' },
          { id: 'quiet', title: 'Nothing else', icon: '🔕' },
        ]}
      />
    );
    expect(getByText('progress-bars')).toBeTruthy();
    expect(getByText('Replies to your posts')).toBeTruthy();
    expect(getByText('Nothing else')).toBeTruthy();
    expect(getByRole('button', { name: 'Back' })).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it.each(PROMPTS)('%s renders with zero benefit rows and no illustration', (_name, Prompt) => {
    const { getByText, container } = render(
      <Prompt title="Find places near you" rationale="So the map opens where you are." fullScreen />
    );
    expect(getByText('Find places near you')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('takes a caller illustration in the full-screen hero', () => {
    const { getByText } = render(
      <PermissionPrompt title="Camera" rationale="Scan a receipt." fullScreen illustration={<span>hero-art</span>} />
    );
    expect(getByText('hero-art')).toBeTruthy();
  });

  it('keeps the card form by default for inline use', () => {
    const { getByText, container } = render(<PermissionPrompt title="Camera" rationale="Scan a receipt." />);
    expect(getByText('Camera')).toBeTruthy();
    expect(container.innerHTML).toContain('bg-primary');
  });
});

describe('OtpVerify (web)', () => {
  it.each(OTPS)('%s auto-submits once the code fills', (_name, Otp) => {
    const onChange = jest.fn();
    const onVerify = jest.fn();
    const { getByLabelText } = render(
      <Otp length={4} value="123" destination="+1 555 000" onChange={onChange} onVerify={onVerify} />
    );
    fireEvent.change(getByLabelText('Digit 4'), { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledWith('1234');
    expect(onVerify).toHaveBeenCalledWith('1234');
  });

  it.each(OTPS)('%s gates Verify until the code is complete', (_name, Otp) => {
    const { getByRole } = render(<Otp length={4} value="123" onChange={() => {}} />);
    expect(getByRole('button', { name: 'Verify' }).hasAttribute('disabled')).toBe(true);
  });

  it.each(OTPS)('%s stands the code cells at the 56 field height', (_name, Otp) => {
    const { getByLabelText, container } = render(<Otp length={4} value="" onChange={() => {}} />);
    expect(getByLabelText('Digit 1').className).toContain('h-14');
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it.each(OTPS)('%s shows the resend cooldown and the send confirmation', (_name, Otp) => {
    const onResend = jest.fn();
    const cooling = render(
      <Otp length={4} value="" onChange={() => {}} onResend={onResend} resendCountdown={12} resendInterval={30} />
    );
    // The wait is legible, and the affordance refuses the click while it runs.
    expect(cooling.getByText('Resend in 12s')).toBeTruthy();
    expect(cooling.getByRole('button', { name: 'Resend code' }).hasAttribute('disabled')).toBe(true);
    // …and a bar drains alongside it, so the countdown is not the only signal.
    expect(cooling.getByRole('progressbar')).toBeTruthy();
    cooling.unmount();

    const ready = render(
      <Otp length={4} value="" onChange={() => {}} onResend={onResend} resendNotice="Code sent" />
    );
    expect(ready.getByText('Code sent')).toBeTruthy();
    fireEvent.click(ready.getByRole('button', { name: 'Resend code' }));
    expect(onResend).toHaveBeenCalledTimes(1);
  });

  it.each(OTPS)('%s shows an error as a message, not only a border', (_name, Otp) => {
    const { getByText, getByLabelText } = render(
      <Otp length={4} value="12" onChange={() => {}} error="That code didn't match" />
    );
    expect(getByText("That code didn't match")).toBeTruthy();
    expect(getByLabelText('Digit 1').className).toContain('border-danger');
  });

  it('renders the empty state — no destination, no title, no hero', () => {
    const { getByLabelText, container } = render(<OtpVerify value="" onChange={() => {}} />);
    expect(getByLabelText('Digit 1')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('renders the header, hero and headline block when given them', () => {
    const onBack = jest.fn();
    const { getByText, getByRole } = render(
      <OtpVerify
        value=""
        onChange={() => {}}
        title="Check your messages"
        subtitle="We sent a six-digit code."
        illustration={<span>hero-art</span>}
        progress={<span>progress-bars</span>}
        onBack={onBack}
      />
    );
    expect(getByRole('heading', { name: 'Check your messages' })).toBeTruthy();
    expect(getByText('We sent a six-digit code.')).toBeTruthy();
    expect(getByText('hero-art')).toBeTruthy();
    expect(getByText('progress-bars')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
