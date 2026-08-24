import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { HarvestLogProps } from './HarvestLog';

/** Drop-in alternate of {@link HarvestLogProps} — identical prop contract. */
export type HarvestLogV3Props = HarvestLogProps;

/**
 * HarvestLog — design variant **V3**: a **minimal log** — a title + total on one
 * header line, then each record as a single dense line (`qty unit · crop ·
 * field · date`). No card chrome, no dividers. Empty `entries` collapse to a
 * muted one-liner. Same props as {@link HarvestLogProps}; only the layout
 * differs. Token-only.
 */
export function HarvestLogV3({
  entries,
  title = 'Harvest log',
  total,
  maxRows,
  emptyTitle = 'No harvests logged',
  style,
}: HarvestLogV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(entries) ? entries : [];
  const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
  const remaining = list.length - visible.length;

  const container: StyleProp<ViewStyle> = [{ gap: tokens.spacing.xs }, style];

  return (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text style={{ fontSize: tokens.typography.scale.sm }}>🧺</Text>
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {title}
        </Text>
        {total != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{total}</Text>
        ) : null}
      </View>

      {list.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{emptyTitle}</Text>
      ) : (
        <>
          {visible.map((entry, i) => (
            <Text
              key={entry.id ?? `harvest-${i}`}
              numberOfLines={1}
              style={{ fontSize: tokens.typography.scale.xs }}
            >
              <Text style={{ color: colors.onSurface, fontWeight: '700' }}>
                {String(entry.quantity)}
                {entry.unit != null ? ` ${entry.unit}` : ''}
              </Text>
              <Text style={{ color: colors.muted }}>
                {' · '}
                {[entry.crop, entry.field, entry.date].filter((s) => s != null && s !== '').join(' · ')}
                {entry.grade != null ? `  [${entry.grade}]` : ''}
              </Text>
            </Text>
          ))}
          {remaining > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>+{remaining} more</Text>
          ) : null}
        </>
      )}
    </View>
  );
}
