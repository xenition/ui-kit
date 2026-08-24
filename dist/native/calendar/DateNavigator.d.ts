import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarViewMode } from './types';
export interface DateNavigatorProps {
    /** The period label to show between the chevrons (e.g. "August 2026"). */
    title: string;
    /** Fires when the previous chevron is tapped. */
    onPrev?: () => void;
    /** Fires when the next chevron is tapped. */
    onNext?: () => void;
    /** Shows a "Today" reset button when provided. */
    onToday?: () => void;
    /** Active view; renders a month/week/day segmented control when set. */
    view?: CalendarViewMode;
    /** Fires when a different view segment is picked. */
    onViewChange?: (view: CalendarViewMode) => void;
    /** Restrict which view segments appear (defaults to all three). */
    views?: CalendarViewMode[];
    style?: StyleProp<ViewStyle>;
}
/**
 * The header control strip for any scheduling surface: prev/next chevrons
 * around a period `title`, an optional "Today" reset, and an optional
 * month/week/day `Segmented`. Purely presentational — the host owns the dates
 * and recomputes `title` on each change. Token colors only.
 */
export declare function DateNavigator({ title, onPrev, onNext, onToday, view, onViewChange, views, style, }: DateNavigatorProps): React.ReactElement;
//# sourceMappingURL=DateNavigator.d.ts.map