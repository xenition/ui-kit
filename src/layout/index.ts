/**
 * `@xenition/ui/layout` — token-bound React DOM layout primitives (web).
 *
 * The web parity of `@xenition/ui/native/layout`: every color, spacing, radius,
 * and type size is bound to the `--xen-*` tokens through the Tailwind preset —
 * no literal colors (kit lint rule). Only geometric constants (column counts,
 * aspect ratios, max widths, sticky offsets) are numeric literals.
 */
export { Container, type ContainerProps } from './Container';
export { ContainerV4, type ContainerV4Props } from './ContainerV4';
export { Row, type RowProps } from './Row';
export { RowV4, type RowV4Props } from './RowV4';
export { Column, type ColumnProps } from './Column';
export { ColumnV4, type ColumnV4Props } from './ColumnV4';
export { Grid, type GridProps } from './Grid';
export { GridV4, type GridV4Props } from './GridV4';
export { Flex, type FlexProps, type FlexDirection } from './Flex';
export { FlexV4, type FlexV4Props } from './FlexV4';
export { Spacer, type SpacerProps } from './Spacer';
export { SpacerV4, type SpacerV4Props } from './SpacerV4';
export { Divider, type DividerProps } from './Divider';
export { DividerV4, type DividerV4Props } from './DividerV4';
export { ListSeparatorV4, type ListSeparatorV4Props } from './ListSeparatorV4';
export { Center, type CenterProps } from './Center';
export { CenterV4, type CenterV4Props } from './CenterV4';
export { AspectRatio, type AspectRatioProps } from './AspectRatio';
export { AspectRatioV4, type AspectRatioV4Props } from './AspectRatioV4';
export { ScrollArea, type ScrollAreaProps, type ScrollAxis } from './ScrollArea';
export { ScrollAreaV4, type ScrollAreaV4Props } from './ScrollAreaV4';
export { Section, type SectionProps } from './Section';
export { SectionV4, type SectionV4Props } from './SectionV4';
export { PageHeader, type PageHeaderProps } from './PageHeader';
export { PageHeaderV4, type PageHeaderV4Props } from './PageHeaderV4';
export { Sticky, type StickyProps } from './Sticky';
export { StickyV4, type StickyV4Props } from './StickyV4';
export { Inset, type InsetProps } from './Inset';
export { InsetV4, type InsetV4Props } from './InsetV4';
export { Bleed, type BleedProps } from './Bleed';
export { BleedV4, type BleedV4Props } from './BleedV4';
export { Cluster, type ClusterProps } from './Cluster';
export { ClusterV4, type ClusterV4Props } from './ClusterV4';
export type { SpaceKey, Align, Justify } from './_tokens';
