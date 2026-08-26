import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AUTH_TAP_TARGET, AuthCard, AuthField, AuthSubmitButton } from './AuthCard';
import { Text } from './Text';
import { Alert } from './Alert';
import { StatusMessage } from './StatusMessage';
import { useForm } from '../../primitives/useForm';

export interface ForgotPasswordFormProps {
  /** Called with the email. Throw to surface an error; resolve to show the sent state. */
  onSubmit: (email: string) => void | Promise<void>;
  onLoginClick?: () => void;
  title?: React.ReactNode;
  /** Supporting line under the title. */
  subtitle?: React.ReactNode;
  /** Brand glyph for the §9 tile above the headline. Nothing renders without one. */
  brandGlyph?: string;
  /** Primary CTA copy. Default `'Send reset link'`. */
  submitLabel?: string;
  /** Copy for the pending CTA. Default `'Sending…'`. */
  submittingLabel?: string;
  /** Confirmation copy once the request lands. */
  sentMessage?: string;
  /** Field copy — the host owns every string a user reads. */
  emailLabel?: string;
  emailPlaceholder?: string;
  backLabel?: string;
}

/**
 * Drop-in "reset password" request form — the native mirror of the web
 * `ForgotPasswordForm`. Composed, themed, with a sent confirmation state. Wire
 * `onSubmit` to `@xenition/sdk` auth. No literal colors.
 *
 * Drawn from the same parts as the screen-level `SignInScreen` (§6/§9): a 56px
 * field with a muted `mail` icon, a `primary` focus border, errors as a
 * `danger` border **and** a message in `dangerText`, and the 56px `radius.full`
 * CTA.
 *
 * The CTA carries no trailing arrow: §5 reserves the `→` for a forward action,
 * and sending a reset link is a terminal one — the next thing the user does is
 * leave for their inbox.
 */
export function ForgotPasswordForm({
  onSubmit,
  onLoginClick,
  title = 'Reset password',
  subtitle,
  brandGlyph,
  submitLabel = 'Send reset link',
  submittingLabel = 'Sending…',
  sentMessage = 'Check your email for a reset link.',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  backLabel = 'Back to sign in',
}: ForgotPasswordFormProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);
  const form = useForm<{ email: string }>({
    initialValues: { email: '' },
    validate: (v) => (v.email ? {} : { email: 'Email is required' }),
    onSubmit: async (v) => {
      setSubmitError(null);
      try {
        await onSubmit(v.email);
        setSent(true);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Could not send reset email');
      }
    },
  });

  return (
    <AuthCard
      title={title}
      subtitle={subtitle}
      brandGlyph={brandGlyph}
      footer={
        onLoginClick ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={backLabel}
            onPress={onLoginClick}
            hitSlop={tokens.spacing.sm}
            style={{ justifyContent: 'center', minHeight: AUTH_TAP_TARGET }}
          >
            <Text size="sm" weight="semibold" tone="primaryText">
              {backLabel}
            </Text>
          </Pressable>
        ) : undefined
      }
    >
      {sent ? (
        <StatusMessage state="empty" message={sentMessage} />
      ) : (
        <View style={{ gap: tokens.spacing.md }}>
          {submitError ? <Alert tone="danger">{submitError}</Alert> : null}
          <AuthField
            label={emailLabel}
            icon="mail"
            accessibilityLabel={emailLabel}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            error={form.errors.email}
            value={form.values.email}
            onChangeText={(t) => form.setValue('email', t)}
            placeholder={emailPlaceholder}
          />
          <AuthSubmitButton
            label={form.submitting ? submittingLabel : submitLabel}
            onPress={() => form.handleSubmit()}
            loading={form.submitting}
            trailingArrow={false}
          />
        </View>
      )}
    </AuthCard>
  );
}
