import * as React from 'react';
import type { AnnouncementBarProps } from './AnnouncementBar';
/** Drop-in for {@link AnnouncementBarProps} — same props, the V4 "showcase" design. */
export type AnnouncementBarV4Props = AnnouncementBarProps;
/**
 * AnnouncementBar — **V4** "showcase" design (web parity of the native V4). A
 * compact, conversion-forward top banner: the `primary` promotional tone rides
 * the reserved vibrant primary→accent brand gradient with near-white ink, while
 * `accent`/`neutral` stay as refined solid bands. Bolder message + medium-weight
 * action. Honors every prop of {@link AnnouncementBarProps}
 * (`message`/`action`/`tone`/`dismissible`/`closeLabel`/`onDismiss`); dismissal
 * is session state only; token-only colors, no literals.
 */
export declare const AnnouncementBarV4: React.ForwardRefExoticComponent<AnnouncementBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AnnouncementBarV4.d.ts.map