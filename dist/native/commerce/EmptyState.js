"use strict";
/**
 * `EmptyState` moved to `../primitives` — it is a primitive, not a commerce
 * concept: an empty cart is one of its cases, not its definition, and nearly
 * every screen in the kit renders one. This file stays behind as a re-export so
 * every `import { EmptyState } from '.../commerce/EmptyState'` already in the
 * wild keeps resolving. New code should import from `native/primitives`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = void 0;
var EmptyState_1 = require("../primitives/EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
//# sourceMappingURL=EmptyState.js.map