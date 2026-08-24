/**
 * `@xenition/ui/native/primitives` — themed React Native building blocks that
 * mirror the web `@xenition/ui/primitives` prop contracts (`onClick`→`onPress`
 * is the only idiomatic swap). Genuine RN components (View/Text/Pressable/
 * TextInput/Animated) styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no DOM.
 */

export { XenitionUIProvider } from './XenitionUIProvider';
export type { XenitionUIProviderProps } from './XenitionUIProvider';

// Re-export the theme access hook so a mobile app can `useXenitionTheme()`
// straight from the primitives entry.
export {
  XenitionNativeThemeProvider,
  useXenitionTheme,
} from '../theme';
export type {
  XenitionNativeTheme,
  NativeColorScheme,
  NativeThemeTokens,
  CompiledTheme,
  SemanticColors,
  ThemeSeed,
} from '../theme';

export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export { Wordmark } from './Wordmark';
export type { WordmarkProps, WordmarkSize } from './Wordmark';
export { Card } from './Card';
export type { CardProps } from './Card';
export { Stack } from './Stack';
export type { StackProps, StackDirection, StackGap } from './Stack';
export { Input } from './Input';
export type { InputProps } from './Input';
export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';
export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';
export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';
export { Label } from './Label';
export type { LabelProps } from './Label';
export { Field } from './Field';
export type { FieldProps } from './Field';
export { Badge } from './Badge';
export type { BadgeProps, BadgeTone } from './Badge';
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarSize } from './Avatar';
export { Switch } from './Switch';
export type { SwitchProps } from './Switch';
export { Spinner } from './Spinner';
export type { SpinnerProps, SpinnerSize } from './Spinner';
export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';
export { ChatBubble } from './ChatBubble';
export type { ChatBubbleProps } from './ChatBubble';
export { MessageList } from './MessageList';
export type { MessageListProps } from './MessageList';
export { Table } from './Table';
export type { TableProps, TableColumn } from './Table';
export { Modal } from './Modal';
export type { ModalProps } from './Modal';
export { Eyebrow } from './Eyebrow';
export type { EyebrowProps, EyebrowTone } from './Eyebrow';
export { StatusDot } from './StatusDot';
export type { StatusDotProps, StatusDotTone } from './StatusDot';
export { Rating } from './Rating';
export type { RatingProps, RatingSize } from './Rating';
export { StatusMessage } from './StatusMessage';
export type { StatusMessageProps, StatusMessageState } from './StatusMessage';
export { GlassPanel } from './GlassPanel';
export type { GlassPanelProps, GlassIntensity } from './GlassPanel';
export { GradientText } from './GradientText';
export type { GradientTextProps, GradientTextRamp } from './GradientText';
export { useReducedMotion } from './internal/useReducedMotion';

// PriceTag, EmptyState, and the single `formatMoney` home live in the commerce
// module (matching the web `@xenition/ui/commerce`) and are re-exported here
// for primitive-level ergonomics.
export { PriceTag } from '../commerce/PriceTag';
export type { PriceTagProps } from '../commerce/PriceTag';
export { EmptyState } from '../commerce/EmptyState';
export type { EmptyStateProps } from '../commerce/EmptyState';
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';

// ── native parity: forms ──────────────────────────────────────────────
export { RadioGroup } from './RadioGroup';
export type { RadioGroupProps, RadioOption } from './RadioGroup';
export { Slider } from './Slider';
export type { SliderProps } from './Slider';
export { NumberInput } from './NumberInput';
export type { NumberInputProps } from './NumberInput';
export { PinInput } from './PinInput';
export type { PinInputProps } from './PinInput';
export { Form, useForm } from './Form';
export type { FormProps, UseFormOptions, UseFormReturn } from './Form';

// ── native parity: feedback ───────────────────────────────────────────
export { Alert } from './Alert';
export type { AlertProps, AlertTone } from './Alert';
export { Progress } from './Progress';
export type { ProgressProps, ProgressTone } from './Progress';
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
export { ToastProvider, useToast } from './Toast';
export type { ToastOptions, ToastTone, ToastContextValue } from './Toast';

// ── native parity: overlays ───────────────────────────────────────────
export { Drawer } from './Drawer';
export type { DrawerProps, DrawerSide } from './Drawer';
export { Popover } from './Popover';
export type { PopoverProps } from './Popover';
export { Menu } from './Menu';
export type { MenuProps, MenuItem } from './Menu';
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItemData } from './Accordion';
export { Popconfirm } from './Popconfirm';
export type { PopconfirmProps } from './Popconfirm';
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipSide } from './Tooltip';

// ── native parity: data display ───────────────────────────────────────
export { Tag } from './Tag';
export type { TagProps, TagTone } from './Tag';
export { List } from './List';
export type { ListProps, ListItemData } from './List';
export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';
export { Timeline } from './Timeline';
export type { TimelineProps, TimelineItemData, TimelineTone } from './Timeline';
export { Descriptions } from './Descriptions';
export type { DescriptionsProps, DescriptionItem } from './Descriptions';
export { AvatarGroup } from './AvatarGroup';
export type { AvatarGroupProps } from './AvatarGroup';
export { Segmented } from './Segmented';
export type { SegmentedProps, SegmentedOption } from './Segmented';
export { Steps } from './Steps';
export type { StepsProps, StepItem } from './Steps';
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';

// ── native parity: composed auth ──────────────────────────────────────
export { AuthCard } from './AuthCard';
export type { AuthCardProps } from './AuthCard';
export { LoginForm } from './LoginForm';
export type { LoginFormProps, LoginValues } from './LoginForm';
export { SignupForm } from './SignupForm';
export type { SignupFormProps, SignupValues } from './SignupForm';
export { ForgotPasswordForm } from './ForgotPasswordForm';
export type { ForgotPasswordFormProps } from './ForgotPasswordForm';

// ── app shell (dashboard layout) ──────────────────────────────────────
export { AppShell } from './AppShell';
export type { AppShellProps } from './AppShell';
export { Sidebar } from './Sidebar';
export type { SidebarProps, SidebarItem, SidebarGroup } from './Sidebar';

// ── native parity: heavy data (tables + rich inputs) ──────────────────
export { DataTable } from './DataTable';
export type { DataTableProps, DataTableColumn } from './DataTable';
export { CrudTable } from './CrudTable';
export type { CrudTableProps, CrudField, CrudFieldType } from './CrudTable';
export { Combobox } from './Combobox';
export type { ComboboxProps, ComboboxOption } from './Combobox';
export { DatePicker } from './DatePicker';
export type { DatePickerProps } from './DatePicker';
export { Upload } from './Upload';
export type { UploadProps, UploadFile } from './Upload';

// ── native parity: data-entry gap components ──────────────────────────
export { SearchInput } from './SearchInput';
export type { SearchInputProps } from './SearchInput';
export { PasswordInput } from './PasswordInput';
export type { PasswordInputProps } from './PasswordInput';
export { TimePicker } from './TimePicker';
export type { TimePickerProps, TimeValue } from './TimePicker';
export { DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps, DateRange } from './DateRangePicker';
export { MultiSelect } from './MultiSelect';
export type { MultiSelectProps, MultiSelectOption } from './MultiSelect';
export { TagInput } from './TagInput';
export type { TagInputProps } from './TagInput';
export { AutoComplete } from './AutoComplete';
export type { AutoCompleteProps, AutoCompleteOption } from './AutoComplete';
export { RangeSlider } from './RangeSlider';
export type { RangeSliderProps } from './RangeSlider';
export { ToggleGroup } from './ToggleGroup';
export type { ToggleGroupProps, ToggleGroupOption } from './ToggleGroup';
export { PhoneInput } from './PhoneInput';
export type { PhoneInputProps } from './PhoneInput';
export { CurrencyInput } from './CurrencyInput';
export type { CurrencyInputProps } from './CurrencyInput';
export { ColorPicker } from './ColorPicker';
export type { ColorPickerProps, ColorSwatch } from './ColorPicker';

// ── native parity: mobile patterns + feedback ─────────────────────────
export { Icon } from './Icon';
export type { IconProps } from './Icon';
export { FloatButton } from './FloatButton';
export type { FloatButtonProps, FloatButtonPlacement } from './FloatButton';
export { BottomNav } from './BottomNav';
export type { BottomNavProps, BottomNavItem } from './BottomNav';
export { ContextMenu } from './ContextMenu';
export type { ContextMenuProps, ContextMenuAction } from './ContextMenu';
export { ActionSheet } from './ActionSheet';
export type { ActionSheetProps, ActionSheetAction } from './ActionSheet';
export { BottomSheet } from './BottomSheet';
export type { BottomSheetProps } from './BottomSheet';
export { Banner } from './Banner';
export type { BannerProps, BannerTone } from './Banner';
export { Callout } from './Callout';
export type { CalloutProps, CalloutTone } from './Callout';
export { Result } from './Result';
export type { ResultProps, ResultStatus } from './Result';
export { LoadingOverlay } from './LoadingOverlay';
export type { LoadingOverlayProps } from './LoadingOverlay';
export { ButtonGroup } from './ButtonGroup';
export type { ButtonGroupProps } from './ButtonGroup';
export { Watermark } from './Watermark';
export type { WatermarkProps } from './Watermark';

// ── native parity: display + navigation gaps ──────────────────────────
export { Tree } from './Tree';
export type { TreeProps, TreeNode } from './Tree';
export { Statistic } from './Statistic';
export type { StatisticProps, StatisticTrend } from './Statistic';
export { Calendar } from './Calendar';
export type { CalendarProps } from './Calendar';
export { Kanban } from './Kanban';
export type { KanbanProps, KanbanColumn, KanbanCard } from './Kanban';
export { VirtualList } from './VirtualList';
export type { VirtualListProps } from './VirtualList';
export { CodeBlock } from './CodeBlock';
export type { CodeBlockProps } from './CodeBlock';
export { JsonViewer } from './JsonViewer';
export type { JsonViewerProps } from './JsonViewer';
export { Toolbar } from './Toolbar';
export type { ToolbarProps, ToolbarAction } from './Toolbar';
export { SplitButton } from './SplitButton';
export type { SplitButtonProps, SplitButtonAction, SplitButtonVariant } from './SplitButton';
export { ScrollableTabs } from './ScrollableTabs';
export type { ScrollableTabsProps, ScrollableTabItem } from './ScrollableTabs';
