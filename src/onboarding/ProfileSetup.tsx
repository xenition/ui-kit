import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { IconName } from '../primitives/icon-names';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height every field stands at (§6), Tailwind's `h-14` — and
  44, the minimum tap target for a header control or a text link (§7),
  `h-11`/`min-h-11`. Every colour, radius, gap and font size here is a token
  class.
*/
const FIELD_HEIGHT_CLASS = 'h-14';
const TAP_TARGET_CLASS = 'min-h-11';

export interface ProfileField {
  /** Key returned in the values map. */
  id: string;
  /** Field label. */
  label: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Keyboard hint. Default `'default'`. */
  keyboard?: 'default' | 'email-address' | 'phone-pad';
  /**
   * Leading icon from the kit's named set (§6 — `'user'`, `'mail'`, `'phone'`).
   * Optional: a field without one renders with the glyph column collapsed, not
   * with a hole where an icon should be.
   */
  icon?: IconName;
  /**
   * Per-field validation message. Raises the field's border to `danger` **and**
   * prints the message in `danger-text` — never colour alone, which a
   * colour-blind user cannot see (§6).
   */
  error?: string;
}

export interface ProfileSetupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Display name to seed initials/greeting. */
  name?: string;
  /** Avatar image URL when the user already has one. */
  avatarUri?: string;
  /** Fires when the avatar affordance is clicked (host opens a picker). */
  onEditAvatar?: () => void;
  /** Editable fields (name/bio/etc). Controlled via `values`. */
  fields?: ProfileField[];
  /** Current field values keyed by `ProfileField.id`. */
  values?: Record<string, string>;
  /** Fires with `(id, text)` on each edit. */
  onChangeField?: (id: string, value: string) => void;
  /** Heading. Default `'Set up your profile'`. */
  title?: string;
  /** Save CTA copy. Default `'Save profile'`. */
  saveLabel?: string;
  /** Fires on save. */
  onSave?: () => void;
  /** Save spinner + block. */
  loading?: boolean;
  /** "Skip for now" link copy. Hidden without `onSkip`. */
  skipLabel?: string;
  /** Fires on skip. */
  onSkip?: () => void;
  /** Supporting line under the headline (§4). */
  subtitle?: string;
  /**
   * Hero art for the step (§3). When absent the avatar editor is the hero —
   * this screen always has something to show, so the panel is never empty.
   */
  illustration?: React.ReactNode;
  /** Copy under the avatar. Default `'Add photo'`. */
  avatarActionLabel?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={1} />`.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /** Form-level error, shown above the CTA in `danger-text` beside a glyph. */
  error?: string;
}

const INPUT_MODE: Record<NonNullable<ProfileField['keyboard']>, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  default: 'text',
  'email-address': 'email',
  'phone-pad': 'tel',
};

/**
 * Profile setup step — the "What should we call you?" screen, rebuilt to the
 * anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress ·
 * dismiss), the avatar editor sitting in the hero panel, a centred headline
 * block, the §6 field stack, and the sticky CTA footer.
 *
 * The old screen was a bare 40px box under a small left-aligned label with a
 * short flat button floating mid-page. Per §6 each field is now **56 tall**
 * (`h-14`) with `radius.lg`, a 1px `border` that rises to `primary` on focus and
 * to `danger` on error, and a leading icon; per §5 the save action is a
 * full-width button in a footer band with a hairline divider above it and a
 * muted "skip" link beneath — never beside — it.
 *
 * Fully controlled: the host owns `values` and gets `(id, text)` callbacks.
 * Field access is guarded through the `values` map so a missing key renders
 * empty, never crashes, and an empty `fields` array renders the screen without
 * a form rather than a broken one. Every new prop is optional. No literal
 * colors.
 */
export const ProfileSetup = React.forwardRef<HTMLDivElement, ProfileSetupProps>(
  function ProfileSetup(
    {
      name,
      avatarUri,
      onEditAvatar,
      fields = [],
      values = {},
      onChangeField,
      title = 'Set up your profile',
      saveLabel = 'Save profile',
      onSave,
      loading = false,
      skipLabel,
      onSkip,
      subtitle,
      illustration,
      avatarActionLabel = 'Add photo',
      progress,
      onBack,
      onDismiss,
      error,
      className,
      ...rest
    },
    ref
  ) {
    const showHeader = onBack != null || onDismiss != null || progress != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-lg', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
            <div className="flex flex-1 justify-center">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
          </div>
        ) : null}

        {/* Hero slot — the avatar editor is this screen's own artwork (§3). */}
        <div className="flex aspect-[4/3] max-h-[38vh] items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50 p-lg">
          {illustration ?? (
            <button
              type="button"
              aria-label="Change profile photo"
              onClick={onEditAvatar}
              className="flex flex-col items-center gap-sm"
            >
              <Avatar src={avatarUri} name={name} size="lg" />
              <span className="flex items-center gap-xs">
                <Icon name="camera" size="sm" color="primary" />
                <Text size="sm" weight="semibold" tone="primary">
                  {avatarActionLabel}
                </Text>
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-sm">
          <h2>
            <Text size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2} className="block">
              {title}
            </Text>
          </h2>
          {subtitle ? (
            <Text size="base" tone="muted" align="center" numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
        </div>

        {fields.length > 0 ? (
          <div className="flex flex-col gap-md">
            {fields.map((field) => {
              const invalid = field.error != null && field.error !== '';
              return (
                <div key={field.id} className="flex flex-col gap-xs">
                  <label htmlFor={`profile-${field.id}`}>
                    <Text size="sm" weight="semibold" tone="onSurface">
                      {field.label}
                    </Text>
                  </label>
                  <div
                    className={cn(
                      'flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface px-md',
                      FIELD_HEIGHT_CLASS,
                      // Focus raises the border to primary; an error holds it at
                      // danger even while focused, because a field being fixed
                      // is still wrong until it is not.
                      invalid ? 'border-danger' : 'border-border focus-within:border-primary'
                    )}
                  >
                    {field.icon ? <Icon name={field.icon} size="base" color="muted" /> : null}
                    <input
                      id={`profile-${field.id}`}
                      aria-label={field.label}
                      aria-invalid={invalid || undefined}
                      aria-describedby={invalid ? `profile-${field.id}-error` : undefined}
                      placeholder={field.placeholder}
                      inputMode={INPUT_MODE[field.keyboard ?? 'default']}
                      value={values[field.id] ?? ''}
                      onChange={(e) => onChangeField?.(field.id, e.target.value)}
                      className="h-full flex-1 bg-transparent text-base text-on-surface outline-none placeholder:text-muted"
                    />
                  </div>
                  {invalid ? (
                    <p id={`profile-${field.id}-error`} className="flex items-center gap-xs">
                      <Icon name="error" size="sm" color="danger" />
                      <Text size="sm" tone="dangerText">
                        {field.error}
                      </Text>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="flex items-center justify-center gap-xs">
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-sm border-t border-border bg-surface pb-lg pt-md">
          <GetStartedButton label={saveLabel} trailingArrow={false} loading={loading} onClick={onSave} />
          {skipLabel && onSkip ? (
            <button
              type="button"
              aria-label={skipLabel}
              onClick={onSkip}
              className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
            >
              <Text size="base" weight="medium" tone="muted">
                {skipLabel}
              </Text>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
