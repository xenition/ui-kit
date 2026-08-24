import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BookingSlot } from '../../booking/types';
export interface DayAvailability {
    /** Civil day, `YYYY-MM-DD`. */
    date: string;
    /** Number of bookable openings that day. */
    count: number;
}
export interface BookingCalendarProps {
    /** Raw slots; availability per day is derived (bucketed in `timezone`). */
    slots?: BookingSlot[];
    /** Pre-summarized availability, as an alternative to `slots`. */
    availability?: DayAvailability[];
    /** Selected day. */
    selectedDate?: Date | null;
    /** Fired with the civil date when a day is chosen. */
    onSelectDate?: (date: Date) => void;
    /** IANA timezone slots are bucketed into (their civil day). */
    timezone?: string;
    /** `month` (6-week grid) or `week` (single row). Default `month`. */
    view?: 'month' | 'week';
    /** 0 = Sunday (default), 1 = Monday. */
    weekStartsOn?: 0 | 1;
    /** Locale for month/weekday labels. */
    locale?: string;
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * Month- or week-view date picker — the native mirror of the web
 * `BookingCalendar`. Same `slots`/`availability`/`selectedDate`/`onSelectDate`/
 * `timezone`/`view`/`weekStartsOn` prop contract (`onSelectDate` is the native
 * idiom for the web click). A `View`/`Pressable` grid: days with availability
 * carry a token dot and bold weight; the selected day fills with the primary
 * token. Days outside the visible month are muted and disabled — navigate with
 * the header chevrons (the web roving-keyboard/auto-shift model has no native
 * analogue). Accessible: each cell is a `button` with
 * `accessibilityState={{ selected, disabled }}`. Token-only — no literal colors.
 * Availability comes in as props; nothing is fetched. Reuses the web pure date
 * helpers (`monthMatrix`/`weekRow`/`toDayKey`/`dayKeyInTz`).
 */
export declare function BookingCalendar({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn, locale, style, }: BookingCalendarProps): React.ReactElement;
//# sourceMappingURL=BookingCalendar.d.ts.map