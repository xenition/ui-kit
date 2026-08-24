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
exports.Upload = Upload;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const NOOP_PICK = async () => [];
/**
 * Token-styled file dropzone — the native mirror of the web `Upload`. RN has no
 * drag-and-drop, so the "drop" affordance collapses to a `Pressable` that, on
 * press, awaits the app-injected `pickFiles` and forwards its result to
 * `onFiles`. Same `accept`/`multiple`/`label` prop names as the web version.
 * SDK-agnostic: no hardcoded picker module — the host supplies `pickFiles`.
 * No literal colors.
 */
function Upload({ onFiles, pickFiles = NOOP_PICK, accept, multiple = false, label = 'Tap to choose a file', invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [busy, setBusy] = React.useState(false);
    const handlePress = React.useCallback(async () => {
        if (disabled || busy)
            return;
        setBusy(true);
        try {
            const files = await pickFiles({ accept, multiple });
            if (files && files.length)
                onFiles?.(files);
        }
        finally {
            setBusy(false);
        }
    }, [disabled, busy, pickFiles, accept, multiple, onFiles]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: disabled || busy }, accessibilityLabel: accessibilityLabel, disabled: disabled || busy, onPress: handlePress, style: ({ pressed }) => [
            {
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs,
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: invalid ? colors.danger : pressed ? colors.primary : colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                padding: tokens.spacing.xl,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: colors.muted,
                fontSize: tokens.typography.scale.sm,
                textAlign: 'center',
            }, children: label })) : (label) }));
}
//# sourceMappingURL=Upload.js.map