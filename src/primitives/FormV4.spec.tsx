/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { FieldV4 } from './FieldV4';
import type { Form } from './Form';
import { FormV4 } from './FormV4';
import { InputV4 } from './InputV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(props: Partial<React.ComponentProps<typeof FormV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <FormV4 {...props}>
        <FieldV4 label="Email">
          <InputV4 />
        </FieldV4>
      </FormV4>
    </XenitionUIProvider>
  );
}

const form = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-form]') as HTMLElement;

describe('FormV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Form> = {
      className: 'extra',
      onSubmit: () => {},
      noValidate: true,
    };
    const asV4: React.ComponentProps<typeof FormV4> = same;
    expect(asV4).toBe(same);
  });

  it('is still a real <form> that submits', () => {
    const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());
    const { container } = mount({ onSubmit });
    fireEvent.submit(form(container));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('spaces its questions off the token scale, not off Tailwind’s', () => {
    // `gap-4` is a fixed 16px a re-scaled seed cannot move — in the one
    // component whose entire job is spacing.
    const el = form(mount().container);
    expect(el.className).toContain('gap-lg');
    expect(el.className).not.toContain('gap-4');
  });

  it('separates fields by a different ORDER of magnitude than a field’s own parts', () => {
    // FieldV4's internal rhythm is `xs`. If the gap between fields is close to
    // it, a three-part field and the next question read as one five-part thing.
    const { container } = mount();
    expect(form(container).className).toContain('gap-lg');
    const field = container.querySelector('label')!.parentElement!;
    expect(field.className).toContain('gap-xs');
  });

  it('is not a container: no ground, no border, no radius', () => {
    // §11 — a form is a sequence of questions, and `Card` is what to reach for
    // when the sequence genuinely needs a boundary.
    const el = form(mount().container);
    expect(el.className).not.toMatch(/\bbg-/);
    expect(el.className).not.toMatch(/\bborder\b/);
    expect(el.className).not.toMatch(/\brounded/);
    expect(el.className).not.toMatch(/shadow/);
  });

  it('survives its empty state: a form with no fields', () => {
    const { container } = render(
      <XenitionUIProvider theme={seed}>
        <FormV4 />
      </XenitionUIProvider>
    );
    expect(form(container)).not.toBeNull();
    expect(form(container).children).toHaveLength(0);
  });

  it('passes a className and other form props through', () => {
    const { container } = mount({ className: 'extra', id: 'signup' });
    expect(form(container).className).toContain('extra');
    expect(form(container).id).toBe('signup');
  });

  it('introduces no literal colours', () => {
    const { container } = mount();
    expect(form(container).getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
