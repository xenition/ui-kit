import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { discGround, spokenLine } from './internal/job-v4';
import type { SignaturePadProps } from './SignaturePad';

export interface SignaturePadV4Props extends SignaturePadProps {
  /** The label Clear takes once it is armed and waiting. Default `'Confirm clear'`. */
  confirmClearLabel?: string;
  /** The empty pad's prompt. Default `'Tap to sign'` — one string on both twins. */
  signLabel?: string;
}

/**
 * **V4 signature pad** — same props as {@link SignaturePad} plus
 * `confirmClearLabel` and `signLabel`.
 *
 * ## Four changes
 *
 * 1. **Clear takes a confirming press.** The signature is the legally
 *    meaningful artefact of the visit and one press destroyed it — no
 *    confirmation, no undo, and no prop a host app could use to ask for
 *    either. The first press arms Clear and relabels it `confirmClearLabel`.
 * 2. **Clear is the same weight on both twins, and it is the quieter one.**
 *    It was a filled `danger` button on web and a `ghost` text button here, so
 *    the riskiest control in the module was the loudest thing on the card on
 *    one platform and nearly invisible on the other. Both are `ghost` now: the
 *    confirm carries the caution, not the fill.
 * 3. **`signLabel` is one string on both twins.** Web said "click to sign" and
 *    native "tap to sign", so a shared test or a voice command matched one
 *    platform and not the other.
 * 4. **Clear clears 44, and a press is a state layer.** The pad dimmed itself
 *    to `0.85` while held and to `0.5` when disabled — 0.38 is M3's disabled
 *    band, so a pressed pad and a dead one looked alike.
 */
export function SignaturePadV4({
  label,
  signed = false,
  signerName,
  signedAt,
  onSign,
  onClear,
  disabled = false,
  confirmClearLabel = 'Confirm clear',
  signLabel = 'Tap to sign',
  style,
}: SignaturePadV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [armed, setArmed] = React.useState(false);
  const tap = minTap(tokens.spacing);

  const header =
    label != null ? (
      <TextV4
        size="xs"
        weight="semibold"
        tone="mutedText"
        style={{ marginBottom: tokens.spacing.xs }}
      >
        {label}
      </TextV4>
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
            // The module's one tint strength, mixed into `card` rather than
            // washed over whatever happens to be behind the pad.
            backgroundColor: discGround(theme, 'success'),
            padding: tokens.spacing.md,
            gap: tokens.spacing.sm,
          }}
        >
          <View style={{ minHeight: tokens.spacing['2xl'], justifyContent: 'flex-end' }}>
            <TextV4
              size="xl"
              weight="semibold"
              tone="onCard"
              numberOfLines={1}
              style={{ fontStyle: 'italic' }}
            >
              {signerName ?? 'Signed'}
            </TextV4>
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ marginTop: tokens.spacing.xs, height: 1, backgroundColor: colors.border }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View
              accessible
              accessibilityLabel={spokenLine([signerName, 'Signed', signedAt])}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
            >
              <IconV4 glyph="✓" size="sm" color="success" />
              <TextV4 size="xs" tone="mutedText">
                {signedAt != null ? `Captured · ${signedAt}` : 'Captured'}
              </TextV4>
            </View>
            {onClear ? (
              <ButtonV4
                variant="ghost"
                size="sm"
                tone="danger"
                disabled={disabled}
                accessibilityLabel={armed ? confirmClearLabel : 'Clear'}
                onPress={() => {
                  if (!armed) {
                    setArmed(true);
                    return;
                  }
                  setArmed(false);
                  onClear();
                }}
                style={{ minHeight: tap }}
              >
                {armed ? confirmClearLabel : 'Clear'}
              </ButtonV4>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  const inert = disabled || !onSign;

  return (
    <View style={style}>
      {header}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spokenLine([label, signLabel])}
        accessibilityState={{ disabled: inert }}
        disabled={inert}
        onPress={onSign}
        style={({ pressed }) => ({
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor:
            pressed && !inert ? pressOver(theme, colors.surface, colors.onSurface) : colors.surface,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xl,
          minHeight: tap,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          opacity: disabledOpacity(theme.state, inert),
        })}
      >
        <IconV4 glyph="✍" size="2xl" color="mutedText" />
        <TextV4 size="sm" weight="medium" tone="mutedText">
          {signLabel}
        </TextV4>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ marginTop: tokens.spacing.sm, width: '80%', height: 1, backgroundColor: colors.border }}
        />
      </Pressable>
    </View>
  );
}
