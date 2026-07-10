/**
 * `@xenition/ui/native/primitives` — themed React Native building blocks that
 * mirror the web `@xenition/ui/primitives` prop contracts (`onClick`→`onPress`
 * is the only idiomatic swap). Genuine RN components (View/Text/Pressable/
 * TextInput/Animated) styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no DOM.
 */
export { XenitionUIProvider } from './XenitionUIProvider';
export type { XenitionUIProviderProps } from './XenitionUIProvider';
export { XenitionNativeThemeProvider, useXenitionTheme, } from '../theme';
export type { XenitionNativeTheme, NativeColorScheme, NativeThemeTokens, CompiledTheme, SemanticColors, ThemeSeed, } from '../theme';
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export { Card } from './Card';
export type { CardProps } from './Card';
export { Stack } from './Stack';
export type { StackProps, StackDirection, StackGap } from './Stack';
export { Input } from './Input';
export type { InputProps } from './Input';
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
export { PriceTag } from '../commerce/PriceTag';
export type { PriceTagProps } from '../commerce/PriceTag';
export { EmptyState } from '../commerce/EmptyState';
export type { EmptyStateProps } from '../commerce/EmptyState';
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';
//# sourceMappingURL=index.d.ts.map