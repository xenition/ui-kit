import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuthFieldV4 } from '../primitives/AuthFieldV4';
import { AvatarV4 } from '../primitives/AvatarV4';
import { IconV4 } from '../primitives/IconV4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGroundVars,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { ProfileField, ProfileSetupProps } from './ProfileSetup';

export interface ProfileSetupV4Props extends ProfileSetupProps, OnboardingFlowV4Props {
  /**
   * Render as a whole screen — the shared shell, so the form scrolls under a
   * pinned CTA. Default `false`, the base's block rendering.
   */
  fullScreen?: boolean;
  /** Accessible name for the avatar control. Default `'Change profile photo'`. */
  avatarAccessibilityLabel?: string;
}

/**
 * A `ProfileField.keyboard` as an `<input type>`.
 *
 * The prop is named for the native keyboard it asks for, which is the right
 * name on the platform this module was written for; on the web the same three
 * intents are input types, and mapping them is what makes a phone field bring
 * up a phone keypad in a browser too.
 */
const INPUT_TYPE: Record<NonNullable<ProfileField['keyboard']>, React.HTMLInputTypeAttribute> = {
  default: 'text',
  'email-address': 'email',
  'phone-pad': 'tel',
};

/**
 * **V4 profile setup** — the web twin of the native `ProfileSetupV4`: the
 * base's props plus `fullScreen`, `avatarAccessibilityLabel` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled an `<input>` with
 *    its own border, focus colour and height, so the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel — the
 *    exact drift the design-spec Addendum settled. §10.5: use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field.
 * 3. **`keyboard` reaches the browser** (see {@link INPUT_TYPE}). The base
 *    accepted the prop and dropped it on this twin, so a phone field on the
 *    web brought up a full keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** and an accessible
 *    name that is a prop rather than a hard-coded English string.
 * 5. **`fullScreen`** — the shared shell.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot, and
 * `illustration` still replaces it.
 */
export const ProfileSetupV4 = React.forwardRef<HTMLDivElement, ProfileSetupV4Props>(
  function ProfileSetupV4(
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
      avatarAccessibilityLabel = 'Change profile photo',
      progress,
      onBack,
      onDismiss,
      error,
      fullScreen = false,
      ground = 'plain',
      accent = 'primary',
      className,
      style,
      ...rest
    },
    ref
  ) {
    const avatarEditor = (
      <button
        type="button"
        aria-label={avatarAccessibilityLabel}
        onClick={onEditAvatar}
        data-xen-v4-chrome="on-surface"
        className="flex flex-col items-center gap-sm rounded-[var(--xen-radius-lg)] p-sm"
      >
        <AvatarV4 src={avatarUri} name={name} size="lg" />
        <span className="flex items-center gap-xs text-sm font-semibold text-[var(--flow-ink)]">
          <IconV4 name="camera" size="sm" />
          {avatarActionLabel}
        </span>
      </button>
    );

    const form =
      fields.length > 0 ? (
        <div className="flex w-full flex-col gap-md">
          {fields.map((field) => (
            <AuthFieldV4
              key={field.id}
              label={field.label}
              icon={field.icon}
              placeholder={field.placeholder}
              inputType={INPUT_TYPE[field.keyboard ?? 'default']}
              error={field.error}
              value={values[field.id] ?? ''}
              onChangeText={(text) => onChangeField?.(field.id, text)}
            />
          ))}
        </div>
      ) : null;

    const formError = error ? (
      <p role="alert" className="flex items-center justify-center gap-xs text-sm text-danger-text">
        <IconV4 name="error" size="sm" />
        {error}
      </p>
    ) : null;

    const header = <FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />;

    const footer = (
      <FlowFooterV4
        secondaryLabel={onSkip ? skipLabel : undefined}
        onSecondary={onSkip}
        safeArea={fullScreen}
      >
        <GetStartedButtonV4
          label={saveLabel}
          trailingArrow={false}
          loading={loading}
          onClick={onSave}
        />
      </FlowFooterV4>
    );

    const body = (
      <>
        <FlowHeroV4 illustration={illustration ?? avatarEditor} />
        <FlowHeadlineV4 title={title} subtitle={subtitle} />
        {form}
        {formError}
      </>
    );

    if (fullScreen) {
      return (
        <FlowScreenV4
          ref={ref}
          {...rest}
          ground={ground}
          accent={accent}
          center={false}
          className={className}
          style={style}
          header={header}
          footer={footer}
        >
          {body}
        </FlowScreenV4>
      );
    }

    return (
      <div
        ref={ref}
        style={{ ...flowGroundVars(ground, accent), ...style }}
        className={cn('flex flex-col gap-lg', className)}
        {...rest}
      >
        {onBack != null || onDismiss != null || progress != null ? header : null}
        {body}
        <div className="mt-auto w-full">{footer}</div>
      </div>
    );
  }
);
