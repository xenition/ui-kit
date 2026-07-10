import * as React from 'react';
export interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
}
/** Number input with −/+ steppers, bound to the theme tokens. Clamps to [min, max]. */
export declare function NumberInput({ value, onChange, min, max, step, disabled, className, }: NumberInputProps): React.ReactElement;
//# sourceMappingURL=NumberInput.d.ts.map