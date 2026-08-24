"use strict";
/**
 * `@xenition/ui/media` — presentational gallery / lightbox components.
 *
 * Props mirror the media module: an album `{title}` and items
 * `{url,kind,caption,alt,width,height}`. Nothing fetches — the app passes
 * shaped data — and everything is styled via the `--xen-*` tokens. Images are
 * lazy-loaded and reserve their aspect ratio from `width`/`height`; the
 * `Lightbox` is a focus-trapped, keyboard-driven, reduced-motion-safe dialog.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaFigure = exports.Lightbox = exports.Gallery = void 0;
var Gallery_1 = require("./Gallery");
Object.defineProperty(exports, "Gallery", { enumerable: true, get: function () { return Gallery_1.Gallery; } });
var Lightbox_1 = require("./Lightbox");
Object.defineProperty(exports, "Lightbox", { enumerable: true, get: function () { return Lightbox_1.Lightbox; } });
var MediaFigure_1 = require("./MediaFigure");
Object.defineProperty(exports, "MediaFigure", { enumerable: true, get: function () { return MediaFigure_1.MediaFigure; } });
//# sourceMappingURL=index.js.map