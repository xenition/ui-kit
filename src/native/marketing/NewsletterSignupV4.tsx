import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { withAlpha } from '../primitives/internal/color';
import { Gradient } from '../commerce/internal/Gradient';
import type { NewsletterSignupProps } from './NewsletterSignup';

/** Drop-in for {@link NewsletterSignupProps} — same props, the V4 "showcase" design. */
export type NewsletterSignupV4Props = NewsletterSignupProps;

/** Basic, permissive email shape check (no network, no dependency). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * NewsletterSignup — **V4** "showcase" design (native mirror of the web V4). The
 * bold conversion moment: a vibrant primary→accent brand-gradient ground (via
 * the shared `expo-linear-gradient` wrapper) carrying an extra-bold near-white
 * heading, a soft supporting line, and a **frosted** email `Input` + submit
 * `Button` seated on translucent `primary-50` tiles. Validation, the async
 * `onSubmit(email)` contract, and the success/error states are preserved
 * exactly from the base; only the skin changes. Same props/behavior as
 * {@link NewsletterSignupProps}; token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary`/`accent` ground, near-white ink), dark-mode safe.
 */
export function NewsletterSignupV4({
  heading = 'Stay in the loop',
  subtext,
  onSubmit,
  placeholder = 'you@example.com',
  buttonLabel = 'Subscribe',
  successMessage = "Thanks — you're subscribed.",
  invalidMessage = 'Enter a valid email address.',
  errorMessage = 'Something went wrong. Please try again.',
  style,
}: NewsletterSignupV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
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
  const ink = r.primary[50];
  const inkSoft = r.primary[100];
  const frost = withAlpha(r.primary[50], 0.15);
  const frostBorder = withAlpha(r.primary[50], 0.3);

  return (
    <View
      testID="xen-newsletter"
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.sm,
          backgroundColor: r.primary[600],
        },
        style,
      ]}
    >
      <Gradient
        colors={[r.primary[500], r.primary[600], r.accent[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {heading !== undefined ? (
        <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }}>
          {heading}
        </Text>
      ) : null}
      {subtext !== undefined ? (
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base }}>{subtext}</Text>
      ) : null}

      <View style={{ gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder={placeholder}
          placeholderTextColor={inkSoft}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Email address"
          invalid={invalid}
          editable={!submitting}
          style={{ backgroundColor: frost, borderColor: frostBorder, color: ink }}
        />
        <Button
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          style={{ backgroundColor: frost, borderWidth: 1, borderColor: frostBorder }}
        >
          {buttonLabel}
        </Button>
      </View>

      {message ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            fontSize: tokens.typography.scale.sm,
            fontWeight: '500',
            color: status === 'success' ? ink : inkSoft,
          }}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}
