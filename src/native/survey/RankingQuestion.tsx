import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import type { SurveyChoice } from './types';

export interface RankingQuestionProps {
  /** The rankable items (looked up by id). Empty renders the empty state. */
  items: SurveyChoice[];
  /**
   * Controlled ranked order as a list of item ids, best→worst. Ids missing
   * from `items` are skipped; items missing from `value` are appended in their
   * source order so the control is always complete.
   */
  value: string[];
  /** Fires with the full next ordered id list after a move. */
  onChange: (orderedIds: string[]) => void;
  /** Accessible name for the list. Default `'Ranking'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A ranking / ordering question — items shown in their current rank with a rank
 * number and up/down controls that reorder the list. Emits the full next id
 * order on every move; the move buttons disable at the ends and are labelled
 * ("Move X up") so the action is never icon-only for screen readers. Resolves a
 * complete order even when `value` is partial or stale. Empty items render a
 * muted empty state. No literal colors.
 */
export function RankingQuestion({
  items,
  value,
  onChange,
  accessibilityLabel = 'Ranking',
  disabled = false,
  style,
}: RankingQuestionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const byId = React.useMemo(() => new Map(items.map((it) => [it.id, it])), [items]);

  // Build a complete, valid order: known-valid ids from `value`, then any
  // items not yet referenced (keeps the control usable if `value` is partial).
  const orderedIds = React.useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const id of value) {
      if (byId.has(id) && !seen.has(id)) {
        seen.add(id);
        out.push(id);
      }
    }
    for (const it of items) {
      if (!seen.has(it.id)) out.push(it.id);
    }
    return out;
  }, [value, items, byId]);

  const move = (index: number, dir: -1 | 1): void => {
    const target = index + dir;
    if (target < 0 || target >= orderedIds.length) return;
    const next = orderedIds.slice();
    const a = next[index];
    const b = next[target];
    if (a === undefined || b === undefined) return;
    next[index] = b;
    next[target] = a;
    onChange(next);
  };

  if (items.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          Nothing to rank.
        </Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="list" accessibilityLabel={accessibilityLabel} style={[{ gap: tokens.spacing.sm }, style]}>
      {orderedIds.map((id, index) => {
        const item = byId.get(id);
        if (!item) return null;
        const isFirst = index === 0;
        const isLast = index === orderedIds.length - 1;
        return (
          <View
            key={id}
            accessibilityLabel={`Rank ${index + 1}: ${item.label}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <View
              style={{
                width: 26,
                height: 26,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
              }}
            >
              <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {index + 1}
              </Text>
            </View>

            {item.icon ? <Icon glyph={item.icon} size="base" color="onSurface" /> : null}

            <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {item.label}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Move ${item.label} up`}
              accessibilityState={{ disabled: disabled || isFirst }}
              disabled={disabled || isFirst}
              onPress={() => move(index, -1)}
              hitSlop={6}
              style={{ opacity: isFirst ? 0.3 : 1, padding: tokens.spacing.xs }}
            >
              <Icon glyph="▲" size="sm" color="onSurface" />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Move ${item.label} down`}
              accessibilityState={{ disabled: disabled || isLast }}
              disabled={disabled || isLast}
              onPress={() => move(index, 1)}
              hitSlop={6}
              style={{ opacity: isLast ? 0.3 : 1, padding: tokens.spacing.xs }}
            >
              <Icon glyph="▼" size="sm" color="onSurface" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
