import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type ManifestState = 'pending' | 'checked' | 'missing';

const STATE_META: Record<ManifestState, { glyph: string; label: string; slot: 'muted' | 'success' | 'danger' }> = {
  pending: { glyph: '○', label: 'Pending', slot: 'muted' },
  checked: { glyph: '✓', label: 'Checked', slot: 'success' },
  missing: { glyph: '✕', label: 'Missing', slot: 'danger' },
};

export interface ManifestRowProps {
  /** Line-item name / description (headline). */
  item: string;
  /** SKU / part number sub-line. */
  sku?: string;
  /** Ordered / expected quantity. */
  quantity?: number;
  /** Scanned / verified quantity so far. */
  scanned?: number;
  /** Verification state — glyph + word, never color alone. */
  state?: ManifestState;
  /** Fires with the next state when the check control is pressed. */
  onToggle?: (next: ManifestState) => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single manifest / checklist line for goods-in or load verification: item +
 * SKU, a `scanned / quantity` counter, and a tappable check control. State is
 * carried by a glyph + word (checkmark/cross/circle) and an
 * `accessibilityState.checked`, never color alone. Pressing the control cycles
 * pending → checked and fires `onToggle`. All colors are theme tokens.
 */
export function ManifestRow({
  item,
  sku,
  quantity,
  scanned,
  state = 'pending',
  onToggle,
  testID,
  style,
}: ManifestRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const accent = colors[meta.slot];
  const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: state === 'checked' }}
        accessibilityLabel={`${meta.label}: ${item}`}
        disabled={!onToggle}
        onPress={() => onToggle?.(state === 'checked' ? 'pending' : 'checked')}
        testID={testID}
        style={{
          width: 26,
          height: 26,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: state === 'checked' ? 0 : 1.5,
          borderColor: colors.border,
          backgroundColor: state === 'checked' ? accent : 'transparent',
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: state === 'checked' ? colors.surface : accent }}>
          {meta.glyph}
        </Text>
      </Pressable>

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
          {item}
        </Text>
        {sku ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {sku}
          </Text>
        ) : null}
      </View>

      {quantity != null ? (
        <Text
          style={{
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            color: complete === false ? colors.warn : complete ? colors.success : colors.onSurface,
          }}
        >
          {scanned != null ? `${scanned}/${quantity}` : `×${quantity}`}
        </Text>
      ) : null}
    </View>
  );
}
