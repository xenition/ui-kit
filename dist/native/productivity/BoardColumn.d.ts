import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
import type { PriorityLevel } from './PriorityTag';
import type { DueDateTone } from './DueDatePill';
export interface BoardCard {
    id: string;
    title: string;
    done?: boolean;
    priority?: PriorityLevel;
    dueLabel?: string;
    dueTone?: DueDateTone;
}
export interface BoardColumnProps {
    /** Column heading (e.g. `'In progress'`). */
    title: string;
    /** Cards in this column; an empty array shows a muted placeholder. */
    cards: BoardCard[];
    /** Fires when a card is toggled done. */
    onToggleCard?: (id: string, done: boolean) => void;
    /** Fires when a card body is pressed. */
    onCardPress?: (id: string) => void;
    /** Fires from the footer "+ Add" affordance (hidden when omitted). */
    onAddCard?: () => void;
    /** Fixed column width in px (default 280). */
    width?: number;
    /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Mirrors the primitive `Kanban`
 * column but with task-aware rows. Guards a missing array. No literal colors.
 */
export declare function BoardColumn({ title, cards, onToggleCard, onCardPress, onAddCard, width, appearance, style, }: BoardColumnProps): React.ReactElement;
//# sourceMappingURL=BoardColumn.d.ts.map