import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import { CLAUSE_RISK_META, CLAUSE_STATUS_META, toneColor, type LegalTone } from './internal';
import type { ContractClauseProps } from './ContractClause';

/** Drop-in for {@link ContractClauseProps} — same props, the V4 "chambers" design. */
export type ContractClauseV4Props = ContractClauseProps;

/**
 * ContractClause — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow and a token-tinted left rail that keys
 * off risk / flag state, a section-number eyebrow over the heading, negotiation
 * and risk pills (each a glyph + word so state never rests on color alone), and —
 * when expanded — the body. When `onToggle` + `body` are set the clause is a
 * tappable `role="button"` with expand/collapse. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export function ContractClauseV4({
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
}: ContractClauseV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const railTone: LegalTone =
    risk === 'high' || status === 'flagged'
      ? 'danger'
      : risk === 'medium' || status === 'negotiate'
        ? 'warn'
        : status === 'agreed'
          ? 'success'
          : 'neutral';
  const railColor = railTone === 'neutral' ? colors.border : toneColor(colors, railTone);
  const interactive = Boolean(onToggle) && Boolean(body);
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    flexDirection: 'row',
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ width: 4, alignSelf: 'stretch', borderRadius: tokens.radius.full, backgroundColor: railColor }} />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            {number ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{number}</Text> : null}
            <Text numberOfLines={compact && !expanded ? 1 : undefined} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
          </View>
          {status ? <StatusPill meta={CLAUSE_STATUS_META[status]} variant="soft" size="sm" /> : null}
        </View>
        {risk ? <StatusPill meta={CLAUSE_RISK_META[risk]} variant="inline" size="sm" /> : null}
        {expanded && body ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }}>{body}</Text> : null}
      </View>
    </>
  );

  if (interactive) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} clause ${title}`}
        onPress={() => onToggle?.(!expanded)}
        testID={testID}
        style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
