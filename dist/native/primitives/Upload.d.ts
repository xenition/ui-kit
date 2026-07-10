import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * A picked file descriptor. RN has no DOM `File`, and this package stays
 * SDK-agnostic (no hard dependency on `expo-document-picker`/`expo-image-picker`),
 * so the shape is a minimal, library-neutral superset the host app can satisfy
 * from whichever picker it wires in.
 */
export interface UploadFile {
    uri: string;
    name?: string;
    /** MIME type, e.g. `image/png`. */
    type?: string;
    size?: number;
}
export interface UploadProps {
    /** Called with the chosen files (native mirror of the web `onFiles`). */
    onFiles?: (files: UploadFile[]) => void;
    /**
     * App-injected file picker. Pressing the dropzone awaits this and forwards
     * the result to `onFiles`. The host wires it to its picker of choice
     * (`expo-document-picker`, `expo-image-picker`, a custom sheet, …) so this
     * primitive takes no hard native-module dependency. Defaults to a no-op.
     *
     * TODO(host): provide `pickFiles` — without it the dropzone is inert.
     */
    pickFiles?: (opts: {
        accept?: string;
        multiple?: boolean;
    }) => Promise<UploadFile[]>;
    /** Hint passed through to `pickFiles` (e.g. `image/*`). No web drag-drop on RN. */
    accept?: string;
    /** Allow selecting more than one file. */
    multiple?: boolean;
    /** Dropzone label. */
    label?: React.ReactNode;
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Token-styled file dropzone — the native mirror of the web `Upload`. RN has no
 * drag-and-drop, so the "drop" affordance collapses to a `Pressable` that, on
 * press, awaits the app-injected `pickFiles` and forwards its result to
 * `onFiles`. Same `accept`/`multiple`/`label` prop names as the web version.
 * SDK-agnostic: no hardcoded picker module — the host supplies `pickFiles`.
 * No literal colors.
 */
export declare function Upload({ onFiles, pickFiles, accept, multiple, label, invalid, disabled, accessibilityLabel, style, }: UploadProps): React.ReactElement;
//# sourceMappingURL=Upload.d.ts.map