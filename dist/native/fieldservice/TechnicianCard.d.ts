import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Technician availability — text + glyph + color (never color-alone). */
export type TechnicianStatus = 'available' | 'on-job' | 'en-route' | 'offline';
export interface TechnicianCardProps {
    /** Technician name (e.g. "Marcus Reyes"). */
    name: string;
    /** Role / trade line (e.g. "HVAC Lead"). */
    role?: string;
    /** Availability status — text + glyph + color. */
    status: TechnicianStatus;
    /** Avatar image URL; falls back to initials from `name`. */
    avatarUrl?: string;
    /** Skill / certification chips. */
    skills?: string[];
    /** Count of jobs assigned today, shown as a meta line. */
    jobsToday?: number;
    /** Phone number; when set with `onCall`, renders a Call action. */
    phone?: string;
    /** Fires when the Call action is pressed. */
    onCall?: () => void;
    /** Fires when the Assign action is pressed. */
    onAssign?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A roster card for a field technician: avatar with a presence dot, name/role
 * stack, an availability pill (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
export declare function TechnicianCard({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, style, }: TechnicianCardProps): React.ReactElement;
//# sourceMappingURL=TechnicianCard.d.ts.map