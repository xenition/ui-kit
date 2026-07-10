import * as React from 'react';
export interface SegmentedOption {
    label: React.ReactNode;
    value: string;
}
export interface SegmentedProps {
    options: SegmentedOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
/** Segmented control (pill toggle group) bound to the theme tokens. */
export declare function Segmented({ options, value, onChange, className }: SegmentedProps): React.ReactElement;
//# sourceMappingURL=Segmented.d.ts.map