import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { DEFAULT_SHARE_TARGETS } from './ShareRow';
import type { ShareRowProps } from './ShareRow';

export interface ShareRowV4Props extends ShareRowProps {
  /** Rewrite each destination's label — the visible pill copy and its name. */
  formatTargetLabel?: (label: string) => string;
}

/**
 * **V4 share row** — same props as {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square — on this
 *    twin with hit slop over them, on the web twin with no recourse at all —
 *    which is a miss on the one row of the article whose only purpose is to be
 *    tapped.
 * 2. **Press is a state layer.** `opacity: 0.6` is *below* M3's 0.38 disabled
 *    band by the time it reaches the glyph, so a pressed share button read as
 *    an unavailable one.
 * 3. **The destination copy is overridable.** The four defaults ship
 *    unchanged — they are good defaults — but `formatTargetLabel` lets an app
 *    localise "Copy link" without rebuilding the whole `targets` array, and
 *    the heading takes `mutedText` rather than the `muted` fill.
 */
export function ShareRowV4({
  onShare,
  targets = DEFAULT_SHARE_TARGETS,
  variant = 'icons',
  heading = 'Share',
  formatTargetLabel,
  style,
}: ShareRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const labeled = variant === 'labeled';
  const tap = minTap(tokens.spacing);
  const label = (value: string): string => (formatTargetLabel ? formatTargetLabel(value) : value);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {heading != null ? (
        <TextV4 size="xs" weight="bold" tone="mutedText" style={{ textTransform: 'uppercase' }}>
          {heading}
        </TextV4>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {targets.map((target) => (
          <Pressable
            key={target.id}
            accessibilityRole="button"
            accessibilityLabel={label(target.label)}
            onPress={() => onShare(target.id)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              width: labeled ? undefined : tap,
              minWidth: tap,
              height: tap,
              paddingHorizontal: labeled ? tokens.spacing.md : 0,
              borderRadius: labeled ? tokens.radius.md : tokens.radius.full,
              borderWidth: 1,
              borderColor: colors.border,
              // The button tints; the glyph inside it keeps full strength.
              backgroundColor: pressed ? pressFill(theme) : colors.surface,
            })}
          >
            <IconV4 glyph={target.glyph} size="base" color="onSurface" />
            {labeled ? (
              <TextV4 size="sm" weight="semibold" tone="onSurface">
                {label(target.label)}
              </TextV4>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
