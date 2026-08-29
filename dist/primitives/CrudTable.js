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
exports.CrudTable = CrudTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const DataTable_1 = require("./DataTable");
const Modal_1 = require("./Modal");
const Form_1 = require("./Form");
const Field_1 = require("./Field");
const Input_1 = require("./Input");
const Textarea_1 = require("./Textarea");
const Select_1 = require("./Select");
const Button_1 = require("./Button");
const Alert_1 = require("./Alert");
const Popconfirm_1 = require("./Popconfirm");
const StatusMessage_1 = require("./StatusMessage");
/**
 * Full CRUD admin block in one component: a searchable/sortable/paginated
 * {@link DataTable} + a "New" button + a create/edit `Modal` form (built from
 * `fields`) + per-row Edit and delete-with-confirm. SDK-agnostic — wire
 * `onCreate/onUpdate/onDelete` to `@xenition/sdk` (or anything). Themed.
 */
function CrudTable({ title, columns, rows, fields, getId, onCreate, onUpdate, onDelete, toFormValues, loading = false, error = null, searchable = true, pageSize = 10, createLabel = 'New', }) {
    const [open, setOpen] = React.useState(false);
    const [editingId, setEditingId] = React.useState(null);
    const [values, setValues] = React.useState({});
    const [saving, setSaving] = React.useState(false);
    const [formError, setFormError] = React.useState(null);
    const emptyValues = () => Object.fromEntries(fields.map((f) => [f.name, '']));
    const rowToValues = (row) => toFormValues
        ? toFormValues(row)
        : Object.fromEntries(fields.map((f) => [f.name, String(row[f.name] ?? '')]));
    const openCreate = () => {
        setEditingId(null);
        setValues(emptyValues());
        setFormError(null);
        setOpen(true);
    };
    const openEdit = (row) => {
        setEditingId(getId(row));
        setValues(rowToValues(row));
        setFormError(null);
        setOpen(true);
    };
    const setField = (name, v) => setValues((s) => ({ ...s, [name]: v }));
    const submit = async (e) => {
        e.preventDefault();
        const missing = fields.find((f) => f.required && !(values[f.name] ?? '').trim());
        if (missing) {
            setFormError(`${missing.label} is required`);
            return;
        }
        setSaving(true);
        setFormError(null);
        try {
            if (editingId)
                await onUpdate(editingId, values);
            else
                await onCreate(values);
            setOpen(false);
        }
        catch (err) {
            setFormError(err instanceof Error ? err.message : 'Save failed');
        }
        finally {
            setSaving(false);
        }
    };
    const actionsCol = {
        key: '__actions',
        header: '',
        render: (row) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onClick: () => openEdit(row), children: "Edit" }), (0, jsx_runtime_1.jsx)(Popconfirm_1.Popconfirm, { trigger: 
                    // Kept in step with the native twin: same ghost button, same danger
                    // tone. The tone is what the native side already said with a red
                    // `<Text>` before it could use a Button at all.
                    (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", tone: "danger", children: "Delete" }), message: "Delete this item?", confirmLabel: "Delete", onConfirm: () => onDelete(getId(row)) })] })),
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [title != null && (0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: openCreate, children: createLabel })] }), error && (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: error }), loading ? ((0, jsx_runtime_1.jsx)(StatusMessage_1.StatusMessage, { state: "loading" })) : ((0, jsx_runtime_1.jsx)(DataTable_1.DataTable, { columns: [...columns, actionsCol], rows: rows, searchable: searchable, pageSize: pageSize, getRowKey: (r) => getId(r) })), (0, jsx_runtime_1.jsx)(Modal_1.Modal, { open: open, onClose: () => setOpen(false), title: editingId ? 'Edit' : createLabel, children: (0, jsx_runtime_1.jsxs)(Form_1.Form, { onSubmit: submit, children: [formError && (0, jsx_runtime_1.jsx)(Alert_1.Alert, { tone: "danger", children: formError }), fields.map((f) => ((0, jsx_runtime_1.jsx)(Field_1.Field, { label: f.label, required: f.required, children: f.type === 'textarea' ? ((0, jsx_runtime_1.jsx)(Textarea_1.Textarea, { value: values[f.name] ?? '', onChange: (e) => setField(f.name, e.target.value), placeholder: f.placeholder })) : f.type === 'select' ? ((0, jsx_runtime_1.jsxs)(Select_1.Select, { value: values[f.name] ?? '', onChange: (e) => setField(f.name, e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select\u2026" }), f.options?.map((o) => ((0, jsx_runtime_1.jsx)("option", { value: o.value, children: o.label }, o.value)))] })) : ((0, jsx_runtime_1.jsx)(Input_1.Input, { type: f.type === 'number' ? 'number' : 'text', value: values[f.name] ?? '', onChange: (e) => setField(f.name, e.target.value), placeholder: f.placeholder })) }, f.name))), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", disabled: saving, children: saving ? 'Saving…' : 'Save' })] })] }) })] }));
}
//# sourceMappingURL=CrudTable.js.map