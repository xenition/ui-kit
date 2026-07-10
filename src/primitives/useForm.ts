import * as React from 'react';

export interface UseFormOptions<V> {
  initialValues: V;
  /** Return a map of field → error message. Empty map = valid. */
  validate?: (values: V) => Partial<Record<keyof V, string>>;
  onSubmit: (values: V) => void | Promise<void>;
}

export interface UseFormReturn<V> {
  values: V;
  errors: Partial<Record<keyof V, string>>;
  submitting: boolean;
  setValue: <K extends keyof V>(key: K, value: V[K]) => void;
  setValues: React.Dispatch<React.SetStateAction<V>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof V, string>>>>;
  /** Wire to `<Form onSubmit={handleSubmit}>` — validates then calls `onSubmit`. */
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
}

/**
 * Headless controlled-form helper: tracks values/errors/submitting, validates on
 * submit, and drives the async `onSubmit`. Pairs with `Field` + `Form` and the
 * composed auth forms. No dependency on `@xenition/sdk` — pass your own submit.
 */
export function useForm<V extends object>(options: UseFormOptions<V>): UseFormReturn<V> {
  const [values, setValues] = React.useState<V>(options.initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof V, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const setValue = React.useCallback(<K extends keyof V>(key: K, value: V[K]) => {
    setValues((s) => ({ ...s, [key]: value }) as V);
  }, []);

  const handleSubmit = React.useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const errs = options.validate ? options.validate(values) : {};
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setSubmitting(true);
      try {
        await options.onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
    [options, values]
  );

  return { values, errors, submitting, setValue, setValues, setErrors, handleSubmit };
}
