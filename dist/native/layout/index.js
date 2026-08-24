"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bleed = exports.Inset = exports.ListSeparator = exports.KeyboardAvoider = exports.PageHeader = exports.Section = exports.ScrollArea = exports.AspectRatio = exports.Center = exports.Divider = exports.Spacer = exports.Flex = exports.Grid = exports.Column = exports.Row = exports.Container = void 0;
/**
 * `@xenition/ui/native/layout` — token-bound React Native layout primitives.
 *
 * Every component reads the compiled theme via `useXenitionTheme()`; spacing,
 * radii, type sizes, and colors trace to tokens (no literal colors). Only
 * geometric constants (flex factors, aspect ratios, column counts, max widths)
 * are numeric literals.
 */
var Container_1 = require("./Container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return Container_1.Container; } });
var Row_1 = require("./Row");
Object.defineProperty(exports, "Row", { enumerable: true, get: function () { return Row_1.Row; } });
var Column_1 = require("./Column");
Object.defineProperty(exports, "Column", { enumerable: true, get: function () { return Column_1.Column; } });
var Grid_1 = require("./Grid");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return Grid_1.Grid; } });
var Flex_1 = require("./Flex");
Object.defineProperty(exports, "Flex", { enumerable: true, get: function () { return Flex_1.Flex; } });
var Spacer_1 = require("./Spacer");
Object.defineProperty(exports, "Spacer", { enumerable: true, get: function () { return Spacer_1.Spacer; } });
var Divider_1 = require("./Divider");
Object.defineProperty(exports, "Divider", { enumerable: true, get: function () { return Divider_1.Divider; } });
var Center_1 = require("./Center");
Object.defineProperty(exports, "Center", { enumerable: true, get: function () { return Center_1.Center; } });
var AspectRatio_1 = require("./AspectRatio");
Object.defineProperty(exports, "AspectRatio", { enumerable: true, get: function () { return AspectRatio_1.AspectRatio; } });
var ScrollArea_1 = require("./ScrollArea");
Object.defineProperty(exports, "ScrollArea", { enumerable: true, get: function () { return ScrollArea_1.ScrollArea; } });
var Section_1 = require("./Section");
Object.defineProperty(exports, "Section", { enumerable: true, get: function () { return Section_1.Section; } });
var PageHeader_1 = require("./PageHeader");
Object.defineProperty(exports, "PageHeader", { enumerable: true, get: function () { return PageHeader_1.PageHeader; } });
var KeyboardAvoider_1 = require("./KeyboardAvoider");
Object.defineProperty(exports, "KeyboardAvoider", { enumerable: true, get: function () { return KeyboardAvoider_1.KeyboardAvoider; } });
var ListSeparator_1 = require("./ListSeparator");
Object.defineProperty(exports, "ListSeparator", { enumerable: true, get: function () { return ListSeparator_1.ListSeparator; } });
var Inset_1 = require("./Inset");
Object.defineProperty(exports, "Inset", { enumerable: true, get: function () { return Inset_1.Inset; } });
var Bleed_1 = require("./Bleed");
Object.defineProperty(exports, "Bleed", { enumerable: true, get: function () { return Bleed_1.Bleed; } });
//# sourceMappingURL=index.js.map