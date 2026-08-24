import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { withAlpha } from './internal';

export interface CannedResponseData {
  /** Stable id, returned to `onInsert`. */
  id: string;
  /** Short human title (e.g. "Password reset"). */
  title: string;
  /** The saved reply body. */
  body: string;
  /** Optional typed shortcut (e.g. `/reset`). Rendered as a mono-ish chip. */
  shortcut?: string;
  /** Optional grouping/category tag. */
  category?: string;
}

export interface CannedResponseProps {
  /** The saved reply to display. */
  response: CannedResponseData;
  /** How many body lines to show before truncating (default 2). */
  previewLines?: number;
  /** Fires with the response when "Insert" is pressed. */
  onInsert?: (response: CannedResponseData) => void;
  /** Fires when the card body (not the button) is tapped — e.g. to expand. */
  onPress?: (response: CannedResponseData) => void;
  /** Insert-button label (default "Insert"). */
  insertLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Tapping the body fires
 * `onPress` (e.g. to preview the whole thing). All colors/spacing come from the
 * compiled theme tokens; the shortcut chip uses a token tint, not literal hex.
 */
export function CannedResponse({
  response,
  previewLines = 2,
  onInsert,
  onPress,
  insertLabel = 'Insert',
  style,
}: CannedResponseProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <Card variant="outlined" padding="md" style={style}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`Canned response: ${response.title}`}
        onPress={onPress ? () => onPress(response) : undefined}
        disabled={!onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}
          >
            {response.title}
          </Text>
          {response.shortcut ? (
            <View
              style={{
                backgroundColor: withAlpha(colors.primary, 0.14),
                borderRadius: tokens.radius.sm,
                paddingHorizontal: tokens.spacing.xs,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {response.shortcut}
              </Text>
            </View>
          ) : null}
          {response.category ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {response.category}
            </Text>
          ) : null}
        </View>
        <Text
          numberOfLines={Math.max(1, previewLines)}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}
        >
          {response.body}
        </Text>
      </Pressable>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: tokens.spacing.sm }}>
        <Button
          size="sm"
          variant="soft"
          onPress={onInsert ? () => onInsert(response) : undefined}
          disabled={!onInsert}
        >
          {insertLabel}
        </Button>
      </View>
    </Card>
  );
}
