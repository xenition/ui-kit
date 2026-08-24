import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SchoolEventType = 'holiday' | 'exam' | 'meeting' | 'trip' | 'activity' | 'deadline' | 'other';
export interface SchoolEventRowProps {
    /** Event title, e.g. "Parent-teacher conference". */
    title: string;
    /** Event type; drives the icon + type chip. */
    type?: SchoolEventType;
    /** Date label, e.g. "Mon, Sep 4". */
    date?: string;
    /** Time label, e.g. "3:00 PM". */
    time?: string;
    /** Location, e.g. "Room 12". */
    location?: string;
    /** Which child this concerns. */
    childName?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. Pressable when `onPress` is set. Type is conveyed by
 * glyph + label + chip, not color alone. Token-only colors.
 */
export declare function SchoolEventRow({ title, type, date, time, location, childName, onPress, style, }: SchoolEventRowProps): React.ReactElement;
//# sourceMappingURL=SchoolEventRow.d.ts.map