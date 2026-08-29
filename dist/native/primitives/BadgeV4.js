"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeV4 = BadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
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
/** How much accent the soft variant carries. Enough to read as a tone, not a fill. */
const SOFT_MIX = 0.14;
/**
 * **V4 badge** — same props as {@link Badge}, a different design line.
 *
 * The base badge is correct on one ground and only one: the page. `soft` tints
 * with 14% alpha, `outline` has no fill at all, and both label themselves with
 * a colour whose contrast was measured against `surface`. Drop either onto a
 * filled card, a glass panel, or artwork and the ground underneath changes the
 * fill, the label, or both — and the guarantee that made it readable was never
 * about that ground.
 *
 * So V4 badges **own their ground**:
 *
 * - `solid` fills with the tone and labels with its guaranteed on-pair.
 * - `soft` composites the same 14% tint into `surface` **opaquely**, so it is
 *   a real colour rather than a translucent one that borrows whatever is
 *   behind it.
 * - `outline` keeps its ring and paints `surface` behind it, so the label has
 *   the ground its contrast was measured against.
 *
 * Every label is then run through `ensureContrast` against the fill the badge
 * actually painted, so the promise is about this badge rather than about the
 * page it was designed on.
 *
 * Shape follows the seed rather than defaulting to a capsule: a count or a
 * status dot is round by nature and keeps `radius.full`, but a text tag takes
 * `radius.sm` — so a `sharp` brand gets square tags instead of the pills
 * `design.md` §8 lists among the tells of generic AI UI.
 */
function BadgeV4({ tone = 'neutral', variant = 'solid', size = 'md', dot = false, count, max = 99, style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const slots = TONE[tone];
    const accent = colors[slots.accent];
    const label = count !== undefined ? (count > max ? `${max}+` : String(count)) : children;
    let bg;
    let fg;
    let borderWidth = 0;
    let borderColor = 'transparent';
    if (variant === 'solid') {
        bg = colors[slots.solidBg];
        fg = colors[slots.solidFg];
    }
    else if (variant === 'soft') {
        // Opaque, not translucent: the badge decides its own colour instead of
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
    // Re-measured against the fill this badge painted, not against the page.
    fg = (0, color_1.ensureContrast)(fg, bg, compile_1.MIN_CONTRAST);
    const spacing = tokens.spacing;
    const height = size === 'sm' ? spacing.md + spacing.xs : spacing.lg;
    const padX = size === 'sm' ? spacing.sm : spacing.sm + spacing.xs;
    const dotSize = size === 'sm' ? spacing.sm * 0.75 : spacing.sm;
    // A count or a dot is round by nature; a word is a tag, and takes the
    // brand's own corner instead of defaulting to a capsule (§8).
    const pill = dot || count !== undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs,
                minHeight: height,
                minWidth: pill ? height : undefined,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                borderRadius: pill ? tokens.radius.full : tokens.radius.sm,
                paddingHorizontal: padX,
            },
            style,
        ], children: [dot ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: (0, color_1.ensureContrast)(accent, bg, 3),
                } })) : null, typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg,
                    fontSize: tokens.typography.scale.xs,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '600',
                }, children: label })) : (label)] }));
}
//# sourceMappingURL=BadgeV4.js.map