import * as React from 'react';
import { cn } from './cn';
import { Button } from './Button';
import { Card } from './Card';
import { Checkbox } from './Checkbox';
import { Icon } from './Icon';
import { Spinner } from './Spinner';
import { Text, type TextSize } from './Text';
import type { IconName } from './icon-names';

/**
 * The auth family's shared anatomy — `AuthCard` and the parts every auth
 * surface is assembled from. Web twin of `native/primitives/AuthCard`, at prop
 * parity part for part.
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
 * Everything here is presentational and token-bound: colors, radii, spacing and
 * font sizes all resolve through the `--xen-*` Tailwind preset. The only bare
 * numbers are the two control heights below, which are geometry, not theme.
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

  The Tailwind forms are written out as whole literals, never assembled from
  the numbers, because Tailwind's content scanner reads source text. `h-14` is
  3.5rem and `min-h-11` is 2.75rem — the same 56/44 at the default root size,
  spelled the way `GetStartedButton` spells the CTA so the funnel's controls
  cannot drift a pixel apart.
*/
export const AUTH_CONTROL_HEIGHT = 56;
export const AUTH_TAP_TARGET = 44;
const CONTROL_H = 'h-14';
const CONTROL_SQUARE = 'h-14 w-14';
const TAP_TARGET_MIN = 'min-h-11';

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
  'aria-label'?: string;
  className?: string;
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
  'aria-label': ariaLabel,
  className,
}: AuthBrandTileProps): React.ReactElement | null {
  if (!glyph && !name) return null;
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary',
        CONTROL_SQUARE,
        align === 'center' ? 'self-center' : 'self-start',
        className
      )}
    >
      <Icon glyph={glyph} name={name} size="2xl" color="onPrimary" aria-label={ariaLabel} />
    </div>
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
  className?: string;
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
  className,
}: AuthHeadingProps): React.ReactElement | null {
  if (title == null && subtitle == null) return null;
  const textAlign = align === 'center' ? 'center' : 'left';
  return (
    <div
      className={cn(
        'flex flex-col gap-xs',
        align === 'center' ? 'items-center' : 'items-start',
        className
      )}
    >
      {title != null ? (
        typeof title === 'string' ? (
          <h1>
            <Text size={size} weight="bold" align={textAlign}>
              {title}
            </Text>
          </h1>
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
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The input — §6, "the auth screens live or die here"
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
  /**
   * Fires with the new text — the native twin's signature, offered here too so
   * a caller can wire both platforms the same way. The DOM `onChange` still
   * works and fires alongside it.
   */
  onChangeText?: (text: string) => void;
  /** `type` for the underlying input when it is not secure. Default `'text'`. */
  inputType?: React.HTMLInputTypeAttribute;
  /** Wrapper className override — layout only. */
  className?: string;
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
export const AuthField = React.forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  {
    label,
    icon,
    error,
    hint,
    secure = false,
    trailing,
    disabled = false,
    onChangeText,
    onChange,
    inputType = 'text',
    className,
    showLabel = 'Show password',
    hideLabel = 'Hide password',
    ...rest
  },
  ref
) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      {label ? (
        <Text size="sm" weight="medium">
          {label}
        </Text>
      ) : null}

      <div
        className={cn(
          'flex w-full items-center gap-sm bg-surface transition-colors',
          'rounded-[var(--xen-radius-lg)] border px-md',
          CONTROL_H,
          error ? 'border-danger focus-within:border-danger' : 'border-border focus-within:border-primary',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        {icon ? <Icon name={icon} size="base" color="muted" /> : null}
        <input
          ref={ref}
          type={secure && !visible ? 'password' : secure ? 'text' : inputType}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          onChange={(e) => {
            onChangeText?.(e.target.value);
            onChange?.(e);
          }}
          className="min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none"
          {...rest}
        />
        {secure ? (
          <button
            type="button"
            aria-label={visible ? hideLabel : showLabel}
            aria-pressed={visible}
            disabled={disabled}
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <Icon name={visible ? 'eye-off' : 'eye'} size="base" color={visible ? 'primary' : 'muted'} />
          </button>
        ) : null}
        {trailing}
      </div>

      {error ? (
        <Text size="sm" tone="dangerText" role="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text size="sm" tone="muted">
          {hint}
        </Text>
      ) : null}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// The primary action — §5
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthSubmitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  loading?: boolean;
  /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
  trailingArrow?: boolean;
}

/**
 * The sticky CTA's button (§5): full width, **56 tall**, `radius.full`,
 * `primary` fill, `onPrimary` semibold label, trailing `→`.
 *
 * Disabled is the same shape at reduced opacity, never a different shape —
 * a button that changes size when it enables looks like it moved.
 */
export const AuthSubmitButton = React.forwardRef<HTMLButtonElement, AuthSubmitButtonProps>(
  function AuthSubmitButton(
    { label, loading = false, trailingArrow = true, disabled, className, ...rest },
    ref
  ) {
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-label={label}
        className={cn(
          'w-full gap-sm rounded-[var(--xen-radius-full)] py-0',
          CONTROL_H,
          className
        )}
        {...rest}
      >
        {loading ? <Spinner size="sm" aria-label="Loading" /> : null}
        <Text size="lg" weight="semibold" tone="onPrimary">
          {label}
        </Text>
        {trailingArrow ? <Icon name="forward" size="base" color="onPrimary" /> : null}
      </Button>
    );
  }
);

export interface AuthStickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * The footer the CTA is pinned into (§5): a hairline `border` divider on top
 * and `surface` behind it, so scrolling content passes **under** the action
 * instead of colliding with it.
 */
export function AuthStickyFooter({
  className,
  children,
  ...rest
}: AuthStickyFooterProps): React.ReactElement {
  return (
    <div
      className={cn(
        'sticky bottom-0 flex flex-col gap-sm border-t border-border bg-surface p-lg',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The provider row — §9
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Copy centred on the rule. Without it the rule is drawn bare. */
  label?: string;
}

/**
 * The "or continue with" separator (§9): one hairline running the full width
 * with the label sitting **on** it, knocked out by a `surface` patch — not two
 * stubs of rule with a gap between them.
 *
 * The caller decides whether it appears at all: a divider above nothing is the
 * empty state §10.6 forbids.
 */
export function AuthDivider({ label, className, ...rest }: AuthDividerProps): React.ReactElement {
  return (
    <div className={cn('relative flex items-center justify-center', className)} {...rest}>
      <span aria-hidden className="absolute inset-x-0 h-px bg-border" />
      {label ? (
        <span className="relative bg-surface px-sm">
          <Text size="xs" tone="muted">
            {label}
          </Text>
        </span>
      ) : null}
    </div>
  );
}

export interface AuthProviderButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  /** One-off brand glyph — the kit ships no Google/Apple marks. */
  glyph?: string;
  /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
  name?: IconName;
}

/**
 * One social/SSO button (§9): the same 56 height as the CTA and the fields,
 * outlined rather than filled so it reads as the alternative to the form, with
 * the logo leading the label.
 */
export const AuthProviderButton = React.forwardRef<HTMLButtonElement, AuthProviderButtonProps>(
  function AuthProviderButton({ label, glyph, name, className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          'flex w-full items-center justify-center gap-sm bg-surface px-lg',
          'rounded-[var(--xen-radius-full)] border border-border transition-opacity',
          'hover:opacity-85 disabled:pointer-events-none disabled:opacity-50',
          CONTROL_H,
          className
        )}
        {...rest}
      >
        {glyph || name ? <Icon glyph={glyph} name={name} size="base" /> : null}
        <Text size="base" weight="semibold">
          {label}
        </Text>
      </button>
    );
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Terms + the switch footer — §9 (register)
// ─────────────────────────────────────────────────────────────────────────────

/** One inline legal link inside {@link AuthTermsCard}. */
export interface AuthTermsLink {
  /** Stable key handed back to the click callback. */
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
  onLinkClick?: (id: string) => void;
  /** Word joining the last two links. Default `'and'`. */
  separator?: string;
  error?: string | null;
  disabled?: boolean;
  className?: string;
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
 *
 * `onCheckedChange` is the boolean form both twins expose — the underlying web
 * `Checkbox` is a real DOM input whose `onChange` takes an event, so the
 * boolean lives one level up where it can have the same name on both platforms.
 */
export function AuthTermsCard({
  checked = false,
  onCheckedChange,
  label = 'I agree to the',
  links = AUTH_DEFAULT_TERMS_LINKS,
  onLinkClick,
  separator = 'and',
  error,
  disabled = false,
  className,
}: AuthTermsCardProps): React.ReactElement {
  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      <div
        className={cn(
          'flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface p-md',
          error ? 'border-danger' : 'border-border',
          disabled && 'opacity-50'
        )}
      >
        <Checkbox
          checked={checked}
          invalid={!!error}
          disabled={disabled}
          aria-label={label}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
        />
        <Text size="sm" tone="muted" className="flex-1">
          {label}{' '}
          {links.map((link, i) => (
            <React.Fragment key={link.id}>
              {i > 0 ? `${separator} ` : ''}
              <button
                type="button"
                disabled={disabled}
                onClick={() => onLinkClick?.(link.id)}
                className="font-semibold text-primary-text underline-offset-2 hover:underline"
              >
                {link.label}
              </button>
              {i < links.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </Text>
      </div>
      {error ? (
        <Text size="sm" tone="dangerText" role="alert">
          {error}
        </Text>
      ) : null}
    </div>
  );
}

export interface AuthSwitchFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lead-in copy ("Don't have an account?"). */
  prompt?: string;
  /** The action ("Register"). */
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * The centred footer line carrying the opposite action (§9). One line, one
 * emphasis: the prompt is muted, the action is `primary-text` and semibold.
 */
export function AuthSwitchFooter({
  prompt,
  label,
  onClick,
  disabled = false,
  className,
  ...rest
}: AuthSwitchFooterProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-xs',
        TAP_TARGET_MIN,
        className
      )}
      {...rest}
    >
      {prompt ? (
        <Text size="sm" tone="muted">
          {prompt}
        </Text>
      ) : null}
      <button type="button" aria-label={label} onClick={onClick} disabled={disabled}>
        <Text size="sm" weight="semibold" tone="primaryText">
          {label}
        </Text>
      </button>
    </div>
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
  className?: string;
}

/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…). A themed
 * `Card` holding an optional brand tile, title + subtitle, the form
 * `children`, and an optional footer.
 *
 * `brandGlyph`/`brandIcon`, `align` and `titleSize` are additive: with none of
 * them passed the card renders as it always did (left-aligned `xl` title, `sm`
 * muted subtitle). Pass them to bring a composed form up to the screen-level §9
 * anatomy without rebuilding it. Bound to the theme tokens.
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
  className,
}: AuthCardProps): React.ReactElement {
  return (
    <div className={cn('mx-auto w-full max-w-sm', className)}>
      <Card className="flex flex-col gap-md">
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
        {footer != null && <div className="text-center">{footer}</div>}
      </Card>
    </div>
  );
}
