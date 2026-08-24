import * as React from 'react';
export interface RadioOption {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
}
/** Single-choice radio group bound to the theme tokens. */
export declare function RadioGroup({ options, value, onChange, name, orientation, className, }: RadioGroupProps): React.ReactElement;
//# sourceMappingURL=RadioGroup.d.ts.map