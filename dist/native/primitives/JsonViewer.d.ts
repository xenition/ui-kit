import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface JsonViewerProps {
    /** Any JSON-serializable value to inspect. */
    value: unknown;
    /** Expand nodes up to this depth on first render (default 1). */
    defaultExpandDepth?: number;
    /** Root key label (default `root`). */
    rootLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Collapsible JSON tree inspector: keys render in `colors.accent`, strings in
 * `colors.onSurface`, numbers in `colors.primary`, booleans in `colors.warn`,
 * and null in `colors.muted`, all monospaced. Branch nodes (objects/arrays)
 * toggle open on tap. `fontFamily: 'monospace'` is a font family, not a color.
 * All colors and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export declare function JsonViewer({ value, defaultExpandDepth, rootLabel, style, }: JsonViewerProps): React.ReactElement;
//# sourceMappingURL=JsonViewer.d.ts.map