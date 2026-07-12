import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';

/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface NewsletterSignupProps {
  /** Section heading. */
  heading?: string;
  /** Supporting copy under the heading. */
  subtext?: string;
  /**
   * SDK-agnostic submit handler — receives the validated email and may be
   * async. Throw (or reject) to surface the error state.
   */
  onSubmit: (email: string) => void | Promise<void>;
  /** Input placeholder. */
  placeholder?: string;
  /** Submit button label. */
  buttonLabel?: string;
  /** Message shown after a successful submit. */
  successMessage?: string;
  /** Message shown when the email fails validation. */
  invalidMessage?: string;
  /** Fallback message shown when `onSubmit` throws without a message. */
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Email-capture block — the native mirror of the web `NewsletterSignup`:
 * heading, subtext, a validated email `Input`, a submit `Button`, and
 * success/error states. The web `<form onSubmit>` becomes an explicit submit
 * handler on the button; the endpoint lives entirely in the caller's async
 * `onSubmit(email)`. Composes the native `Input`/`Button` primitives. Token-only.
 */
export function NewsletterSignup({
  heading = 'Stay in the loop',
  subtext,
  onSubmit,
  placeholder = 'you@example.com',
  buttonLabel = 'Subscribe',
  successMessage = "Thanks — you're subscribed.",
  invalidMessage = 'Enter a valid email address.',
  errorMessage = 'Something went wrong. Please try again.',
  style,
}: NewsletterSignupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<SignupStatus>('idle');
  const [message, setMessage] = React.useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setMessage(invalidMessage);
      return;
    }
    setStatus('submitting');
    setMessage(null);
    try {
      await onSubmit(email.trim());
      setStatus('success');
      setMessage(successMessage);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error && error.message ? error.message : errorMessage);
    }
  };

  const invalid = status === 'error';
  const submitting = status === 'submitting';

  return (
    <View
      testID="xen-newsletter"
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {heading !== undefined ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '600',
          }}
        >
          {heading}
        </Text>
      ) : null}
      {subtext !== undefined ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {subtext}
        </Text>
      ) : null}

      <View style={{ gap: tokens.spacing.sm }}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder={placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Email address"
          invalid={invalid}
          editable={!submitting}
        />
        <Button onPress={handleSubmit} loading={submitting} disabled={submitting}>
          {buttonLabel}
        </Button>
      </View>

      {message ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            fontSize: tokens.typography.scale.sm,
            color: status === 'success' ? colors.success : colors.danger,
          }}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}
