import * as React from 'react';
export interface DateSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
    label: string;
}
/**
 * Centered date chip that breaks a message stream into day sections. Exposed as
 * a `separator` for screen-reader navigation. No literal colors — the pill fill,
 * border, and text come from semantic tokens.
 */
export declare const DateSeparator: React.ForwardRefExoticComponent<DateSeparatorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DateSeparator.d.ts.map