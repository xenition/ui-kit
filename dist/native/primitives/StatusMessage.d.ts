import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type StatusMessageState = 'loading' | 'empty' | 'error';
export interface StatusMessageProps {
    /** Which feedback state to render. */
    state: StatusMessageState;
    /** Copy shown to the user. Optional for `loading` (spinner alone is valid). */
    message?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Loading / empty / error feedback — the native mirror of the web
 * `StatusMessage`. `loading` shows an `ActivityIndicator` (tinted from the
 * `primary` token) with an optional message and a polite live region; `empty`
 * is a `muted` message; `error` is a `danger` message announced via the `alert`
 * role + an assertive live region. Token-only. Pairs with `@xenition/ui/data`'s
 * `useResource`.
 */
export declare function StatusMessage({ state, message, style, }: StatusMessageProps): React.ReactElement;
//# sourceMappingURL=StatusMessage.d.ts.map