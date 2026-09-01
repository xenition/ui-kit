import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TeacherCardProps {
    name: string;
    specialty?: string;
    avatarGlyph?: string;
    sessions?: number;
    following?: boolean;
    onPress?: () => void;
    onFollow?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * TeacherCard — an instructor row on a clean card: a soft primary-tinted avatar
 * circle, the teacher's name, specialty and session count, and (when `onFollow`
 * is wired) a Follow/Following button. The card stays calm — surface, border,
 * `onSurface`/`mutedText` text — with the only tint on the avatar; follow state
 * lives in the button's label and variant, not in color alone. The whole row is
 * pressable when `onPress` is set. Token-only colors.
 */
export declare function TeacherCard({ name, specialty, avatarGlyph, sessions, following, onPress, onFollow, style, }: TeacherCardProps): React.ReactElement;
//# sourceMappingURL=TeacherCard.d.ts.map