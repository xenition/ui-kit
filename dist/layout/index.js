"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterV4 = exports.Cluster = exports.BleedV4 = exports.Bleed = exports.InsetV4 = exports.Inset = exports.StickyV4 = exports.Sticky = exports.PageHeaderV4 = exports.PageHeader = exports.SectionV4 = exports.Section = exports.ScrollAreaV4 = exports.ScrollArea = exports.AspectRatioV4 = exports.AspectRatio = exports.CenterV4 = exports.Center = exports.ListSeparatorV4 = exports.DividerV4 = exports.Divider = exports.SpacerV4 = exports.Spacer = exports.FlexV4 = exports.Flex = exports.GridV4 = exports.Grid = exports.ColumnV4 = exports.Column = exports.RowV4 = exports.Row = exports.ContainerV4 = exports.Container = void 0;
/**
 * `@xenition/ui/layout` — token-bound React DOM layout primitives (web).
 *
 * The web parity of `@xenition/ui/native/layout`: every color, spacing, radius,
 * and type size is bound to the `--xen-*` tokens through the Tailwind preset —
 * no literal colors (kit lint rule). Only geometric constants (column counts,
 * aspect ratios, max widths, sticky offsets) are numeric literals.
 */
var Container_1 = require("./Container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return Container_1.Container; } });
var ContainerV4_1 = require("./ContainerV4");
Object.defineProperty(exports, "ContainerV4", { enumerable: true, get: function () { return ContainerV4_1.ContainerV4; } });
var Row_1 = require("./Row");
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return Row_1.Row; } });
var RowV4_1 = require("./RowV4");
Object.defineProperty(exports, "RowV4", { enumerable: true, get: function () { return RowV4_1.RowV4; } });
var Column_1 = require("./Column");
Object.defineProperty(exports, "Column", { enumerable: true, get: function () { return Column_1.Column; } });
var ColumnV4_1 = require("./ColumnV4");
Object.defineProperty(exports, "ColumnV4", { enumerable: true, get: function () { return ColumnV4_1.ColumnV4; } });
var Grid_1 = require("./Grid");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return Grid_1.Grid; } });
var GridV4_1 = require("./GridV4");
Object.defineProperty(exports, "GridV4", { enumerable: true, get: function () { return GridV4_1.GridV4; } });
var Flex_1 = require("./Flex");
Object.defineProperty(exports, "Flex", { enumerable: true, get: function () { return Flex_1.Flex; } });
var FlexV4_1 = require("./FlexV4");
Object.defineProperty(exports, "FlexV4", { enumerable: true, get: function () { return FlexV4_1.FlexV4; } });
var Spacer_1 = require("./Spacer");
Object.defineProperty(exports, "Spacer", { enumerable: true, get: function () { return Spacer_1.Spacer; } });
var SpacerV4_1 = require("./SpacerV4");
Object.defineProperty(exports, "SpacerV4", { enumerable: true, get: function () { return SpacerV4_1.SpacerV4; } });
var Divider_1 = require("./Divider");
Object.defineProperty(exports, "Divider", { enumerable: true, get: function () { return Divider_1.Divider; } });
var DividerV4_1 = require("./DividerV4");
Object.defineProperty(exports, "DividerV4", { enumerable: true, get: function () { return DividerV4_1.DividerV4; } });
var ListSeparatorV4_1 = require("./ListSeparatorV4");
Object.defineProperty(exports, "ListSeparatorV4", { enumerable: true, get: function () { return ListSeparatorV4_1.ListSeparatorV4; } });
var Center_1 = require("./Center");
Object.defineProperty(exports, "Center", { enumerable: true, get: function () { return Center_1.Center; } });
var CenterV4_1 = require("./CenterV4");
Object.defineProperty(exports, "CenterV4", { enumerable: true, get: function () { return CenterV4_1.CenterV4; } });
var AspectRatio_1 = require("./AspectRatio");
Object.defineProperty(exports, "AspectRatio", { enumerable: true, get: function () { return AspectRatio_1.AspectRatio; } });
var AspectRatioV4_1 = require("./AspectRatioV4");
Object.defineProperty(exports, "AspectRatioV4", { enumerable: true, get: function () { return AspectRatioV4_1.AspectRatioV4; } });
var ScrollArea_1 = require("./ScrollArea");
Object.defineProperty(exports, "ScrollArea", { enumerable: true, get: function () { return ScrollArea_1.ScrollArea; } });
var ScrollAreaV4_1 = require("./ScrollAreaV4");
Object.defineProperty(exports, "ScrollAreaV4", { enumerable: true, get: function () { return ScrollAreaV4_1.ScrollAreaV4; } });
var Section_1 = require("./Section");
Object.defineProperty(exports, "Section", { enumerable: true, get: function () { return Section_1.Section; } });
var SectionV4_1 = require("./SectionV4");
Object.defineProperty(exports, "SectionV4", { enumerable: true, get: function () { return SectionV4_1.SectionV4; } });
var PageHeader_1 = require("./PageHeader");
Object.defineProperty(exports, "PageHeader", { enumerable: true, get: function () { return PageHeader_1.PageHeader; } });
var PageHeaderV4_1 = require("./PageHeaderV4");
Object.defineProperty(exports, "PageHeaderV4", { enumerable: true, get: function () { return PageHeaderV4_1.PageHeaderV4; } });
var Sticky_1 = require("./Sticky");
Object.defineProperty(exports, "Sticky", { enumerable: true, get: function () { return Sticky_1.Sticky; } });
var StickyV4_1 = require("./StickyV4");
Object.defineProperty(exports, "StickyV4", { enumerable: true, get: function () { return StickyV4_1.StickyV4; } });
var Inset_1 = require("./Inset");
Object.defineProperty(exports, "Inset", { enumerable: true, get: function () { return Inset_1.Inset; } });
var InsetV4_1 = require("./InsetV4");
Object.defineProperty(exports, "InsetV4", { enumerable: true, get: function () { return InsetV4_1.InsetV4; } });
var Bleed_1 = require("./Bleed");
Object.defineProperty(exports, "Bleed", { enumerable: true, get: function () { return Bleed_1.Bleed; } });
var BleedV4_1 = require("./BleedV4");
Object.defineProperty(exports, "BleedV4", { enumerable: true, get: function () { return BleedV4_1.BleedV4; } });
var Cluster_1 = require("./Cluster");
Object.defineProperty(exports, "Cluster", { enumerable: true, get: function () { return Cluster_1.Cluster; } });
var ClusterV4_1 = require("./ClusterV4");
Object.defineProperty(exports, "ClusterV4", { enumerable: true, get: function () { return ClusterV4_1.ClusterV4; } });
//# sourceMappingURL=index.js.map