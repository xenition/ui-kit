"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = Resource;
const jsx_runtime_1 = require("react/jsx-runtime");
function defaultIsEmpty(data) {
    if (data === null || data === undefined)
        return true;
    if (Array.isArray(data))
        return data.length === 0;
    return false;
}
/**
 * Headless, unstyled branching for the loading / error / empty / ready states
 * of a {@link useResource} result — so pages express just the happy path and
 * pass their own kit-composed fallbacks. It renders NOTHING of its own; every
 * branch is a prop.
 *
 *   <Resource state={posts} loading={<Spinner />} error={(m) => <Notice>{m}</Notice>} empty={<Empty />}>
 *     {(rows) => rows.map((p) => <PostCard key={p.id} post={p} />)}
 *   </Resource>
 */
function Resource({ state, loading = null, error, empty = null, children, isEmpty = defaultIsEmpty, }) {
    if (state.loading)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading });
    if (state.error !== null)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: error ? error(state.error) : null });
    if (state.data === null || isEmpty(state.data))
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: empty });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children(state.data) });
}
//# sourceMappingURL=Resource.js.map