import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import type { JsonViewerProps } from './JsonViewer';
import { pressFill } from './internal/state-v4';

export type { JsonViewerProps as JsonViewerV4Props };

type Kind = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';

function kindOf(value: unknown): Kind {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return 'array';
  const t = typeof value;
  if (t === 'object') return 'object';
  if (t === 'number') return 'number';
  if (t === 'boolean') return 'boolean';
  return 'string';
}

interface NodeProps {
  label: string;
  value: unknown;
  depth: number;
  defaultExpandDepth: number;
}

function Node({ label, value, depth, defaultExpandDepth }: NodeProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const kind = kindOf(value);
  const branch = kind === 'object' || kind === 'array';
  const [open, setOpen] = React.useState(depth < defaultExpandDepth);

  const size = tokens.typography.scale.sm;
  const mono = { fontFamily: 'monospace' as const, fontSize: size, lineHeight: size * 1.5 };

  /*
    Every colour here is a `*Text` slot, never a fill. `accent`, `primary` and
    `warn` are background colours: the compiler guarantees `onAccent` ON
    `accent` and nothing at all about `accent` as ink on `surface`. Syntax
    colour IS text, so it takes the text forms.
  */
  const keyStyle = { ...mono, color: colors.accentText };
  const scalarColor =
    kind === 'string'
      ? colors.onSurface
      : kind === 'number'
        ? colors.primaryText
        : kind === 'boolean'
          ? colors.warnText
          : colors.mutedText;

  const pressedBg = pressFill(theme);
  const guide = mixToken(colors.surface, colors.onSurface, RULE_MIX);

  // Depth is carried by a guide at the level's left edge rather than by
  // padding alone: in a deep tree, an indent with nothing in it stops telling
  // you which parent a row belongs to once the parent scrolls away.
  const rail: React.ReactNode =
    depth > 0 ? (
      <View
        style={{
          width: 1,
          alignSelf: 'stretch',
          marginRight: tokens.spacing.sm,
          backgroundColor: guide,
        }}
      />
    ) : null;

  if (!branch) {
    const display = kind === 'string' ? `"${String(value)}"` : String(value);
    return (
      <View style={{ flexDirection: 'row', paddingLeft: depth > 0 ? tokens.spacing.sm : 0 }}>
        {rail}
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs / 2,
            flex: 1,
          }}
        >
          <Text style={keyStyle}>{`${label}:`}</Text>
          <Text style={{ ...mono, color: scalarColor }}>{display}</Text>
        </View>
      </View>
    );
  }

  const entries: [string, unknown][] = Array.isArray(value)
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);
  const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;

  return (
    <View style={{ flexDirection: 'row', paddingLeft: depth > 0 ? tokens.spacing.sm : 0 }}>
      {rail}
      <View style={{ flex: 1 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen((o) => !o)}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.sm,
            backgroundColor: pressed ? pressedBg : 'transparent',
          })}
        >
          <Text
            // Decorative: the row already announces its expanded state.
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ ...mono, color: colors.mutedText, fontSize: tokens.typography.scale.xs }}
          >
            {open ? '▾' : '▸'}
          </Text>
          <Text style={keyStyle}>{`${label}:`}</Text>
          <Text style={{ ...mono, color: colors.mutedText }}>{summary}</Text>
        </Pressable>
        {open
          ? entries.map(([k, v]) => (
              <Node
                key={k}
                label={k}
                value={v}
                depth={depth + 1}
                defaultExpandDepth={defaultExpandDepth}
              />
            ))
          : null}
      </View>
    </View>
  );
}

/**
 * **V4 JSON viewer** — same props as {@link JsonViewer}, a different design
 * line.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The tree sat on `surface`, the same colour
 *    as the page. It sinks by the same 4% neutral step `CodeBlockV4` and the
 *    V4 tables use, mixed from the two scheme-resolved slots so it inverts
 *    with the scheme — one recessed amount for every monospace surface in the
 *    line.
 * 2. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge. This is the one place a rule earns itself against §9:
 *    an indent with nothing in it stops telling you which parent a row belongs
 *    to as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 3. **A branch row tints when pressed and the caret leaves the accessibility
 *    tree.** The row already announces `expanded`; a screen reader should not
 *    also read "▾".
 *
 * The syntax colours stay exactly as the base has them — every one a `*Text`
 * slot rather than a fill, which is the fix the native twin already carried
 * and its web twin did not. **No gradient and no new palette**: five roles
 * (key, string, number, boolean, null) all drawn from seed tokens is the whole
 * colour system here, and §35.5 would not thank us for a sixth.
 */
export function JsonViewerV4({
  value,
  defaultExpandDepth = 1,
  rootLabel = 'root',
  style,
}: JsonViewerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const ground = mixToken(colors.surface, colors.onSurface, ZEBRA_MIX);

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: ground,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Node label={rootLabel} value={value} depth={0} defaultExpandDepth={defaultExpandDepth} />
    </View>
  );
}
