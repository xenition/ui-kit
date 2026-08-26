import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { UploadFile, UploadProps } from './Upload';
import { brandWash, tapTarget } from './internal/picker-v4';
import { pressOver } from './internal/state-v4';

export type { UploadProps as UploadV4Props, UploadFile };

const NOOP_PICK = async (): Promise<UploadFile[]> => [];

/**
 * What this dropzone will accept, in a sentence — or `null` when there is
 * nothing worth saying.
 *
 * §15 asks an empty state to answer "what belongs here". `accept` and
 * `multiple` are the only two facts the component actually knows, so they are
 * the only two it claims. When it knows neither, it says nothing rather than
 * filling the space with "Any file type", which is noise dressed as help
 * (§7 — reduce visual noise).
 */
export function acceptHint(accept?: string, multiple?: boolean): string | null {
  const parts: string[] = [];
  if (accept) parts.push(`Accepts ${accept}`);
  if (multiple) parts.push(parts.length ? 'more than one is fine' : 'More than one is fine');
  return parts.length ? parts.join(' · ') : null;
}

/**
 * **V4 upload** — the same props as {@link Upload}, a different design line.
 *
 * ## The empty state IS the component
 *
 * An upload control has no content of its own. Whatever it looks like before a
 * file exists is the whole thing, which makes §15 the entire brief: an empty
 * state has to say **what belongs here**, and **what to do next**.
 *
 * The base says neither loudly. It renders one line of `muted` `sm` text inside
 * a dashed box — the quietest type in the kit, used for the only thing on
 * screen. So the hierarchy is inverted here (§6):
 *
 *   - **A mark.** A brand-washed disc with an upward glyph. `brandWash` is the
 *     brand composited ONCE against the surface into an opaque colour — not
 *     `ramps.primary[50]`, which keeps the light orientation in both schemes
 *     and would be a near-white blob on a dark page.
 *   - **A headline that is not muted.** The caller's `label` at `base` in
 *     `onSurface`, semibold. It is the loudest thing in the box because it is
 *     the only thing in the box.
 *   - **A line about what fits**, derived from `accept` and `multiple` — the
 *     only two facts the component actually has. When it has neither it says
 *     nothing rather than padding the space (§7).
 *   - **A word while it works.** Pressing hands off to the host's `pickFiles`,
 *     which opens a system sheet and can take a moment; the zone says
 *     "Opening…" rather than sitting inert (§37 — make system status visible).
 *
 * ## The zone
 *
 * Three tap targets tall, so it reads as a place rather than a button, with the
 * dashed edge the universal "drop here" convention (§31). Pressing washes the
 * ground and turns the edge `primary`, so the whole zone acknowledges the touch
 * rather than only the text inside it. No shadow: a drop target is a hole, not
 * a raised object, and depth here would say the opposite of what it means.
 */
export function UploadV4({
  onFiles,
  pickFiles = NOOP_PICK,
  accept,
  multiple = false,
  label = 'Tap to choose a file',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: UploadProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [busy, setBusy] = React.useState(false);

  const handlePress = React.useCallback(async (): Promise<void> => {
    if (disabled || busy) return;
    setBusy(true);
    try {
      const files = await pickFiles({ accept, multiple });
      if (files && files.length) onFiles?.(files);
    } finally {
      setBusy(false);
    }
  }, [disabled, busy, pickFiles, accept, multiple, onFiles]);

  const target = tapTarget(theme);
  const wash = brandWash(theme);
  const hint = acceptHint(accept, multiple);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy, busy }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || busy}
      onPress={handlePress}
      style={({ pressed }) => [
        {
          // Three targets tall: a place, not a button.
          minHeight: target * 3,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: invalid ? colors.danger : pressed ? colors.primary : colors.border,
          borderRadius: tokens.radius.lg,
          // Pressing washes the whole ground, so the zone acknowledges the
          // touch rather than only the text inside it. M3's pressed layer,
          // painted in `primary` because a drop zone is a brand-touched place.
          backgroundColor: pressed
            ? pressOver(theme, colors.surface, colors.primary)
            : colors.surface,
          padding: tokens.spacing.lg,
          opacity: disabled ? theme.state.disabledContent : 1,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={{
          width: target,
          height: target,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.full,
          backgroundColor: wash,
        }}
      >
        <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xl }}>↑</Text>
      </View>

      {typeof label === 'string' ? (
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}

      {hint !== null ? (
        <Text
          style={{
            color: colors.mutedText,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.sm,
            textAlign: 'center',
          }}
        >
          {hint}
        </Text>
      ) : null}

      {busy ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: colors.primaryText,
            fontFamily: tokens.typography.fontBody,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          Opening…
        </Text>
      ) : null}
    </Pressable>
  );
}
