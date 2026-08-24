import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';

export interface ProfileField {
  /** Key returned in the values map. */
  id: string;
  /** Field label. */
  label: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Keyboard hint. Default `'default'`. */
  keyboard?: 'default' | 'email-address' | 'phone-pad';
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
}

const INPUT_MODE: Record<NonNullable<ProfileField['keyboard']>, React.HTMLAttributes<HTMLInputElement>['inputMode']> = {
  default: 'text',
  'email-address': 'email',
  'phone-pad': 'tel',
};

/**
 * Profile setup step — an editable avatar plus a token-styled field stack and a
 * save action, with an optional "skip for now" so onboarding never hard-blocks
 * on it (design.md §41). Fully controlled: the host owns `values` and gets
 * `(id, text)` callbacks. Field access is guarded through the `values` map so a
 * missing key renders empty, never crashes. No literal colors.
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
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-6', className)} {...rest}>
        <h2 className="text-center text-xl font-bold text-on-surface">{title}</h2>

        <div className="flex justify-center">
          <button
            type="button"
            aria-label="Change profile photo"
            onClick={onEditAvatar}
            className="flex flex-col items-center gap-1"
          >
            <Avatar src={avatarUri} name={name} size="lg" />
            <span className="flex items-center gap-1">
              <Icon glyph="📷" size="sm" color="primary" />
              <span className="text-sm font-semibold text-primary">Add photo</span>
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label htmlFor={`profile-${field.id}`} className="text-sm font-semibold text-on-surface">
                {field.label}
              </label>
              <input
                id={`profile-${field.id}`}
                aria-label={field.label}
                placeholder={field.placeholder}
                inputMode={INPUT_MODE[field.keyboard ?? 'default']}
                value={values[field.id] ?? ''}
                onChange={(e) => onChangeField?.(field.id, e.target.value)}
                className="rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2 text-base text-on-surface outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <GetStartedButton label={saveLabel} loading={loading} onClick={onSave} />
          {skipLabel && onSkip ? (
            <button
              type="button"
              aria-label={skipLabel}
              onClick={onSkip}
              className="py-1 text-center text-base font-medium text-muted"
            >
              {skipLabel}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
