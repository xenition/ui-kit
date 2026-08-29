import * as React from 'react';
import { AlertV4 } from './AlertV4';
import { AuthCardV4 } from './AuthCardV4';
import { AuthFieldV4 } from './AuthFieldV4';
import { AuthSubmitButtonV4 } from './AuthSubmitButtonV4';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
import { FormV4 } from './FormV4';
import { StatusMessageV4 } from './StatusMessageV4';
import { TextV4 } from './TextV4';
import { useForm } from './useForm';
import type { AuthAlign } from './AuthCard';
import type { IconName } from './icon-names';
import type { ForgotPasswordFormProps } from './ForgotPasswordForm';

export interface ForgotPasswordFormV4Props extends ForgotPasswordFormProps {
  /** Brand icon from the named set, for an app with no mark of its own. */
  brandIcon?: IconName;
  /** Headline alignment, passed to the card. Default `'left'` — §9's top-left tile. */
  align?: AuthAlign;
  /**
   * Headline for the confirmation state — V4 addition.
   *
   * The base left `title` as "Reset password" after the link was sent, so the
   * headline went on asking for something the user had already done. The
   * screen changed job; the heading has to change with it. Default
   * `'Check your inbox'`.
   */
  sentTitle?: React.ReactNode;
  /** Lead-in above the resend action. Default `"Didn't get the email?"`. */
  resendPrompt?: string;
  /** The resend action's copy. Default `'Resend link'`. */
  resendLabel?: string;
  /** Whether the confirmation offers a resend at all. Default `true`. */
  resendable?: boolean;
  /** Lead-in beside the back link, e.g. "Remembered it?". */
  backPrompt?: string;
  className?: string;
}

/**
 * **V4 reset-password request form** — the web twin of the native
 * `ForgotPasswordFormV4`, the base's props plus the confirmation copy, a
 * different design line.
 *
 * Composed entirely of V4 children (§10.5): `AuthCardV4` for the shell,
 * `FormV4` for the rhythm, `AuthFieldV4` for the one question, `AuthSubmitButtonV4`
 * for the CTA, `AuthSwitchFooterV4` for both text actions, `AlertV4` for a
 * failed request and `StatusMessageV4` for the confirmation. Nothing is
 * hand-rolled and nothing is a literal — the field's height and radius come
 * from `internal/field-v4`, the CTA's from the submit button, and every gap off
 * the spacing scale.
 *
 * ## The confirmation is the screen
 *
 * A user reaches this form once and leaves it immediately; the only moment that
 * matters is the half-second after the button is pressed. The base spent that
 * moment on a single line of small grey text inside `StatusMessage`, with the
 * headline still reading "Reset password", no sign of *which* address the link
 * went to, and no way to try again. Three things change:
 *
 * 1. **The heading follows the state.** `sentTitle` replaces `title`, and the
 *    subtitle is dropped — it was written to explain the form, and the form is
 *    gone.
 * 2. **The address is echoed back.** The single commonest failure here is a
 *    typo the user cannot see, because the field that held it has been
 *    replaced by a success message. Printing the address is what turns
 *    "nothing arrived" from a dead end into a correction.
 * 3. **There is a next step.** §15 asks an empty state to move the user
 *    forward, and `StatusMessageV4` deliberately carries no action, so the
 *    resend sits below it as `AuthSwitchFooterV4` — §5's rule that a secondary
 *    action is a centred text link, never a second filled button competing
 *    with the one the user just pressed. While it is in flight the label
 *    becomes `submittingLabel` and the link disables, so the state is spoken
 *    rather than merely spun.
 *
 * The whole block is a polite live region: the form it replaced was focused, so
 * without one a screen-reader user is left holding a control that no longer
 * exists with no announcement of what took its place.
 *
 * ## The CTA carries no arrow
 *
 * §5 reserves `→` for a forward action. Sending a reset link is terminal — the
 * next thing the user does is leave for their inbox — so `trailingArrow` is
 * off, exactly as in the base.
 *
 * Errors are text, never colour: a rejected request draws `AlertV4` above the
 * field, and a missing address draws `AuthFieldV4`'s own message underneath it.
 */
export function ForgotPasswordFormV4({
  onSubmit,
  onLoginClick,
  title = 'Reset password',
  subtitle,
  brandGlyph,
  brandIcon,
  align = 'left',
  submitLabel = 'Send reset link',
  submittingLabel = 'Sending…',
  sentMessage = 'Check your email for a reset link.',
  sentTitle = 'Check your inbox',
  resendPrompt = "Didn't get the email?",
  resendLabel = 'Resend link',
  resendable = true,
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  backLabel = 'Back to sign in',
  backPrompt,
  className,
}: ForgotPasswordFormV4Props): React.ReactElement {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);
  // The address the link actually went to, frozen at the moment it was sent —
  // read back to the user, and replayed by the resend.
  const [sentTo, setSentTo] = React.useState('');
  const [resending, setResending] = React.useState(false);

  const form = useForm<{ email: string }>({
    initialValues: { email: '' },
    validate: (v) => (v.email ? {} : { email: 'Email is required' }),
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v.email);
        setSentTo(v.email);
        setSent(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
      }
    },
  });

  const handleResend = async (): Promise<void> => {
    if (resending) return;
    setResending(true);
    setSubmitError(null);
    try {
      await onSubmit(sentTo);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthCardV4
      title={sent ? sentTitle : title}
      // The subtitle explained the form. Once the form is gone it is describing
      // something the user can no longer see.
      subtitle={sent ? undefined : subtitle}
      brandGlyph={brandGlyph}
      brandIcon={brandIcon}
      align={align}
      className={className}
      footer={
        onLoginClick ? (
          <AuthSwitchFooterV4 prompt={backPrompt} label={backLabel} onClick={onLoginClick} />
        ) : undefined
      }
    >
      {sent ? (
        <div
          role="status"
          aria-live="polite"
          data-xen-v4-forgot-sent=""
          className="flex w-full flex-col gap-md"
        >
          {submitError ? <AlertV4 tone="danger">{submitError}</AlertV4> : null}
          <StatusMessageV4 state="empty" message={sentMessage} />
          {sentTo ? (
            <div data-xen-v4-forgot-address="" className="w-full">
              <TextV4 size="sm" weight="semibold" align="center">
                {sentTo}
              </TextV4>
            </div>
          ) : null}
          {resendable ? (
            <AuthSwitchFooterV4
              prompt={resendPrompt}
              label={resending ? submittingLabel : resendLabel}
              onClick={() => {
                void handleResend();
              }}
              disabled={resending}
            />
          ) : null}
        </div>
      ) : (
        <FormV4 onSubmit={form.handleSubmit}>
          {submitError ? <AlertV4 tone="danger">{submitError}</AlertV4> : null}
          <AuthFieldV4
            label={emailLabel}
            icon="mail"
            inputType="email"
            aria-label={emailLabel}
            autoComplete="email"
            clearable
            error={form.errors.email}
            value={form.values.email}
            onChangeText={(t) => form.setValue('email', t)}
            placeholder={emailPlaceholder}
          />
          <AuthSubmitButtonV4
            type="submit"
            label={submitLabel}
            busyLabel={submittingLabel}
            loading={form.submitting}
            trailingArrow={false}
          />
        </FormV4>
      )}
    </AuthCardV4>
  );
}
