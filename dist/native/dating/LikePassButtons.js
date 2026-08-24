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
exports.LikePassButtons = LikePassButtons;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const SPEC = {
    rewind: { glyph: '↺', label: 'Rewind', slot: 'warn', emphasis: 'ghost' },
    pass: { glyph: '✕', label: 'Pass', slot: 'danger', emphasis: 'ghost' },
    superlike: { glyph: '★', label: 'Super like', slot: 'accent', emphasis: 'ghost' },
    like: { glyph: '♥', label: 'Like', slot: 'success', emphasis: 'ghost' },
    boost: { glyph: '⚡', label: 'Boost', slot: 'primary', emphasis: 'ghost' },
};
const DIAMETER = { sm: 44, md: 56, lg: 68 };
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
/**
 * The circular action row under a swipe deck — the native like/pass controls.
 * Each action is a round, token-tinted button with a glyph AND an
 * `accessibilityLabel`, so it is never identified by color alone. `onAction`
 * reports which control was pressed. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors.
 */
function LikePassButtons({ actions = DEFAULT_ACTIONS, onAction, disabledActions, size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "toolbar", style: [{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, style], children: list.map((action) => {
            const spec = SPEC[action];
            const color = colors[spec.slot];
            const d = DIAMETER[size];
            const disabled = disabledSet.has(action);
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spec.label, accessibilityState: { disabled }, disabled: disabled, onPress: () => onAction?.(action), style: ({ pressed }) => ({
                    width: d,
                    height: d,
                    borderRadius: d / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(color, 0.12),
                    borderWidth: 1,
                    borderColor: (0, color_1.withAlpha)(color, 0.5),
                    opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color, fontSize: Math.round(d * 0.42), fontWeight: '700' }, allowFontScaling: false, children: spec.glyph }) }, action));
        }) }));
}
//# sourceMappingURL=LikePassButtons.js.map