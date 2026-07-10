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
