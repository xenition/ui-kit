import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { ProfileSetupProps, ProfileField } from './ProfileSetup';

/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV2Props = ProfileSetupProps;

/** §10: geometry only — 56 (`h-14`) is the field height, 44 the tap target. */
const FIELD_HEIGHT_CLASS = 'h-14';
const TAP_TARGET_CLASS = 'min-h-11';

const INPUT_MODE: Record<NonNullable<ProfileField['keyboard']>, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  default: 'text',
  'email-address': 'email',
  'phone-pad': 'tel',
};

/**
 * Profile setup — V2, the editorial line. The hero runs full-bleed to the top
 * edge with the avatar editor centred in it, and the content sheet rises over
 * the seam carrying the headline, the §6 fields and the sticky CTA. The avatar
 * overlaps the seam rather than sitting inside a panel, which is what makes this
 * line read as editorial rather than as the base screen with a bigger picture.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export const ProfileSetupV2 = React.forwardRef<HTMLDivElement, ProfileSetupV2Props>(
  function ProfileSetupV2(
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
      <div ref={ref} className={cn('flex flex-col bg-surface', className)} {...rest}>
        <div className="relative flex h-[38vh] items-center justify-center overflow-hidden bg-primary-50">
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

          {showHeader ? (
            <div className="absolute inset-x-0 top-0 flex items-center gap-sm px-sm">
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
        </div>

        <div className="-mt-xl flex flex-col gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl shadow-lg">
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
                    <label htmlFor={`profile-v2-${field.id}`}>
                      <Text size="sm" weight="semibold" tone="onSurface">
                        {field.label}
                      </Text>
                    </label>
                    <div
                      className={cn(
                        'flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface px-md',
                        FIELD_HEIGHT_CLASS,
                        invalid ? 'border-danger' : 'border-border focus-within:border-primary'
                      )}
                    >
                      {field.icon ? <Icon name={field.icon} size="base" color="muted" /> : null}
                      <input
                        id={`profile-v2-${field.id}`}
                        aria-label={field.label}
                        aria-invalid={invalid || undefined}
                        aria-describedby={invalid ? `profile-v2-${field.id}-error` : undefined}
                        placeholder={field.placeholder}
                        inputMode={INPUT_MODE[field.keyboard ?? 'default']}
                        value={values[field.id] ?? ''}
                        onChange={(e) => onChangeField?.(field.id, e.target.value)}
                        className="h-full flex-1 bg-transparent text-base text-on-surface outline-none placeholder:text-muted"
                      />
                    </div>
                    {invalid ? (
                      <p id={`profile-v2-${field.id}-error`} className="flex items-center gap-xs">
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
      </div>
    );
  }
);
