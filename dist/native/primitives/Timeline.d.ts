import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type TimelineTone = 'primary' | 'success' | 'warn' | 'danger' | 'neutral';
export interface TimelineItemData {
    title: React.ReactNode;
    description?: React.ReactNode;
    time?: React.ReactNode;
    tone?: TimelineTone;
}
export interface TimelineProps {
    items: TimelineItemData[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical activity timeline — the native mirror of the web `Timeline`. Each
 * item renders a token-colored dot joined by a connector line, with title /
 * description / time. No literal colors.
 */
export declare function Timeline({ items, style }: TimelineProps): React.ReactElement;
//# sourceMappingURL=Timeline.d.ts.map