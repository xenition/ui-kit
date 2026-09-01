import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { clampPercent, metaLine, toneInk, type ToneV4 } from './internal/fleet-v4';
import type { HealthStatus, VehicleHealthRowProps } from './VehicleHealthRow';
import type { ProgressTone } from '../primitives/Progress';

export interface VehicleHealthRowV4Props extends VehicleHealthRowProps {
  /** Override the status words — four English words lived inside. */
  statusLabels?: Partial<Record<HealthStatus, string>>;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * Status → tone, word and glyph.
 *
 * `unknown` takes `neutral`, not a status colour: "we could not read this
 * sensor" is an absence of information, and painting it amber would tell the
 * driver something the vehicle never said.
 */
const HEALTH_META: Record<
  HealthStatus,
  { label: string; tone: ToneV4; glyph: string; meter?: ProgressTone }
> = {
  ok: { label: 'OK', tone: 'success', glyph: '✓', meter: 'success' },
  attention: { label: 'Attention', tone: 'warn', glyph: '!', meter: 'warn' },
  critical: { label: 'Critical', tone: 'danger', glyph: '✕', meter: 'danger' },
  unknown: { label: 'Unknown', tone: 'neutral', glyph: '?' },
};

/**
 * **V4 vehicle health row** — same props as {@link VehicleHealthRow} plus
 * `statusLabels` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding and
 *    separator inset match every other row in the kit.
 * 2. **Status is a word and a glyph, not a tint.** A row of coloured dots down
 *    a diagnostics list is unreadable to a colour-blind driver, which is the
 *    one user this screen exists for.
 * 3. **`unknown` stops borrowing a status colour** — see {@link HEALTH_META}.
 * 4. **The reading is tabular** and the ink is the contrast-corrected slot.
 *
 * **Renders nothing without a `system`** (§4.5).
 */
export function VehicleHealthRowV4({
  system,
  status = 'ok',
  reading,
  glyph,
  percent,
  variant = 'default',
  statusLabels,
  last = false,
  style,
}: VehicleHealthRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!system) return null;

  const meta = HEALTH_META[status];
  const word = statusLabels?.[status] ?? meta.label;
  const pct = clampPercent(percent);
  const compact = variant === 'compact';

  return (
    <View
      accessible
      accessibilityLabel={metaLine([system, word, reading, pct != null ? `${pct}%` : null])}
      style={[
        rowContainerStyle(theme, { twoLine: !compact && pct != null }),
        { backgroundColor: rowGround(theme, {}) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <IconV4
        glyph={glyph ?? meta.glyph}
        size="lg"
        style={{ color: toneInk(theme, meta.tone) }}
      />

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {system}
        </TextV4>
        {!compact && pct != null ? (
          <ProgressV4 value={pct} tone={meta.meter ?? 'primary'} />
        ) : null}
      </View>

      {reading ? (
        <TextV4 size="sm" tone="mutedText" numeric="tabular">
          {reading}
        </TextV4>
      ) : null}

      <BadgeV4 tone={meta.tone} variant="soft" size="sm">
        {word}
      </BadgeV4>
    </View>
  );
}
