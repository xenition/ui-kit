import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { useXenitionTheme, Card, Icon, Badge, Alert, Skeleton, EmptyState } from '../primitives';
import { withAlpha } from './internal/format';

/** Per-item safety verdict — text + glyph + color (never color-alone). */
export type SafetyVerdict = 'pass' | 'fail' | 'unchecked';

export interface SafetyItem {
  /** Stable id. */
  id: string;
  /** Safety checkpoint label (e.g. "Fall protection anchored"). */
  label: string;
  /** Verdict — pass / fail / unchecked. */
  verdict: SafetyVerdict;
  /** Marks a failure as a blocking hazard (drives the top hazard banner). */
  hazard?: boolean;
}

interface VerdictDescriptor {
  glyph: string;
  slot: 'success' | 'danger' | 'muted';
  label: string;
}

const VERDICT: Record<SafetyVerdict, VerdictDescriptor> = {
  pass: { glyph: '✓', slot: 'success', label: 'Pass' },
  fail: { glyph: '✕', slot: 'danger', label: 'Fail' },
  unchecked: { glyph: '○', slot: 'muted', label: 'Unchecked' },
};

export interface SafetyChecklistProps {
  /** Section title (e.g. "Pre-task safety"). */
  title?: string;
  /** The safety items to render. */
  items: SafetyItem[];
  /** Fires with the item id and the verdict to advance to on tap. */
  onToggle?: (id: string, next: SafetyVerdict) => void;
  /** Show skeleton placeholders instead of the list. */
  loading?: boolean;
  /** Copy for the empty state when there are no items. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Cycle a verdict pass → fail → unchecked → pass on tap. */
function nextVerdict(current: SafetyVerdict): SafetyVerdict {
  return current === 'pass' ? 'fail' : current === 'fail' ? 'unchecked' : 'pass';
}

/**
 * A pass/fail safety checklist. Each item is a tappable row with a verdict
 * glyph disc (pass → success, fail → danger — conveyed by glyph + label +
 * color, never color alone) that cycles the verdict via `onToggle`. When any
 * item is a flagged `hazard` failure, a danger `Alert` banner is raised at the
 * top. Handles the empty state (`EmptyState`) and a `loading` skeleton. No
 * literal colors.
 */
export function SafetyChecklist({
  title,
  items,
  onToggle,
  loading = false,
  emptyLabel = 'No safety items',
  style,
}: SafetyChecklistProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(items) ? items : [];
  const hazardCount = list.filter((i) => i.hazard && i.verdict === 'fail').length;
  const failCount = list.filter((i) => i.verdict === 'fail').length;

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View accessibilityLabel="Loading safety checklist" style={{ gap: tokens.spacing.md }}>
          <Skeleton variant="text" width="50%" height={14} />
          <Skeleton variant="text" lines={3} />
        </View>
      </Card>
    );
  }

  if (list.length === 0) {
    return <EmptyState title={emptyLabel} description="Safety checkpoints will appear here." style={style} />;
  }

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {title != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
        ) : (
          <View />
        )}
        <Badge tone={failCount > 0 ? 'danger' : 'success'} variant="soft" size="sm">
          {failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear'}
        </Badge>
      </View>

      {hazardCount > 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <Alert tone="danger" title="Hazard — do not proceed">
            {`${hazardCount} blocking safety ${hazardCount === 1 ? 'item is' : 'items are'} failing.`}
          </Alert>
        </View>
      ) : null}

      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        {list.map((item) => {
          const vd = VERDICT[item.verdict] ?? VERDICT.unchecked;
          const tint = vd.slot === 'muted' ? colors.muted : colors[vd.slot];
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`${item.label}, ${vd.label}`}
              onPress={() => onToggle?.(item.id, nextVerdict(item.verdict))}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: withAlpha(tint, 0.14),
                }}
              >
                <Icon glyph={vd.glyph} size="sm" color={vd.slot} accessibilityLabel={vd.label} />
              </View>
              <Text
                style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}
              >
                {item.label}
              </Text>
              {item.hazard ? (
                <Badge tone="danger" variant="outline" size="sm">⚠ Hazard</Badge>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}
