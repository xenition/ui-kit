"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const META = {
    vegetarian: { label: 'Vegetarian', glyph: '🥬', tone: 'success' },
    vegan: { label: 'Vegan', glyph: '🌱', tone: 'success' },
    'gluten-free': { label: 'Gluten-free', glyph: '🌾', tone: 'neutral' },
    spicy: { label: 'Spicy', glyph: '🌶️', tone: 'danger' },
    halal: { label: 'Halal', glyph: '☪️', tone: 'neutral' },
    popular: { label: 'Popular', glyph: '🔥', tone: 'warn' },
    new: { label: 'New', glyph: '✨', tone: 'primary' },
    calories: { label: 'Calories', glyph: '🔢', tone: 'neutral' },
};
/**
 * A small dietary / nutrition tag — a `Badge` preset for common dish
 * attributes (vegetarian, vegan, spicy, halal, popular, …). Each `kind` maps
 * to a default label, glyph, and semantic tone, all overridable. Because the
 * badge carries a glyph *and* a text label, the attribute never relies on color
 * alone. The web `Badge` sets the on-tone text color via its tone class, so the
 * label just inherits it. Web parity of the native `NutritionBadge`; token-only.
 */
exports.NutritionBadge = React.forwardRef(function NutritionBadge({ kind, label, tone, hideGlyph = false, className }, ref) {
    const meta = META[kind];
    const text = label ?? meta.label;
    const resolvedTone = tone ?? meta.tone;
    return ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { ref: ref, tone: resolvedTone, className: className, children: [!hideGlyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs" }) : null, text] }));
});
//# sourceMappingURL=NutritionBadge.js.map