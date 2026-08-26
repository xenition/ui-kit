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
exports.CrudTableV4 = CrudTableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DataTableV4_1 = require("./DataTableV4");
const ModalV4_1 = require("./ModalV4");
const Form_1 = require("./Form");
const Field_1 = require("./Field");
const InputV4_1 = require("./InputV4");
const Textarea_1 = require("./Textarea");
const Select_1 = require("./Select");
const ButtonV4_1 = require("./ButtonV4");
const AlertV4_1 = require("./AlertV4");
const Popconfirm_1 = require("./Popconfirm");
const StatusMessage_1 = require("./StatusMessage");
/**
 * **V4 CRUD table** — same props as {@link CrudTable}, a different design line.
 *
 * A CRUD screen is the densest thing this kit ships: a table, a search box, a
 * pager, two buttons on every row, a header action and a modal form. §34 says
 * density should match the product and this product IS dense, so V4 does not
 * try to make it airy. It makes it **legible**, and it does that by taking
 * three things away and adding almost nothing.
 *
 * 1. **The row-actions column stops eating the table.** The base hands
 *    `__actions` the same `flex: 1` as Name and Amount, so a four-column table
 *    spends a quarter of its width on two ghost buttons while the data the
 *    reader came for gets squeezed. `DataTableV4` now sizes an unlabelled
 *    column of rendered controls to its contents — derived from the column
 *    definition, not from a new prop.
 * 2. **The whole screen is one design line.** `DataTableV4`, `ButtonV4`,
 *    `InputV4`, `ModalV4`, `AlertV4`. The base mixed a V1 table with V1
 *    buttons, which was consistent; what it could not do was stay consistent
 *    inside a V4 app. Nothing here re-styles a control locally — that is the
 *    drift V4 exists to stop.
 * 3. **The heading is typography, not a container.** `fontHeading` at `xl`
 *    against a `lg` gap. §10 asks for size, weight and spacing before a card,
 *    and a CRUD page that wraps its title in a panel is §8's "cards inside
 *    cards inside cards" starting at the top of the page.
 *
 * Two behavioural repairs the design line paid for:
 *
 * - **Deleting says what it costs.** "Delete this item? This cannot be
 *    undone." §26 asks that a destructive consequence be explained, and the
 *    base said only the first half.
 * - **Loading no longer collapses the page.** The base swapped the table for a
 *    one-line spinner, so the New button jumped up the screen and back. The V4
 *    loading state keeps a table-sized frame — §14, design states rather than
 *    screenshots.
 *
 * **No card wraps anything.** Not the header, not a row, not the form. The one
 * bordered container on the screen is the table itself, which is a single
 * object and earns it (§11).
 */
function CrudTableV4({ title, columns, rows, fields, getId, onCreate, onUpdate, onDelete, toFormValues, loading = false, error = null, searchable = true, pageSize = 10, createLabel = 'New', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
    const submit = async () => {
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
        // No header and a rendered cell: `DataTableV4` reads that as a control
        // column and gives it the width its buttons need, not a data column's
        // share.
        header: '',
        render: (row) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "ghost", onPress: () => openEdit(row), children: "Edit" }), (0, jsx_runtime_1.jsx)(Popconfirm_1.Popconfirm, { trigger: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "ghost", tone: "danger", children: "Delete" }), 
                    // §26 — a destructive action states its consequence, not just its
                    // name. The base stopped after the question.
                    message: "Delete this item? This cannot be undone.", confirmLabel: "Delete", onConfirm: () => onDelete(getId(row)) })] })),
    };
    // A table-sized frame while the rows are in flight, so the header action
    // does not jump up the screen and back (§14).
    const loadingHeight = (tokens.spacing.xl + tokens.spacing.xs) * 4;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            // Typography before containers (§10): the page title is a size
                            // and a weight, not a panel.
                            fontFamily: tokens.typography.fontHeading,
                            fontSize: tokens.typography.scale.xl,
                            fontWeight: '700',
                            color: colors.onSurface,
                        }, children: title })) : (title)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { onPress: openCreate, children: createLabel })] }), error ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: error }) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minHeight: loadingHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                }, children: (0, jsx_runtime_1.jsx)(StatusMessage_1.StatusMessage, { state: "loading" }) })) : ((0, jsx_runtime_1.jsx)(DataTableV4_1.DataTableV4, { columns: [...columns, actionsCol], rows: rows, searchable: searchable, pageSize: pageSize, getRowKey: (r) => getId(r) })), (0, jsx_runtime_1.jsx)(ModalV4_1.ModalV4, { open: open, onClose: () => setOpen(false), title: editingId ? 'Edit' : createLabel, children: (0, jsx_runtime_1.jsxs)(Form_1.Form, { children: [formError ? (0, jsx_runtime_1.jsx)(AlertV4_1.AlertV4, { tone: "danger", children: formError }) : null, fields.map((f) => ((0, jsx_runtime_1.jsx)(Field_1.Field, { label: f.label, required: f.required, children: f.type === 'textarea' ? ((0, jsx_runtime_1.jsx)(Textarea_1.Textarea, { value: values[f.name] ?? '', onChangeText: (t) => setField(f.name, t), placeholder: f.placeholder, accessibilityLabel: f.label })) : f.type === 'select' ? ((0, jsx_runtime_1.jsx)(Select_1.Select, { value: values[f.name] ?? '', onValueChange: (v) => setField(f.name, v), options: f.options ?? [], placeholder: f.placeholder ?? 'Select…', accessibilityLabel: f.label })) : ((0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { value: values[f.name] ?? '', onChangeText: (t) => setField(f.name, t), placeholder: f.placeholder, keyboardType: f.type === 'number' ? 'numeric' : 'default', accessibilityLabel: f.label })) }, f.name))), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", onPress: () => setOpen(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { onPress: submit, disabled: saving, loading: saving, children: saving ? 'Saving…' : 'Save' })] })] }) })] }));
}
//# sourceMappingURL=CrudTableV4.js.map