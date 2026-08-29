import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  WATERMARK_ALPHA,
  WATERMARK_SCALE,
  WATERMARK_TILT,
} from './internal/identity-v4';
import type { WatermarkProps } from './Watermark';

export type { WatermarkProps as WatermarkV4Props };

/**
 * **V4 watermark** — same props as {@link Watermark}, a different design line.
 *
 * A watermark that competes with the content has failed, and the base one
 * competed in two ways at once: it was laid out by chance, and it was a
 * different strength in each colour scheme.
 *
 * 1. **A lattice, not a blob.** The base dropped `count` spans into a
 *    centre-justified `flexWrap` row. Where the rows broke depended on the
 *    container's width, the last row was always a short cluster in the middle,
 *    and `count` changed the size of the blob rather than the density of the
 *    field. V4 lays the same tiles out as explicit rows — a square-ish lattice
 *    derived from `count` — and offsets alternate rows by half a step, which is
 *    how a repeating mark is actually set. It reads as a texture at any
 *    container size instead of as a paragraph someone rotated.
 * 2. **One strength in both schemes.** The ink was `muted`, a MID tone whose
 *    distance from the page changes with the scheme, floated at 8%: the same
 *    number produced two different marks. V4 prints in `onSurface` — the only
 *    slot guaranteed to sit at the far end from the surface in either scheme —
 *    so a fixed alpha is a fixed *relative* strength.
 * 3. **The twins agree.** Native scaled the field by 1.4 and the web by 1.5,
 *    and the tile padding was `spacing.lg / spacing.md` against `px-6 py-3`
 *    (24/12). Both now read the same three constants.
 *
 * It still sits above the content rather than behind it — a confidentiality
 * mark that a dark screenshot can hide is not a confidentiality mark — and it
 * still takes no touches and is hidden from assistive tech, because it is a
 * property of the page and not something to read.
 */
export function WatermarkV4({
  text,
  children,
  count = 24,
  style,
}: WatermarkProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spacing = tokens.spacing;

  const total = Math.max(1, count);
  // A square-ish lattice: `count` becomes a density, not the size of a blob.
  const cols = Math.max(1, Math.ceil(Math.sqrt(total)));
  const rows: number[][] = [];
  for (let i = 0; i < total; i += cols) {
    rows.push(Array.from({ length: Math.min(cols, total - i) }, (_, j) => i + j));
  }

  return (
    <View style={[{ position: 'relative', overflow: 'hidden' }, style]}>
      {children}
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'center',
            opacity: WATERMARK_ALPHA,
            transform: [{ rotate: `${WATERMARK_TILT}deg` }, { scale: WATERMARK_SCALE }],
          },
        ]}
      >
        {rows.map((row, r) => (
          <View
            key={r}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // Half a step across on every other row — a brick course, which
              // is what stops a lattice reading as a table.
              marginLeft: r % 2 === 0 ? 0 : spacing['2xl'],
            }}
          >
            {row.map((i) => (
              <Text
                key={i}
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontFamily: tokens.typography.fontBody,
                  fontWeight: '700',
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                }}
              >
                {text}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
