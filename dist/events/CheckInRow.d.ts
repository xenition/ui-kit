import * as React from 'react';
export interface CheckInRowProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
/**
 * A staff-facing check-in row: avatar, attendee name, ticket type, and a toggle
 * that flips the checked-in state. The state is shown with a check glyph, a text
 * badge (`Checked in` / `Not in`) and `aria-checked` on a `switch` — never color
 * alone. Colors come from the `--xen-*` tokens; no literal colors.
 */
export declare const CheckInRow: React.ForwardRefExoticComponent<CheckInRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CheckInRow.d.ts.map