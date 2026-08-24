import * as React from 'react';
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
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A roster card for a field technician: avatar with a token-bound presence dot,
 * name/role stack, an availability pill (text + glyph + a color that traces to
 * a semantic token — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
export declare const TechnicianCard: React.ForwardRefExoticComponent<TechnicianCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TechnicianCard.d.ts.map