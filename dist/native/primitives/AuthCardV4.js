"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCardV4 = AuthCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthBrandTileV4_1 = require("./AuthBrandTileV4");
const AuthHeadingV4_1 = require("./AuthHeadingV4");
const CardV4_1 = require("./CardV4");
const TextV4_1 = require("./TextV4");
/*
  The column, as multiples of the spacing scale rather than a literal.

  `2xl × 8` is 384 at the default scale (the base's `maxWidth: 384`, exactly)
  and `2xl × 10` is 480 (`AuthHeadingV4`'s measure, exactly). The web twin
  spells the identical products out as Tailwind classes, and both twins' specs
  assert the arithmetic so the two cannot drift apart.
*/
const WIDTH_STEPS = { sm: 8, md: 10, full: null };
function AuthCardV4({ title, subtitle, children, footer, brandGlyph, brandIcon, align = 'left', titleSize = 'xl', variant = 'elevated', padding, width = 'sm', brandSize, brandShape, brandLabel, footerDivider = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const steps = WIDTH_STEPS[width];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            { width: '100%', alignSelf: 'center' },
            steps === null ? null : { maxWidth: tokens.spacing['2xl'] * steps },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: variant, padding: padding, 
            // §4's `lg` above and below the headline block — the outer half of the
            // rule whose inner half (`sm`) `AuthHeadingV4` already owns.
            style: { gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(AuthBrandTileV4_1.AuthBrandTileV4, { glyph: brandGlyph, name: brandIcon, align: align, size: brandSize, shape: brandShape, accessibilityLabel: brandLabel }), (0, jsx_runtime_1.jsx)(AuthHeadingV4_1.AuthHeadingV4, { title: title, subtitle: subtitle, align: align, size: titleSize, 
                    /*
                      The card is the column, so the heading must not cap a second time
                      inside it — a 480 measure inside a 384 card is a cap that never
                      binds, and inside a *centred* card it would add an `alignSelf` that
                      does nothing. When the card gives up its own cap (`width="full"`)
                      the heading's measure is the only thing left holding §4, so it comes
                      back on.
                    */
                    measure: width === 'full' }), children, footer != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                        { alignItems: 'center' },
                        // §5's hairline, and the `lg` under it so the rule sits centred
                        // in the same rhythm as everything else in the column.
                        footerDivider
                            ? {
                                borderTopWidth: 1,
                                borderTopColor: colors.border,
                                paddingTop: tokens.spacing.lg,
                            }
                            : null,
                    ], children: typeof footer === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: footer })) : (footer) })) : null] }) }));
}
//# sourceMappingURL=AuthCardV4.js.map