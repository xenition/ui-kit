"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagV4 = TagV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const icon_names_1 = require("../../primitives/icon-names");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const TONE = {
    neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface', text: 'onSurface' },
    primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary', text: 'primaryText' },
    success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success', text: 'successText' },
    warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn', text: 'warnText' },
    danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger', text: 'dangerText' },
    accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent', text: 'accentText' },
};
/** How much accent the soft variant carries — enough to read as a tone, not a fill. */
const SOFT_MIX = 0.14;
/**
 * The platform minimum touch target. Not a design token: it is a property of
 * fingers, and it does not move when the seed does.
 */
const MIN_TAP = 44;
/**
 * **V4 tag** — same props as {@link Tag}, a different design line.
 *
 * A tag is the badge's interactive sibling — a filter you can drop, a keyword
 * you can take off — and it inherits the badge's ground problem plus one of
 * its own.
 *
 * **The ground.** `soft` tinted at 14% *alpha*, so it was a different colour on
 * the page, on a filled card and on glass, while its label carried a contrast
 * guarantee measured against exactly one of the three. `outline` had no fill at
 * all. V4 tags own their ground the way `BadgeV4` does: `soft` composites the
 * same tint into `surface` **opaquely**, `outline` paints `surface` behind its
 * ring, and every label is re-run through `ensureContrast` against the fill the
 * tag actually painted.
 *
 * **The target.** The remove affordance was a 12px `×` with 8px of hit slop —
 * about 28px square, well under the 44px a finger needs, on a control whose
 * entire purpose is to be tapped. V4 keeps the glyph exactly as small (a chip
 * that grows to 44px is not a chip any more) and grows only the *touch* area,
 * so the tag looks identical and stops being a miss.
 *
 * The corner stays `radius.sm` — the brand's own. A tag is a word, and §8 lists
 * excessive pill-shaped controls among the tells of generic AI UI; a `sharp`
 * seed gets square tags rather than capsules. The remove glyph comes from the
 * kit's named icon set (`close`), so it cannot drift from the `×` on the next
 * screen.
 */
function TagV4({ tone = 'neutral', variant = 'solid', size = 'md', removable = false, dot = false, onRemove, style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spacing = tokens.spacing;
    const slots = TONE[tone];
    const accent = colors[slots.accent];
    let bg;
    let fg;
    let borderWidth = 0;
    let borderColor = 'transparent';
    if (variant === 'solid') {
        bg = colors[slots.solidBg];
        fg = colors[slots.solidFg];
    }
    else if (variant === 'soft') {
        // Opaque, not translucent: the tag decides its own colour instead of
        // inheriting one from whatever it happens to be sitting on.
        bg = (0, v4_depth_1.mixToken)(colors.surface, accent, SOFT_MIX);
        fg = colors[slots.text];
    }
    else {
        bg = colors.surface;
        fg = colors[slots.text];
        borderWidth = 1;
        // A border is a UI boundary judged at 3:1, not text — it keeps the accent.
        borderColor = accent;
    }
    // Re-measured against the fill this tag painted, not against the page.
    fg = (0, color_1.ensureContrast)(fg, bg, compile_1.MIN_CONTRAST);
    // The same rhythm as `BadgeV4`: a tag and a badge sitting in one row are the
    // same object at different levels of interactivity, and should line up.
    const height = size === 'sm' ? spacing.md + spacing.xs : spacing.lg;
    const padX = size === 'sm' ? spacing.sm : spacing.sm + spacing.xs;
    const dotSize = size === 'sm' ? spacing.sm * 0.75 : spacing.sm;
    const showRemove = removable || onRemove != null;
    const glyphBox = spacing.md;
    // Grow the touch area, never the chip: a 44px tag is not a tag.
    const slop = Math.max(0, Math.round((MIN_TAP - glyphBox) / 2));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.xs,
                minHeight: height,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                // A tag is a word, not a capsule (§8).
                borderRadius: tokens.radius.sm,
                paddingHorizontal: padX,
            },
            style,
        ], children: [dot ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: (0, color_1.ensureContrast)(accent, bg, 3),
                } })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg,
                    fontSize: tokens.typography.scale.xs,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '600',
                }, children: children })) : (children), showRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Remove", onPress: onRemove, hitSlop: { top: slop, bottom: slop, left: slop, right: slop }, style: {
                    width: glyphBox,
                    height: glyphBox,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: fg,
                        fontSize: tokens.typography.scale.xs,
                        fontFamily: tokens.typography.fontBody,
                    }, children: (0, icon_names_1.resolveIconGlyph)('close') }) })) : null] }));
}
//# sourceMappingURL=TagV4.js.map