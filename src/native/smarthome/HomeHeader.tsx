import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { ambientGradient, ambientInk, ambientInkSoft, ambientTile, ambientBorder } from './internal/ambient';

/** Visual tone for the security/status pill. */
export type HomeStatusTone = 'success' | 'warn' | 'danger';

export interface HomeHeaderProps {
  /** The home's display name — the hero headline (e.g. "Willow House"). */
  homeName: string;
  /** Optional time-of-day greeting above the name (e.g. "Good evening"). */
  greeting?: string;
  /** Optional at-a-glance security/status label (e.g. "All secure"). */
  statusLabel?: string;
  /** Semantic tone for the status pill; meaning is never carried by color alone. Default `'success'`. */
  statusTone?: HomeStatusTone;
  /** Optional weather glance shown as a frosted tile. */
  weather?: {
    /** Temperature string, already formatted (e.g. "72°"). */
    temp: string;
    /** Optional emoji/glyph for the condition (e.g. "☀️"). */
    glyph?: string;
    /** Optional condition label (e.g. "Clear"). */
    condition?: string;
  };
  /** Optional at-a-glance metrics rendered as frosted tiles (e.g. "Devices on 4"). */
  metrics?: readonly { label: string; value: string }[];
  /** Optional quick-scene chips (e.g. "Movie", "Away"). */
  scenes?: readonly { id: string; label: string; glyph?: string }[];
  /** Fires with the scene `id` when a quick-scene chip is activated. */
  onScene?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

const TONE_GLYPH: Record<HomeStatusTone, string> = {
  success: '🛡️',
  warn: '⚠️',
  danger: '🚨',
};

/**
 * HomeHeader — the smart-home dashboard **hero** and the module's peak moment.
 * A brand-gradient ground carries a near-white greeting + home name, a frosted
 * security/status pill (tone + glyph, never color alone), a weather glance and a
 * run of metric tiles, then an optional row of quick-scene chips. Every color
 * derives from the compiled brand ramp via `ambient*` + `GradientSurface` — the
 * light ramp steps act as near-white "ink" on the saturated ground for any hue —
 * token-only, no literals, light + dark. Presentational: shaped data +
 * callbacks, nothing fetches.
 */
export function HomeHeader({
  homeName,
  greeting,
  statusLabel,
  statusTone = 'success',
  weather,
  metrics,
  scenes,
  onScene,
  style,
}: HomeHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = ambientInk(r);
  const inkSoft = ambientInkSoft(r);
  const tile = ambientTile(r);
  const border = ambientBorder(r);

  const tileStyle = {
    borderRadius: tokens.radius.md,
    backgroundColor: tile,
    borderWidth: 1,
    borderColor: border,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  } as const;

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={ambientGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            {greeting ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {greeting}
              </Text>
            ) : null}
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, marginTop: 2 }}>
              {homeName}
            </Text>
          </View>
          {statusLabel ? (
            <View
              accessibilityRole="text"
              accessibilityLabel={statusLabel}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Icon glyph={TONE_GLYPH[statusTone]} size="sm" style={{ color: ink }} />
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{statusLabel}</Text>
            </View>
          ) : null}
        </View>

        {weather || (metrics && metrics.length > 0) ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {weather ? (
              <View style={[tileStyle, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexGrow: 1, minWidth: 112 }]}>
                {weather.glyph ? <Icon glyph={weather.glyph} size="xl" style={{ color: ink }} /> : null}
                <View style={{ minWidth: 0 }}>
                  <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                    {weather.temp}
                  </Text>
                  {weather.condition ? (
                    <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
                      {weather.condition}
                    </Text>
                  ) : null}
                </View>
              </View>
            ) : null}
            {(metrics ?? []).map((m) => (
              <View key={m.label} style={[tileStyle, { flexGrow: 1, minWidth: 112, justifyContent: 'center' }]}>
                <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                  {m.value}
                </Text>
                <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
                  {m.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {scenes && scenes.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
            {scenes.map((s) => (
              <Pressable
                key={s.id}
                accessibilityRole="button"
                accessibilityLabel={s.label}
                onPress={() => onScene?.(s.id)}
                style={({ pressed }) => ({
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tile,
                  borderWidth: 1,
                  borderColor: border,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                {s.glyph ? <Icon glyph={s.glyph} size="sm" style={{ color: ink }} /> : null}
                <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
