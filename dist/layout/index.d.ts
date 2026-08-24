/**
 * `@xenition/ui/layout` — token-bound React DOM layout primitives (web).
 *
 * The web parity of `@xenition/ui/native/layout`: every color, spacing, radius,
 * and type size is bound to the `--xen-*` tokens through the Tailwind preset —
 * no literal colors (kit lint rule). Only geometric constants (column counts,
 * aspect ratios, max widths, sticky offsets) are numeric literals.
 */
export { Container, type ContainerProps } from './Container';
export { Row, type RowProps } from './Row';
export { Column, type ColumnProps } from './Column';
export { Grid, type GridProps } from './Grid';
export { Flex, type FlexProps, type FlexDirection } from './Flex';
export { Spacer, type SpacerProps } from './Spacer';
export { Divider, type DividerProps } from './Divider';
export { Center, type CenterProps } from './Center';
export { AspectRatio, type AspectRatioProps } from './AspectRatio';
export { ScrollArea, type ScrollAreaProps, type ScrollAxis } from './ScrollArea';
export { Section, type SectionProps } from './Section';
export { PageHeader, type PageHeaderProps } from './PageHeader';
export { Sticky, type StickyProps } from './Sticky';
export { Inset, type InsetProps } from './Inset';
export { Bleed, type BleedProps } from './Bleed';
export { Cluster, type ClusterProps } from './Cluster';
export type { SpaceKey, Align, Justify } from './_tokens';
//# sourceMappingURL=index.d.ts.map