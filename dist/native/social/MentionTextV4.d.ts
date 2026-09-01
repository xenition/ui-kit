import * as React from 'react';
import type { MentionTextProps } from './MentionText';
/** Drop-in for {@link MentionTextProps} — same props, the V4 "feed" design. */
export type MentionTextV4Props = MentionTextProps;
/**
 * MentionText — **V4** "feed" design. The clean, airy mention-aware body:
 * `@mentions` and `#hashtags` render in **primary** and become tappable,
 * everything else in the on-surface base color. Reuses the shared
 * {@link parseMentions} splitter. Pure `Text` composition (so it wraps/clamps
 * naturally). Same props/behavior as {@link MentionTextProps}; token-only colors
 * via `useXenitionTheme()`, `link` a11y role on tappable segments.
 */
export declare function MentionTextV4({ text, color, linkColor, size, numberOfLines, onPressMention, onPressHashtag, style, }: MentionTextV4Props): React.ReactElement;
//# sourceMappingURL=MentionTextV4.d.ts.map