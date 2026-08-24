import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Badge, EmptyState } from '../primitives';

/** A single harvest record. */
export interface HarvestEntry {
  /** Stable key for list rendering. */
  id: string;
  /** Crop harvested (e.g. "Wheat"). */
  crop: string;
  /** Yield magnitude (e.g. `4.2`). Rendered with `unit`. */
  quantity: number | string;
  /** Yield unit (e.g. "t", "kg", "crates"). */
  unit?: string;
  /** When it was logged (pre-formatted, e.g. "Aug 12"). */
  date?: string;
  /** Field / plot it came from. */
  field?: string;
  /** Quality grade chip (e.g. "A", "Premium"). */
  grade?: string;
}

export interface HarvestLogProps {
  /** Harvest records, newest first. Empty → empty state. Guarded indexing. */
  entries: HarvestEntry[];
  /** Card title. Default "Harvest log". */
  title?: string;
  /** Pre-formatted period total shown in the header (e.g. "18.6 t"). */
  total?: string;
  /** Max rows to render before truncating (rest summarized). Default all. */
  maxRows?: number;
  /** Empty-state title. */
  emptyTitle?: string;
  /** Empty-state description. */
  emptyDescription?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A harvest log — a titled {@link Card} listing recent harvest records (crop,
 * quantity + unit, date, field, optional grade chip). The header can show a
 * period `total`. When `entries` is empty an {@link EmptyState} stands in for
 * the list. Rows are keyed and indexed defensively, and `maxRows` truncates a
 * long log to a "+N more" summary. Token-bound throughout — no literal colors.
 */
export function HarvestLog({
  entries,
  title = 'Harvest log',
  total,
  maxRows,
  emptyTitle = 'No harvests logged',
  emptyDescription = 'Recorded harvests will appear here.',
  style,
}: HarvestLogProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(entries) ? entries : [];
  const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
  const remaining = list.length - visible.length;

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="🧺" color="accent" size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {total != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {total}
          </Text>
        ) : null}
      </View>

      {list.length === 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <EmptyState icon={<Icon glyph="🌾" size="2xl" color="muted" />} title={emptyTitle} description={emptyDescription} />
        </View>
      ) : (
        <View style={{ marginTop: tokens.spacing.sm }}>
          {visible.map((entry, i) => (
            <View
              key={entry.id ?? `harvest-${i}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: i === visible.length - 1 && remaining <= 0 ? 0 : 1,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {entry.crop}
                </Text>
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {[entry.field, entry.date].filter((s) => s != null && s !== '').join(' · ')}
                </Text>
              </View>
              {entry.grade != null ? (
                <Badge tone="neutral" variant="outline" size="sm">
                  {entry.grade}
                </Badge>
              ) : null}
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
                {String(entry.quantity)}
                {entry.unit != null ? <Text style={{ color: colors.muted, fontWeight: '400' }}> {entry.unit}</Text> : null}
              </Text>
            </View>
          ))}
          {remaining > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
              +{remaining} more
            </Text>
          ) : null}
        </View>
      )}
    </Card>
  );
}
