/**
 * `@xenition/ui/primitives` — small themed building blocks (web).
 * Every class is bound to the `--xen-*` tokens via the Tailwind preset;
 * literal colors are forbidden in this package (CI lint rule).
 */

export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export { Card } from './Card';
export type { CardProps } from './Card';
export { Input } from './Input';
export type { InputProps } from './Input';
export { Stack } from './Stack';
export type { StackProps, StackDirection, StackGap } from './Stack';
export { cn } from './cn';
