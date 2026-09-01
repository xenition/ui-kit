"use strict";
/**
 * `@xenition/ui/native/media` — presentational gallery / lightbox components for
 * React Native, mirroring the web `@xenition/ui/media` prop contracts exactly.
 * An album `{title}` and items `{url,kind,caption,alt,width,height}`. Nothing
 * fetches — the app passes shaped data — and everything is styled via compiled
 * theme tokens (`useXenitionTheme()`). `Gallery` is `FlatList`-backed (windowing
 * gives the web's lazy loading); `Lightbox` is a reduced-motion-safe RN `Modal`
 * with `PanResponder` swipe (RN core — no extra gesture dependency). Event
 * idioms are native (`onOpen`/`onActivate`/`onClose`/`onPrev`/`onNext`).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxV4 = exports.GalleryV4 = exports.MediaFigureV4 = exports.MediaFigure = exports.Lightbox = exports.Gallery = void 0;
var Gallery_1 = require("./Gallery");
Object.defineProperty(exports, "Gallery", { enumerable: true, get: function () { return Gallery_1.Gallery; } });
var Lightbox_1 = require("./Lightbox");
Object.defineProperty(exports, "Lightbox", { enumerable: true, get: function () { return Lightbox_1.Lightbox; } });
var MediaFigure_1 = require("./MediaFigure");
Object.defineProperty(exports, "MediaFigure", { enumerable: true, get: function () { return MediaFigure_1.MediaFigure; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `VERTICALS-V4-BRIEF.md`. Each is a
// drop-in for its base — same props plus optional additions. The headline fix
// is that a `kind: 'video'` item is finally drawn as one.
var MediaFigureV4_1 = require("./MediaFigureV4");
Object.defineProperty(exports, "MediaFigureV4", { enumerable: true, get: function () { return MediaFigureV4_1.MediaFigureV4; } });
var GalleryV4_1 = require("./GalleryV4");
Object.defineProperty(exports, "GalleryV4", { enumerable: true, get: function () { return GalleryV4_1.GalleryV4; } });
var LightboxV4_1 = require("./LightboxV4");
Object.defineProperty(exports, "LightboxV4", { enumerable: true, get: function () { return LightboxV4_1.LightboxV4; } });
//# sourceMappingURL=index.js.map