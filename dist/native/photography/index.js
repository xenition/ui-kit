"use strict";
/**
 * `@xenition/ui/native/photography` — presentational components for
 * photographer / portfolio / photo-shoot apps on React Native. Mobile-first,
 * native-only, styled exclusively from compiled theme tokens (no literal
 * colors), with no data fetching or SDK imports. Money is always integer
 * **cents**, formatted through the shared `formatMoney` home.
 *
 * Components compose the native primitives (`Card`, `Button`, `Badge`, `Icon`,
 * `PriceTag`) and the media layer (`Gallery`) so the photography domain stays a
 * thin, opinionated surface on top.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShotListItemV4 = exports.ShootBookingCardV4 = exports.PrintOrderRowV4 = exports.PricePackageRowV4 = exports.PortfolioGridV4 = exports.PhotoTileV4 = exports.PackageCardV4 = exports.LightboxThumbV4 = exports.GalleryHeaderV4 = exports.EquipmentRowV4 = exports.ClientProofRowV4 = exports.AlbumCardV4 = exports.PricePackageRow = exports.ShotListItem = exports.EquipmentRow = exports.LightboxThumb = exports.ClientProofRow = exports.GalleryHeader = exports.PackageCardV3 = exports.PackageCardV2 = exports.PackageCard = exports.PrintOrderRow = exports.ShootBookingCard = exports.PhotoTileV3 = exports.PhotoTileV2 = exports.PhotoTile = exports.AlbumCardV3 = exports.AlbumCardV2 = exports.AlbumCard = exports.PortfolioGridV3 = exports.PortfolioGridV2 = exports.PortfolioGrid = void 0;
var PortfolioGrid_1 = require("./PortfolioGrid");
Object.defineProperty(exports, "PortfolioGrid", { enumerable: true, get: function () { return PortfolioGrid_1.PortfolioGrid; } });
var PortfolioGridV2_1 = require("./PortfolioGridV2");
Object.defineProperty(exports, "PortfolioGridV2", { enumerable: true, get: function () { return PortfolioGridV2_1.PortfolioGridV2; } });
var PortfolioGridV3_1 = require("./PortfolioGridV3");
Object.defineProperty(exports, "PortfolioGridV3", { enumerable: true, get: function () { return PortfolioGridV3_1.PortfolioGridV3; } });
var AlbumCard_1 = require("./AlbumCard");
Object.defineProperty(exports, "AlbumCard", { enumerable: true, get: function () { return AlbumCard_1.AlbumCard; } });
var AlbumCardV2_1 = require("./AlbumCardV2");
Object.defineProperty(exports, "AlbumCardV2", { enumerable: true, get: function () { return AlbumCardV2_1.AlbumCardV2; } });
var AlbumCardV3_1 = require("./AlbumCardV3");
Object.defineProperty(exports, "AlbumCardV3", { enumerable: true, get: function () { return AlbumCardV3_1.AlbumCardV3; } });
var PhotoTile_1 = require("./PhotoTile");
Object.defineProperty(exports, "PhotoTile", { enumerable: true, get: function () { return PhotoTile_1.PhotoTile; } });
var PhotoTileV2_1 = require("./PhotoTileV2");
Object.defineProperty(exports, "PhotoTileV2", { enumerable: true, get: function () { return PhotoTileV2_1.PhotoTileV2; } });
var PhotoTileV3_1 = require("./PhotoTileV3");
Object.defineProperty(exports, "PhotoTileV3", { enumerable: true, get: function () { return PhotoTileV3_1.PhotoTileV3; } });
var ShootBookingCard_1 = require("./ShootBookingCard");
Object.defineProperty(exports, "ShootBookingCard", { enumerable: true, get: function () { return ShootBookingCard_1.ShootBookingCard; } });
var PrintOrderRow_1 = require("./PrintOrderRow");
Object.defineProperty(exports, "PrintOrderRow", { enumerable: true, get: function () { return PrintOrderRow_1.PrintOrderRow; } });
var PackageCard_1 = require("./PackageCard");
Object.defineProperty(exports, "PackageCard", { enumerable: true, get: function () { return PackageCard_1.PackageCard; } });
var PackageCardV2_1 = require("./PackageCardV2");
Object.defineProperty(exports, "PackageCardV2", { enumerable: true, get: function () { return PackageCardV2_1.PackageCardV2; } });
var PackageCardV3_1 = require("./PackageCardV3");
Object.defineProperty(exports, "PackageCardV3", { enumerable: true, get: function () { return PackageCardV3_1.PackageCardV3; } });
var GalleryHeader_1 = require("./GalleryHeader");
Object.defineProperty(exports, "GalleryHeader", { enumerable: true, get: function () { return GalleryHeader_1.GalleryHeader; } });
var ClientProofRow_1 = require("./ClientProofRow");
Object.defineProperty(exports, "ClientProofRow", { enumerable: true, get: function () { return ClientProofRow_1.ClientProofRow; } });
var LightboxThumb_1 = require("./LightboxThumb");
Object.defineProperty(exports, "LightboxThumb", { enumerable: true, get: function () { return LightboxThumb_1.LightboxThumb; } });
var EquipmentRow_1 = require("./EquipmentRow");
Object.defineProperty(exports, "EquipmentRow", { enumerable: true, get: function () { return EquipmentRow_1.EquipmentRow; } });
var ShotListItem_1 = require("./ShotListItem");
Object.defineProperty(exports, "ShotListItem", { enumerable: true, get: function () { return ShotListItem_1.ShotListItem; } });
var PricePackageRow_1 = require("./PricePackageRow");
Object.defineProperty(exports, "PricePackageRow", { enumerable: true, get: function () { return PricePackageRow_1.PricePackageRow; } });
/*
 * ── V4 "studio" (matted, image-forward gallery) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated cards, tiles, and
 * rows whose photos float inside a thin neutral mat, bold titles, soft-primary
 * meta chips, and status/priority by glyph + labelled badge. The brand gradient
 * is reserved for the studio moment — the `GalleryHeader` hero. Every V4 keeps
 * its base props (all `variant`/ratio/size/status values honored). Base/V2/V3
 * untouched; V4 is additive. Token-driven, dark-mode safe, web + native.
 */
var AlbumCardV4_1 = require("./AlbumCardV4");
Object.defineProperty(exports, "AlbumCardV4", { enumerable: true, get: function () { return AlbumCardV4_1.AlbumCardV4; } });
var ClientProofRowV4_1 = require("./ClientProofRowV4");
Object.defineProperty(exports, "ClientProofRowV4", { enumerable: true, get: function () { return ClientProofRowV4_1.ClientProofRowV4; } });
var EquipmentRowV4_1 = require("./EquipmentRowV4");
Object.defineProperty(exports, "EquipmentRowV4", { enumerable: true, get: function () { return EquipmentRowV4_1.EquipmentRowV4; } });
var GalleryHeaderV4_1 = require("./GalleryHeaderV4");
Object.defineProperty(exports, "GalleryHeaderV4", { enumerable: true, get: function () { return GalleryHeaderV4_1.GalleryHeaderV4; } });
var LightboxThumbV4_1 = require("./LightboxThumbV4");
Object.defineProperty(exports, "LightboxThumbV4", { enumerable: true, get: function () { return LightboxThumbV4_1.LightboxThumbV4; } });
var PackageCardV4_1 = require("./PackageCardV4");
Object.defineProperty(exports, "PackageCardV4", { enumerable: true, get: function () { return PackageCardV4_1.PackageCardV4; } });
var PhotoTileV4_1 = require("./PhotoTileV4");
Object.defineProperty(exports, "PhotoTileV4", { enumerable: true, get: function () { return PhotoTileV4_1.PhotoTileV4; } });
var PortfolioGridV4_1 = require("./PortfolioGridV4");
Object.defineProperty(exports, "PortfolioGridV4", { enumerable: true, get: function () { return PortfolioGridV4_1.PortfolioGridV4; } });
var PricePackageRowV4_1 = require("./PricePackageRowV4");
Object.defineProperty(exports, "PricePackageRowV4", { enumerable: true, get: function () { return PricePackageRowV4_1.PricePackageRowV4; } });
var PrintOrderRowV4_1 = require("./PrintOrderRowV4");
Object.defineProperty(exports, "PrintOrderRowV4", { enumerable: true, get: function () { return PrintOrderRowV4_1.PrintOrderRowV4; } });
var ShootBookingCardV4_1 = require("./ShootBookingCardV4");
Object.defineProperty(exports, "ShootBookingCardV4", { enumerable: true, get: function () { return ShootBookingCardV4_1.ShootBookingCardV4; } });
var ShotListItemV4_1 = require("./ShotListItemV4");
Object.defineProperty(exports, "ShotListItemV4", { enumerable: true, get: function () { return ShotListItemV4_1.ShotListItemV4; } });
//# sourceMappingURL=index.js.map