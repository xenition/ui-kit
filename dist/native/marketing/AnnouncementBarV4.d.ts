import * as React from 'react';
import type { AnnouncementBarProps } from './AnnouncementBar';
/** Drop-in for {@link AnnouncementBarProps} — same props, the V4 "showcase" design. */
export type AnnouncementBarV4Props = AnnouncementBarProps;
/**
 * AnnouncementBar — **V4** "showcase" design (native mirror of the web V4). A
 * compact, conversion-forward top banner: the `primary` promotional tone rides
 * the reserved vibrant primary→accent brand gradient (via the shared
 * `expo-linear-gradient` wrapper — the CTABannerV4 technique) with near-white
 * ink, while `accent`/`neutral` stay as refined solid bands. Honors every prop
 * of {@link AnnouncementBarProps} (`message`/`action`/`actionLabel`/`onPress`/
 * `tone`/`dismissible`/`closeLabel`/`onDismiss`); dismissal is session state
 * only; token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
export declare function AnnouncementBarV4({ message, action, actionLabel, onPress, tone, dismissible, closeLabel, onDismiss, style, }: AnnouncementBarV4Props): React.ReactElement | null;
//# sourceMappingURL=AnnouncementBarV4.d.ts.map