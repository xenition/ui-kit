import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import {
  CLAUSE_RISK_META,
  CLAUSE_STATUS_META,
  toneColor,
  type ClauseRisk,
  type ClauseStatus,
} from './internal';

export type ContractClauseVariant = 'default' | 'compact';

export interface ContractClauseProps {
  /** Clause number / section reference (e.g. "§ 7.2"). */
  number?: string;
  /** Clause heading / title. */
  title: string;
  /** Clause body text. */
  body?: string;
  /** Negotiation state — glyph + word pill, never color alone. */
  status?: ClauseStatus;
  /** Risk level — glyph + word pill. */
  risk?: ClauseRisk;
  /** Whether the clause is expanded to show the full body. */
  expanded?: boolean;
  /** Density. */
  variant?: ContractClauseVariant;
  /** Toggle expand/collapse; passes the next expanded state. */
  onToggle?: (expanded: boolean) => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. Tapping toggles the body via `onToggle`. All colors are
 * theme tokens — no literals.
 */
export function ContractClause({
  number,
  title,
  body,
  status,
  risk,
  expanded = false,
  variant = 'default',
  onToggle,
  testID,
  style,
}: ContractClauseProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  // Risk/flag drives a token-tinted accent rail; default rail is the border.
  const railTone = risk === 'high' || status === 'flagged'
    ? 'danger'
    : risk === 'medium' || status === 'negotiate'
      ? 'warn'
      : status === 'agreed'
        ? 'success'
        : 'neutral';
  const railColor = toneColor(colors, railTone);

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: railTone === 'neutral' ? colors.surface : withAlpha(railColor, 0.06),
        },
        style,
      ]}
    >
      <View style={{ width: 3, borderRadius: tokens.radius.full, backgroundColor: railColor }} />
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, gap: 2 }}>
            {number ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{number}</Text>
            ) : null}
            <Text numberOfLines={compact && !expanded ? 1 : undefined} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {title}
            </Text>
          </View>
          {status ? <StatusPill meta={CLAUSE_STATUS_META[status]} size="sm" /> : null}
        </View>

        {risk ? <StatusPill meta={CLAUSE_RISK_META[risk]} variant="inline" size="sm" /> : null}

        {expanded && body ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }}>
            {body}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (onToggle && body) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} clause ${title}`}
        onPress={() => onToggle(!expanded)}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
