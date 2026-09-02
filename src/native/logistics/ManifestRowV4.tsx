import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ManifestRowProps, ManifestState } from './ManifestRow';

/** V4 layout choices for the "dispatch" design. */
export type ManifestRowLayout = 'full' | 'compact';

/** Drop-in for {@link ManifestRowProps} — same props, the V4 "dispatch" design. */
export interface ManifestRowV4Props extends ManifestRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: ManifestRowLayout;
}

const STATE_META: Record<ManifestState, { glyph: string; label: string; slot: 'muted' | 'success' | 'danger' }> = {
  pending: { glyph: '○', label: 'Pending', slot: 'muted' },
  checked: { glyph: '✓', label: 'Checked', slot: 'success' },
  missing: { glyph: '✕', label: 'Missing', slot: 'danger' },
};

/**
 * ManifestRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a load-verification line: an elevated
 * rounded row with a soft shadow, a large check control (`role="checkbox"`,
 * ≥44px tap target) whose meaning is carried by a glyph + `accessibilityState`,
 * the item + SKU, a labelled state word (never color alone), and a
 * `scanned / quantity` counter that greens on completion and warns when short.
 * Pressing the control cycles pending → checked and fires `onToggle`. Honors the
 * V4 `variant` — `full` (default) and `compact` (a denser single line). Token-only
 * colors via `useXenitionTheme()`.
 */
export function ManifestRowV4({
  item,
  sku,
  quantity,
  scanned,
  state = 'pending',
  variant = 'full',
  onToggle,
  testID,
  style,
}: ManifestRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const accent = colors[meta.slot];
  const checked = state === 'checked';
  const complete = quantity != null && scanned != null ? scanned >= quantity : undefined;
  const compact = variant === 'compact';
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const size = compact ? 32 : 44;
  const control = (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={`${meta.label}: ${item}`}
      disabled={!onToggle}
      onPress={() => onToggle?.(checked ? 'pending' : 'checked')}
      testID={testID}
      style={{ width: size, height: size, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: checked ? 0 : 1.5, borderColor: colors.border, backgroundColor: checked ? accent : 'transparent' }}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, color: checked ? colors.surface : accent }}>{meta.glyph}</Text>
    </Pressable>
  );

  const counter =
    quantity != null ? (
      <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'], color: complete === false ? colors.warn : complete ? colors.success : colors.onSurface }}>
        {scanned != null ? `${scanned}/${quantity}` : `×${quantity}`}
      </Text>
    ) : null;

  const layout: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: compact ? tokens.spacing.sm : tokens.spacing.md,
    minHeight: compact ? 44 : 56,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  return (
    <View testID={testID} style={[shell, layout, style]}>
      {control}
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ fontSize: compact ? tokens.typography.scale.sm : tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }}>{item}</Text>
        {!compact ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>{meta.glyph}</Text>
            <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
            {sku ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{`· ${sku}`}</Text> : null}
          </View>
        ) : null}
      </View>
      {counter}
    </View>
  );
}
