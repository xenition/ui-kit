import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type TimelineTone = 'primary' | 'success' | 'warn' | 'danger' | 'neutral';

export interface TimelineItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  tone?: TimelineTone;
}

export interface TimelineProps {
  items: TimelineItemData[];
  style?: StyleProp<ViewStyle>;
}

/** Maps a tone to its dot color slot (allowed tokens only). */
const DOT: Record<TimelineTone, keyof SemanticColors> = {
  primary: 'primary',
  success: 'success',
  warn: 'accent',
  danger: 'danger',
  neutral: 'border',
};

/**
 * Vertical activity timeline — the native mirror of the web `Timeline`. Each
 * item renders a token-colored dot joined by a connector line, with title /
 * description / time. No literal colors.
 */
export function Timeline({ items, style }: TimelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ flexDirection: 'column' }, style]}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  marginTop: 4,
                  width: 10,
                  height: 10,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors[DOT[it.tone ?? 'primary']],
                }}
              />
              {!last ? (
                <View style={{ width: 1, flex: 1, backgroundColor: colors.border, marginTop: 2 }} />
              ) : null}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              {typeof it.title === 'string' ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              {it.description != null ? (
                typeof it.description === 'string' ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{it.description}</Text>
                ) : (
                  it.description
                )
              ) : null}
              {it.time != null ? (
                typeof it.time === 'string' ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{it.time}</Text>
                ) : (
                  it.time
                )
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
