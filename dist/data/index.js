"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = exports.FRIENDLY_ERROR = exports.useResource = void 0;
/**
 * `@xenition/ui/data` — the React half of the moved template data layer.
 *
 * A tiny, unstyled loading/error/empty layer that pairs with
 * `@xenition/sdk/client` (the browser data client): the SDK fetches + types,
 * this hook tracks the request lifecycle and collapses failures to a friendly
 * message. Together a template renders SDK data with zero hand-rolled
 * fetch/hook/state code.
 */
var use_resource_1 = require("./use-resource");
Object.defineProperty(exports, "useResource", { enumerable: true, get: function () { return use_resource_1.useResource; } });
Object.defineProperty(exports, "FRIENDLY_ERROR", { enumerable: true, get: function () { return use_resource_1.FRIENDLY_ERROR; } });
var Resource_1 = require("./Resource");
Object.defineProperty(exports, "Resource", { enumerable: true, get: function () { return Resource_1.Resource; } });
//# sourceMappingURL=index.js.map