"use strict";
/**
 * `@xenition/ui/native/primitives` — themed React Native building blocks that
 * mirror the web `@xenition/ui/primitives` prop contracts (`onClick`→`onPress`
 * is the only idiomatic swap). Genuine RN components (View/Text/Pressable/
 * TextInput/Animated) styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no DOM.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = exports.EmptyState = exports.PriceTag = exports.useReducedMotion = exports.GradientText = exports.GlassPanel = exports.StatusDot = exports.Eyebrow = exports.Input = exports.Stack = exports.Card = exports.Button = exports.useXenitionTheme = exports.XenitionNativeThemeProvider = exports.XenitionUIProvider = void 0;
var XenitionUIProvider_1 = require("./XenitionUIProvider");
Object.defineProperty(exports, "XenitionUIProvider", { enumerable: true, get: function () { return XenitionUIProvider_1.XenitionUIProvider; } });
// Re-export the theme access hook so a mobile app can `useXenitionTheme()`
// straight from the primitives entry.
var theme_1 = require("../theme");
Object.defineProperty(exports, "XenitionNativeThemeProvider", { enumerable: true, get: function () { return theme_1.XenitionNativeThemeProvider; } });
Object.defineProperty(exports, "useXenitionTheme", { enumerable: true, get: function () { return theme_1.useXenitionTheme; } });
var Button_1 = require("./Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
var Card_1 = require("./Card");
Object.defineProperty(exports, "Card", { enumerable: true, get: function () { return Card_1.Card; } });
var Stack_1 = require("./Stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return Stack_1.Stack; } });
var Input_1 = require("./Input");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return Input_1.Input; } });
var Eyebrow_1 = require("./Eyebrow");
Object.defineProperty(exports, "Eyebrow", { enumerable: true, get: function () { return Eyebrow_1.Eyebrow; } });
var StatusDot_1 = require("./StatusDot");
Object.defineProperty(exports, "StatusDot", { enumerable: true, get: function () { return StatusDot_1.StatusDot; } });
var GlassPanel_1 = require("./GlassPanel");
Object.defineProperty(exports, "GlassPanel", { enumerable: true, get: function () { return GlassPanel_1.GlassPanel; } });
var GradientText_1 = require("./GradientText");
Object.defineProperty(exports, "GradientText", { enumerable: true, get: function () { return GradientText_1.GradientText; } });
var useReducedMotion_1 = require("./internal/useReducedMotion");
Object.defineProperty(exports, "useReducedMotion", { enumerable: true, get: function () { return useReducedMotion_1.useReducedMotion; } });
// PriceTag, EmptyState, and the single `formatMoney` home live in the commerce
// module (matching the web `@xenition/ui/commerce`) and are re-exported here
// for primitive-level ergonomics.
var PriceTag_1 = require("../commerce/PriceTag");
Object.defineProperty(exports, "PriceTag", { enumerable: true, get: function () { return PriceTag_1.PriceTag; } });
var EmptyState_1 = require("../commerce/EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
var money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
//# sourceMappingURL=index.js.map