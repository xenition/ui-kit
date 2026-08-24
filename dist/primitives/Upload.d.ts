import * as React from 'react';
export interface UploadProps {
    /** Called with the chosen/dropped files. */
    onFiles: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    label?: React.ReactNode;
    className?: string;
}
/** Click-or-drop file dropzone bound to the theme tokens. Pairs with `@xenition/sdk` storage. */
export declare function Upload({ onFiles, accept, multiple, label, className, }: UploadProps): React.ReactElement;
//# sourceMappingURL=Upload.d.ts.map