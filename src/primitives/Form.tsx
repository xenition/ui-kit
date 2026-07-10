import * as React from 'react';
import { cn } from './cn';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

/**
 * Thin `<form>` wrapper with vertical field spacing. Pair with `useForm` +
 * `Field` for a complete, validated form.
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { className, ...rest },
  ref
) {
  return <form ref={ref} className={cn('flex flex-col gap-4', className)} {...rest} />;
});
