import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Card, Icon } from '../primitives';

export type PermissionKind =
  | 'notifications'
  | 'location'
  | 'camera'
  | 'microphone'
  | 'photos'
  | 'contacts'
  | 'generic';

export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied';

export interface PermissionPromptProps {
  /** Which OS permission this pre-prompt is priming. Sets the default glyph. */
  kind?: PermissionKind;
  /** Explicit glyph override for the medallion. */
  icon?: string;
  /** Outcome-oriented headline (e.g. `'Never miss a reply'`). */
  title: string;
  /**
   * The "why" shown before the OS dialog — the explain half of explain-then-ask
   * (design.md §17). Say what the user gets, not what you access.
   */
  rationale: string;
  /** Allow-button copy. Default `'Allow'`. */
  allowLabel?: string;
  /** Decline-link copy. Default `'Not now'`. */
  denyLabel?: string;
  /** Fires when the user opts in — the host then triggers the real OS request. */
  onAllow?: () => void;
  /** Fires when the user declines the pre-prompt. */
  onDeny?: () => void;
  /** Drives the button/affordance states. Default `'idle'`. */
  state?: PermissionState;
  /** Message shown in the `denied` state. */
  deniedMessage?: string;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<PermissionKind, string> = {
  notifications: '🔔',
  location: '📍',
  camera: '📷',
  microphone: '🎤',
  photos: '🖼️',
  contacts: '👥',
  generic: '🔒',
};

/**
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS dialog so the system prompt only fires once the user has
 * already said yes (design.md §17). Renders a rationale, an `Allow`/`Not now`
 * pair, and reflects `requesting`/`granted`/`denied` states (granted shows a
 * success line; denied shows a recovery hint). Colors come from the success and
 * primary tokens. No literal colors.
 */
export function PermissionPrompt({
  kind = 'generic',
  icon,
  title,
  rationale,
  allowLabel = 'Allow',
  denyLabel = 'Not now',
  onAllow,
  onDeny,
  state = 'idle',
  deniedMessage = 'You can enable this later in Settings.',
  style,
}: PermissionPromptProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const glyph = icon ?? KIND_GLYPH[kind];
  const granted = state === 'granted';

  return (
    <Card style={[{ gap: tokens.spacing.md, alignItems: 'center' }, style]}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: granted ? colors.success : colors.accent,
        }}
      >
        <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onAccent'} />
      </View>

      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.base,
          textAlign: 'center',
          lineHeight: tokens.typography.scale.base * 1.5,
        }}
      >
        {rationale}
      </Text>

      {granted ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          You're all set.
        </Text>
      ) : (
        <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          <Button
            variant="primary"
            size="lg"
            loading={state === 'requesting'}
            onPress={onAllow}
            accessibilityLabel={allowLabel}
            style={{ alignSelf: 'stretch' }}
          >
            {allowLabel}
          </Button>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={denyLabel}
            onPress={onDeny}
            style={{ alignItems: 'center', paddingVertical: tokens.spacing.sm }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }}>
              {denyLabel}
            </Text>
          </Pressable>
          {state === 'denied' ? (
            <Text
              accessibilityLiveRegion="polite"
              style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}
            >
              {deniedMessage}
            </Text>
          ) : null}
        </View>
      )}
    </Card>
  );
}
