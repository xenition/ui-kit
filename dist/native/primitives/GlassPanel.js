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
exports.GlassPanel = GlassPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const glass_1 = require("../../theme/glass");
/**
 * A translucent panel, built from the compiled `glass` tokens.
 *
 * ## There is no real blur here, and that is deliberate
 *
 * React Native has no `backdrop-filter`. A true frosted panel needs a host
 * `BlurView` (`expo-blur`, `@react-native-community/blur`), and a kit component
 * that mounted one would crash in every app that has not installed it.
 *
 * So the compiler pre-composites `glass.tint` against the scheme's surface: the
 * panel reads as glass with no blur at all, and an app that HAS a blur view can
 * wrap this one and pass the blur radius the token already carries:
 *
 * ```tsx
 * const { glass } = useXenitionTheme();
 * <BlurView intensity={glass.blur}>
 *   <GlassPanel>…</GlassPanel>
 * </BlurView>
 * ```
 *
 * That is the honest trade. A blurred backdrop is nicer; a panel that only
 * works in some apps is not a design-system component.
 *
 * ## Legibility
 *
 * A panel over unknown artwork is where text quietly stops being readable, so
 * the alpha is not a taste knob. `theme/glass-legibility.spec.ts` composites
 * the tint over pure black and pure white — the extremes any real image sits
 * between — and measures `onSurface` against the result. The compiler's tint
 * clears WCAG AA with roughly 5.6:1 at worst, and loses that margin once it is
 * thinned by 12%. `intensity` therefore starts at the token and can only get
 * more opaque.
 *
 * The corollary: put `onSurface` on a glass panel, not `muted`. `muted` carries
 * no contrast promise even on an opaque surface and measurably fails on glass.
 *
 * ## §8
 *
 * `design.md` bans "glassmorphism without purpose". This component is the
 * purpose-built exception, not a default background — it earns its place when
 * something is genuinely layered over something else. It is reached for by the
 * V4 surfaces only when the seed asks for `depth: 'glass'`.
 */
function GlassPanel({ intensity = 'regular', bordered = true, style, children, ...rest }) {
    const { colors, glass, tokens } = (0, theme_1.useXenitionTheme)();
    const composed = React.useMemo(() => (0, glass_1.composeGlass)(glass, colors.surface, intensity), [glass, colors.surface, intensity]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: composed.backgroundColor,
                borderRadius: tokens.radius.lg,
                ...(bordered ? { borderWidth: 1, borderColor: composed.borderColor } : null),
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=GlassPanel.js.map