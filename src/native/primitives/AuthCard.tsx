import * as React from 'react';
import {
  Pressable,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from './Button';
import { Card } from './Card';
import { Checkbox } from './Checkbox';
import { Icon } from './Icon';
import { Text, type TextSize } from './Text';
import type { IconName } from '../../primitives/icon-names';

/**
 * The auth family's shared anatomy — `AuthCard` and the parts every auth
 * surface is assembled from.
 *
 * ## Why the parts live here
 *
 * `ONBOARDING-DESIGN-SPEC.md` §6/§9 describe **one** input treatment, **one**
 * CTA shape and **one** provider row for the whole auth family. Four
 * components need them (`LoginForm`, `SignupForm`, `ForgotPasswordForm` and
 * the screen-level `SignInScreen`), and before this file they each drew their
 * own: a screen assembled from `SignInScreen` and a screen assembled from
 * `LoginForm` did not look like the same product. Putting the parts in the
 * family's own shell module means there is exactly one 56px field in the kit,
 * and changing it changes every auth surface at once.
 *
 * Everything here is presentational and token-bound: no literal colors, no
 * literal radii, no literal font sizes. The only bare numbers are the two
 * control heights below, which are geometry, not theme.
 */

/*
  §10.1 permits exactly these two geometric literals, so they are named once
  here rather than retyped at eleven call sites.

  56 is the height of anything a thumb aims at deliberately — a field, the
  primary CTA, a provider button. It is what makes the reference screens read
  as generous instead of cramped, and it is a *layout* decision: there is no
  "control height" token, and inventing one would push a layout choice into the
  theme seed where a brand color belongs.

  44 is the platform floor for an incidental tap target (a text link, the
  password eye). Both stay honest even when the glyph inside them is small.
*/
export const AUTH_CONTROL_HEIGHT = 56;
export const AUTH_TAP_TARGET = 44;

/** Horizontal alignment for the brand tile + headline block. */
export type AuthAlign = 'left' | 'center';

// ─────────────────────────────────────────────────────────────────────────────
// Brand tile — §9
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthBrandTileProps {
  /** One-off brand glyph/emoji. The kit ships no brand marks. */
  glyph?: string;
  /** A name from the kit's icon set, when the app has no mark of its own. */
  name?: IconName;
  /** Where the tile sits. Default `'left'` — §9 is explicit that it is not centred. */
  align?: AuthAlign;
  /** Announced label. Decorative by default. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The rounded-square brand tile that opens every auth screen (§9): 56×56,
 * `primary` fill, `radius.lg`, top-**left**. Renders nothing at all when the
 * app supplies neither a glyph nor a name — §10.6, an empty state must not
 * leave a hole where a box would be.
 */
export function AuthBrandTile({
  glyph,
  name,
  align = 'left',
  accessibilityLabel,
  style,
}: AuthBrandTileProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!glyph && !name) return null;

  return (
    <View
      style={[
        {
          width: AUTH_CONTROL_HEIGHT,
          height: AUTH_CONTROL_HEIGHT,
          borderRadius: tokens.radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          alignSelf: align === 'center' ? 'center' : 'flex-start',
        },
        style,
      ]}
    >
      <Icon glyph={glyph} name={name} size="2xl" color="onPrimary" accessibilityLabel={accessibilityLabel} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Headline block — §4 / §9
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthHeadingProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Default `'left'` — the auth screens are the one place §4 left-aligns. */
  align?: AuthAlign;
  /** Headline step. Default `'xl'`; the screen-level auth surfaces pass `'3xl'`. */
  size?: TextSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * Headline + muted subhead, drawn the same way on every auth surface. A string
 * is styled; any other node is rendered as given, so a caller can pass its own
 * markup without losing the block's rhythm.
 */
export function AuthHeading({
  title,
  subtitle,
  align = 'left',
  size = 'xl',
  style,
}: AuthHeadingProps): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  if (title == null && subtitle == null) return null;

  const textAlign = align === 'center' ? 'center' : 'left';
  return (
    <View
      style={[
        { gap: tokens.spacing.xs, alignItems: align === 'center' ? 'center' : 'flex-start' },
        style,
      ]}
    >
      {title != null ? (
        typeof title === 'string' ? (
          <Text size={size} weight="bold" align={textAlign} accessibilityRole="header">
            {title}
          </Text>
        ) : (
          title
        )
      ) : null}
      {subtitle != null ? (
        typeof subtitle === 'string' ? (
          <Text size="base" tone="muted" align={textAlign}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )
      ) : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The input — §6, "the auth screens live or die here"
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthFieldProps
  extends Omit<TextInputProps, 'style' | 'editable' | 'secureTextEntry'> {
  /** Visible label above the control. Optional — §6 forbids faking one with a placeholder. */
  label?: string;
  /** Leading icon from the named set (`'mail'`, `'lock'`, `'user'`). */
  icon?: IconName;
  /** Validation message. Renders a `danger` border AND the message in `dangerText`. */
  error?: string | null;
  /** Helper text below the control, shown when there is no error. */
  hint?: string;
  /** Masks the text and adds the eye toggle (§6's "trailing affordance where it earns one"). */
  secure?: boolean;
  /** Extra trailing affordance (a clear `✕`, a unit). Rendered after the eye. */
  trailing?: React.ReactNode;
  /** Freezes the control and dims it. */
  disabled?: boolean;
  /** Wrapper style override — layout only. */
  style?: StyleProp<ViewStyle>;
  /** Show/hide copy for the secure toggle. */
  showLabel?: string;
  hideLabel?: string;
}

/**
 * The kit's auth input (§6): **56 tall**, `radius.lg`, hairline `border`,
 * `surface` fill, a muted leading icon, and a trailing affordance where one is
 * earned.
 *
 * Two states carry meaning and both are drawn, never one:
 *
 * - **focus** raises the border to `primary`;
 * - **error** raises it to `danger` *and* prints the message underneath in
 *   `dangerText`. A red border on its own is invisible to a colour-blind user,
 *   so the message is not optional — it is the state.
 */
export function AuthField({
  label,
  icon,
  error,
  hint,
  secure = false,
  trailing,
  disabled = false,
  style,
  showLabel = 'Show password',
  hideLabel = 'Hide password',
  onFocus,
  onBlur,
  ...rest
}: AuthFieldProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const borderColor = error ? colors.danger : focused ? colors.primary : colors.border;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {label ? (
        <Text size="sm" weight="medium">
          {label}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          height: AUTH_CONTROL_HEIGHT,
          paddingHorizontal: tokens.spacing.md,
          borderWidth: 1,
          borderColor,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {icon ? <Icon name={icon} size="base" color="muted" /> : null}
        <TextInput
          editable={!disabled}
          accessibilityState={{ disabled }}
          placeholderTextColor={colors.muted}
          secureTextEntry={secure && !visible}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            padding: 0,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
          }}
          {...rest}
        />
        {secure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? hideLabel : showLabel}
            accessibilityState={{ selected: visible, disabled }}
            disabled={disabled}
            onPress={() => setVisible((v) => !v)}
            hitSlop={(AUTH_TAP_TARGET - tokens.typography.scale.base) / 2}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <Icon name={visible ? 'eye-off' : 'eye'} size="base" color={visible ? 'primary' : 'muted'} />
          </Pressable>
        ) : null}
        {trailing}
      </View>

      {error ? (
        <Text size="sm" tone="dangerText" accessibilityRole="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text size="sm" tone="muted">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The primary action — §5
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthSubmitButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
  trailingArrow?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The sticky CTA's button (§5): full width, **56 tall**, `radius.full`,
 * `primary` fill, `onPrimary` semibold label, trailing `→`.
 *
 * Disabled is the same shape at reduced opacity, never a different shape —
 * a button that changes size when it enables looks like it moved.
 */
export function AuthSubmitButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  trailingArrow = true,
  style,
}: AuthSubmitButtonProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <Button
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      accessibilityLabel={label}
      style={[
        {
          height: AUTH_CONTROL_HEIGHT,
          paddingVertical: 0,
          borderRadius: tokens.radius.full,
          alignSelf: 'stretch',
        },
        style,
      ]}
    >
      <Text size="lg" weight="semibold" tone="onPrimary">
        {label}
      </Text>
      {trailingArrow ? (
        <Icon name="forward" size="base" color="onPrimary" style={{ marginLeft: tokens.spacing.sm }} />
      ) : null}
    </Button>
  );
}

export interface AuthStickyFooterProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * The footer the CTA is pinned into (§5): a hairline `border` divider on top
 * and `surface` behind it, so scrolling content passes **under** the action
 * instead of colliding with it.
 */
export function AuthStickyFooter({ children, style }: AuthStickyFooterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The provider row — §9
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthDividerProps {
  /** Copy centred on the rule. Without it the rule is drawn bare. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The "or continue with" separator (§9): one hairline running the full width
 * with the label sitting **on** it, knocked out by a `surface` patch — not two
 * stubs of rule with a gap between them.
 *
 * The caller decides whether it appears at all: a divider above nothing is the
 * empty state §10.6 forbids.
 */
export function AuthDivider({ label, style }: AuthDividerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <View
        style={{ position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.border }}
      />
      {label ? (
        <View style={{ backgroundColor: colors.surface, paddingHorizontal: tokens.spacing.sm }}>
          <Text size="xs" tone="muted">
            {label}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export interface AuthProviderButtonProps {
  label: string;
  /** One-off brand glyph — the kit ships no Google/Apple marks. */
  glyph?: string;
  /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
  name?: IconName;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One social/SSO button (§9): the same 56 height as the CTA and the fields,
 * outlined rather than filled so it reads as the alternative to the form, with
 * the logo leading the label.
 */
export function AuthProviderButton({
  label,
  glyph,
  name,
  disabled = false,
  onPress,
  style,
}: AuthProviderButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          height: AUTH_CONTROL_HEIGHT,
          paddingHorizontal: tokens.spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {glyph || name ? <Icon glyph={glyph} name={name} size="base" /> : null}
      <Text size="base" weight="semibold">
        {label}
      </Text>
    </Pressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terms + the switch footer — §9 (register)
// ─────────────────────────────────────────────────────────────────────────────

/** One inline legal link inside {@link AuthTermsCard}. */
export interface AuthTermsLink {
  /** Stable key handed back to the press callback. */
  id: string;
  /** Link copy (e.g. `'Terms of Service'`). */
  label: string;
}

export interface AuthTermsCardProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Lead-in copy. Default `'I agree to the'`. */
  label?: string;
  /** The inline links. Default: Terms of Service + Privacy Policy. */
  links?: AuthTermsLink[];
  /** Fires with the link's `id`. */
  onLinkPress?: (id: string) => void;
  /** Word joining the last two links. Default `'and'`. */
  separator?: string;
  error?: string | null;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** The register screen's default legal links — overridable, never hard-coded copy. */
export const AUTH_DEFAULT_TERMS_LINKS: AuthTermsLink[] = [
  { id: 'terms', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' },
];

/**
 * The terms consent (§9 register): a checkbox in a **bordered card** with both
 * links inline, rather than a naked checkbox floating above the CTA. The card
 * is what makes the consent read as a thing the user is agreeing to instead of
 * one more form row to skim past.
 */
export function AuthTermsCard({
  checked = false,
  onCheckedChange,
  label = 'I agree to the',
  links = AUTH_DEFAULT_TERMS_LINKS,
  onLinkPress,
  separator = 'and',
  error,
  disabled = false,
  style,
}: AuthTermsCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.border,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          invalid={!!error}
          accessibilityLabel={label}
        />
        <Text size="sm" tone="muted" style={{ flex: 1 }}>
          {label}{' '}
          {links.map((link, i) => (
            <Text key={link.id} size="sm" weight="semibold" tone="primaryText">
              {i > 0 ? `${separator} ` : ''}
              <Text
                size="sm"
                weight="semibold"
                tone="primaryText"
                accessibilityRole="link"
                onPress={disabled ? undefined : () => onLinkPress?.(link.id)}
              >
                {link.label}
              </Text>
              {i < links.length - 1 ? ' ' : ''}
            </Text>
          ))}
        </Text>
      </View>
      {error ? (
        <Text size="sm" tone="dangerText" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export interface AuthSwitchFooterProps {
  /** Lead-in copy ("Don't have an account?"). */
  prompt?: string;
  /** The action ("Register"). */
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The centred footer line carrying the opposite action (§9). One line, one
 * emphasis: the prompt is muted, the action is `primaryText` and semibold.
 */
export function AuthSwitchFooter({
  prompt,
  label,
  onPress,
  disabled = false,
  style,
}: AuthSwitchFooterProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: AUTH_TAP_TARGET,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {prompt ? (
        <Text size="sm" tone="muted">
          {prompt}
        </Text>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        disabled={disabled}
        hitSlop={tokens.spacing.sm}
      >
        <Text size="sm" weight="semibold" tone="primaryText">
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The shell
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Brand glyph for the §9 tile above the headline. Nothing renders without it. */
  brandGlyph?: string;
  /** Brand icon from the named set, for an app with no mark of its own. */
  brandIcon?: IconName;
  /** Headline alignment. Default `'left'` — the historical rendering. */
  align?: AuthAlign;
  /** Headline step. Default `'xl'` — the historical rendering. */
  titleSize?: TextSize;
  /** Wrapper style override — the native mirror of the web `className`. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…) — the native
 * mirror of the web `AuthCard`. A themed `Card` holding an optional brand tile,
 * title + subtitle, the form `children`, and an optional footer.
 *
 * `brandGlyph`/`brandIcon`, `align` and `titleSize` are additive: with none of
 * them passed the card renders exactly as it always did (left-aligned `xl`
 * title, `sm` muted subtitle). Pass them to bring a composed form up to the
 * screen-level §9 anatomy without rebuilding it.
 *
 * Token-bound; no literal colors. (`className` → `style` is the only idiomatic
 * swap from the web twin.)
 */
export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  brandGlyph,
  brandIcon,
  align = 'left',
  titleSize = 'xl',
  style,
}: AuthCardProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View style={[{ width: '100%', maxWidth: 384, alignSelf: 'center' }, style]}>
      <Card style={{ gap: tokens.spacing.md }}>
        <AuthBrandTile glyph={brandGlyph} name={brandIcon} align={align} />
        {/*
          The subtitle keeps its historical `sm`/`muted` rendering when it is a
          string, which is why it is passed through as a node here rather than
          handed to AuthHeading's `base` step.
        */}
        <AuthHeading
          title={title}
          subtitle={
            subtitle != null && typeof subtitle === 'string' ? (
              <Text size="sm" tone="muted" align={align === 'center' ? 'center' : 'left'}>
                {subtitle}
              </Text>
            ) : (
              subtitle
            )
          }
          align={align}
          size={titleSize}
        />
        {children}
        {footer != null ? (
          <View style={{ alignItems: 'center' }}>
            {typeof footer === 'string' ? (
              <Text size="sm" tone="muted">
                {footer}
              </Text>
            ) : (
              footer
            )}
          </View>
        ) : null}
      </Card>
    </View>
  );
}
