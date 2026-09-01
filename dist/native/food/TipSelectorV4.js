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
exports.TipSelectorV4 = TipSelectorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const commerce_1 = require("../commerce");
const menu_v4_1 = require("./internal/menu-v4");
const DEFAULT_PERCENTS = [10, 15, 20, 25];
/**
 * **V4 tip selector** — same props as {@link TipSelector} plus `noTipLabel`
 * and `defaultSelectedPercent`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** `selectedPercent` was optional, the component
 *    held no state, and `selected` was recomputed from props on every render —
 *    so dropped in the way its own barrel documents it rendered "No tip"
 *    filled and `checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. `defaultSelectedPercent` gives the choice
 *    somewhere to live; passing `selectedPercent` still drives it from outside.
 * 2. **An option clears 44.** They were about 34 tall.
 * 3. **The computed amount is tabular**, so four options in a row have their
 *    figures on one grid instead of four.
 * 4. **Press is a state layer.** `opacity: 0.85` on press put a live control
 *    inside the band M3 spends on *disabled*, so tapping a tip option made it
 *    look unavailable for as long as the finger was down.
 */
function TipSelectorV4({ percents = DEFAULT_PERCENTS, selectedPercent, defaultSelectedPercent = null, onSelect, subtotalCents, currency = 'USD', title = 'Add a tip', allowNone = true, noTipLabel = 'No tip', formatMoney = commerce_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // Controlled the moment the caller names a value — `null` is a value here
    // ("no tip"), so `undefined` is the only signal that means "you hold it".
    const controlled = selectedPercent !== undefined;
    const [held, setHeld] = React.useState(defaultSelectedPercent);
    const current = controlled ? (selectedPercent ?? null) : held;
    const choices = [
        ...(allowNone ? [{ key: 'none', percent: null, label: noTipLabel }] : []),
        ...percents.map((p) => ({ key: String(p), percent: p, label: `${p}%` })),
    ];
    const choose = (percent) => {
        if (!controlled)
            setHeld(percent);
        onSelect?.(percent);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "semibold", tone: "onSurface", children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: choices.map((choice) => {
                    const selected = choice.percent === null ? current === null : current === choice.percent;
                    const amount = choice.percent !== null && typeof subtotalCents === 'number'
                        ? Math.round((subtotalCents * choice.percent) / 100)
                        : null;
                    const amountText = amount !== null ? formatMoney(amount, currency) : null;
                    const ground = selected ? colors.primary : colors.card;
                    const ink = selected ? (0, menu_v4_1.onPair)(theme, 'primary') : colors.onCard;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, checked: selected }, accessibilityLabel: (0, menu_v4_1.spokenLine)([choice.label, amountText]), onPress: () => choose(choice.percent), style: ({ pressed }) => ({
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xs / 2,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
                        }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", style: { color: ink }, children: choice.label }), amountText != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", numeric: "tabular", style: { color: selected ? ink : colors.mutedText }, children: amountText })) : null] }, choice.key));
                }) })] }));
}
//# sourceMappingURL=TipSelectorV4.js.map