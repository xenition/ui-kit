import * as React from 'react';
export interface TeacherCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    specialty?: string;
    avatarGlyph?: string;
    sessions?: number;
    following?: boolean;
    onPress?: () => void;
    onFollow?: () => void;
}
/**
 * TeacherCard — an instructor row on a clean card: a soft primary-tinted avatar
 * circle, the teacher's name, specialty and session count, and (when `onFollow`
 * is wired) a Follow/Following button. The card stays calm — surface, border,
 * on-surface/muted text — with the only tint on the avatar; follow state lives
 * in the button's label and variant, not in color alone. The whole row is
 * pressable when `onPress` is set. Token-only colors.
 */
export declare const TeacherCard: React.ForwardRefExoticComponent<TeacherCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeacherCard.d.ts.map