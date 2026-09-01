import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthFieldV4 } from '../primitives/AuthFieldV4';
import { AvatarV4 } from '../primitives/AvatarV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressLayer } from '../primitives/internal/state-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGrounds,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { ProfileSetupProps } from './ProfileSetup';

export interface ProfileSetupV4Props extends ProfileSetupProps, OnboardingFlowV4Props {
  /**
   * Render as a whole screen — the shared shell, so the form scrolls under a
   * pinned CTA and taps still land while the keyboard is up. Default `false`,
   * the base's block rendering.
   */
  fullScreen?: boolean;
  /** Accessible name for the avatar control. Default `'Change profile photo'`. */
  avatarAccessibilityLabel?: string;
}

/**
 * **V4 profile setup** — the base's props plus `fullScreen`,
 * `avatarAccessibilityLabel` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled a `TextInput` with
 *    its own border, its own focus colour and its own 56 height, which is the
 *    exact drift the design-spec Addendum settled: the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel. §10.5
 *    — use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field. The base tinted the border
 *    and stopped, which a colour-blind user cannot perceive at all.
 * 3. **The keyboard no longer sits on the CTA.** `fullScreen` puts the form in
 *    the shared shell with `keyboardShouldPersistTaps`, so the first tap after
 *    typing hits the button instead of dismissing the keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** (`primaryText`) and
 *    a press layer, and its accessible name is a prop rather than a
 *    hard-coded English string.
 * 5. **The hero tint has no `scheme` branch** — `flowGrounds()` mixes it.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot,
 * and `illustration` still replaces it. With no fields the screen is a hero, a
 * headline and a CTA, and composes fine.
 */
export function ProfileSetupV4({
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
  style,
}: ProfileSetupV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);

  const avatarEditor = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={avatarAccessibilityLabel}
      onPress={onEditAvatar}
      style={({ pressed }) => ({
        alignItems: 'center',
        gap: tokens.spacing.sm,
        padding: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
      })}
    >
      <AvatarV4 src={avatarUri} name={name} size="lg" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <IconV4 name="camera" size="sm" style={{ color: grounds.ink }} />
        <TextV4 size="sm" weight="semibold" style={{ color: grounds.ink }}>
          {avatarActionLabel}
        </TextV4>
      </View>
    </Pressable>
  );

  const form =
    fields.length > 0 ? (
      <View style={{ alignSelf: 'stretch', gap: tokens.spacing.md }}>
        {fields.map((field) => (
          <AuthFieldV4
            key={field.id}
            label={field.label}
            icon={field.icon}
            placeholder={field.placeholder}
            keyboardType={field.keyboard}
            error={field.error}
            value={values[field.id] ?? ''}
            onChangeText={(text) => onChangeField?.(field.id, text)}
          />
        ))}
      </View>
    ) : null;

  const formError = error ? (
    <View
      accessibilityLiveRegion="assertive"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
      }}
    >
      <IconV4 name="error" size="sm" color="dangerText" />
      <TextV4 size="sm" tone="dangerText" style={{ flexShrink: 1 }}>
        {error}
      </TextV4>
    </View>
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
        onPress={onSave}
      />
    </FlowFooterV4>
  );

  const body = (
    <>
      <FlowHeroV4 illustration={illustration ?? avatarEditor} grounds={grounds} />
      <FlowHeadlineV4 title={title} subtitle={subtitle} />
      {form}
      {formError}
    </>
  );

  if (fullScreen) {
    return (
      <FlowScreenV4
        grounds={grounds}
        center={false}
        keyboardAware
        header={header}
        footer={footer}
        style={style}
      >
        {body}
      </FlowScreenV4>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      {onBack != null || onDismiss != null || progress != null ? header : null}
      {body}
      <View style={{ marginTop: 'auto', alignSelf: 'stretch' }}>{footer}</View>
    </View>
  );
}
