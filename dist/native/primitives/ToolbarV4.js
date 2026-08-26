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
exports.ToolbarV4 = ToolbarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 toolbar** — same props as {@link Toolbar}, a different design line.
 *
 * ## A toolbar is not a pill
 *
 * §8 lists excessive pill-shaped controls among the tells of generic AI UI. A
 * `Segmented` thumb is a pill because the capsule IS that control; a toolbar is
 * a bar, and it keeps `radius.md` — the seed's own corner, 0 on a `sharp`
 * brand. Nothing inside it is capsuled either.
 *
 * ## Actions that are legible as actions
 *
 * The base painted every action with `colors.primary` — a FILL slot with no
 * contrast promise as text, so on a light-primary seed the toolbar's controls
 * were the least readable thing in it. V4 uses `primaryText`, the same hue
 * walked until it clears AA on the surface, and `dangerText` for a destructive
 * one. That leaves exactly two colours in the bar: the actions, and the one
 * that will delete something — different, not louder (§32).
 *
 * A disabled action drops to `muted` AND loses half its opacity, so the state
 * survives a reader who cannot separate the two colours.
 *
 * ## Reach
 *
 * Every action and the `⋯` toggle are 44pt targets composed from the spacing
 * scale. The base gave them `spacing.sm` of padding around a 14pt label —
 * about 30pt, and the `⋯` was the smallest target in the kit (§30).
 *
 * ## The overflow panel is a menu
 *
 * So it is skinned like one: `elevation.sheet` and the shared `panelSkin`, the
 * same altitude as `MenuV4` and the V4 sheets, because a kit where an overflow
 * menu and a dropdown menu look different has two answers to one question.
 * Glass applies only at `depth: 'glass'`; elevation is consumed
 * unconditionally, so a flat seed lands flat with no branch here.
 */
function ToolbarV4({ title, actions = [], overflowActions = [], style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [overflowOpen, setOverflowOpen] = React.useState(false);
    const renderAction = (action, inPanel) => {
        const disabled = action.disabled === true;
        // `primaryText` / `dangerText`, never the FILL slots: these are words on a
        // surface, and only the text forms carry a contrast promise there.
        const color = disabled
            ? colors.mutedText
            : action.destructive === true
                ? colors.dangerText
                : colors.primaryText;
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled }, disabled: disabled, onPress: () => {
                setOverflowOpen(false);
                action.onPress?.();
            }, style: ({ pressed }) => ({
                minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                justifyContent: 'center',
                alignItems: inPanel ? 'flex-start' : 'center',
                alignSelf: inPanel ? 'stretch' : undefined,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.sm,
                opacity: disabled ? theme.state.disabledContent : 1,
                backgroundColor: pressed && !disabled ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
            }), children: typeof action.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color,
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '600',
                }, children: action.label })) : (action.label) }, action.key));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "toolbar", style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.border,
                    // A bar, not a capsule (§8).
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontFamily: tokens.typography.fontHeading,
                            fontWeight: '600',
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: title }))) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), actions.map((action) => renderAction(action, false)), overflowActions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More actions", accessibilityState: { expanded: overflowOpen }, onPress: () => setOverflowOpen((o) => !o), style: ({ pressed }) => ({
                            minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                            minWidth: (0, nav_v4_1.minTap)(tokens.spacing),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '700',
                            }, children: "\u22EF" }) })) : null] }), overflowOpen && overflowActions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: [
                    {
                        marginTop: tokens.spacing.xs,
                        borderRadius: tokens.radius.md,
                        overflow: 'hidden',
                        paddingVertical: tokens.spacing.xs,
                    },
                    (0, surface_v4_1.panelSkin)(theme),
                    (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                ], children: overflowActions.map((action) => renderAction(action, true)) })) : null] }));
}
//# sourceMappingURL=ToolbarV4.js.map