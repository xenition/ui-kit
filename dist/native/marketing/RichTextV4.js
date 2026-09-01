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
exports.RichTextV4 = RichTextV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const RichText_1 = require("./RichText");
/**
 * RichText — **V4** "showcase" design (native mirror of the web V4). Beautiful
 * long-form typography for a trusted CMS `html` body: a strong heading hierarchy
 * (extra-bold h2/h3), a comfortable reading measure with generous leading, styled
 * list items and blockquotes. Uses the shared {@link parseRichText} reader (no
 * DOM), so the `html` contract is identical to the base; blockquotes gain a
 * soft-primary left rule and muted italic ink. Same props/behavior as
 * {@link RichTextProps}; token-only colors, no literals. For trusted,
 * seed-authored content only (it does not sanitise).
 */
function RichTextV4({ html, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const blocks = React.useMemo(() => (0, RichText_1.parseRichText)(html), [html]);
    // Body copy tracks the `base` type token; line height stays proportional so it
    // scales with Dynamic Type rather than being pinned to a literal px value.
    const bodySize = tokens.typography.scale.base;
    const bodyLine = Math.round(bodySize * 1.65);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: blocks.map((b, i) => {
            if (b.kind === 'heading') {
                const headingSize = b.level <= 2 ? tokens.typography.scale['3xl'] : tokens.typography.scale.xl;
                return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        fontSize: headingSize,
                        lineHeight: Math.round(headingSize * 1.2),
                        fontWeight: '800',
                        letterSpacing: -0.5,
                        color: colors.onSurface,
                        marginTop: i === 0 ? 0 : tokens.spacing.md,
                    }, children: b.text }, i));
            }
            if (b.kind === 'listitem') {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: bodySize, lineHeight: bodyLine, color: colors.primary, fontWeight: '700' }, children: '•' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, fontSize: bodySize, lineHeight: bodyLine, color: colors.onSurface }, children: b.text })] }, i));
            }
            if (b.kind === 'quote') {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderLeftWidth: 3,
                        borderLeftColor: (0, color_1.withAlpha)(colors.primary, 0.4),
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.04),
                        borderTopRightRadius: tokens.radius.md,
                        borderBottomRightRadius: tokens.radius.md,
                        paddingVertical: tokens.spacing.sm,
                        paddingLeft: tokens.spacing.md,
                        paddingRight: tokens.spacing.md,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: bodySize, lineHeight: bodyLine, fontStyle: 'italic', color: colors.onSurface }, children: b.text }) }, i));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: bodySize, lineHeight: bodyLine, color: colors.onSurface }, children: b.text }, i));
        }) }));
}
//# sourceMappingURL=RichTextV4.js.map