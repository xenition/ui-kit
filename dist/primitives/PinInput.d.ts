import * as React from 'react';
export interface PinInputProps {
    /** Number of digit boxes (default 6). */
    length?: number;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
/** OTP / PIN entry — one box per character, with focus advance. Bound to the theme tokens. */
export declare function PinInput({ length, value, onChange, className }: PinInputProps): React.ReactElement;
//# sourceMappingURL=PinInput.d.ts.map