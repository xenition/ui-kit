"use strict";
/**
 * `@xenition/ui/primitives` — small themed building blocks (web).
 * Every class is bound to the `--xen-*` tokens via the Tailwind preset;
 * literal colors are forbidden in this package (CI lint rule).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressV4 = exports.Progress = exports.AlertV4 = exports.Alert = exports.MessageListV4 = exports.MessageList = exports.ChatBubbleV4 = exports.ChatBubble = exports.TableV4 = exports.Table = exports.ModalV4 = exports.Modal = exports.TabsV4 = exports.Tabs = exports.SpinnerV4 = exports.Spinner = exports.SwitchV4 = exports.Switch = exports.AvatarV4 = exports.Avatar = exports.BadgeV4 = exports.Badge = exports.StatusMessageV4 = exports.StatusMessage = exports.RatingV4 = exports.Rating = exports.StatusDotV4 = exports.StatusDot = exports.GlassPanel = exports.EyebrowV4 = exports.Eyebrow = exports.GradientText = exports.StackV4 = exports.Stack = exports.FieldV4 = exports.Field = exports.LabelV4 = exports.Label = exports.SelectV4 = exports.Select = exports.CheckboxV4 = exports.Checkbox = exports.TextareaV4 = exports.Textarea = exports.InputV4 = exports.Input = exports.CardV4 = exports.Card = exports.ButtonV4 = exports.Button = void 0;
exports.FormV4 = exports.Form = exports.PinInputV4 = exports.PinInput = exports.NumberInputV4 = exports.NumberInput = exports.SliderV4 = exports.Slider = exports.RadioGroupV4 = exports.RadioGroup = exports.RAIL_MIN_ROWS = exports.StepListV4 = exports.StepList = exports.StepsV4 = exports.Steps = exports.SegmentedV4 = exports.Segmented = exports.AvatarGroupV4 = exports.AvatarGroup = exports.DescriptionsV4 = exports.Descriptions = exports.TimelineV4 = exports.Timeline = exports.BreadcrumbV4 = exports.Breadcrumb = exports.ListV4 = exports.List = exports.PaginationV4 = exports.Pagination = exports.TagV4 = exports.Tag = exports.PopconfirmV4 = exports.Popconfirm = exports.DrawerV4 = exports.Drawer = exports.AccordionV4 = exports.Accordion = exports.MenuV4 = exports.Menu = exports.PopoverV4 = exports.Popover = exports.TooltipV4 = exports.Tooltip = exports.ToastProviderV4 = exports.useToast = exports.ToastProvider = exports.EmptyStateV4 = exports.EmptyState = exports.SkeletonV4 = exports.Skeleton = void 0;
exports.SearchInputV4 = exports.SearchInput = exports.WordmarkV4 = exports.Wordmark = exports.SidebarV4 = exports.Sidebar = exports.AppShellV4 = exports.AppShell = exports.cn = exports.DatePickerV4 = exports.DatePicker = exports.UploadV4 = exports.Upload = exports.ComboboxV4 = exports.Combobox = exports.CrudTableV4 = exports.CrudTable = exports.DataTableV4 = exports.DataTable = exports.ForgotPasswordForm = exports.SignupForm = exports.LoginForm = exports.LoginFormV4 = exports.SignupFormV4 = exports.ForgotPasswordFormV4 = exports.AuthCardV4 = exports.AuthHeadingV4 = exports.AuthBrandTileV4 = exports.AuthProviderButtonV4 = exports.AuthDividerV4 = exports.AUTH_SUBMIT_HEIGHT_V4 = exports.AuthSubmitButtonV4 = exports.AuthStickyFooterV4 = exports.AuthSwitchFooterV4 = exports.AuthTermsCardV4 = exports.AuthFieldV4 = exports.AuthTermsCard = exports.AuthSwitchFooter = exports.AuthSubmitButton = exports.AuthStickyFooter = exports.AuthProviderButton = exports.AuthHeading = exports.AuthField = exports.AuthDivider = exports.AuthBrandTile = exports.AUTH_DEFAULT_TERMS_LINKS = exports.AUTH_TAP_TARGET = exports.AUTH_CONTROL_HEIGHT = exports.AuthCard = exports.useForm = void 0;
exports.Watermark = exports.ButtonGroupV4 = exports.ButtonGroup = exports.LoadingOverlayV4 = exports.LoadingOverlay = exports.ResultV4 = exports.Result = exports.CalloutV4 = exports.Callout = exports.BannerV4 = exports.Banner = exports.BottomSheetV4 = exports.BottomSheet = exports.ActionSheetV4 = exports.ActionSheet = exports.ContextMenuV4 = exports.ContextMenu = exports.BottomNavV4 = exports.BottomNav = exports.FloatButtonV4 = exports.FloatButton = exports.resolveIconGlyph = exports.isIconName = exports.ICON_GLYPHS = exports.IconV4 = exports.Icon = exports.TextV4 = exports.Text = exports.ColorPickerV4 = exports.ColorPicker = exports.CurrencyInputV4 = exports.CurrencyInput = exports.PhoneInputV4 = exports.PhoneInput = exports.ToggleGroupV4 = exports.ToggleGroup = exports.RangeSliderV4 = exports.RangeSlider = exports.AutoCompleteV4 = exports.AutoComplete = exports.TagInputV4 = exports.TagInput = exports.MultiSelectV4 = exports.MultiSelect = exports.DateRangePickerV4 = exports.DateRangePicker = exports.TimePickerV4 = exports.TimePicker = exports.PasswordInputV4 = exports.PasswordInput = void 0;
exports.ScrollableTabsV4 = exports.ScrollableTabs = exports.SplitButtonV4 = exports.SplitButton = exports.ToolbarV4 = exports.Toolbar = exports.JsonViewerV4 = exports.JsonViewer = exports.CodeBlockV4 = exports.CodeBlock = exports.VirtualListV4 = exports.VirtualList = exports.KanbanV4 = exports.Kanban = exports.CalendarV4 = exports.Calendar = exports.StatisticV4 = exports.Statistic = exports.TreeV4 = exports.Tree = exports.WatermarkV4 = void 0;
var Button_1 = require("./Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
// V4 design line — same props as `Button`, a different design.
var ButtonV4_1 = require("./ButtonV4");
Object.defineProperty(exports, "ButtonV4", { enumerable: true, get: function () { return ButtonV4_1.ButtonV4; } });
var Card_1 = require("./Card");
Object.defineProperty(exports, "Card", { enumerable: true, get: function () { return Card_1.Card; } });
// V4 design line — same props as `Card`, a different design.
var CardV4_1 = require("./CardV4");
Object.defineProperty(exports, "CardV4", { enumerable: true, get: function () { return CardV4_1.CardV4; } });
var Input_1 = require("./Input");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return Input_1.Input; } });
// V4 design line — `Input` props plus an optional `label` and `error` message.
var InputV4_1 = require("./InputV4");
Object.defineProperty(exports, "InputV4", { enumerable: true, get: function () { return InputV4_1.InputV4; } });
var Textarea_1 = require("./Textarea");
Object.defineProperty(exports, "Textarea", { enumerable: true, get: function () { return Textarea_1.Textarea; } });
// V4 design line — same props as `Textarea`, a different design.
var TextareaV4_1 = require("./TextareaV4");
Object.defineProperty(exports, "TextareaV4", { enumerable: true, get: function () { return TextareaV4_1.TextareaV4; } });
var Checkbox_1 = require("./Checkbox");
Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return Checkbox_1.Checkbox; } });
// V4 design line — same props as `Checkbox`, a different design.
var CheckboxV4_1 = require("./CheckboxV4");
Object.defineProperty(exports, "CheckboxV4", { enumerable: true, get: function () { return CheckboxV4_1.CheckboxV4; } });
var Select_1 = require("./Select");
Object.defineProperty(exports, "Select", { enumerable: true, get: function () { return Select_1.Select; } });
// V4 design line — same props as `Select`, a different design.
var SelectV4_1 = require("./SelectV4");
Object.defineProperty(exports, "SelectV4", { enumerable: true, get: function () { return SelectV4_1.SelectV4; } });
var Label_1 = require("./Label");
Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return Label_1.Label; } });
// V4 design line — same props as `Label`, a different design.
var LabelV4_1 = require("./LabelV4");
Object.defineProperty(exports, "LabelV4", { enumerable: true, get: function () { return LabelV4_1.LabelV4; } });
var Field_1 = require("./Field");
Object.defineProperty(exports, "Field", { enumerable: true, get: function () { return Field_1.Field; } });
// V4 design line — same props as `Field`, a different design.
var FieldV4_1 = require("./FieldV4");
Object.defineProperty(exports, "FieldV4", { enumerable: true, get: function () { return FieldV4_1.FieldV4; } });
var Stack_1 = require("./Stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return Stack_1.Stack; } });
// V4 design line — Stack is a pure layout primitive, so V4 IS the base.
// See StackV4.tsx for why that is the honest answer rather than a placeholder.
var StackV4_1 = require("./StackV4");
Object.defineProperty(exports, "StackV4", { enumerable: true, get: function () { return StackV4_1.StackV4; } });
var GradientText_1 = require("./GradientText");
Object.defineProperty(exports, "GradientText", { enumerable: true, get: function () { return GradientText_1.GradientText; } });
var Eyebrow_1 = require("./Eyebrow");
Object.defineProperty(exports, "Eyebrow", { enumerable: true, get: function () { return Eyebrow_1.Eyebrow; } });
// V4 design line — same props as `Eyebrow`, a different design.
var EyebrowV4_1 = require("./EyebrowV4");
Object.defineProperty(exports, "EyebrowV4", { enumerable: true, get: function () { return EyebrowV4_1.EyebrowV4; } });
var GlassPanel_1 = require("./GlassPanel");
Object.defineProperty(exports, "GlassPanel", { enumerable: true, get: function () { return GlassPanel_1.GlassPanel; } });
var StatusDot_1 = require("./StatusDot");
Object.defineProperty(exports, "StatusDot", { enumerable: true, get: function () { return StatusDot_1.StatusDot; } });
// V4 design line — same props as `StatusDot`, a different design.
var StatusDotV4_1 = require("./StatusDotV4");
Object.defineProperty(exports, "StatusDotV4", { enumerable: true, get: function () { return StatusDotV4_1.StatusDotV4; } });
var Rating_1 = require("./Rating");
Object.defineProperty(exports, "Rating", { enumerable: true, get: function () { return Rating_1.Rating; } });
// V4 design line — same props as `Rating`, a different design.
var RatingV4_1 = require("./RatingV4");
Object.defineProperty(exports, "RatingV4", { enumerable: true, get: function () { return RatingV4_1.RatingV4; } });
var StatusMessage_1 = require("./StatusMessage");
Object.defineProperty(exports, "StatusMessage", { enumerable: true, get: function () { return StatusMessage_1.StatusMessage; } });
// V4 design line — same props as `StatusMessage`, a different design.
var StatusMessageV4_1 = require("./StatusMessageV4");
Object.defineProperty(exports, "StatusMessageV4", { enumerable: true, get: function () { return StatusMessageV4_1.StatusMessageV4; } });
var Badge_1 = require("./Badge");
Object.defineProperty(exports, "Badge", { enumerable: true, get: function () { return Badge_1.Badge; } });
// V4 design line — same props as `Badge`, a different design.
var BadgeV4_1 = require("./BadgeV4");
Object.defineProperty(exports, "BadgeV4", { enumerable: true, get: function () { return BadgeV4_1.BadgeV4; } });
var Avatar_1 = require("./Avatar");
Object.defineProperty(exports, "Avatar", { enumerable: true, get: function () { return Avatar_1.Avatar; } });
// V4 design line — same props as `Avatar`, a different design.
var AvatarV4_1 = require("./AvatarV4");
Object.defineProperty(exports, "AvatarV4", { enumerable: true, get: function () { return AvatarV4_1.AvatarV4; } });
var Switch_1 = require("./Switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return Switch_1.Switch; } });
// V4 design line — same props as `Switch`, a different design.
var SwitchV4_1 = require("./SwitchV4");
Object.defineProperty(exports, "SwitchV4", { enumerable: true, get: function () { return SwitchV4_1.SwitchV4; } });
var Spinner_1 = require("./Spinner");
Object.defineProperty(exports, "Spinner", { enumerable: true, get: function () { return Spinner_1.Spinner; } });
// V4 design line — same props as `Spinner`, a different design.
var SpinnerV4_1 = require("./SpinnerV4");
Object.defineProperty(exports, "SpinnerV4", { enumerable: true, get: function () { return SpinnerV4_1.SpinnerV4; } });
var Tabs_1 = require("./Tabs");
Object.defineProperty(exports, "Tabs", { enumerable: true, get: function () { return Tabs_1.Tabs; } });
// V4 design line — same props as `Tabs`, a different design.
var TabsV4_1 = require("./TabsV4");
Object.defineProperty(exports, "TabsV4", { enumerable: true, get: function () { return TabsV4_1.TabsV4; } });
var Modal_1 = require("./Modal");
Object.defineProperty(exports, "Modal", { enumerable: true, get: function () { return Modal_1.Modal; } });
var ModalV4_1 = require("./ModalV4");
Object.defineProperty(exports, "ModalV4", { enumerable: true, get: function () { return ModalV4_1.ModalV4; } });
var Table_1 = require("./Table");
Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return Table_1.Table; } });
// V4 design line — same props as `Table`, a different design.
var TableV4_1 = require("./TableV4");
Object.defineProperty(exports, "TableV4", { enumerable: true, get: function () { return TableV4_1.TableV4; } });
var ChatBubble_1 = require("./ChatBubble");
Object.defineProperty(exports, "ChatBubble", { enumerable: true, get: function () { return ChatBubble_1.ChatBubble; } });
// V4 design line — same props as `ChatBubble`, a different design.
var ChatBubbleV4_1 = require("./ChatBubbleV4");
Object.defineProperty(exports, "ChatBubbleV4", { enumerable: true, get: function () { return ChatBubbleV4_1.ChatBubbleV4; } });
var MessageList_1 = require("./MessageList");
Object.defineProperty(exports, "MessageList", { enumerable: true, get: function () { return MessageList_1.MessageList; } });
// V4 design line — same props as `MessageList`, a different design.
var MessageListV4_1 = require("./MessageListV4");
Object.defineProperty(exports, "MessageListV4", { enumerable: true, get: function () { return MessageListV4_1.MessageListV4; } });
var Alert_1 = require("./Alert");
Object.defineProperty(exports, "Alert", { enumerable: true, get: function () { return Alert_1.Alert; } });
// V4 design line — same props as `Alert`, a different design.
var AlertV4_1 = require("./AlertV4");
Object.defineProperty(exports, "AlertV4", { enumerable: true, get: function () { return AlertV4_1.AlertV4; } });
var Progress_1 = require("./Progress");
Object.defineProperty(exports, "Progress", { enumerable: true, get: function () { return Progress_1.Progress; } });
// V4 design line — same props as `Progress`, a different design.
var ProgressV4_1 = require("./ProgressV4");
Object.defineProperty(exports, "ProgressV4", { enumerable: true, get: function () { return ProgressV4_1.ProgressV4; } });
var Skeleton_1 = require("./Skeleton");
Object.defineProperty(exports, "Skeleton", { enumerable: true, get: function () { return Skeleton_1.Skeleton; } });
// V4 design line — same props as `Skeleton`, a different design.
var SkeletonV4_1 = require("./SkeletonV4");
Object.defineProperty(exports, "SkeletonV4", { enumerable: true, get: function () { return SkeletonV4_1.SkeletonV4; } });
// Nearly every screen in the kit renders an empty state, so it belongs here
// rather than in a vertical. `commerce` re-exports it for the older path.
var EmptyState_1 = require("./EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
// V4 design line — same props as `EmptyState`, a different design.
var EmptyStateV4_1 = require("./EmptyStateV4");
Object.defineProperty(exports, "EmptyStateV4", { enumerable: true, get: function () { return EmptyStateV4_1.EmptyStateV4; } });
var Toast_1 = require("./Toast");
Object.defineProperty(exports, "ToastProvider", { enumerable: true, get: function () { return Toast_1.ToastProvider; } });
Object.defineProperty(exports, "useToast", { enumerable: true, get: function () { return Toast_1.useToast; } });
var ToastProviderV4_1 = require("./ToastProviderV4");
Object.defineProperty(exports, "ToastProviderV4", { enumerable: true, get: function () { return ToastProviderV4_1.ToastProviderV4; } });
var Tooltip_1 = require("./Tooltip");
Object.defineProperty(exports, "Tooltip", { enumerable: true, get: function () { return Tooltip_1.Tooltip; } });
// V4 design line — same props as `Tooltip`, a different design.
var TooltipV4_1 = require("./TooltipV4");
Object.defineProperty(exports, "TooltipV4", { enumerable: true, get: function () { return TooltipV4_1.TooltipV4; } });
var Popover_1 = require("./Popover");
Object.defineProperty(exports, "Popover", { enumerable: true, get: function () { return Popover_1.Popover; } });
// V4 design line — same props as `Popover`, a different design.
var PopoverV4_1 = require("./PopoverV4");
Object.defineProperty(exports, "PopoverV4", { enumerable: true, get: function () { return PopoverV4_1.PopoverV4; } });
var Menu_1 = require("./Menu");
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return Menu_1.Menu; } });
// V4 design line — same props as `Menu`, a different design.
var MenuV4_1 = require("./MenuV4");
Object.defineProperty(exports, "MenuV4", { enumerable: true, get: function () { return MenuV4_1.MenuV4; } });
var Accordion_1 = require("./Accordion");
Object.defineProperty(exports, "Accordion", { enumerable: true, get: function () { return Accordion_1.Accordion; } });
// V4 design line — same props as `Accordion`, a different design.
var AccordionV4_1 = require("./AccordionV4");
Object.defineProperty(exports, "AccordionV4", { enumerable: true, get: function () { return AccordionV4_1.AccordionV4; } });
var Drawer_1 = require("./Drawer");
Object.defineProperty(exports, "Drawer", { enumerable: true, get: function () { return Drawer_1.Drawer; } });
// V4 design line — same props as `Drawer`, a different design.
var DrawerV4_1 = require("./DrawerV4");
Object.defineProperty(exports, "DrawerV4", { enumerable: true, get: function () { return DrawerV4_1.DrawerV4; } });
var Popconfirm_1 = require("./Popconfirm");
Object.defineProperty(exports, "Popconfirm", { enumerable: true, get: function () { return Popconfirm_1.Popconfirm; } });
// V4 design line — same props as `Popconfirm`, a different design.
var PopconfirmV4_1 = require("./PopconfirmV4");
Object.defineProperty(exports, "PopconfirmV4", { enumerable: true, get: function () { return PopconfirmV4_1.PopconfirmV4; } });
var Tag_1 = require("./Tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return Tag_1.Tag; } });
// V4 design line — same props as `Tag`, a different design.
var TagV4_1 = require("./TagV4");
Object.defineProperty(exports, "TagV4", { enumerable: true, get: function () { return TagV4_1.TagV4; } });
var Pagination_1 = require("./Pagination");
Object.defineProperty(exports, "Pagination", { enumerable: true, get: function () { return Pagination_1.Pagination; } });
// V4 design line — same props as `Pagination`, a different design.
var PaginationV4_1 = require("./PaginationV4");
Object.defineProperty(exports, "PaginationV4", { enumerable: true, get: function () { return PaginationV4_1.PaginationV4; } });
var List_1 = require("./List");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return List_1.List; } });
// V4 design line — same props as `List`, a different design.
var ListV4_1 = require("./ListV4");
Object.defineProperty(exports, "ListV4", { enumerable: true, get: function () { return ListV4_1.ListV4; } });
var Breadcrumb_1 = require("./Breadcrumb");
Object.defineProperty(exports, "Breadcrumb", { enumerable: true, get: function () { return Breadcrumb_1.Breadcrumb; } });
// V4 design line — same props as `Breadcrumb`, a different design.
var BreadcrumbV4_1 = require("./BreadcrumbV4");
Object.defineProperty(exports, "BreadcrumbV4", { enumerable: true, get: function () { return BreadcrumbV4_1.BreadcrumbV4; } });
var Timeline_1 = require("./Timeline");
Object.defineProperty(exports, "Timeline", { enumerable: true, get: function () { return Timeline_1.Timeline; } });
// V4 design line — same props as `Timeline`, a different design.
var TimelineV4_1 = require("./TimelineV4");
Object.defineProperty(exports, "TimelineV4", { enumerable: true, get: function () { return TimelineV4_1.TimelineV4; } });
var Descriptions_1 = require("./Descriptions");
Object.defineProperty(exports, "Descriptions", { enumerable: true, get: function () { return Descriptions_1.Descriptions; } });
// V4 design line — same props as `Descriptions`, a different design.
var DescriptionsV4_1 = require("./DescriptionsV4");
Object.defineProperty(exports, "DescriptionsV4", { enumerable: true, get: function () { return DescriptionsV4_1.DescriptionsV4; } });
var AvatarGroup_1 = require("./AvatarGroup");
Object.defineProperty(exports, "AvatarGroup", { enumerable: true, get: function () { return AvatarGroup_1.AvatarGroup; } });
// V4 design line — same props as `AvatarGroup`, a different design.
var AvatarGroupV4_1 = require("./AvatarGroupV4");
Object.defineProperty(exports, "AvatarGroupV4", { enumerable: true, get: function () { return AvatarGroupV4_1.AvatarGroupV4; } });
var Segmented_1 = require("./Segmented");
Object.defineProperty(exports, "Segmented", { enumerable: true, get: function () { return Segmented_1.Segmented; } });
// V4 design line — same props as `Segmented`, a different design.
var SegmentedV4_1 = require("./SegmentedV4");
Object.defineProperty(exports, "SegmentedV4", { enumerable: true, get: function () { return SegmentedV4_1.SegmentedV4; } });
var Steps_1 = require("./Steps");
Object.defineProperty(exports, "Steps", { enumerable: true, get: function () { return Steps_1.Steps; } });
// V4 design line — same props as `Steps`, a different design.
var StepsV4_1 = require("./StepsV4");
Object.defineProperty(exports, "StepsV4", { enumerable: true, get: function () { return StepsV4_1.StepsV4; } });
// `Steps` is the horizontal progress indicator; `StepList` is the vertical,
// content-bearing instruction list. Pick by the question you are answering:
// "where am I in this flow" vs "here are the instructions".
var StepList_1 = require("./StepList");
Object.defineProperty(exports, "StepList", { enumerable: true, get: function () { return StepList_1.StepList; } });
var StepListV4_1 = require("./StepListV4");
Object.defineProperty(exports, "StepListV4", { enumerable: true, get: function () { return StepListV4_1.StepListV4; } });
Object.defineProperty(exports, "RAIL_MIN_ROWS", { enumerable: true, get: function () { return StepListV4_1.RAIL_MIN_ROWS; } });
var RadioGroup_1 = require("./RadioGroup");
Object.defineProperty(exports, "RadioGroup", { enumerable: true, get: function () { return RadioGroup_1.RadioGroup; } });
// V4 design line — same props as `RadioGroup`, a different design.
var RadioGroupV4_1 = require("./RadioGroupV4");
Object.defineProperty(exports, "RadioGroupV4", { enumerable: true, get: function () { return RadioGroupV4_1.RadioGroupV4; } });
var Slider_1 = require("./Slider");
Object.defineProperty(exports, "Slider", { enumerable: true, get: function () { return Slider_1.Slider; } });
// V4 design line — same props as `Slider`, a different design.
var SliderV4_1 = require("./SliderV4");
Object.defineProperty(exports, "SliderV4", { enumerable: true, get: function () { return SliderV4_1.SliderV4; } });
var NumberInput_1 = require("./NumberInput");
Object.defineProperty(exports, "NumberInput", { enumerable: true, get: function () { return NumberInput_1.NumberInput; } });
// V4 design line — same props as `NumberInput`, a different design.
var NumberInputV4_1 = require("./NumberInputV4");
Object.defineProperty(exports, "NumberInputV4", { enumerable: true, get: function () { return NumberInputV4_1.NumberInputV4; } });
var PinInput_1 = require("./PinInput");
Object.defineProperty(exports, "PinInput", { enumerable: true, get: function () { return PinInput_1.PinInput; } });
// V4 design line — same props as `PinInput`, a different design.
var PinInputV4_1 = require("./PinInputV4");
Object.defineProperty(exports, "PinInputV4", { enumerable: true, get: function () { return PinInputV4_1.PinInputV4; } });
var Form_1 = require("./Form");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return Form_1.Form; } });
// V4 design line — same props as `Form`, a different design.
var FormV4_1 = require("./FormV4");
Object.defineProperty(exports, "FormV4", { enumerable: true, get: function () { return FormV4_1.FormV4; } });
var useForm_1 = require("./useForm");
Object.defineProperty(exports, "useForm", { enumerable: true, get: function () { return useForm_1.useForm; } });
var AuthCard_1 = require("./AuthCard");
Object.defineProperty(exports, "AuthCard", { enumerable: true, get: function () { return AuthCard_1.AuthCard; } });
// The shared auth anatomy (ONBOARDING-DESIGN-SPEC §5/§6/§9) — the same parts
// `SignInScreen` and the three composed forms are drawn from, so an app that
// assembles its own auth surface gets the identical 56px field, CTA and
// provider row rather than a near-miss.
var AuthCard_2 = require("./AuthCard");
Object.defineProperty(exports, "AUTH_CONTROL_HEIGHT", { enumerable: true, get: function () { return AuthCard_2.AUTH_CONTROL_HEIGHT; } });
Object.defineProperty(exports, "AUTH_TAP_TARGET", { enumerable: true, get: function () { return AuthCard_2.AUTH_TAP_TARGET; } });
Object.defineProperty(exports, "AUTH_DEFAULT_TERMS_LINKS", { enumerable: true, get: function () { return AuthCard_2.AUTH_DEFAULT_TERMS_LINKS; } });
Object.defineProperty(exports, "AuthBrandTile", { enumerable: true, get: function () { return AuthCard_2.AuthBrandTile; } });
Object.defineProperty(exports, "AuthDivider", { enumerable: true, get: function () { return AuthCard_2.AuthDivider; } });
Object.defineProperty(exports, "AuthField", { enumerable: true, get: function () { return AuthCard_2.AuthField; } });
Object.defineProperty(exports, "AuthHeading", { enumerable: true, get: function () { return AuthCard_2.AuthHeading; } });
Object.defineProperty(exports, "AuthProviderButton", { enumerable: true, get: function () { return AuthCard_2.AuthProviderButton; } });
Object.defineProperty(exports, "AuthStickyFooter", { enumerable: true, get: function () { return AuthCard_2.AuthStickyFooter; } });
Object.defineProperty(exports, "AuthSubmitButton", { enumerable: true, get: function () { return AuthCard_2.AuthSubmitButton; } });
Object.defineProperty(exports, "AuthSwitchFooter", { enumerable: true, get: function () { return AuthCard_2.AuthSwitchFooter; } });
Object.defineProperty(exports, "AuthTermsCard", { enumerable: true, get: function () { return AuthCard_2.AuthTermsCard; } });
var AuthFieldV4_1 = require("./AuthFieldV4");
Object.defineProperty(exports, "AuthFieldV4", { enumerable: true, get: function () { return AuthFieldV4_1.AuthFieldV4; } });
var AuthTermsCardV4_1 = require("./AuthTermsCardV4");
Object.defineProperty(exports, "AuthTermsCardV4", { enumerable: true, get: function () { return AuthTermsCardV4_1.AuthTermsCardV4; } });
var AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
Object.defineProperty(exports, "AuthSwitchFooterV4", { enumerable: true, get: function () { return AuthSwitchFooterV4_1.AuthSwitchFooterV4; } });
var AuthStickyFooterV4_1 = require("./AuthStickyFooterV4");
Object.defineProperty(exports, "AuthStickyFooterV4", { enumerable: true, get: function () { return AuthStickyFooterV4_1.AuthStickyFooterV4; } });
var AuthSubmitButtonV4_1 = require("./AuthSubmitButtonV4");
Object.defineProperty(exports, "AuthSubmitButtonV4", { enumerable: true, get: function () { return AuthSubmitButtonV4_1.AuthSubmitButtonV4; } });
Object.defineProperty(exports, "AUTH_SUBMIT_HEIGHT_V4", { enumerable: true, get: function () { return AuthSubmitButtonV4_1.AUTH_SUBMIT_HEIGHT_V4; } });
var AuthDividerV4_1 = require("./AuthDividerV4");
Object.defineProperty(exports, "AuthDividerV4", { enumerable: true, get: function () { return AuthDividerV4_1.AuthDividerV4; } });
var AuthProviderButtonV4_1 = require("./AuthProviderButtonV4");
Object.defineProperty(exports, "AuthProviderButtonV4", { enumerable: true, get: function () { return AuthProviderButtonV4_1.AuthProviderButtonV4; } });
var AuthBrandTileV4_1 = require("./AuthBrandTileV4");
Object.defineProperty(exports, "AuthBrandTileV4", { enumerable: true, get: function () { return AuthBrandTileV4_1.AuthBrandTileV4; } });
var AuthHeadingV4_1 = require("./AuthHeadingV4");
Object.defineProperty(exports, "AuthHeadingV4", { enumerable: true, get: function () { return AuthHeadingV4_1.AuthHeadingV4; } });
var AuthCardV4_1 = require("./AuthCardV4");
Object.defineProperty(exports, "AuthCardV4", { enumerable: true, get: function () { return AuthCardV4_1.AuthCardV4; } });
var ForgotPasswordFormV4_1 = require("./ForgotPasswordFormV4");
Object.defineProperty(exports, "ForgotPasswordFormV4", { enumerable: true, get: function () { return ForgotPasswordFormV4_1.ForgotPasswordFormV4; } });
var SignupFormV4_1 = require("./SignupFormV4");
Object.defineProperty(exports, "SignupFormV4", { enumerable: true, get: function () { return SignupFormV4_1.SignupFormV4; } });
var LoginFormV4_1 = require("./LoginFormV4");
Object.defineProperty(exports, "LoginFormV4", { enumerable: true, get: function () { return LoginFormV4_1.LoginFormV4; } });
var LoginForm_1 = require("./LoginForm");
Object.defineProperty(exports, "LoginForm", { enumerable: true, get: function () { return LoginForm_1.LoginForm; } });
var SignupForm_1 = require("./SignupForm");
Object.defineProperty(exports, "SignupForm", { enumerable: true, get: function () { return SignupForm_1.SignupForm; } });
var ForgotPasswordForm_1 = require("./ForgotPasswordForm");
Object.defineProperty(exports, "ForgotPasswordForm", { enumerable: true, get: function () { return ForgotPasswordForm_1.ForgotPasswordForm; } });
var DataTable_1 = require("./DataTable");
Object.defineProperty(exports, "DataTable", { enumerable: true, get: function () { return DataTable_1.DataTable; } });
// V4 design line — same props as `DataTable`, a different design.
var DataTableV4_1 = require("./DataTableV4");
Object.defineProperty(exports, "DataTableV4", { enumerable: true, get: function () { return DataTableV4_1.DataTableV4; } });
var CrudTable_1 = require("./CrudTable");
Object.defineProperty(exports, "CrudTable", { enumerable: true, get: function () { return CrudTable_1.CrudTable; } });
// V4 design line — same props as `CrudTable`, a different design.
var CrudTableV4_1 = require("./CrudTableV4");
Object.defineProperty(exports, "CrudTableV4", { enumerable: true, get: function () { return CrudTableV4_1.CrudTableV4; } });
var Combobox_1 = require("./Combobox");
Object.defineProperty(exports, "Combobox", { enumerable: true, get: function () { return Combobox_1.Combobox; } });
// V4 design line — same props as `Combobox`, a different design.
var ComboboxV4_1 = require("./ComboboxV4");
Object.defineProperty(exports, "ComboboxV4", { enumerable: true, get: function () { return ComboboxV4_1.ComboboxV4; } });
var Upload_1 = require("./Upload");
Object.defineProperty(exports, "Upload", { enumerable: true, get: function () { return Upload_1.Upload; } });
// V4 design line — same props as `Upload`, a different design.
var UploadV4_1 = require("./UploadV4");
Object.defineProperty(exports, "UploadV4", { enumerable: true, get: function () { return UploadV4_1.UploadV4; } });
var DatePicker_1 = require("./DatePicker");
Object.defineProperty(exports, "DatePicker", { enumerable: true, get: function () { return DatePicker_1.DatePicker; } });
// V4 design line — same props as `DatePicker`, a different design.
var DatePickerV4_1 = require("./DatePickerV4");
Object.defineProperty(exports, "DatePickerV4", { enumerable: true, get: function () { return DatePickerV4_1.DatePickerV4; } });
var cn_1 = require("./cn");
Object.defineProperty(exports, "cn", { enumerable: true, get: function () { return cn_1.cn; } });
// ── app shell (dashboard layout) ──────────────────────────────────────
var AppShell_1 = require("./AppShell");
Object.defineProperty(exports, "AppShell", { enumerable: true, get: function () { return AppShell_1.AppShell; } });
// V4 design line — same props as `AppShell`, a different design.
var AppShellV4_1 = require("./AppShellV4");
Object.defineProperty(exports, "AppShellV4", { enumerable: true, get: function () { return AppShellV4_1.AppShellV4; } });
var Sidebar_1 = require("./Sidebar");
Object.defineProperty(exports, "Sidebar", { enumerable: true, get: function () { return Sidebar_1.Sidebar; } });
// V4 design line — same props as `Sidebar`, a different design.
var SidebarV4_1 = require("./SidebarV4");
Object.defineProperty(exports, "SidebarV4", { enumerable: true, get: function () { return SidebarV4_1.SidebarV4; } });
// brand wordmark/logomark (replaces hand-rolled per-app SVG marks)
var Wordmark_1 = require("./Wordmark");
Object.defineProperty(exports, "Wordmark", { enumerable: true, get: function () { return Wordmark_1.Wordmark; } });
// V4 design line — same props as `Wordmark`, a different design.
var WordmarkV4_1 = require("./WordmarkV4");
Object.defineProperty(exports, "WordmarkV4", { enumerable: true, get: function () { return WordmarkV4_1.WordmarkV4; } });
// ── web parity: data-entry ────────────────────────────────────────────
var SearchInput_1 = require("./SearchInput");
Object.defineProperty(exports, "SearchInput", { enumerable: true, get: function () { return SearchInput_1.SearchInput; } });
// V4 design line — same props as `SearchInput`, a different design.
var SearchInputV4_1 = require("./SearchInputV4");
Object.defineProperty(exports, "SearchInputV4", { enumerable: true, get: function () { return SearchInputV4_1.SearchInputV4; } });
var PasswordInput_1 = require("./PasswordInput");
Object.defineProperty(exports, "PasswordInput", { enumerable: true, get: function () { return PasswordInput_1.PasswordInput; } });
// V4 design line — same props as `PasswordInput`, a different design.
var PasswordInputV4_1 = require("./PasswordInputV4");
Object.defineProperty(exports, "PasswordInputV4", { enumerable: true, get: function () { return PasswordInputV4_1.PasswordInputV4; } });
var TimePicker_1 = require("./TimePicker");
Object.defineProperty(exports, "TimePicker", { enumerable: true, get: function () { return TimePicker_1.TimePicker; } });
// V4 design line — same props as `TimePicker`, a different design.
var TimePickerV4_1 = require("./TimePickerV4");
Object.defineProperty(exports, "TimePickerV4", { enumerable: true, get: function () { return TimePickerV4_1.TimePickerV4; } });
var DateRangePicker_1 = require("./DateRangePicker");
Object.defineProperty(exports, "DateRangePicker", { enumerable: true, get: function () { return DateRangePicker_1.DateRangePicker; } });
// V4 design line — same props as `DateRangePicker`, a different design.
var DateRangePickerV4_1 = require("./DateRangePickerV4");
Object.defineProperty(exports, "DateRangePickerV4", { enumerable: true, get: function () { return DateRangePickerV4_1.DateRangePickerV4; } });
var MultiSelect_1 = require("./MultiSelect");
Object.defineProperty(exports, "MultiSelect", { enumerable: true, get: function () { return MultiSelect_1.MultiSelect; } });
// V4 design line — same props as `MultiSelect`, a different design.
var MultiSelectV4_1 = require("./MultiSelectV4");
Object.defineProperty(exports, "MultiSelectV4", { enumerable: true, get: function () { return MultiSelectV4_1.MultiSelectV4; } });
var TagInput_1 = require("./TagInput");
Object.defineProperty(exports, "TagInput", { enumerable: true, get: function () { return TagInput_1.TagInput; } });
// V4 design line — same props as `TagInput`, a different design.
var TagInputV4_1 = require("./TagInputV4");
Object.defineProperty(exports, "TagInputV4", { enumerable: true, get: function () { return TagInputV4_1.TagInputV4; } });
var AutoComplete_1 = require("./AutoComplete");
Object.defineProperty(exports, "AutoComplete", { enumerable: true, get: function () { return AutoComplete_1.AutoComplete; } });
// V4 design line — same props as `AutoComplete`, a different design.
var AutoCompleteV4_1 = require("./AutoCompleteV4");
Object.defineProperty(exports, "AutoCompleteV4", { enumerable: true, get: function () { return AutoCompleteV4_1.AutoCompleteV4; } });
var RangeSlider_1 = require("./RangeSlider");
Object.defineProperty(exports, "RangeSlider", { enumerable: true, get: function () { return RangeSlider_1.RangeSlider; } });
// V4 design line — same props as `RangeSlider`, a different design.
var RangeSliderV4_1 = require("./RangeSliderV4");
Object.defineProperty(exports, "RangeSliderV4", { enumerable: true, get: function () { return RangeSliderV4_1.RangeSliderV4; } });
var ToggleGroup_1 = require("./ToggleGroup");
Object.defineProperty(exports, "ToggleGroup", { enumerable: true, get: function () { return ToggleGroup_1.ToggleGroup; } });
// V4 design line — same props as `ToggleGroup`, a different design.
var ToggleGroupV4_1 = require("./ToggleGroupV4");
Object.defineProperty(exports, "ToggleGroupV4", { enumerable: true, get: function () { return ToggleGroupV4_1.ToggleGroupV4; } });
var PhoneInput_1 = require("./PhoneInput");
Object.defineProperty(exports, "PhoneInput", { enumerable: true, get: function () { return PhoneInput_1.PhoneInput; } });
// V4 design line — same props as `PhoneInput`, a different design.
var PhoneInputV4_1 = require("./PhoneInputV4");
Object.defineProperty(exports, "PhoneInputV4", { enumerable: true, get: function () { return PhoneInputV4_1.PhoneInputV4; } });
var CurrencyInput_1 = require("./CurrencyInput");
Object.defineProperty(exports, "CurrencyInput", { enumerable: true, get: function () { return CurrencyInput_1.CurrencyInput; } });
// V4 design line — same props as `CurrencyInput`, a different design.
var CurrencyInputV4_1 = require("./CurrencyInputV4");
Object.defineProperty(exports, "CurrencyInputV4", { enumerable: true, get: function () { return CurrencyInputV4_1.CurrencyInputV4; } });
var ColorPicker_1 = require("./ColorPicker");
Object.defineProperty(exports, "ColorPicker", { enumerable: true, get: function () { return ColorPicker_1.ColorPicker; } });
// V4 design line — same props as `ColorPicker`, a different design.
var ColorPickerV4_1 = require("./ColorPickerV4");
Object.defineProperty(exports, "ColorPickerV4", { enumerable: true, get: function () { return ColorPickerV4_1.ColorPickerV4; } });
// ── web parity: patterns + feedback ───────────────────────────────────
// The way to render text: `variant` (type scale) + `tone` (semantic slot)
// instead of a hand-assembled class string. A raw `fontSize` in an app is a bug.
var Text_1 = require("./Text");
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return Text_1.Text; } });
var TextV4_1 = require("./TextV4");
Object.defineProperty(exports, "TextV4", { enumerable: true, get: function () { return TextV4_1.TextV4; } });
var Icon_1 = require("./Icon");
Object.defineProperty(exports, "Icon", { enumerable: true, get: function () { return Icon_1.Icon; } });
var IconV4_1 = require("./IconV4");
Object.defineProperty(exports, "IconV4", { enumerable: true, get: function () { return IconV4_1.IconV4; } });
// The named icon set behind `Icon`'s `name` — a stable semantic vocabulary so
// two screens never pick different glyphs for the same idea.
var icon_names_1 = require("./icon-names");
Object.defineProperty(exports, "ICON_GLYPHS", { enumerable: true, get: function () { return icon_names_1.ICON_GLYPHS; } });
Object.defineProperty(exports, "isIconName", { enumerable: true, get: function () { return icon_names_1.isIconName; } });
Object.defineProperty(exports, "resolveIconGlyph", { enumerable: true, get: function () { return icon_names_1.resolveIconGlyph; } });
var FloatButton_1 = require("./FloatButton");
Object.defineProperty(exports, "FloatButton", { enumerable: true, get: function () { return FloatButton_1.FloatButton; } });
// V4 design line — same props as `FloatButton`, a different design.
var FloatButtonV4_1 = require("./FloatButtonV4");
Object.defineProperty(exports, "FloatButtonV4", { enumerable: true, get: function () { return FloatButtonV4_1.FloatButtonV4; } });
var BottomNav_1 = require("./BottomNav");
Object.defineProperty(exports, "BottomNav", { enumerable: true, get: function () { return BottomNav_1.BottomNav; } });
// V4 design line — same props as `BottomNav`, a different design.
var BottomNavV4_1 = require("./BottomNavV4");
Object.defineProperty(exports, "BottomNavV4", { enumerable: true, get: function () { return BottomNavV4_1.BottomNavV4; } });
var ContextMenu_1 = require("./ContextMenu");
Object.defineProperty(exports, "ContextMenu", { enumerable: true, get: function () { return ContextMenu_1.ContextMenu; } });
// V4 design line — same props as `ContextMenu`, a different design.
var ContextMenuV4_1 = require("./ContextMenuV4");
Object.defineProperty(exports, "ContextMenuV4", { enumerable: true, get: function () { return ContextMenuV4_1.ContextMenuV4; } });
var ActionSheet_1 = require("./ActionSheet");
Object.defineProperty(exports, "ActionSheet", { enumerable: true, get: function () { return ActionSheet_1.ActionSheet; } });
var ActionSheetV4_1 = require("./ActionSheetV4");
Object.defineProperty(exports, "ActionSheetV4", { enumerable: true, get: function () { return ActionSheetV4_1.ActionSheetV4; } });
var BottomSheet_1 = require("./BottomSheet");
Object.defineProperty(exports, "BottomSheet", { enumerable: true, get: function () { return BottomSheet_1.BottomSheet; } });
var BottomSheetV4_1 = require("./BottomSheetV4");
Object.defineProperty(exports, "BottomSheetV4", { enumerable: true, get: function () { return BottomSheetV4_1.BottomSheetV4; } });
var Banner_1 = require("./Banner");
Object.defineProperty(exports, "Banner", { enumerable: true, get: function () { return Banner_1.Banner; } });
// V4 design line — same props as `Banner`, a different design.
var BannerV4_1 = require("./BannerV4");
Object.defineProperty(exports, "BannerV4", { enumerable: true, get: function () { return BannerV4_1.BannerV4; } });
var Callout_1 = require("./Callout");
Object.defineProperty(exports, "Callout", { enumerable: true, get: function () { return Callout_1.Callout; } });
// V4 design line — same props as `Callout`, a different design.
var CalloutV4_1 = require("./CalloutV4");
Object.defineProperty(exports, "CalloutV4", { enumerable: true, get: function () { return CalloutV4_1.CalloutV4; } });
var Result_1 = require("./Result");
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return Result_1.Result; } });
// V4 design line — same props as `Result`, a different design.
var ResultV4_1 = require("./ResultV4");
Object.defineProperty(exports, "ResultV4", { enumerable: true, get: function () { return ResultV4_1.ResultV4; } });
var LoadingOverlay_1 = require("./LoadingOverlay");
Object.defineProperty(exports, "LoadingOverlay", { enumerable: true, get: function () { return LoadingOverlay_1.LoadingOverlay; } });
// V4 design line — same props as `LoadingOverlay`, a different design.
var LoadingOverlayV4_1 = require("./LoadingOverlayV4");
Object.defineProperty(exports, "LoadingOverlayV4", { enumerable: true, get: function () { return LoadingOverlayV4_1.LoadingOverlayV4; } });
var ButtonGroup_1 = require("./ButtonGroup");
Object.defineProperty(exports, "ButtonGroup", { enumerable: true, get: function () { return ButtonGroup_1.ButtonGroup; } });
// V4 design line — same props as `ButtonGroup`, a different design.
var ButtonGroupV4_1 = require("./ButtonGroupV4");
Object.defineProperty(exports, "ButtonGroupV4", { enumerable: true, get: function () { return ButtonGroupV4_1.ButtonGroupV4; } });
var Watermark_1 = require("./Watermark");
Object.defineProperty(exports, "Watermark", { enumerable: true, get: function () { return Watermark_1.Watermark; } });
// V4 design line — same props as `Watermark`, a different design.
var WatermarkV4_1 = require("./WatermarkV4");
Object.defineProperty(exports, "WatermarkV4", { enumerable: true, get: function () { return WatermarkV4_1.WatermarkV4; } });
// ── web parity: display + navigation ──────────────────────────────────
var Tree_1 = require("./Tree");
Object.defineProperty(exports, "Tree", { enumerable: true, get: function () { return Tree_1.Tree; } });
// V4 design line — same props as `Tree`, a different design.
var TreeV4_1 = require("./TreeV4");
Object.defineProperty(exports, "TreeV4", { enumerable: true, get: function () { return TreeV4_1.TreeV4; } });
var Statistic_1 = require("./Statistic");
Object.defineProperty(exports, "Statistic", { enumerable: true, get: function () { return Statistic_1.Statistic; } });
// V4 design line — same props as `Statistic`, a different design.
var StatisticV4_1 = require("./StatisticV4");
Object.defineProperty(exports, "StatisticV4", { enumerable: true, get: function () { return StatisticV4_1.StatisticV4; } });
var Calendar_1 = require("./Calendar");
Object.defineProperty(exports, "Calendar", { enumerable: true, get: function () { return Calendar_1.Calendar; } });
// V4 design line — same props as `Calendar`, a different design.
var CalendarV4_1 = require("./CalendarV4");
Object.defineProperty(exports, "CalendarV4", { enumerable: true, get: function () { return CalendarV4_1.CalendarV4; } });
var Kanban_1 = require("./Kanban");
Object.defineProperty(exports, "Kanban", { enumerable: true, get: function () { return Kanban_1.Kanban; } });
// V4 design line — same props as `Kanban`, a different design.
var KanbanV4_1 = require("./KanbanV4");
Object.defineProperty(exports, "KanbanV4", { enumerable: true, get: function () { return KanbanV4_1.KanbanV4; } });
var VirtualList_1 = require("./VirtualList");
Object.defineProperty(exports, "VirtualList", { enumerable: true, get: function () { return VirtualList_1.VirtualList; } });
// V4 design line — same props as `VirtualList`, a different design.
var VirtualListV4_1 = require("./VirtualListV4");
Object.defineProperty(exports, "VirtualListV4", { enumerable: true, get: function () { return VirtualListV4_1.VirtualListV4; } });
var CodeBlock_1 = require("./CodeBlock");
Object.defineProperty(exports, "CodeBlock", { enumerable: true, get: function () { return CodeBlock_1.CodeBlock; } });
// V4 design line — same props as `CodeBlock`, a different design.
var CodeBlockV4_1 = require("./CodeBlockV4");
Object.defineProperty(exports, "CodeBlockV4", { enumerable: true, get: function () { return CodeBlockV4_1.CodeBlockV4; } });
var JsonViewer_1 = require("./JsonViewer");
Object.defineProperty(exports, "JsonViewer", { enumerable: true, get: function () { return JsonViewer_1.JsonViewer; } });
// V4 design line — same props as `JsonViewer`, a different design.
var JsonViewerV4_1 = require("./JsonViewerV4");
Object.defineProperty(exports, "JsonViewerV4", { enumerable: true, get: function () { return JsonViewerV4_1.JsonViewerV4; } });
var Toolbar_1 = require("./Toolbar");
Object.defineProperty(exports, "Toolbar", { enumerable: true, get: function () { return Toolbar_1.Toolbar; } });
// V4 design line — same props as `Toolbar`, a different design.
var ToolbarV4_1 = require("./ToolbarV4");
Object.defineProperty(exports, "ToolbarV4", { enumerable: true, get: function () { return ToolbarV4_1.ToolbarV4; } });
var SplitButton_1 = require("./SplitButton");
Object.defineProperty(exports, "SplitButton", { enumerable: true, get: function () { return SplitButton_1.SplitButton; } });
// V4 design line — same props as `SplitButton`, a different design.
var SplitButtonV4_1 = require("./SplitButtonV4");
Object.defineProperty(exports, "SplitButtonV4", { enumerable: true, get: function () { return SplitButtonV4_1.SplitButtonV4; } });
var ScrollableTabs_1 = require("./ScrollableTabs");
Object.defineProperty(exports, "ScrollableTabs", { enumerable: true, get: function () { return ScrollableTabs_1.ScrollableTabs; } });
// V4 design line — same props as `ScrollableTabs`, a different design.
var ScrollableTabsV4_1 = require("./ScrollableTabsV4");
Object.defineProperty(exports, "ScrollableTabsV4", { enumerable: true, get: function () { return ScrollableTabsV4_1.ScrollableTabsV4; } });
//# sourceMappingURL=index.js.map