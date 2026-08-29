import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { ProfileSetupProps, ProfileField } from './ProfileSetup';

/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV3Props = ProfileSetupProps;

/** §10: geometry only — 56 (`h-14`) is the field height, 44 the tap target. */
const FIELD_HEIGHT_CLASS = 'h-14';
const TAP_TARGET_CLASS = 'min-h-11';

const INPUT_MODE: Record<NonNullable<ProfileField['keyboard']>, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  default: 'text',
  'email-address': 'email',
  'phone-pad': 'tel',
};

/**
 * Profile setup — V3, the compact line. No hero panel: a small badge sits beside
 * a left-aligned headline, and the avatar drops to an inline row — thumbnail,
 * name, camera glyph — the way an account settings row reads. The fields keep
 * their §6 geometry (56, `radius.lg`, leading icon, error border **and**
 * message) because shrinking a text field is how you get a form nobody can tap;
 * what gets denser is the space between things, not the things themselves.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export const ProfileSetupV3 = React.forwardRef<HTMLDivElement, ProfileSetupV3Props>(
  function ProfileSetupV3(
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
      illustration: _illustration,
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
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : null}
            <div className="flex-1">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : null}
          </div>
        ) : null}

        {/* Small leading badge beside the headline — the compact line's stand-in
            for the hero panel. Left-aligned per §11's V3 brief. */}
        <div className="flex items-center gap-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50">
            <Icon name="user" size="lg" color="primary" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <h2>
              <Text size="lg" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                {title}
              </Text>
            </h2>
            {subtitle ? (
              <Text size="sm" tone="muted" numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
          </div>
        </div>

        {/* Avatar as a dense row rather than a hero. */}
        <button
          type="button"
          aria-label="Change profile photo"
          onClick={onEditAvatar}
          className={cn(
            'flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm text-left',
            TAP_TARGET_CLASS
          )}
        >
          <Avatar src={avatarUri} name={name} size="sm" />
          <span className="min-w-0 flex-1 truncate">
            <Text size="base" weight="semibold" tone="onSurface">
              {name ?? avatarActionLabel}
            </Text>
          </span>
          <Icon name="camera" size="base" color="primary" />
        </button>

        {fields.length > 0 ? (
          <div className="flex flex-col gap-sm">
            {fields.map((field) => {
              const invalid = field.error != null && field.error !== '';
              return (
                <div key={field.id} className="flex flex-col gap-xs">
                  <div
                    className={cn(
                      'flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface px-md',
                      FIELD_HEIGHT_CLASS,
                      invalid ? 'border-danger' : 'border-border focus-within:border-primary'
                    )}
                  >
                    {field.icon ? <Icon name={field.icon} size="base" color="muted" /> : null}
                    <input
                      id={`profile-v3-${field.id}`}
                      aria-label={field.label}
                      aria-invalid={invalid || undefined}
                      aria-describedby={invalid ? `profile-v3-${field.id}-error` : undefined}
                      placeholder={field.placeholder ?? field.label}
                      inputMode={INPUT_MODE[field.keyboard ?? 'default']}
                      value={values[field.id] ?? ''}
                      onChange={(e) => onChangeField?.(field.id, e.target.value)}
                      className="h-full flex-1 bg-transparent text-base text-on-surface outline-none placeholder:text-muted"
                    />
                  </div>
                  {invalid ? (
                    <p id={`profile-v3-${field.id}-error`} className="flex items-center gap-xs">
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
          <p role="alert" className="flex items-center gap-xs">
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm">
          <GetStartedButton label={saveLabel} trailingArrow={false} loading={loading} onClick={onSave} />
          {skipLabel && onSkip ? (
            <button
              type="button"
              aria-label={skipLabel}
              onClick={onSkip}
              className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
            >
              <Text size="sm" weight="medium" tone="muted">
                {skipLabel}
              </Text>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
