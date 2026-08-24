import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV2Props = SetlistRowProps;
/**
 * SetlistRow, redesigned (v2): an **elevated card** with an artwork tile (a
 * token-tinted square carrying the song's initial, or a ♪ for an empty slot), a
 * title / artist block, a duration `Badge`, and a drag handle. `playing` lights
 * the card with a marker + weight (never color alone) and springs on press. An
 * empty slot renders the same card, dashed and dimmed. Tapping fires `onPress`;
 * the optional play button fires `onPlay`. Meta is guarded. Token-only styling.
 * Distinct at a glance from v1's flat line. Same props.
 */
export declare function SetlistRowV2({ song, index, playing, variant, emptyLabel, onPress, onPlay, style, }: SetlistRowV2Props): React.ReactElement;
//# sourceMappingURL=SetlistRowV2.d.ts.map