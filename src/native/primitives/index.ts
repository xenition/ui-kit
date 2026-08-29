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
  DesignLineProvider,
  designed,
  resolveDesign,
  useDesignLine,
} from '../theme';
export type {
  XenitionNativeTheme,
  NativeColorScheme,
  NativeThemeTokens,
  CompiledTheme,
  SemanticColors,
  ThemeSeed,
  DesignLine,
  DesignSet,
  ThemeDepth,
  GradientTokens,
  GlassTokens,
  ElevationTokens,
} from '../theme';

export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonTone } from './Button';
// V4 design line — same props as `Button`, a different design (see design-line.tsx).
export { ButtonV4 } from './ButtonV4';
export type { ButtonV4Props } from './ButtonV4';
export { Wordmark } from './Wordmark';
export type { WordmarkProps, WordmarkSize } from './Wordmark';
// V4 design line — same props as `Wordmark`, a different design.
export { WordmarkV4 } from './WordmarkV4';
export type { WordmarkV4Props } from './WordmarkV4';
export { Card } from './Card';
export type { CardProps } from './Card';
// V4 design line — same props as `Card`, a different design.
export { CardV4 } from './CardV4';
export type { CardV4Props } from './CardV4';
export { Stack } from './Stack';
export type { StackProps, StackDirection, StackGap } from './Stack';
// V4 design line — Stack is a pure layout primitive, so V4 IS the base.
// See StackV4.tsx for why that is the honest answer rather than a placeholder.
export { StackV4 } from './StackV4';
export type { StackV4Props } from './StackV4';
export { Input } from './Input';
export type { InputProps } from './Input';
// V4 design line — `Input` props plus an optional `error` message.
export { InputV4 } from './InputV4';
export type { InputV4Props } from './InputV4';
export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';
// V4 design line — same props as `Textarea`, a different design.
export { TextareaV4 } from './TextareaV4';
export type { TextareaV4Props } from './TextareaV4';
export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';
// V4 design line — same props as `Checkbox`, a different design.
export { CheckboxV4 } from './CheckboxV4';
export type { CheckboxV4Props } from './CheckboxV4';
export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';
// V4 design line — same props as `Select`, a different design.
export { SelectV4 } from './SelectV4';
export type { SelectV4Props } from './SelectV4';
export { Label } from './Label';
export type { LabelProps } from './Label';
// V4 design line — same props as `Label`, a different design.
export { LabelV4 } from './LabelV4';
export type { LabelV4Props } from './LabelV4';
export { Field } from './Field';
export type { FieldProps } from './Field';
// V4 design line — same props as `Field`, a different design.
export { FieldV4 } from './FieldV4';
export type { FieldV4Props } from './FieldV4';
export { Badge } from './Badge';
export type { BadgeProps, BadgeTone } from './Badge';
// V4 design line — same props as `Badge`, a different design.
export { BadgeV4 } from './BadgeV4';
export type { BadgeV4Props } from './BadgeV4';
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarSize, AvatarStatus, AvatarShape } from './Avatar';
// V4 design line — same props as `Avatar`, a different design.
export { AvatarV4 } from './AvatarV4';
export type { AvatarV4Props } from './AvatarV4';
export { Switch } from './Switch';
export type { SwitchProps } from './Switch';
// V4 design line — same props as `Switch`, a different design.
export { SwitchV4 } from './SwitchV4';
export type { SwitchV4Props } from './SwitchV4';
export { Spinner } from './Spinner';
export type { SpinnerProps, SpinnerSize } from './Spinner';
// V4 design line — same props as `Spinner`, a different design.
export { SpinnerV4 } from './SpinnerV4';
export type { SpinnerV4Props } from './SpinnerV4';
export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';
// V4 design line — same props as `Tabs`, a different design.
export { TabsV4 } from './TabsV4';
export type { TabsV4Props } from './TabsV4';
export { ChatBubble } from './ChatBubble';
export type { ChatBubbleProps } from './ChatBubble';
// V4 design line — same props as `ChatBubble`, a different design.
export { ChatBubbleV4 } from './ChatBubbleV4';
export type { ChatBubbleV4Props } from './ChatBubbleV4';
export { MessageList } from './MessageList';
export type { MessageListProps } from './MessageList';
// V4 design line — same props as `MessageList`, a different design.
export { MessageListV4 } from './MessageListV4';
export type { MessageListV4Props } from './MessageListV4';
export { Table } from './Table';
export type { TableProps, TableColumn } from './Table';
// V4 design line — same props as `Table`, a different design.
export { TableV4 } from './TableV4';
export type { TableV4Props } from './TableV4';
export { Modal } from './Modal';
export type { ModalProps } from './Modal';
export { ModalV4 } from './ModalV4';
export type { ModalV4Props } from './ModalV4';
export { Eyebrow } from './Eyebrow';
export type { EyebrowProps, EyebrowTone } from './Eyebrow';
// V4 design line — same props as `Eyebrow`, a different design.
export { EyebrowV4 } from './EyebrowV4';
export type { EyebrowV4Props } from './EyebrowV4';
export { StatusDot } from './StatusDot';
export type { StatusDotProps, StatusDotTone } from './StatusDot';
// V4 design line — same props as `StatusDot`, a different design.
export { StatusDotV4 } from './StatusDotV4';
export type { StatusDotV4Props } from './StatusDotV4';
export { Rating } from './Rating';
export type { RatingProps, RatingSize } from './Rating';
// V4 design line — same props as `Rating`, a different design.
export { RatingV4 } from './RatingV4';
export type { RatingV4Props } from './RatingV4';
export { StatusMessage } from './StatusMessage';
export type { StatusMessageProps, StatusMessageState } from './StatusMessage';
// V4 design line — same props as `StatusMessage`, a different design.
export { StatusMessageV4 } from './StatusMessageV4';
export type { StatusMessageV4Props } from './StatusMessageV4';
export { GlassPanel } from './GlassPanel';
export type { GlassPanelProps, GlassIntensity } from './GlassPanel';
export { GradientText } from './GradientText';
export type { GradientTextProps, GradientTextRamp } from './GradientText';
export { useReducedMotion } from './internal/useReducedMotion';

export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';
// V4 design line — same props as `EmptyState`, a different design.
export { EmptyStateV4 } from './EmptyStateV4';
export type { EmptyStateV4Props } from './EmptyStateV4';

// PriceTag and the single `formatMoney` home live in the commerce module
// (matching the web `@xenition/ui/commerce`) and are re-exported here for
// primitive-level ergonomics. Money is a commerce concept, so the file stays
// there; `EmptyState` was not, so it moved here and `commerce` re-exports it.
export { PriceTag } from '../commerce/PriceTag';
export type { PriceTagProps } from '../commerce/PriceTag';
// V4 design line — same props as `PriceTag`, a different design.
export { PriceTagV4 } from '../commerce/PriceTagV4';
export type { PriceTagV4Props } from '../commerce/PriceTagV4';
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';

// ── native parity: forms ──────────────────────────────────────────────
export { RadioGroup } from './RadioGroup';
export type { RadioGroupProps, RadioOption } from './RadioGroup';
// V4 design line — same props as `RadioGroup`, a different design.
export { RadioGroupV4 } from './RadioGroupV4';
export type { RadioGroupV4Props } from './RadioGroupV4';
export { Slider } from './Slider';
export type { SliderProps } from './Slider';
// V4 design line — same props as `Slider`, a different design.
export { SliderV4 } from './SliderV4';
export type { SliderV4Props } from './SliderV4';
export { NumberInput } from './NumberInput';
export type { NumberInputProps } from './NumberInput';
// V4 design line — same props as `NumberInput`, a different design.
export { NumberInputV4 } from './NumberInputV4';
export type { NumberInputV4Props } from './NumberInputV4';
export { PinInput } from './PinInput';
export type { PinInputProps } from './PinInput';
// V4 design line — same props as `PinInput`, a different design.
export { PinInputV4 } from './PinInputV4';
export type { PinInputV4Props } from './PinInputV4';
export { Form, useForm } from './Form';
export type { FormProps, UseFormOptions, UseFormReturn } from './Form';
// V4 design line — same props as `Form`, a different design.
export { FormV4 } from './FormV4';
export type { FormV4Props } from './FormV4';

// ── native parity: feedback ───────────────────────────────────────────
export { Alert } from './Alert';
export type { AlertProps, AlertTone } from './Alert';
// V4 design line — same props as `Alert`, a different design.
export { AlertV4 } from './AlertV4';
export type { AlertV4Props } from './AlertV4';
export { Progress } from './Progress';
export type { ProgressProps, ProgressTone } from './Progress';
// V4 design line — same props as `Progress`, a different design.
export { ProgressV4 } from './ProgressV4';
export type { ProgressV4Props } from './ProgressV4';
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
// V4 design line — same props as `Skeleton`, a different design.
export { SkeletonV4 } from './SkeletonV4';
export type { SkeletonV4Props } from './SkeletonV4';
export { ToastProvider, useToast } from './Toast';
export type { ToastOptions, ToastTone, ToastContextValue } from './Toast';
export { ToastProviderV4 } from './ToastProviderV4';
export type { ToastProviderV4Props } from './ToastProviderV4';
export { XenitionNativeThemeProviderV4, XenitionNativeMotionContext, useXenitionMotionPreference } from './XenitionNativeThemeProviderV4';
export type { XenitionNativeThemeProviderV4Props, XenitionNativeMotionPreference } from './XenitionNativeThemeProviderV4';

// ── native parity: overlays ───────────────────────────────────────────
export { Drawer } from './Drawer';
export type { DrawerProps, DrawerSide } from './Drawer';
// V4 design line — same props as `Drawer`, a different design.
export { DrawerV4 } from './DrawerV4';
export type { DrawerV4Props } from './DrawerV4';
export { Popover } from './Popover';
export type { PopoverProps } from './Popover';
// V4 design line — same props as `Popover`, a different design.
export { PopoverV4 } from './PopoverV4';
export type { PopoverV4Props } from './PopoverV4';
export { Menu } from './Menu';
export type { MenuProps, MenuItem } from './Menu';
// V4 design line — same props as `Menu`, a different design.
export { MenuV4 } from './MenuV4';
export type { MenuV4Props } from './MenuV4';
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItemData } from './Accordion';
// V4 design line — same props as `Accordion`, a different design.
export { AccordionV4 } from './AccordionV4';
export type { AccordionV4Props } from './AccordionV4';
export { Popconfirm } from './Popconfirm';
export type { PopconfirmProps } from './Popconfirm';
// V4 design line — same props as `Popconfirm`, a different design.
export { PopconfirmV4 } from './PopconfirmV4';
export type { PopconfirmV4Props } from './PopconfirmV4';
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipSide } from './Tooltip';
// V4 design line — same props as `Tooltip`, a different design.
export { TooltipV4 } from './TooltipV4';
export type { TooltipV4Props } from './TooltipV4';

// ── native parity: data display ───────────────────────────────────────
export { Tag } from './Tag';
export type { TagProps, TagTone } from './Tag';
// V4 design line — same props as `Tag`, a different design.
export { TagV4 } from './TagV4';
export type { TagV4Props } from './TagV4';
export { List } from './List';
export type { ListProps, ListItemData } from './List';
// V4 design line — same props as `List`, a different design.
export { ListV4 } from './ListV4';
export type { ListV4Props } from './ListV4';
export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';
// V4 design line — same props as `Pagination`, a different design.
export { PaginationV4 } from './PaginationV4';
export type { PaginationV4Props } from './PaginationV4';
export { Timeline } from './Timeline';
export type { TimelineProps, TimelineItemData, TimelineTone } from './Timeline';
// V4 design line — same props as `Timeline`, a different design.
export { TimelineV4 } from './TimelineV4';
export type { TimelineV4Props } from './TimelineV4';
export { Descriptions } from './Descriptions';
export type { DescriptionsProps, DescriptionItem } from './Descriptions';
// V4 design line — same props as `Descriptions`, a different design.
export { DescriptionsV4 } from './DescriptionsV4';
export type { DescriptionsV4Props } from './DescriptionsV4';
export { AvatarGroup } from './AvatarGroup';
export type { AvatarGroupProps } from './AvatarGroup';
// V4 design line — same props as `AvatarGroup`, a different design.
export { AvatarGroupV4 } from './AvatarGroupV4';
export type { AvatarGroupV4Props } from './AvatarGroupV4';
export { Segmented } from './Segmented';
export type { SegmentedProps, SegmentedOption } from './Segmented';
// V4 design line — same props as `Segmented`, a different design.
export { SegmentedV4 } from './SegmentedV4';
export type { SegmentedV4Props } from './SegmentedV4';
export { Steps } from './Steps';
export type { StepsProps, StepItem } from './Steps';
// V4 design line — same props as `Steps`, a different design.
export { StepsV4 } from './StepsV4';
export type { StepsV4Props } from './StepsV4';
// `Steps` is the horizontal progress indicator; `StepList` is the vertical,
// content-bearing instruction list. Pick by the question you are answering:
// "where am I in this flow" vs "here are the instructions".
export { StepList } from './StepList';
export type { StepListProps, StepListItem } from './StepList';
export { StepListV4, RAIL_MIN_ROWS } from './StepListV4';
export type { StepListV4Props, StepListV4Item } from './StepListV4';
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';
// V4 design line — same props as `Breadcrumb`, a different design.
export { BreadcrumbV4 } from './BreadcrumbV4';
export type { BreadcrumbV4Props } from './BreadcrumbV4';

// ── native parity: composed auth ──────────────────────────────────────
export { AuthCard } from './AuthCard';
export type { AuthCardProps } from './AuthCard';
// The shared auth anatomy (ONBOARDING-DESIGN-SPEC §5/§6/§9) — the same parts
// `SignInScreen` and the three composed forms are drawn from, so an app that
// assembles its own auth surface gets the identical 56px field, CTA and
// provider row rather than a near-miss.
export {
  AUTH_CONTROL_HEIGHT,
  AUTH_TAP_TARGET,
  AUTH_DEFAULT_TERMS_LINKS,
  AuthBrandTile,
  AuthDivider,
  AuthField,
  AuthHeading,
  AuthProviderButton,
  AuthStickyFooter,
  AuthSubmitButton,
  AuthSwitchFooter,
  AuthTermsCard,
} from './AuthCard';
export type {
  AuthAlign,
  AuthBrandTileProps,
  AuthDividerProps,
  AuthFieldProps,
  AuthHeadingProps,
  AuthProviderButtonProps,
  AuthStickyFooterProps,
  AuthSubmitButtonProps,
  AuthSwitchFooterProps,
  AuthTermsCardProps,
  AuthTermsLink,
} from './AuthCard';
export { AuthFieldV4 } from './AuthFieldV4';
export type { AuthFieldV4Props } from './AuthFieldV4';
export { AuthTermsCardV4 } from './AuthTermsCardV4';
export type { AuthTermsCardV4Props, AuthTermsCardV4Align } from './AuthTermsCardV4';
export { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
export type { AuthSwitchFooterV4Props, AuthSwitchTone } from './AuthSwitchFooterV4';
export { AuthStickyFooterV4 } from './AuthStickyFooterV4';
export type { AuthStickyFooterV4Props } from './AuthStickyFooterV4';
export { AuthSubmitButtonV4, AUTH_SUBMIT_HEIGHT_V4 } from './AuthSubmitButtonV4';
export type { AuthSubmitButtonV4Props } from './AuthSubmitButtonV4';
export { AuthDividerV4 } from './AuthDividerV4';
export type { AuthDividerV4Props, AuthDividerV4Align } from './AuthDividerV4';
export { AuthProviderButtonV4 } from './AuthProviderButtonV4';
export type { AuthProviderButtonV4Props } from './AuthProviderButtonV4';
export { AuthBrandTileV4 } from './AuthBrandTileV4';
export type { AuthBrandTileV4Props, AuthBrandTileSize, AuthBrandTileShape } from './AuthBrandTileV4';
export { AuthHeadingV4 } from './AuthHeadingV4';
export type { AuthHeadingV4Props } from './AuthHeadingV4';
export { AuthCardV4 } from './AuthCardV4';
export type { AuthCardV4Props, AuthCardWidth } from './AuthCardV4';
export { ForgotPasswordFormV4 } from './ForgotPasswordFormV4';
export type { ForgotPasswordFormV4Props } from './ForgotPasswordFormV4';
export { SignupFormV4 } from './SignupFormV4';
export type { SignupFormV4Props, SignupProviderV4 } from './SignupFormV4';
export { LoginFormV4 } from './LoginFormV4';
export type { LoginFormV4Props, LoginProviderV4 } from './LoginFormV4';
export { LoginForm } from './LoginForm';
export type { LoginFormProps, LoginValues } from './LoginForm';
export { SignupForm } from './SignupForm';
export type { SignupFormProps, SignupValues } from './SignupForm';
export { ForgotPasswordForm } from './ForgotPasswordForm';
export type { ForgotPasswordFormProps } from './ForgotPasswordForm';

// ── app shell (dashboard layout) ──────────────────────────────────────
export { AppShell } from './AppShell';
export type { AppShellProps } from './AppShell';
// V4 design line — same props as `AppShell`, a different design.
export { AppShellV4 } from './AppShellV4';
export type { AppShellV4Props } from './AppShellV4';
export { Sidebar } from './Sidebar';
export type { SidebarProps, SidebarItem, SidebarGroup } from './Sidebar';
// V4 design line — same props as `Sidebar`, a different design.
export { SidebarV4 } from './SidebarV4';
export type { SidebarV4Props } from './SidebarV4';

// ── native parity: heavy data (tables + rich inputs) ──────────────────
export { DataTable } from './DataTable';
export type { DataTableProps, DataTableColumn } from './DataTable';
// V4 design line — same props as `DataTable`, a different design.
export { DataTableV4 } from './DataTableV4';
export type { DataTableV4Props } from './DataTableV4';
export { CrudTable } from './CrudTable';
export type { CrudTableProps, CrudField, CrudFieldType } from './CrudTable';
// V4 design line — same props as `CrudTable`, a different design.
export { CrudTableV4 } from './CrudTableV4';
export type { CrudTableV4Props } from './CrudTableV4';
export { Combobox } from './Combobox';
export type { ComboboxProps, ComboboxOption } from './Combobox';
// V4 design line — same props as `Combobox`, a different design.
export { ComboboxV4 } from './ComboboxV4';
export type { ComboboxV4Props } from './ComboboxV4';
export { DatePicker } from './DatePicker';
export type { DatePickerProps } from './DatePicker';
// V4 design line — same props as `DatePicker`, a different design.
export { DatePickerV4 } from './DatePickerV4';
export type { DatePickerV4Props } from './DatePickerV4';
export { Upload } from './Upload';
export type { UploadProps, UploadFile } from './Upload';
// V4 design line — same props as `Upload`, a different design.
export { UploadV4 } from './UploadV4';
export type { UploadV4Props } from './UploadV4';

// ── native parity: data-entry gap components ──────────────────────────
export { SearchInput } from './SearchInput';
export type { SearchInputProps } from './SearchInput';
// V4 design line — same props as `SearchInput`, a different design.
export { SearchInputV4 } from './SearchInputV4';
export type { SearchInputV4Props } from './SearchInputV4';
export { PasswordInput } from './PasswordInput';
export type { PasswordInputProps } from './PasswordInput';
// V4 design line — same props as `PasswordInput`, a different design.
export { PasswordInputV4 } from './PasswordInputV4';
export type { PasswordInputV4Props } from './PasswordInputV4';
export { TimePicker } from './TimePicker';
export type { TimePickerProps, TimeValue } from './TimePicker';
// V4 design line — same props as `TimePicker`, a different design.
export { TimePickerV4 } from './TimePickerV4';
export type { TimePickerV4Props } from './TimePickerV4';
export { DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps, DateRange } from './DateRangePicker';
// V4 design line — same props as `DateRangePicker`, a different design.
export { DateRangePickerV4 } from './DateRangePickerV4';
export type { DateRangePickerV4Props } from './DateRangePickerV4';
export { MultiSelect } from './MultiSelect';
export type { MultiSelectProps, MultiSelectOption } from './MultiSelect';
// V4 design line — same props as `MultiSelect`, a different design.
export { MultiSelectV4 } from './MultiSelectV4';
export type { MultiSelectV4Props } from './MultiSelectV4';
export { TagInput } from './TagInput';
export type { TagInputProps } from './TagInput';
// V4 design line — same props as `TagInput`, a different design.
export { TagInputV4 } from './TagInputV4';
export type { TagInputV4Props } from './TagInputV4';
export { AutoComplete } from './AutoComplete';
export type { AutoCompleteProps, AutoCompleteOption } from './AutoComplete';
// V4 design line — same props as `AutoComplete`, a different design.
export { AutoCompleteV4 } from './AutoCompleteV4';
export type { AutoCompleteV4Props } from './AutoCompleteV4';
export { RangeSlider } from './RangeSlider';
export type { RangeSliderProps } from './RangeSlider';
// V4 design line — same props as `RangeSlider`, a different design.
export { RangeSliderV4 } from './RangeSliderV4';
export type { RangeSliderV4Props } from './RangeSliderV4';
export { ToggleGroup } from './ToggleGroup';
export type { ToggleGroupProps, ToggleGroupOption } from './ToggleGroup';
// V4 design line — same props as `ToggleGroup`, a different design.
export { ToggleGroupV4 } from './ToggleGroupV4';
export type { ToggleGroupV4Props } from './ToggleGroupV4';
export { PhoneInput } from './PhoneInput';
export type { PhoneInputProps } from './PhoneInput';
// V4 design line — same props as `PhoneInput`, a different design.
export { PhoneInputV4 } from './PhoneInputV4';
export type { PhoneInputV4Props } from './PhoneInputV4';
export { CurrencyInput } from './CurrencyInput';
export type { CurrencyInputProps } from './CurrencyInput';
// V4 design line — same props as `CurrencyInput`, a different design.
export { CurrencyInputV4 } from './CurrencyInputV4';
export type { CurrencyInputV4Props } from './CurrencyInputV4';
export { ColorPicker } from './ColorPicker';
export type { ColorPickerProps, ColorSwatch } from './ColorPicker';
// V4 design line — same props as `ColorPicker`, a different design.
export { ColorPickerV4 } from './ColorPickerV4';
export type { ColorPickerV4Props } from './ColorPickerV4';

// ── native parity: mobile patterns + feedback ─────────────────────────
// The way to render text: `variant` (type scale) + `tone` (semantic slot)
// instead of a hand-assembled style. A raw `fontSize` in an app is a bug.
export { Text } from './Text';
export type { TextProps, TextSize, TextTone, TextWeight, TextAlign } from './Text';
export { TextV4 } from './TextV4';
export type { TextV4Props, TextV4Face, TextV4Numeric } from './TextV4';
export { Icon } from './Icon';
export type { IconProps } from './Icon';
export { IconV4 } from './IconV4';
export type { IconV4Props, IconBadge, IconBadgeShape } from './IconV4';
// The named icon set behind `Icon`'s `name`. One shared file backs both twins,
// so the vocabulary cannot drift between web and native.
export { ICON_GLYPHS, isIconName, resolveIconGlyph } from '../../primitives/icon-names';
export type { IconName } from '../../primitives/icon-names';
export { FloatButton } from './FloatButton';
export type { FloatButtonProps, FloatButtonPlacement } from './FloatButton';
// V4 design line — same props as `FloatButton`, a different design.
export { FloatButtonV4 } from './FloatButtonV4';
export type { FloatButtonV4Props } from './FloatButtonV4';
export { BottomNav } from './BottomNav';
export type { BottomNavProps, BottomNavItem } from './BottomNav';
// V4 design line — same props as `BottomNav`, a different design.
export { BottomNavV4 } from './BottomNavV4';
export type { BottomNavV4Props } from './BottomNavV4';
export { ContextMenu } from './ContextMenu';
export type { ContextMenuProps, ContextMenuAction } from './ContextMenu';
// V4 design line — same props as `ContextMenu`, a different design.
export { ContextMenuV4 } from './ContextMenuV4';
export type { ContextMenuV4Props } from './ContextMenuV4';
export { ActionSheet } from './ActionSheet';
export type { ActionSheetProps, ActionSheetAction } from './ActionSheet';
export { ActionSheetV4 } from './ActionSheetV4';
export type { ActionSheetV4Props } from './ActionSheetV4';
export { BottomSheet } from './BottomSheet';
export type { BottomSheetProps } from './BottomSheet';
export { BottomSheetV4 } from './BottomSheetV4';
export type { BottomSheetV4Props } from './BottomSheetV4';
export { Banner } from './Banner';
export type { BannerProps, BannerTone } from './Banner';
// V4 design line — same props as `Banner`, a different design.
export { BannerV4 } from './BannerV4';
export type { BannerV4Props } from './BannerV4';
export { Callout } from './Callout';
export type { CalloutProps, CalloutTone } from './Callout';
// V4 design line — same props as `Callout`, a different design.
export { CalloutV4 } from './CalloutV4';
export type { CalloutV4Props } from './CalloutV4';
export { Result } from './Result';
export type { ResultProps, ResultStatus } from './Result';
// V4 design line — same props as `Result`, a different design.
export { ResultV4 } from './ResultV4';
export type { ResultV4Props } from './ResultV4';
export { LoadingOverlay } from './LoadingOverlay';
export type { LoadingOverlayProps } from './LoadingOverlay';
// V4 design line — same props as `LoadingOverlay`, a different design.
export { LoadingOverlayV4 } from './LoadingOverlayV4';
export type { LoadingOverlayV4Props } from './LoadingOverlayV4';
export { ButtonGroup } from './ButtonGroup';
export type { ButtonGroupProps } from './ButtonGroup';
// V4 design line — same props as `ButtonGroup`, a different design.
export { ButtonGroupV4 } from './ButtonGroupV4';
export type { ButtonGroupV4Props } from './ButtonGroupV4';
export { Watermark } from './Watermark';
export type { WatermarkProps } from './Watermark';
// V4 design line — same props as `Watermark`, a different design.
export { WatermarkV4 } from './WatermarkV4';
export type { WatermarkV4Props } from './WatermarkV4';

// ── native parity: display + navigation gaps ──────────────────────────
export { Tree } from './Tree';
export type { TreeProps, TreeNode } from './Tree';
// V4 design line — same props as `Tree`, a different design.
export { TreeV4 } from './TreeV4';
export type { TreeV4Props } from './TreeV4';
export { Statistic } from './Statistic';
export type { StatisticProps, StatisticTrend } from './Statistic';
// V4 design line — same props as `Statistic`, a different design.
export { StatisticV4 } from './StatisticV4';
export type { StatisticV4Props } from './StatisticV4';
export { Calendar } from './Calendar';
export type { CalendarProps } from './Calendar';
// V4 design line — same props as `Calendar`, a different design.
export { CalendarV4 } from './CalendarV4';
export type { CalendarV4Props } from './CalendarV4';
export { Kanban } from './Kanban';
export type { KanbanProps, KanbanColumn, KanbanCard } from './Kanban';
// V4 design line — same props as `Kanban`, a different design.
export { KanbanV4 } from './KanbanV4';
export type { KanbanV4Props } from './KanbanV4';
export { VirtualList } from './VirtualList';
export type { VirtualListProps } from './VirtualList';
// V4 design line — same props as `VirtualList`, a different design.
export { VirtualListV4 } from './VirtualListV4';
export type { VirtualListV4Props } from './VirtualListV4';
export { CodeBlock } from './CodeBlock';
export type { CodeBlockProps } from './CodeBlock';
// V4 design line — same props as `CodeBlock`, a different design.
export { CodeBlockV4 } from './CodeBlockV4';
export type { CodeBlockV4Props } from './CodeBlockV4';
export { JsonViewer } from './JsonViewer';
export type { JsonViewerProps } from './JsonViewer';
// V4 design line — same props as `JsonViewer`, a different design.
export { JsonViewerV4 } from './JsonViewerV4';
export type { JsonViewerV4Props } from './JsonViewerV4';
export { Toolbar } from './Toolbar';
export type { ToolbarProps, ToolbarAction } from './Toolbar';
// V4 design line — same props as `Toolbar`, a different design.
export { ToolbarV4 } from './ToolbarV4';
export type { ToolbarV4Props } from './ToolbarV4';
export { SplitButton } from './SplitButton';
export type { SplitButtonProps, SplitButtonAction, SplitButtonVariant } from './SplitButton';
// V4 design line — same props as `SplitButton`, a different design.
export { SplitButtonV4 } from './SplitButtonV4';
export type { SplitButtonV4Props } from './SplitButtonV4';
export { ScrollableTabs } from './ScrollableTabs';
export type { ScrollableTabsProps, ScrollableTabItem } from './ScrollableTabs';
// V4 design line — same props as `ScrollableTabs`, a different design.
export { ScrollableTabsV4 } from './ScrollableTabsV4';
export type { ScrollableTabsV4Props } from './ScrollableTabsV4';
