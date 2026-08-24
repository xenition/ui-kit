import * as React from 'react';
export type StatusMessageState = 'loading' | 'empty' | 'error';
export interface StatusMessageProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Which feedback state to render. */
    state: StatusMessageState;
    /** Copy shown to the user. Optional for `loading` (spinner alone is valid). */
    message?: string;
}
/**
 * Loading / empty / error feedback — the templates' hand-rolled `Status` block
 * as a token-only primitive. `loading` shows a CSS spinner (reduced-motion
 * safe) with an optional message and is announced via `role="status"`;
 * `empty` is a muted message; `error` is a `danger`-token message announced via
 * `role="alert"`. Pairs with `@xenition/ui/data`'s `useResource`.
 */
export declare const StatusMessage: React.ForwardRefExoticComponent<StatusMessageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatusMessage.d.ts.map