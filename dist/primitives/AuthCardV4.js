"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCardV4 = AuthCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const AuthBrandTileV4_1 = require("./AuthBrandTileV4");
const AuthHeadingV4_1 = require("./AuthHeadingV4");
const CardV4_1 = require("./CardV4");
const TextV4_1 = require("./TextV4");
/*
  The column, composed from the spacing scale rather than picked off Tailwind's
  size ramp.

  `2xl × 8` is 384 at the default scale (the base's `max-w-sm`, exactly) and
  `2xl × 10` is 480 (`AuthHeadingV4`'s measure, exactly). Written out as whole
  class strings because Tailwind's content scanner reads source text — an
  interpolated class never reaches the generated CSS. The native twin computes
  the identical products from `tokens.spacing`, and both twins' specs assert
  the arithmetic so the two cannot drift apart.
*/
const WIDTH_CLASS = {
    sm: 'max-w-[calc(var(--xen-space-2xl)*8)]',
    md: 'max-w-[calc(var(--xen-space-2xl)*10)]',
    full: null,
};
function AuthCardV4({ title, subtitle, children, footer, brandGlyph, brandIcon, align = 'left', titleSize = 'xl', variant = 'elevated', padding, width = 'sm', brandSize, brandShape, brandLabel, footerDivider = false, className, }) {
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-auth-card": "", "data-width": width, "data-align": align, className: (0, cn_1.cn)('mx-auto w-full', WIDTH_CLASS[width], className), children: (0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: variant, padding: padding, 
            // §4's `lg` above and below the headline block — the outer half of the
            // rule whose inner half (`sm`) `AuthHeadingV4` already owns.
            className: "flex flex-col gap-lg", children: [(0, jsx_runtime_1.jsx)(AuthBrandTileV4_1.AuthBrandTileV4, { glyph: brandGlyph, name: brandIcon, align: align, size: brandSize, shape: brandShape, "aria-label": brandLabel }), (0, jsx_runtime_1.jsx)(AuthHeadingV4_1.AuthHeadingV4, { title: title, subtitle: subtitle, align: align, size: titleSize, 
                    /*
                      The card is the column, so the heading must not cap a second time
                      inside it — a 480 measure inside a 384 card is a cap that never
                      binds, and inside a *centred* card it would add a `mx-auto` that
                      does nothing. When the card gives up its own cap (`width="full"`)
                      the heading's measure is the only thing left holding §4, so it comes
                      back on.
                    */
                    measure: width === 'full' }), children, footer != null ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-auth-footer": "", className: (0, cn_1.cn)('text-center', 
                    // §5's hairline, and the `lg` under it so the rule sits centred
                    // in the same rhythm as everything else in the column.
                    footerDivider && 'border-t border-border pt-lg'), children: typeof footer === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: footer })) : (footer) })) : null] }) }));
}
//# sourceMappingURL=AuthCardV4.js.map