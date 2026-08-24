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
exports.Upload = Upload;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Click-or-drop file dropzone bound to the theme tokens. Pairs with `@xenition/sdk` storage. */
function Upload({ onFiles, accept, multiple, label = 'Drag files here or click to browse', className, }) {
    const inputRef = React.useRef(null);
    const [drag, setDrag] = React.useState(false);
    const handle = (list) => {
        if (list && list.length)
            onFiles(Array.from(list));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { role: "button", tabIndex: 0, onClick: () => inputRef.current?.click(), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ')
                inputRef.current?.click();
        }, onDragOver: (e) => {
            e.preventDefault();
            setDrag(true);
        }, onDragLeave: () => setDrag(false), onDrop: (e) => {
            e.preventDefault();
            setDrag(false);
            handle(e.dataTransfer.files);
        }, className: (0, cn_1.cn)('flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--xen-radius-md)] border-2 border-dashed p-6 text-center transition-colors', drag ? 'border-primary bg-primary-50' : 'border-border bg-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, type: "file", accept: accept, multiple: multiple, className: "hidden", onChange: (e) => handle(e.target.files) })] }));
}
//# sourceMappingURL=Upload.js.map