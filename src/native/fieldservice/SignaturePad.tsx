import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';

export interface SignaturePadProps {
  /** Prompt shown above the signing area (e.g. "Customer signature"). */
  label?: string;
  /**
   * Controlled captured state. When `true` the pad shows the captured
   * signature summary instead of the prompt. The kit ships no drawing canvas
   * (that needs a native gesture/SVG dependency), so this is a dep-free
   * capture-state placeholder: it records *that* a signature was taken and by
   * whom, and the host app supplies the real capture surface if needed.
   */
  signed?: boolean;
  /** Name of the signer, shown once captured. */
  signerName?: string;
  /** Localized capture timestamp, shown once captured. */
  signedAt?: string;
  /** Fires when the empty pad is tapped to capture a signature. */
  onSign?: () => void;
  /** Fires when the Clear action is pressed on a captured signature. */
  onClear?: () => void;
  /** Disables interaction. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A signature capture block. Because the kit adds no native drawing
 * dependency, this is a dependency-free capture-state surface: an empty state
 * (a dashed baseline + "Tap to sign" prompt that fires `onSign`) and a captured
 * state (the signer name over a baseline, a timestamp, and a Clear action that
 * fires `onClear`). Capture is conveyed by text + a check glyph, not color
 * alone. All colors trace to tokens or a token-derived tint — no literals.
 */
export function SignaturePad({
  label,
  signed = false,
  signerName,
  signedAt,
  onSign,
  onClear,
  disabled = false,
  style,
}: SignaturePadProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const header =
    label != null ? (
      <Text
        style={{
          marginBottom: tokens.spacing.xs,
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    ) : null;

  if (signed) {
    return (
      <View style={style}>
        {header}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.success, 0.06),
            padding: tokens.spacing.md,
            gap: tokens.spacing.sm,
          }}
        >
          <View style={{ minHeight: 48, justifyContent: 'flex-end' }}>
            <Text
              numberOfLines={1}
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.xl,
                fontStyle: 'italic',
                fontWeight: '600',
              }}
            >
              {signerName ?? 'Signed'}
            </Text>
            <View style={{ marginTop: tokens.spacing.xs, height: 1, backgroundColor: colors.border }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon glyph="✓" size="sm" color="success" accessibilityLabel="Signed" />
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                Captured{signedAt != null ? ` · ${signedAt}` : ''}
              </Text>
            </View>
            {onClear ? (
              <Button variant="ghost" size="sm" tone="danger" onPress={onClear} disabled={disabled}>
                Clear
              </Button>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={style}>
      {header}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label != null ? `${label}: tap to sign` : 'Tap to sign'}
        accessibilityState={{ disabled }}
        disabled={disabled || !onSign}
        onPress={onSign}
        style={({ pressed }) => ({
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        })}
      >
        <Icon glyph="✍" size="2xl" color="muted" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
          Tap to sign
        </Text>
        <View style={{ marginTop: tokens.spacing.sm, width: '80%', height: 1, backgroundColor: colors.border }} />
      </Pressable>
    </View>
  );
}
