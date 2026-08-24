import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface JsonViewerProps {
  /** Any JSON-serializable value to inspect. */
  value: unknown;
  /** Expand nodes up to this depth on first render (default 1). */
  defaultExpandDepth?: number;
  /** Root key label (default `root`). */
  rootLabel?: string;
  style?: StyleProp<ViewStyle>;
}

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

interface RowProps {
  label: string;
  value: unknown;
  depth: number;
  defaultExpandDepth: number;
}

function Node({ label, value, depth, defaultExpandDepth }: RowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kind = kindOf(value);
  const branch = kind === 'object' || kind === 'array';
  const [open, setOpen] = React.useState(depth < defaultExpandDepth);

  const keyStyle = {
    color: colors.accent,
    fontFamily: 'monospace' as const,
    fontSize: tokens.typography.scale.sm,
  };
  const scalarColor =
    kind === 'string'
      ? colors.onSurface
      : kind === 'number'
        ? colors.primary
        : kind === 'boolean'
          ? colors.warn
          : colors.muted;

  const indent = { paddingLeft: depth * tokens.spacing.md };

  if (!branch) {
    const display = kind === 'string' ? `"${String(value)}"` : String(value);
    return (
      <View style={[{ flexDirection: 'row', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs / 2 }, indent]}>
        <Text style={keyStyle}>{`${label}:`}</Text>
        <Text style={{ color: scalarColor, fontFamily: 'monospace', fontSize: tokens.typography.scale.sm }}>
          {display}
        </Text>
      </View>
    );
  }

  const entries: [string, unknown][] = Array.isArray(value)
    ? value.map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, unknown>);
  const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs / 2 }, indent]}
      >
        <Text style={{ color: colors.muted, fontFamily: 'monospace', fontSize: tokens.typography.scale.xs }}>
          {open ? '▾' : '▸'}
        </Text>
        <Text style={keyStyle}>{`${label}:`}</Text>
        <Text style={{ color: colors.muted, fontFamily: 'monospace', fontSize: tokens.typography.scale.sm }}>
          {summary}
        </Text>
      </Pressable>
      {open
        ? entries.map(([k, v]) => (
            <Node key={k} label={k} value={v} depth={depth + 1} defaultExpandDepth={defaultExpandDepth} />
          ))
        : null}
    </View>
  );
}

/**
 * Collapsible JSON tree inspector: keys render in `colors.accent`, strings in
 * `colors.onSurface`, numbers in `colors.primary`, booleans in `colors.warn`,
 * and null in `colors.muted`, all monospaced. Branch nodes (objects/arrays)
 * toggle open on tap. `fontFamily: 'monospace'` is a font family, not a color.
 * All colors and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export function JsonViewer({
  value,
  defaultExpandDepth = 1,
  rootLabel = 'root',
  style,
}: JsonViewerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Node label={rootLabel} value={value} depth={0} defaultExpandDepth={defaultExpandDepth} />
    </View>
  );
}
