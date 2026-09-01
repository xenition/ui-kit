import * as React from 'react';
import type { MentionTextProps } from './MentionText';
/** Drop-in for {@link MentionTextProps} — same props, the V4 "feed" design. */
export type MentionTextV4Props = MentionTextProps;
/**
 * MentionText — **V4** "feed" design (web parity of the native V4). The clean,
 * airy mention-aware body: `@mentions` and `#hashtags` render in **primary**
 * and become tappable, everything else in the on-surface base color. Reuses the
 * shared {@link parseMentions} splitter. Same props/behavior as
 * {@link MentionTextProps}; token-only, no literal colors. Mentions/hashtags
 * become inline `<button>`s only when a handler is supplied, otherwise plain
 * (non-interactive) spans.
 */
export declare const MentionTextV4: React.ForwardRefExoticComponent<MentionTextProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=MentionTextV4.d.ts.map