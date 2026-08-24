import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Defect severity — drives the severity pill (text + glyph + color). */
export type PunchSeverity = 'minor' | 'major' | 'critical';
export interface PunchListItemProps {
    /** Defect / task description (e.g. "Touch-up paint scuff in lobby"). */
    label: string;
    /** Whether the item has been resolved / signed off. */
    done: boolean;
    /** Defect severity; when set, renders a severity pill. */
    severity?: PunchSeverity;
    /** Trade or location shown as a meta line. */
    location?: string;
    /** Person the item is assigned to, shown as a meta line. */
    assignee?: string;
    /** Fires with the next `done` value when the checkbox is toggled. */
    onToggle?: (done: boolean) => void;
    /** Disables the checkbox. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * One punch-list defect: a leading checkbox to mark it resolved, a description
 * that strikes through when `done` (so completion reads without color alone), a
 * severity pill (text + glyph + a color that traces to a `SemanticColors`
 * slot), and location / assignee meta. Toggling fires `onToggle` with the next
 * state. No literal colors.
 */
export declare function PunchListItem({ label, done, severity, location, assignee, onToggle, disabled, style, }: PunchListItemProps): React.ReactElement;
//# sourceMappingURL=PunchListItem.d.ts.map