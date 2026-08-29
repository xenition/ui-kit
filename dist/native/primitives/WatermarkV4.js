"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatermarkV4 = WatermarkV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const identity_v4_1 = require("./internal/identity-v4");
/**
 * **V4 watermark** — same props as {@link Watermark}, a different design line.
 *
 * A watermark that competes with the content has failed, and the base one
 * competed in two ways at once: it was laid out by chance, and it was a
 * different strength in each colour scheme.
 *
 * 1. **A lattice, not a blob.** The base dropped `count` spans into a
 *    centre-justified `flexWrap` row. Where the rows broke depended on the
 *    container's width, the last row was always a short cluster in the middle,
 *    and `count` changed the size of the blob rather than the density of the
 *    field. V4 lays the same tiles out as explicit rows — a square-ish lattice
 *    derived from `count` — and offsets alternate rows by half a step, which is
 *    how a repeating mark is actually set. It reads as a texture at any
 *    container size instead of as a paragraph someone rotated.
 * 2. **One strength in both schemes.** The ink was `muted`, a MID tone whose
 *    distance from the page changes with the scheme, floated at 8%: the same
 *    number produced two different marks. V4 prints in `onSurface` — the only
 *    slot guaranteed to sit at the far end from the surface in either scheme —
 *    so a fixed alpha is a fixed *relative* strength.
 * 3. **The twins agree.** Native scaled the field by 1.4 and the web by 1.5,
 *    and the tile padding was `spacing.lg / spacing.md` against `px-6 py-3`
 *    (24/12). Both now read the same three constants.
 *
 * It still sits above the content rather than behind it — a confidentiality
 * mark that a dark screenshot can hide is not a confidentiality mark — and it
 * still takes no touches and is hidden from assistive tech, because it is a
 * property of the page and not something to read.
 */
function WatermarkV4({ text, children, count = 24, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spacing = tokens.spacing;
    const total = Math.max(1, count);
    // A square-ish lattice: `count` becomes a density, not the size of a blob.
    const cols = Math.max(1, Math.ceil(Math.sqrt(total)));
    const rows = [];
    for (let i = 0; i < total; i += cols) {
        rows.push(Array.from({ length: Math.min(cols, total - i) }, (_, j) => i + j));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ position: 'relative', overflow: 'hidden' }, style], children: [children, (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    react_native_1.StyleSheet.absoluteFillObject,
                    {
                        justifyContent: 'center',
                        opacity: identity_v4_1.WATERMARK_ALPHA,
                        transform: [{ rotate: `${identity_v4_1.WATERMARK_TILT}deg` }, { scale: identity_v4_1.WATERMARK_SCALE }],
                    },
                ], children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // Half a step across on every other row — a brick course, which
                        // is what stops a lattice reading as a table.
                        marginLeft: r % 2 === 0 ? 0 : spacing['2xl'],
                    }, children: row.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontFamily: tokens.typography.fontBody,
                            fontWeight: '700',
                            paddingHorizontal: spacing.lg,
                            paddingVertical: spacing.md,
                        }, children: text }, i))) }, r))) })] }));
}
//# sourceMappingURL=WatermarkV4.js.map