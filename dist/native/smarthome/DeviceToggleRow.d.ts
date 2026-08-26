import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DeviceToggleRowProps {
    /** Device / entity label. */
    label: string;
    /** Leading glyph/emoji. */
    icon?: string;
    /** Secondary line (e.g. "Dimmable · 60%"). */
    subtitle?: string;
    /** Whether the device is on. */
    checked?: boolean;
    /** Device is unreachable — disables the switch and shows an offline label. */
    offline?: boolean;
    /**
     * Fires with the requested on/off value. Prefer `onChange` — that is the
     * kit's one canonical name for "the value changed". `onCheckedChange` is this
     * component's original spelling, kept so existing callers keep working; if
     * both are passed this one wins.
     */
    onCheckedChange?: (next: boolean) => void;
    /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
    onChange?: (next: boolean) => void;
    /** Hide the bottom divider (e.g. last row in a group). */
    last?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact list row with a trailing on/off {@link Switch} — the building block
 * of {@link RoomGroup}. Renders a glyph, label, and optional subtitle; when
 * `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. A hairline
 * `border` divider separates rows unless `last`. Token-bound throughout.
 */
export declare function DeviceToggleRow({ label, icon, subtitle, checked, offline, onCheckedChange, onChange, last, style, }: DeviceToggleRowProps): React.ReactElement;
//# sourceMappingURL=DeviceToggleRow.d.ts.map