import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusDot } from '../primitives/StatusDot';

export type ProductMockVariant = 'analytics' | 'chat' | 'commerce' | 'calendar';
/** Chart drawn in the main pane; `scene` falls back to the variant's own vignette. */
export type ProductMockChart = 'bars' | 'sparkline' | 'rings' | 'scene';

export interface ProductMockKpi {
  label: string;
  /** Pre-formatted value string — the kit never invents numbers or locales. */
  value: string;
}

export interface ProductMockProps {
  /** Which fake product the panel impersonates (default `analytics`). */
  variant?: ProductMockVariant;
  /** Chrome-bar label (defaults per variant, e.g. `analytics / production`). */
  title?: string;
  /** KPI tiles across the top (defaults per variant; `[]` hides the row). */
  kpis?: ProductMockKpi[];
  /**
   * Main-pane visual. Defaults per variant: analytics `bars`, commerce
   * `sparkline`, chat and calendar their own `scene` (message thread /
   * month grid). `rings` works everywhere.
   */
  chart?: ProductMockChart;
  /** Event feed lines in the side pane (defaults per variant; `[]` hides it). */
  feed?: string[];
  /** Badge text next to the status dot (default `LIVE`; `false` hides the badge). */
  live?: string | false;
  /** Footnote line under the feed (e.g. "9,214 events in the last 5s"). */
  footnote?: string;
  style?: StyleProp<ViewStyle>;
}

interface VariantDefaults {
  title: string;
  kpis: ProductMockKpi[];
  chart: ProductMockChart;
  feed: string[];
}

const VARIANT_DEFAULTS: Record<ProductMockVariant, VariantDefaults> = {
  analytics: {
    title: 'analytics / production',
    kpis: [
      { label: 'Active now', value: '8,412' },
      { label: 'Events / min', value: '96,204' },
      { label: 'Conversion', value: '4.8%' },
    ],
    chart: 'bars',
    feed: [
      'signup.completed · eu-west',
      'checkout.paid · us-east',
      'funnel.converted · ap-south',
      'alert.anomaly · p99 spike',
    ],
  },
  chat: {
    title: 'inbox / live',
    kpis: [
      { label: 'Open', value: '24' },
      { label: 'Median reply', value: '48s' },
      { label: 'CSAT', value: '98%' },
    ],
    chart: 'scene',
    feed: ['agent.assigned · queue a', 'conversation.resolved · web', 'note.added · api'],
  },
  commerce: {
    title: 'storefront / today',
    kpis: [
      { label: 'Revenue', value: '$12,480' },
      { label: 'Orders', value: '312' },
      { label: 'AOV', value: '$40.00' },
    ],
    chart: 'sparkline',
    feed: ['order.paid · #4821', 'cart.recovered · email', 'refund.issued · #4790'],
  },
  calendar: {
    title: 'schedule / week',
    kpis: [
      { label: 'Booked', value: '38' },
      { label: 'Utilization', value: '86%' },
      { label: 'No-shows', value: '1' },
    ],
    chart: 'scene',
    feed: ['booking.confirmed · 09:30', 'booking.rescheduled · 13:00', 'reminder.sent · sms'],
  },
};

/** Deterministic pseudo-random equalizer heights (stable across renders/runtimes). */
const BARS = Array.from({ length: 20 }, (_, i) => {
  const wave = Math.sin(i / 3.1) * 0.28 + Math.cos(i / 1.7) * 0.14;
  return Math.min(1, Math.max(0.15, 0.38 + wave + ((i * 37) % 19) / 90));
});

/** Deterministic sparkline sample heights (0..1), rendered as a stepped area. */
const SPARK = Array.from({ length: 16 }, (_, i) => {
  const wave = Math.sin(i / 2.2) * 0.3 + Math.cos(i / 3.7) * 0.18;
  return Math.min(1, Math.max(0.12, 0.5 + wave));
});

/** Ring completion fractions, outer to inner. */
const RINGS = [0.78, 0.54, 0.32] as const;

/** Chat scene: [width%, mine?] skeleton bubbles, deterministic. */
const BUBBLES: ReadonlyArray<readonly [number, boolean]> = [
  [58, false],
  [42, true],
  [66, false],
  [30, true],
  [50, false],
];

/** Calendar scene: 5×7 month grid; which cells read "booked", deterministic. */
const MONTH_CELLS = Array.from({ length: 35 }, (_, i) => (i * 13 + 5) % 7 < 3);

const CANVAS_HEIGHT = 160;

/**
 * A configurable fake-product panel — the native mirror of the web
 * `ProductMock`, the "product shot" of a landing hero.
 *
 * The web version is entirely CSS-animated (3D tilt entrance, looping
 * equalizer bars, self-drawing sparkline/rings, sliding feed rows) over glass
 * chrome with `backdrop-filter`. React Native has no keyframe engine,
 * `filter: blur()`, or SVG stroke-dash animation, so native renders a
 * **static, deterministic token visual** — no animation loop, reduced-motion
 * safe. The `variant`/`chart`/`kpis`/`feed` prop contract is preserved for
 * parity: bars/sparkline become stacked Views, rings become concentric
 * bordered circles, chat/calendar scenes become static bubble/grid layouts.
 * Token-only colors throughout; it is decorative scenery (`aria-hidden`).
 */
export function ProductMock({
  variant = 'analytics',
  title,
  kpis,
  chart,
  feed,
  live = 'LIVE',
  footnote,
  style,
}: ProductMockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const defaults = VARIANT_DEFAULTS[variant];
  const resolvedTitle = title ?? defaults.title;
  const resolvedKpis = kpis ?? defaults.kpis;
  const resolvedChart = chart ?? defaults.chart;
  const resolvedFeed = feed ?? defaults.feed;

  const canvasBg = withAlpha(colors.surface, 0.6);
  const tileBg = withAlpha(colors.surface, 0.6);
  const tileBorder = withAlpha(colors.border, 0.55);

  function renderVisual(): React.ReactElement {
    if (resolvedChart === 'bars') {
      return (
        <View
          style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}
        >
          {BARS.map((h, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: `${(h * 100).toFixed(0)}%` as ViewStyle['height'],
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                backgroundColor: tokens.ramps.primary[500],
                opacity: 0.85,
              }}
            />
          ))}
        </View>
      );
    }

    if (resolvedChart === 'sparkline') {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
          {SPARK.map((h, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: `${(h * 100).toFixed(0)}%` as ViewStyle['height'],
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                backgroundColor: withAlpha(tokens.ramps.accent[400], 0.7),
              }}
            />
          ))}
        </View>
      );
    }

    if (resolvedChart === 'rings') {
      const ringColors = [
        tokens.ramps.primary[500],
        tokens.ramps.accent[400],
        tokens.ramps.primary[300],
      ];
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 112, height: 112, alignItems: 'center', justifyContent: 'center' }}>
            {RINGS.map((fraction, i) => {
              const size = 112 - i * 34;
              return (
                <View
                  key={i}
                  style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 6,
                    // static "progress" hint: full track tinted, thicker top edge tone
                    borderColor: withAlpha(colors.border, 0.7),
                    borderTopColor: ringColors[i],
                    borderRightColor: fraction > 0.5 ? ringColors[i] : withAlpha(colors.border, 0.7),
                  }}
                />
              );
            })}
          </View>
        </View>
      );
    }

    // scene: chat thread or month grid
    if (variant === 'chat') {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-end', gap: tokens.spacing.xs }}>
          {BUBBLES.map(([width, mine], i) => (
            <View
              key={i}
              style={{
                height: 18,
                width: `${width}%` as ViewStyle['width'],
                borderRadius: tokens.radius.md,
                alignSelf: mine ? 'flex-end' : 'flex-start',
                backgroundColor: mine
                  ? withAlpha(tokens.ramps.primary[500], 0.5)
                  : withAlpha(colors.onSurface, 0.08),
              }}
            />
          ))}
        </View>
      );
    }

    // calendar month grid
    return (
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {MONTH_CELLS.map((booked, i) => (
          <View
            key={i}
            style={{
              width: `${100 / 7}%` as ViewStyle['width'],
              aspectRatio: 1,
              maxWidth: 20,
              borderRadius: tokens.radius.sm,
              backgroundColor: booked
                ? withAlpha(tokens.ramps.primary[500], 0.85)
                : withAlpha(colors.onSurface, 0.06),
            }}
          />
        ))}
      </View>
    );
  }

  return (
    <View
      testID="xen-product-mock"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ width: '100%' }, style]}
    >
      <View
        style={{
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          backgroundColor: withAlpha(colors.surface, 0.78),
          borderWidth: 1,
          borderColor: withAlpha(colors.border, 0.7),
        }}
      >
        {/* chrome bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: withAlpha(colors.border, 0.7),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: withAlpha(colors.onSurface, 0.2),
                  }}
                />
              ))}
            </View>
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '500',
              }}
            >
              {resolvedTitle}
            </Text>
          </View>
          {live !== false ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderRadius: 9999,
                borderWidth: 1,
                borderColor: withAlpha(colors.accent, 0.35),
                backgroundColor: withAlpha(colors.accent, 0.1),
              }}
            >
              <StatusDot tone="accent" pulse={false} size={6} />
              <Text
                style={{
                  color: colors.accent,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '700',
                }}
              >
                {live}
              </Text>
            </View>
          ) : null}
        </View>

        {/* body: main pane + optional feed pane */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* main pane */}
          <View
            style={{
              flexGrow: 1,
              flexBasis: 260,
              gap: tokens.spacing.lg,
              padding: tokens.spacing.lg,
            }}
          >
            {resolvedKpis.length > 0 ? (
              <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
                {resolvedKpis.map((kpi) => (
                  <View
                    key={kpi.label}
                    style={{
                      flex: 1,
                      padding: tokens.spacing.sm,
                      borderRadius: tokens.radius.md,
                      backgroundColor: tileBg,
                      borderWidth: 1,
                      borderColor: tileBorder,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                      }}
                    >
                      {kpi.label}
                    </Text>
                    <Text
                      style={{
                        marginTop: tokens.spacing.xs,
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '700',
                      }}
                    >
                      {kpi.value}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            <View
              style={{
                height: CANVAS_HEIGHT,
                overflow: 'hidden',
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: tileBorder,
                backgroundColor: canvasBg,
              }}
            >
              {renderVisual()}
            </View>
          </View>

          {/* live feed pane */}
          {resolvedFeed.length > 0 ? (
            <View
              style={{
                flexGrow: 1,
                flexBasis: 200,
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                borderLeftWidth: 1,
                borderLeftColor: withAlpha(colors.border, 0.7),
              }}
            >
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                }}
              >
                EVENT STREAM
              </Text>
              {resolvedFeed.map((line, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    backgroundColor: tileBg,
                    borderWidth: 1,
                    borderColor: tileBorder,
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i % 2 === 0 ? colors.accent : colors.primary,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 1,
                      color: colors.muted,
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: '500',
                    }}
                  >
                    {line}
                  </Text>
                </View>
              ))}
              {footnote !== undefined ? (
                <>
                  <View
                    style={{
                      marginTop: 'auto',
                      height: 1,
                      backgroundColor: withAlpha(tokens.ramps.primary[500], 0.55),
                    }}
                  />
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {footnote}
                  </Text>
                </>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
