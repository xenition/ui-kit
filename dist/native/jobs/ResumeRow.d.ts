import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Resume } from './types';
export interface ResumeRowProps {
    /** The résumé file to render. */
    resume: Resume;
    /** Fired when the row is pressed (preview / open). */
    onPress?: (resume: Resume) => void;
    /** Fired when the download affordance is pressed. */
    onDownload?: (resume: Resume) => void;
    /** Fired to make this the default résumé (hidden when already default). */
    onSetDefault?: (resume: Resume) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
export declare function ResumeRow({ resume, onPress, onDownload, onSetDefault, style, }: ResumeRowProps): React.ReactElement;
//# sourceMappingURL=ResumeRow.d.ts.map