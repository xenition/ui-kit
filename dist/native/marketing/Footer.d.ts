import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FooterLink {
    /** Link label. */
    label: string;
    /** Press handler (RN equivalent of the web `href`). Omit for a plain label. */
    onPress?: () => void;
}
export interface FooterColumn {
    /** Column heading. */
    title: string;
    /** Links in this group. */
    links: FooterLink[];
}
export interface FooterProps {
    /** Brand slot rendered above the columns. */
    logo?: React.ReactNode;
    /**
     * Link groups. Web accepts `FooterColumn` children; native has no
     * children-as-config, so columns are passed as data.
     */
    columns?: FooterColumn[];
    /** Bottom bar content (copyright, social row, …) — rendered as-is. */
    bottom?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Multi-column marketing footer — the native mirror of the web `Footer` +
 * `FooterColumn`. React Native can't accept typed `FooterColumn` children, so
 * the columns are supplied as a `columns` array (each `{ title, links }`) and
 * each link renders as a `Pressable` row. `logo` and `bottom` are node slots.
 * Token-only.
 */
export declare function Footer({ logo, columns, bottom, style, }: FooterProps): React.ReactElement;
//# sourceMappingURL=Footer.d.ts.map