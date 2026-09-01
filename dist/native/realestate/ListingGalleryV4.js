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
exports.ListingGalleryV4 = ListingGalleryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const listing_1 = require("./internal/listing");
const GradientSurface_1 = require("./internal/GradientSurface");
/**
 * ListingGallery — **V4** "listing" design. The image-forward, editorial take on
 * a listing gallery: a big rounded hero photo (a horizontally paged `ScrollView`)
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, and a rounded thumbnail strip that also drives the active index. The
 * active page is derived from the scroll offset (works uncontrolled, or drive it
 * with `index`). Data only: URIs in, an `onIndexChange` callback out; nothing
 * fetches. On an empty `images` array it renders the shared `EmptyState`.
 * Token-only colors via `useXenitionTheme()` (+ the listing scrim helpers).
 */
function ListingGalleryV4({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [internal, setInternal] = React.useState(0);
    const scrollRef = React.useRef(null);
    const widthRef = React.useRef(0);
    const active = index ?? internal;
    if (images.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Photos will appear here once uploaded.", style: style });
    }
    const go = (next) => {
        const clamped = Math.min(Math.max(next, 0), images.length - 1);
        if (widthRef.current > 0) {
            scrollRef.current?.scrollTo({ x: clamped * widthRef.current, animated: true });
        }
        if (clamped !== active) {
            setInternal(clamped);
            onIndexChange?.(clamped);
        }
    };
    const handleScroll = (e) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent;
        const pageWidth = layoutMeasurement.width || 1;
        widthRef.current = layoutMeasurement.width;
        const next = Math.min(Math.max(Math.round(contentOffset.x / pageWidth), 0), images.length - 1);
        if (next !== active) {
            setInternal(next);
            onIndexChange?.(next);
        }
    };
    const current = Math.min(active, images.length - 1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: `Listing photo ${current + 1} of ${images.length}`, style: {
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 3,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { ref: scrollRef, testID: "xen-re-gallery-scroll", horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, onScroll: handleScroll, onLayout: (e) => {
                            widthRef.current = e.nativeEvent.layout.width;
                        }, scrollEventThrottle: 16, style: { height }, children: images.map((uri, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, style: { height, aspectRatio: 3 / 2 }, resizeMode: "cover", accessibilityLabel: `Photo ${i + 1}` }, `${uri}-${i}`))) }), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, listing_1.listingScrim)(tokens.ramps), start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: height / 2 } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: tokens.spacing.sm, left: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, listing_1.listingInk)(tokens.ramps), fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${current + 1} / ${images.length}` }) })] }), images.length > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: images.map((uri, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to photo ${i + 1}`, onPress: () => go(i), style: {
                        width: 80,
                        height: 56,
                        borderRadius: tokens.radius.md,
                        overflow: 'hidden',
                        borderWidth: i === current ? 2 : 1,
                        borderColor: i === current ? colors.primary : colors.border,
                        opacity: i === current ? 1 : 0.7,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }) }, `thumb-${uri}-${i}`))) })) : null] }));
}
//# sourceMappingURL=ListingGalleryV4.js.map