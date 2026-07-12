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
exports.AnnouncementBar = AnnouncementBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Compact dismissible top banner — the native mirror of the web
 * `AnnouncementBar`. A message with an optional trailing link (`href` →
 * `onPress`) and a dismiss control; dismissal is session state only. Token-only.
 */
function AnnouncementBar({ message, action, actionLabel, onPress, tone = 'primary', dismissible = true, closeLabel = 'Dismiss announcement', onDismiss, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [dismissed, setDismissed] = React.useState(false);
    if (dismissed)
        return null;
    // `neutral` is a bordered light band; `primary`/`accent` are filled bands.
    const bg = tone === 'accent'
        ? colors.accent
        : tone === 'neutral'
            ? tokens.ramps.neutral[100]
            : colors.primary;
    const fg = tone === 'neutral' ? colors.onSurface : colors.onPrimary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-announcement-bar", accessibilityRole: "summary", accessibilityLabel: "Announcement", style: [
            {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                paddingVertical: tokens.spacing.sm,
                backgroundColor: bg,
                ...(tone === 'neutral'
                    ? { borderBottomWidth: 1, borderBottomColor: colors.border }
                    : null),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexShrink: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.sm,
                }, children: [typeof message === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: fg,
                            fontSize: tokens.typography.scale.sm,
                            textAlign: 'center',
                        }, children: message })) : (message), actionLabel !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", onPress: onPress, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: fg,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                                textDecorationLine: 'underline',
                            }, children: actionLabel }) })) : action !== undefined ? (action) : null] }), dismissible ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: closeLabel, hitSlop: 8, onPress: () => {
                    setDismissed(true);
                    onDismiss?.();
                }, style: {
                    marginLeft: 'auto',
                    height: 24,
                    width: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.lg,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=AnnouncementBar.js.map