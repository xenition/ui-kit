import * as React from 'react';
import { Pressable, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Button, Icon } from '../primitives';

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

export interface ProfileSetupProps {
  /** Display name to seed initials/greeting. */
  name?: string;
  /** Avatar image URI when the user already has one. */
  avatarUri?: string;
  /** Fires when the avatar affordance is tapped (host opens a picker). */
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
  style?: StyleProp<ViewStyle>;
}

/**
 * Profile setup step — an editable avatar plus a token-styled field stack and a
 * save action, with an optional "skip for now" so onboarding never hard-blocks
 * on it (design.md §41). Fully controlled: the host owns `values` and gets
 * `(id, text)` callbacks. Field access is guarded through the `values` map so a
 * missing key renders empty, never crashes. No literal colors.
 */
export function ProfileSetup({
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
  style,
}: ProfileSetupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      <Text
        accessibilityRole="header"
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }}
      >
        {title}
      </Text>

      <View style={{ alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change profile photo"
          onPress={onEditAvatar}
          style={{ alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <Avatar src={avatarUri} name={name} size="lg" />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph="📷" size="sm" color="primary" />
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              Add photo
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={{ gap: tokens.spacing.md }}>
        {fields.map((field) => (
          <View key={field.id} style={{ gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {field.label}
            </Text>
            <TextInput
              accessibilityLabel={field.label}
              placeholder={field.placeholder}
              placeholderTextColor={colors.muted}
              keyboardType={field.keyboard ?? 'default'}
              value={values[field.id] ?? ''}
              onChangeText={(t) => onChangeField?.(field.id, t)}
              style={{
                color: colors.onSurface,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                fontSize: tokens.typography.scale.base,
              }}
            />
          </View>
        ))}
      </View>

      <View style={{ gap: tokens.spacing.sm }}>
        <Button variant="primary" size="lg" loading={loading} onPress={onSave} accessibilityLabel={saveLabel} style={{ alignSelf: 'stretch' }}>
          {saveLabel}
        </Button>
        {skipLabel && onSkip ? (
          <Pressable accessibilityRole="button" accessibilityLabel={skipLabel} onPress={onSkip} style={{ alignItems: 'center', paddingVertical: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }}>
              {skipLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
