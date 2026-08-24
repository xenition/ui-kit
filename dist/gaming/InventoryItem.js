"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItem = InventoryItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
const RARITY_LABEL = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
};
/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onClick(item)` inspects it (a real `<button>`).
 * Composes `Badge`, `Icon`. Token-only.
 */
function InventoryItem({ item, variant = 'tile', onClick, className, }) {
    const row = variant === 'row';
    const slot = (0, types_1.rarityColorKey)(item.rarity);
    // `Icon` has no `accent` color slot (unlike the text/border tokens); fall back
    // to `primary` for the epic glyph so the color still traces to a token.
    const iconColor = slot === 'accent' ? 'primary' : slot;
    const rarityLabel = item.rarity ? RARITY_LABEL[item.rarity] : undefined;
    const art = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border-2 bg-neutral-100', types_1.RARITY_BORDER_CLASS[slot], row ? 'h-12 w-12' : 'h-16 w-16'), children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: item.imageUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: item.glyph ?? '🎁', size: "xl", color: iconColor })), item.quantity != null && item.quantity > 1 ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0.5 right-0.5", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: `×${item.quantity}` }) })) : null] }));
    const label = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5', row ? 'flex-1 items-start' : 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-surface', row ? 'text-left' : 'text-center'), children: item.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [rarityLabel ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', types_1.RARITY_TEXT_CLASS[slot]), children: rarityLabel })) : null, item.equipped ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Equipped" }) : null] })] }));
    const inner = row ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [art, label] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [art, label] }));
    const a11y = `${item.name}${rarityLabel ? `, ${rarityLabel}` : ''}${item.equipped ? ', equipped' : ''}`;
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { className: className, "aria-label": a11y, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": a11y, "aria-pressed": item.equipped || undefined, onClick: () => onClick(item), className: (0, cn_1.cn)('block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), children: inner }));
}
//# sourceMappingURL=InventoryItem.js.map