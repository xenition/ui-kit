import * as React from 'react';
import type { Resume } from './types';
export interface ResumeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The résumé file to render. */
    resume: Resume;
    /** Fired when the row is pressed (preview / open). `onPress` → `onClick`. */
    onClick?: (resume: Resume) => void;
    /** Fired when the download affordance is pressed. */
    onDownload?: (resume: Resume) => void;
    /** Fired to make this the default résumé (hidden when already default). */
    onSetDefault?: (resume: Resume) => void;
}
/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
export declare const ResumeRow: React.ForwardRefExoticComponent<ResumeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResumeRow.d.ts.map