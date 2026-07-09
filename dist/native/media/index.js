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
exports.MediaFigure = exports.Lightbox = exports.Gallery = void 0;
var Gallery_1 = require("./Gallery");
Object.defineProperty(exports, "Gallery", { enumerable: true, get: function () { return Gallery_1.Gallery; } });
var Lightbox_1 = require("./Lightbox");
Object.defineProperty(exports, "Lightbox", { enumerable: true, get: function () { return Lightbox_1.Lightbox; } });
var MediaFigure_1 = require("./MediaFigure");
Object.defineProperty(exports, "MediaFigure", { enumerable: true, get: function () { return MediaFigure_1.MediaFigure; } });
//# sourceMappingURL=index.js.map