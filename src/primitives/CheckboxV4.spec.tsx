/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { CheckboxV4 } from './CheckboxV4';
import { FIELD_MOTION } from './internal/field-v4';
import { transitionCss } from './internal/v4-motion';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return { ...result, q: within(result.container) };
}

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('CheckboxV4 (web)', () => {
  it('stays a real checkbox, so form and keyboard semantics survive', () => {
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" />);
    const el = q.getByLabelText('Remember me') as HTMLInputElement;
    expect(el.tagName).toBe('INPUT');
    expect(el.type).toBe('checkbox');
  });

  it('sizes and softens itself entirely from the scales', () => {
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" />);
    const el = q.getByLabelText('Remember me');
    expect(el.className).toContain('h-[var(--xen-space-lg)]');
    expect(el.className).toContain('w-[var(--xen-space-lg)]');
    expect(el.className).toContain('rounded-[var(--xen-radius-sm)]');
    expect(el.className).toContain('border-border');
  });

  it('arms the shared V4 focus ring from the brand slot', () => {
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" />);
    const el = q.getByLabelText('Remember me');
    expect(el.hasAttribute('data-xen-v4-field')).toBe(true);
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-ring)');
    const css = sheet('xen-v4-field-styles');
    expect(css).toContain('box-shadow: 0 0 0 var(--xen-space-xs)');
    expect(css).toContain('color-mix(in srgb, var(--xen-v4-ring-color, var(--xen-ring)) 12%');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('draws its own tick instead of handing the shape to the platform', () => {
    renderThemed(<CheckboxV4 aria-label="Remember me" />);
    const css = sheet('xen-v4-checkbox-styles');
    expect(css).toContain('appearance: none');
    expect(css).toContain('mask:');
    // The fill and the mark are both tokens, never literals.
    expect(css).toContain('background-color: var(--xen-v4-fill-color, var(--xen-primary))');
    expect(css).toContain('var(--xen-v4-mark-color, var(--xen-on-primary))');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('crosses into the checked state rather than cutting to it', () => {
    renderThemed(<CheckboxV4 aria-label="Remember me" />);
    const css = sheet('xen-v4-checkbox-styles');
    expect(css).toContain(`transition: ${transitionCss(['opacity', 'transform'], FIELD_MOTION)}`);
    expect(css).toContain('[data-xen-v4-checkbox]:checked::after');
    // …and the motion is dropped, not the state, under Reduce Motion.
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('turns the border, the ring and the fill danger from one flag', () => {
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" invalid />);
    const el = q.getByLabelText('Remember me');
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(el.className).toContain('border-danger');
    expect(el.style.getPropertyValue('--xen-v4-ring-color')).toBe('var(--xen-danger)');
    expect(el.style.getPropertyValue('--xen-v4-mark-color')).toBe('var(--xen-on-danger)');
  });

  it('reports changes through the DOM handler the base already had', () => {
    const onChange = jest.fn();
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" onChange={onChange} />);
    fireEvent.click(q.getByLabelText('Remember me'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('forwards its ref to the input', () => {
    let node: HTMLInputElement | null = null;
    const { q } = renderThemed(
      <CheckboxV4
        aria-label="Remember me"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(q.getByLabelText('Remember me'));
  });

  it('spends no depth on a form control', () => {
    const { q } = renderThemed(<CheckboxV4 aria-label="Remember me" />);
    expect(q.getByLabelText('Remember me').className).not.toMatch(/shadow|gradient|backdrop/);
  });

  it('injects each sheet once', () => {
    renderThemed(<CheckboxV4 aria-label="One" />);
    renderThemed(<CheckboxV4 aria-label="Two" />);
    expect(document.querySelectorAll('#xen-v4-field-styles')).toHaveLength(1);
    expect(document.querySelectorAll('#xen-v4-checkbox-styles')).toHaveLength(1);
  });
});
