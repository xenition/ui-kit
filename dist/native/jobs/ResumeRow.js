"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRow = ResumeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const format_1 = require("./format");
/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
function ResumeRow({ resume, onPress, onDownload, onSetDefault, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = [(0, format_1.formatRelative)(resume.updatedAt), resume.sizeLabel].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${resume.name}${resume.isDefault ? ', default résumé' : ''}`, disabled: !onPress, onPress: onPress ? () => onPress(resume) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDCC4" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: resume.name }), resume.isDefault ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Default" }) : null] }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [!resume.isDefault && onSetDefault ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "sm", onPress: () => onSetDefault(resume), accessibilityLabel: `Set ${resume.name} as default`, children: "Set default" })) : null, onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${resume.name}`, onPress: () => onDownload(resume), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: colors.primary }, children: "\u2B07" }) })) : null] })] }));
}
//# sourceMappingURL=ResumeRow.js.map