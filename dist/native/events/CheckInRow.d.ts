import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CheckInRowProps {
    /** Attendee name. */
    name: string;
    /** Avatar image URL (initials fallback when absent). */
    avatarUrl?: string;
    /** Ticket tier / type label. */
    ticketType?: string;
    /** Pre-formatted check-in time, shown when checked in. */
    checkedInAt?: string;
    /** Current check-in state. */
    checkedIn?: boolean;
    /** Fires with the desired next state when the row's toggle is pressed. */
    onToggle?: (next: boolean) => void;
    /** Disable the toggle. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a
 * text badge (`Checked in` / `Not in`) and `accessibilityState.checked` — never
 * color alone. Colors come from the compiled theme tokens; no literal colors.
 */
export declare function CheckInRow({ name, avatarUrl, ticketType, checkedInAt, checkedIn, onToggle, disabled, style, }: CheckInRowProps): React.ReactElement;
//# sourceMappingURL=CheckInRow.d.ts.map