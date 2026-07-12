"use strict";
/**
 * `@xenition/ui/native/primitives` — themed React Native building blocks that
 * mirror the web `@xenition/ui/primitives` prop contracts (`onClick`→`onPress`
 * is the only idiomatic swap). Genuine RN components (View/Text/Pressable/
 * TextInput/Animated) styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no DOM.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Tooltip = exports.Popconfirm = exports.Accordion = exports.Menu = exports.Popover = exports.Drawer = exports.useToast = exports.ToastProvider = exports.Skeleton = exports.Progress = exports.Alert = exports.useForm = exports.Form = exports.PinInput = exports.NumberInput = exports.Slider = exports.RadioGroup = exports.formatMoney = exports.EmptyState = exports.PriceTag = exports.useReducedMotion = exports.GradientText = exports.GlassPanel = exports.StatusMessage = exports.Rating = exports.StatusDot = exports.Eyebrow = exports.Modal = exports.Table = exports.MessageList = exports.ChatBubble = exports.Tabs = exports.Spinner = exports.Switch = exports.Avatar = exports.Badge = exports.Field = exports.Label = exports.Select = exports.Checkbox = exports.Textarea = exports.Input = exports.Stack = exports.Card = exports.Wordmark = exports.Button = exports.useXenitionTheme = exports.XenitionNativeThemeProvider = exports.XenitionUIProvider = void 0;
exports.Upload = exports.DatePicker = exports.Combobox = exports.CrudTable = exports.DataTable = exports.Sidebar = exports.AppShell = exports.ForgotPasswordForm = exports.SignupForm = exports.LoginForm = exports.AuthCard = exports.Breadcrumb = exports.Steps = exports.Segmented = exports.AvatarGroup = exports.Descriptions = exports.Timeline = exports.Pagination = exports.List = void 0;
var XenitionUIProvider_1 = require("./XenitionUIProvider");
Object.defineProperty(exports, "XenitionUIProvider", { enumerable: true, get: function () { return XenitionUIProvider_1.XenitionUIProvider; } });
// Re-export the theme access hook so a mobile app can `useXenitionTheme()`
// straight from the primitives entry.
var theme_1 = require("../theme");
Object.defineProperty(exports, "XenitionNativeThemeProvider", { enumerable: true, get: function () { return theme_1.XenitionNativeThemeProvider; } });
Object.defineProperty(exports, "useXenitionTheme", { enumerable: true, get: function () { return theme_1.useXenitionTheme; } });
var Button_1 = require("./Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
var Wordmark_1 = require("./Wordmark");
Object.defineProperty(exports, "Wordmark", { enumerable: true, get: function () { return Wordmark_1.Wordmark; } });
var Card_1 = require("./Card");
Object.defineProperty(exports, "Card", { enumerable: true, get: function () { return Card_1.Card; } });
var Stack_1 = require("./Stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return Stack_1.Stack; } });
var Input_1 = require("./Input");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return Input_1.Input; } });
var Textarea_1 = require("./Textarea");
Object.defineProperty(exports, "Textarea", { enumerable: true, get: function () { return Textarea_1.Textarea; } });
var Checkbox_1 = require("./Checkbox");
Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return Checkbox_1.Checkbox; } });
var Select_1 = require("./Select");
Object.defineProperty(exports, "Select", { enumerable: true, get: function () { return Select_1.Select; } });
var Label_1 = require("./Label");
Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return Label_1.Label; } });
var Field_1 = require("./Field");
Object.defineProperty(exports, "Field", { enumerable: true, get: function () { return Field_1.Field; } });
var Badge_1 = require("./Badge");
Object.defineProperty(exports, "Badge", { enumerable: true, get: function () { return Badge_1.Badge; } });
var Avatar_1 = require("./Avatar");
Object.defineProperty(exports, "Avatar", { enumerable: true, get: function () { return Avatar_1.Avatar; } });
var Switch_1 = require("./Switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return Switch_1.Switch; } });
var Spinner_1 = require("./Spinner");
Object.defineProperty(exports, "Spinner", { enumerable: true, get: function () { return Spinner_1.Spinner; } });
var Tabs_1 = require("./Tabs");
Object.defineProperty(exports, "Tabs", { enumerable: true, get: function () { return Tabs_1.Tabs; } });
var ChatBubble_1 = require("./ChatBubble");
Object.defineProperty(exports, "ChatBubble", { enumerable: true, get: function () { return ChatBubble_1.ChatBubble; } });
var MessageList_1 = require("./MessageList");
Object.defineProperty(exports, "MessageList", { enumerable: true, get: function () { return MessageList_1.MessageList; } });
var Table_1 = require("./Table");
Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return Table_1.Table; } });
var Modal_1 = require("./Modal");
Object.defineProperty(exports, "Modal", { enumerable: true, get: function () { return Modal_1.Modal; } });
var Eyebrow_1 = require("./Eyebrow");
Object.defineProperty(exports, "Eyebrow", { enumerable: true, get: function () { return Eyebrow_1.Eyebrow; } });
var StatusDot_1 = require("./StatusDot");
Object.defineProperty(exports, "StatusDot", { enumerable: true, get: function () { return StatusDot_1.StatusDot; } });
var Rating_1 = require("./Rating");
Object.defineProperty(exports, "Rating", { enumerable: true, get: function () { return Rating_1.Rating; } });
var StatusMessage_1 = require("./StatusMessage");
Object.defineProperty(exports, "StatusMessage", { enumerable: true, get: function () { return StatusMessage_1.StatusMessage; } });
var GlassPanel_1 = require("./GlassPanel");
Object.defineProperty(exports, "GlassPanel", { enumerable: true, get: function () { return GlassPanel_1.GlassPanel; } });
var GradientText_1 = require("./GradientText");
Object.defineProperty(exports, "GradientText", { enumerable: true, get: function () { return GradientText_1.GradientText; } });
var useReducedMotion_1 = require("./internal/useReducedMotion");
Object.defineProperty(exports, "useReducedMotion", { enumerable: true, get: function () { return useReducedMotion_1.useReducedMotion; } });
// PriceTag, EmptyState, and the single `formatMoney` home live in the commerce
// module (matching the web `@xenition/ui/commerce`) and are re-exported here
// for primitive-level ergonomics.
var PriceTag_1 = require("../commerce/PriceTag");
Object.defineProperty(exports, "PriceTag", { enumerable: true, get: function () { return PriceTag_1.PriceTag; } });
var EmptyState_1 = require("../commerce/EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
var money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
// ── native parity: forms ──────────────────────────────────────────────
var RadioGroup_1 = require("./RadioGroup");
Object.defineProperty(exports, "RadioGroup", { enumerable: true, get: function () { return RadioGroup_1.RadioGroup; } });
var Slider_1 = require("./Slider");
Object.defineProperty(exports, "Slider", { enumerable: true, get: function () { return Slider_1.Slider; } });
var NumberInput_1 = require("./NumberInput");
Object.defineProperty(exports, "NumberInput", { enumerable: true, get: function () { return NumberInput_1.NumberInput; } });
var PinInput_1 = require("./PinInput");
Object.defineProperty(exports, "PinInput", { enumerable: true, get: function () { return PinInput_1.PinInput; } });
var Form_1 = require("./Form");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return Form_1.Form; } });
Object.defineProperty(exports, "useForm", { enumerable: true, get: function () { return Form_1.useForm; } });
// ── native parity: feedback ───────────────────────────────────────────
var Alert_1 = require("./Alert");
Object.defineProperty(exports, "Alert", { enumerable: true, get: function () { return Alert_1.Alert; } });
var Progress_1 = require("./Progress");
Object.defineProperty(exports, "Progress", { enumerable: true, get: function () { return Progress_1.Progress; } });
var Skeleton_1 = require("./Skeleton");
Object.defineProperty(exports, "Skeleton", { enumerable: true, get: function () { return Skeleton_1.Skeleton; } });
var Toast_1 = require("./Toast");
Object.defineProperty(exports, "ToastProvider", { enumerable: true, get: function () { return Toast_1.ToastProvider; } });
Object.defineProperty(exports, "useToast", { enumerable: true, get: function () { return Toast_1.useToast; } });
// ── native parity: overlays ───────────────────────────────────────────
var Drawer_1 = require("./Drawer");
Object.defineProperty(exports, "Drawer", { enumerable: true, get: function () { return Drawer_1.Drawer; } });
var Popover_1 = require("./Popover");
Object.defineProperty(exports, "Popover", { enumerable: true, get: function () { return Popover_1.Popover; } });
var Menu_1 = require("./Menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return Menu_1.Menu; } });
var Accordion_1 = require("./Accordion");
Object.defineProperty(exports, "Accordion", { enumerable: true, get: function () { return Accordion_1.Accordion; } });
var Popconfirm_1 = require("./Popconfirm");
Object.defineProperty(exports, "Popconfirm", { enumerable: true, get: function () { return Popconfirm_1.Popconfirm; } });
var Tooltip_1 = require("./Tooltip");
Object.defineProperty(exports, "Tooltip", { enumerable: true, get: function () { return Tooltip_1.Tooltip; } });
// ── native parity: data display ───────────────────────────────────────
var Tag_1 = require("./Tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return Tag_1.Tag; } });
var List_1 = require("./List");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return List_1.List; } });
var Pagination_1 = require("./Pagination");
Object.defineProperty(exports, "Pagination", { enumerable: true, get: function () { return Pagination_1.Pagination; } });
var Timeline_1 = require("./Timeline");
Object.defineProperty(exports, "Timeline", { enumerable: true, get: function () { return Timeline_1.Timeline; } });
var Descriptions_1 = require("./Descriptions");
Object.defineProperty(exports, "Descriptions", { enumerable: true, get: function () { return Descriptions_1.Descriptions; } });
var AvatarGroup_1 = require("./AvatarGroup");
Object.defineProperty(exports, "AvatarGroup", { enumerable: true, get: function () { return AvatarGroup_1.AvatarGroup; } });
var Segmented_1 = require("./Segmented");
Object.defineProperty(exports, "Segmented", { enumerable: true, get: function () { return Segmented_1.Segmented; } });
var Steps_1 = require("./Steps");
Object.defineProperty(exports, "Steps", { enumerable: true, get: function () { return Steps_1.Steps; } });
var Breadcrumb_1 = require("./Breadcrumb");
Object.defineProperty(exports, "Breadcrumb", { enumerable: true, get: function () { return Breadcrumb_1.Breadcrumb; } });
// ── native parity: composed auth ──────────────────────────────────────
var AuthCard_1 = require("./AuthCard");
Object.defineProperty(exports, "AuthCard", { enumerable: true, get: function () { return AuthCard_1.AuthCard; } });
var LoginForm_1 = require("./LoginForm");
Object.defineProperty(exports, "LoginForm", { enumerable: true, get: function () { return LoginForm_1.LoginForm; } });
var SignupForm_1 = require("./SignupForm");
Object.defineProperty(exports, "SignupForm", { enumerable: true, get: function () { return SignupForm_1.SignupForm; } });
var ForgotPasswordForm_1 = require("./ForgotPasswordForm");
Object.defineProperty(exports, "ForgotPasswordForm", { enumerable: true, get: function () { return ForgotPasswordForm_1.ForgotPasswordForm; } });
// ── app shell (dashboard layout) ──────────────────────────────────────
var AppShell_1 = require("./AppShell");
Object.defineProperty(exports, "AppShell", { enumerable: true, get: function () { return AppShell_1.AppShell; } });
var Sidebar_1 = require("./Sidebar");
Object.defineProperty(exports, "Sidebar", { enumerable: true, get: function () { return Sidebar_1.Sidebar; } });
// ── native parity: heavy data (tables + rich inputs) ──────────────────
var DataTable_1 = require("./DataTable");
Object.defineProperty(exports, "DataTable", { enumerable: true, get: function () { return DataTable_1.DataTable; } });
var CrudTable_1 = require("./CrudTable");
Object.defineProperty(exports, "CrudTable", { enumerable: true, get: function () { return CrudTable_1.CrudTable; } });
var Combobox_1 = require("./Combobox");
Object.defineProperty(exports, "Combobox", { enumerable: true, get: function () { return Combobox_1.Combobox; } });
var DatePicker_1 = require("./DatePicker");
Object.defineProperty(exports, "DatePicker", { enumerable: true, get: function () { return DatePicker_1.DatePicker; } });
var Upload_1 = require("./Upload");
Object.defineProperty(exports, "Upload", { enumerable: true, get: function () { return Upload_1.Upload; } });
//# sourceMappingURL=index.js.map