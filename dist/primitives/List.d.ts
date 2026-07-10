import * as React from 'react';
export interface ListItemData {
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Leading slot (e.g. an Avatar or icon). */
    leading?: React.ReactNode;
    /** Trailing slot (e.g. a Badge, Button, or chevron). */
    trailing?: React.ReactNode;
    /** Makes the row a button. */
    onClick?: () => void;
}
export interface ListProps {
    items: ListItemData[];
    className?: string;
}
/** Vertical list of leading/title/description/trailing rows — bound to the theme tokens. */
export declare function List({ items, className }: ListProps): React.ReactElement;
//# sourceMappingURL=List.d.ts.map