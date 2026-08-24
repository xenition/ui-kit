/**
 * `@xenition/ui/photography` — presentational components for photographer /
 * portfolio / photo-shoot apps on the **web** (React DOM). The web parity of
 * `@xenition/ui/native/photography`: identical component names and prop
 * contracts (`onPress` → `onClick`, RN → DOM), styled exclusively from the
 * `--xen-*` theme tokens (no literal colors), with no data fetching or SDK
 * imports. Money is always integer **cents**, formatted through the shared
 * `formatMoney` home.
 *
 * Components compose the web primitives (`Card`, `Button`, `Badge`, `Icon`),
 * the media layer (`Gallery`), and the commerce layer (`PriceTag`,
 * `EmptyState`, `formatMoney`) so the photography domain stays a thin,
 * opinionated surface on top.
 */

export { PortfolioGrid } from './PortfolioGrid';
export type { PortfolioGridProps, PortfolioGridVariant } from './PortfolioGrid';

export { AlbumCard } from './AlbumCard';
export type { AlbumCardProps, AlbumCardVariant } from './AlbumCard';

export { PhotoTile } from './PhotoTile';
export type { PhotoTileProps, PhotoTileRatio } from './PhotoTile';

export { ShootBookingCard } from './ShootBookingCard';
export type { ShootBookingCardProps, ShootBookingStatus } from './ShootBookingCard';

export { PrintOrderRow } from './PrintOrderRow';
export type { PrintOrderRowProps, PrintOrderStatus } from './PrintOrderRow';

export { PackageCard } from './PackageCard';
export type { PackageCardProps } from './PackageCard';

export { GalleryHeader } from './GalleryHeader';
export type { GalleryHeaderProps, GalleryHeaderVariant } from './GalleryHeader';

export { ClientProofRow } from './ClientProofRow';
export type { ClientProofRowProps, ProofDecision } from './ClientProofRow';

export { LightboxThumb } from './LightboxThumb';
export type { LightboxThumbProps, LightboxThumbSize } from './LightboxThumb';

export { EquipmentRow } from './EquipmentRow';
export type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

export { ShotListItem } from './ShotListItem';
export type { ShotListItemProps, ShotPriority } from './ShotListItem';

export { PricePackageRow } from './PricePackageRow';
export type { PricePackageRowProps } from './PricePackageRow';
