import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarEvent } from './types';
export interface EventDetailSheetProps {
    /** The event to detail. When null the sheet renders nothing. */
    event: CalendarEvent | null;
    /** Optional long description body. */
    description?: string;
    /** Optional recurrence summary line (e.g. "Weekly on Monday"). */
    recurrenceLabel?: string;
    /** Optional timezone caption line. */
    timezoneLabel?: string;
    /**
     * `card` (default) renders inline; `modal` wraps the body in the `Modal`
     * primitive controlled by `open`/`onClose`.
     */
    variant?: 'card' | 'modal';
    /** Modal visibility (modal variant). */
    open?: boolean;
    /** Fires when the sheet requests to close. */
    onClose?: () => void;
    /** Shows an Edit action button when provided. */
    onEdit?: (event: CalendarEvent) => void;
    /** Shows a Delete action button (danger tone) when provided. */
    onDelete?: (event: CalendarEvent) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An event detail sheet — the tap-target destination from any calendar surface.
 * Shows a tone bar + title, a formatted date/time line, location, description
 * and optional recurrence/timezone captions, plus Edit/Delete actions. Renders
 * inline (`card`) or inside the `Modal` primitive (`modal`). Token colors only.
 */
export declare function EventDetailSheet({ event, description, recurrenceLabel, timezoneLabel, variant, open, onClose, onEdit, onDelete, style, }: EventDetailSheetProps): React.ReactElement | null;
//# sourceMappingURL=EventDetailSheet.d.ts.map