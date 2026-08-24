import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ResultStatus = 'success' | 'error' | 'empty' | '404';
export interface ResultProps {
    status?: ResultStatus;
    title: string;
    description?: string;
    /** Primary action button label. */
    actionLabel?: string;
    onAction?: () => void;
    /** Override the default status glyph. */
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Full-screen result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `onSurface`, description `muted`. The action reuses the
 * primary/`onPrimary` button convention. No literal colors.
 */
export declare function Result({ status, title, description, actionLabel, onAction, icon, style, }: ResultProps): React.ReactElement;
//# sourceMappingURL=Result.d.ts.map