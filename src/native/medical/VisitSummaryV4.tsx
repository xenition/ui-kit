import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { clinicGradient, clinicInk, clinicInkSoft, clinicTile, clinicBorder } from './internal/clinic';
import type { VisitSummaryProps } from './VisitSummary';

/** Drop-in for {@link VisitSummaryProps} — same props, the V4 "clinic" design. */
export type VisitSummaryV4Props = VisitSummaryProps;

/**
 * VisitSummary — **V4** "clinic" design (native twin of the web V4). The calm,
 * clinical take on a visit / encounter summary, and the ONE reserved gradient
 * moment of the medical V4 "clinic" line: the header (visit title, provider,
 * visit date) rides a rounded, overflow-hidden `GradientSurface` on the brand
 * gradient (`clinicGradient`) in near-white ink (`clinicInk`/`clinicInkSoft`),
 * with the diagnosis carried as a frosted glass chip (`clinicTile` +
 * `clinicBorder`). The body — the structured note sections — stays on the plain
 * surface with clear labelled rows. Renders loading and empty states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors via
 * `useXenitionTheme()` + the clinic ramp helpers, dark-mode safe. Informational
 * UI only — not a medical device.
 */
export function VisitSummaryV4({
  title,
  provider,
  date,
  diagnosis,
  sections,
  loading = false,
  emptyLabel = 'No visit notes available',
  style,
}: VisitSummaryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = clinicInk(r);
  const inkSoft = clinicInkSoft(r);
  const list = sections ?? [];
  const meta = [provider, date].filter(Boolean) as string[];

  const shell = (children: React.ReactNode, label?: string): React.ReactElement => (
    <View
      accessibilityLabel={label}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  // Reserved gradient moment: the visit-summary hero header.
  const header = (children: React.ReactNode): React.ReactElement => (
    <GradientSurface colors={clinicGradient(r)} style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
      {children}
    </GradientSurface>
  );

  if (loading) {
    return shell(
      <>
        {header(
          <>
            <View style={{ height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: clinicTile(r, 0.28) }} />
            <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: clinicTile(r, 0.22) }} />
          </>
        )}
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
          <View style={{ height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          <View style={{ height: 12, width: '65%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </>,
      'Loading visit summary'
    );
  }

  return shell(
    <>
      {header(
        <>
          <View style={{ gap: 3 }}>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>{title}</Text>
            {meta.length ? (
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{meta.join('  ·  ')}</Text>
            ) : null}
          </View>

          {diagnosis ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                alignSelf: 'flex-start',
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                backgroundColor: clinicTile(r),
                borderWidth: 1,
                borderColor: clinicBorder(r),
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>🩺</Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{diagnosis}</Text>
            </View>
          ) : null}
        </>
      )}

      {/* Clean body: labelled section rows on the plain surface. */}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
        {list.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        ) : (
          list.map((s, i) => (
            <View key={`${s.heading}-${i}`} style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
                {s.heading}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{s.body}</Text>
            </View>
          ))
        )}
      </View>
    </>,
    `Visit summary: ${title}`
  );
}
