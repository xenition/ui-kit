import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatCard, type StatCardProps } from './StatCard';

export interface KpiRowProps {
  /** The stat cards to lay out; each wraps to the next row as space allows. */
  items: StatCardProps[];
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrapping row of {@link StatCard}s — the KPI strip at the top of a dashboard.
 * Cards flex to at least ~44% width so two sit per row on a phone and wrap
 * gracefully. Token-only spacing.
 */
export function KpiRow({ items, style }: KpiRowProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md },
        style,
      ]}
    >
      {items.map((item, i) => (
        <StatCard
          key={`${item.label}-${i}`}
          {...item}
          style={[{ flexGrow: 1, flexBasis: '44%' }, item.style]}
        />
      ))}
    </View>
  );
}
