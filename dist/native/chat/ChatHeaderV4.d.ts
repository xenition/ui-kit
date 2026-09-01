import * as React from 'react';
import type { ChatHeaderProps } from './ChatHeader';
export interface ChatHeaderV4Props extends ChatHeaderProps {
    /** Accessible name for the back control. Default `'Back'`. */
    backLabel?: string;
    /** Copy shown while the other party types. Default `'typing…'`. */
    typingLabel?: string;
}
/**
 * **V4 chat header** — same props as {@link ChatHeader} plus `backLabel` and
 * `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word, not only a dot.** The dot was the entire signal in
 *    a header; it now carries its label in the subtitle line and in the
 *    header's accessible name.
 * 2. **Back and the actions clear 44 and are named.** They were glyphs at
 *    text size — and `ChatHeaderAction` already carries a `label` the base
 *    never rendered or announced.
 * 3. **Typing replaces the subtitle rather than stacking under it**, so the
 *    header does not change height every time the other person starts and
 *    stops typing.
 * 4. **The title row is one press target** with one name, not a title and a
 *    subtitle a reader walks separately.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function ChatHeaderV4({ title, subtitle, avatarUri, presence, typing, backLabel, typingLabel, onBack, onPressTitle, actions, appearance, style, }: ChatHeaderV4Props): React.ReactElement | null;
//# sourceMappingURL=ChatHeaderV4.d.ts.map