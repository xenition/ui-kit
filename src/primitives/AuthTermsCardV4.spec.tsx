/** @jest-environment jsdom */
import { fireEvent, render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import {
  AUTH_DEFAULT_TERMS_LINKS,
  AUTH_TERMS_V4_STYLE_ID,
  AuthTermsCardV4,
} from './AuthTermsCardV4';

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

/** The bordered card itself. */
const card = (container: HTMLElement): HTMLElement =>
  container.querySelector('[data-xen-v4-terms]') as HTMLElement;

/** The inline legal links. */
const linkButtons = (container: HTMLElement): HTMLButtonElement[] =>
  Array.from(container.querySelectorAll('[data-xen-v4-terms-link]'));

/** One inline legal link, by position. */
const linkAt = (container: HTMLElement, index: number): HTMLButtonElement =>
  linkButtons(container)[index] as HTMLButtonElement;

describe('AuthTermsCardV4 (web)', () => {
  it('draws the bordered card §9 asks for, with both default links inline', () => {
    const { container, q } = renderThemed(<AuthTermsCardV4 />);
    expect(card(container).className).toContain('rounded-[var(--xen-radius-lg)]');
    expect(card(container).className).toContain('border-border');
    expect(card(container).className).toContain('bg-surface');
    expect(q.getByLabelText('I agree to the')).toBeTruthy();
    expect(linkButtons(container).map((b) => b.textContent)).toEqual(
      AUTH_DEFAULT_TERMS_LINKS.map((l) => l.label)
    );
    // The sentence reads as one line, separator and all.
    expect(card(container).textContent).toBe(
      'I agree to the Terms of Service and Privacy Policy'
    );
  });

  it('composes the V4 children, never the bases (§10.5)', () => {
    const { container, q } = renderThemed(<AuthTermsCardV4 description="Withdraw any time." />);
    expect(q.getByLabelText('I agree to the').hasAttribute('data-xen-v4-checkbox')).toBe(true);
    // Every piece of copy on the card is a `TextV4`.
    expect(container.querySelectorAll('[data-xen-v4-text]').length).toBeGreaterThanOrEqual(2);
  });

  it('reports the ticked state through onCheckedChange', () => {
    const onCheckedChange = jest.fn();
    const { q } = renderThemed(<AuthTermsCardV4 onCheckedChange={onCheckedChange} />);
    fireEvent.click(q.getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('reports the unticking of an already-ticked box', () => {
    const onCheckedChange = jest.fn();
    const { q } = renderThemed(<AuthTermsCardV4 checked onCheckedChange={onCheckedChange} />);
    fireEvent.click(q.getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('answers a tick on the card itself, not only inside the box', () => {
    const { container, rerender } = renderThemed(<AuthTermsCardV4 />);
    expect(card(container).getAttribute('data-checked')).toBe('false');
    rerender(
      <XenitionUIProvider theme={SEED}>
        <AuthTermsCardV4 checked />
      </XenitionUIProvider>
    );
    expect(card(container).getAttribute('data-checked')).toBe('true');
    const css = sheet(AUTH_TERMS_V4_STYLE_ID);
    expect(css).toContain('[data-xen-v4-terms][data-checked="true"]');
    expect(css).toContain('border-color: var(--xen-primary)');
    // The M3 hover layer of the brand over the card's own surface.
    expect(css).toContain('color-mix(in srgb, var(--xen-primary) 8%, var(--xen-surface))');
  });

  it('fires onLinkClick with the link id, and never ticks the box doing it', () => {
    const onLinkClick = jest.fn();
    const onCheckedChange = jest.fn();
    const { container } = renderThemed(
      <AuthTermsCardV4 onLinkClick={onLinkClick} onCheckedChange={onCheckedChange} />
    );
    fireEvent.click(linkAt(container, 1));
    expect(onLinkClick).toHaveBeenCalledWith('privacy');
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('renders custom links and the joining word between them', () => {
    const { container } = renderThemed(
      <AuthTermsCardV4
        label="I accept the"
        separator="&"
        links={[
          { id: 'a', label: 'Rules' },
          { id: 'b', label: 'Charter' },
        ]}
      />
    );
    expect(card(container).textContent).toBe('I accept the Rules & Charter');
  });

  it('keeps every link keyboard-reachable and at the platform tap floor', () => {
    const { container } = renderThemed(<AuthTermsCardV4 />);
    linkButtons(container).forEach((b) => {
      expect(b.tagName).toBe('BUTTON');
      expect(b.type).toBe('button');
      // Not `tabindex="-1"`, not a div pretending: a real focusable control.
      expect(b.hasAttribute('tabindex')).toBe(false);
    });
    const css = sheet(AUTH_TERMS_V4_STYLE_ID);
    // The hit area is expanded to 44 without breaking the sentence's flow.
    expect(css).toContain('[data-xen-v4-terms-link]::after');
    expect(css).toContain('height: calc(var(--xen-space-2xl) - var(--xen-space-xs))');
    // The one focus indicator every V4 control shares.
    expect(css).toContain('outline: 2px solid var(--xen-ring)');
  });

  it('makes the whole card a tap target with a real label association', () => {
    const { container, q } = renderThemed(<AuthTermsCardV4 />);
    const box = q.getByLabelText('I agree to the');
    expect(card(container).tagName).toBe('LABEL');
    expect(card(container).getAttribute('for')).toBe(box.id);
    expect(box.id).toBeTruthy();
  });

  it('drops the label association when pressToToggle is off', () => {
    const { container } = renderThemed(<AuthTermsCardV4 pressToToggle={false} />);
    expect(card(container).tagName).toBe('DIV');
    expect(card(container).hasAttribute('for')).toBe(false);
  });

  it('renders the description under the consent, and nothing when it is absent', () => {
    const { q, container } = renderThemed(
      <AuthTermsCardV4 description="You can withdraw consent at any time." />
    );
    expect(q.getByText('You can withdraw consent at any time.')).toBeTruthy();

    const plain = renderThemed(<AuthTermsCardV4 />);
    expect(plain.container.querySelectorAll('[data-xen-v4-text]').length).toBe(1);
    expect(container).toBeTruthy();
  });

  it('aligns the box to the copy on request', () => {
    const { container } = renderThemed(<AuthTermsCardV4 />);
    expect(card(container).className).toContain('items-center');
    const top = renderThemed(<AuthTermsCardV4 align="top" />);
    expect(card(top.container).className).toContain('items-start');
  });

  it('carries an error as a message, never as colour alone (§6)', () => {
    const { container, q } = renderThemed(
      <AuthTermsCardV4 error="Please accept the terms to continue." />
    );
    const message = q.getByRole('alert');
    expect(message.textContent).toBe('Please accept the terms to continue.');
    expect(message.className).toContain('text-danger-text');
    expect(card(container).getAttribute('data-invalid')).toBe('true');
    // The box points at the message, so the reason reaches a screen reader.
    const box = q.getByLabelText('I agree to the');
    expect(box.getAttribute('aria-describedby')).toBe(message.id);
    expect(box.getAttribute('aria-invalid')).toBe('true');
  });

  it('never renders a message row when there is no error (§12)', () => {
    const { q, container } = renderThemed(<AuthTermsCardV4 />);
    expect(q.queryByRole('alert')).toBeNull();
    expect(card(container).getAttribute('data-invalid')).toBe('false');
  });

  it('survives links={[]} with no dangling separator or trailing space (§12)', () => {
    const { container, q } = renderThemed(<AuthTermsCardV4 links={[]} />);
    expect(linkButtons(container)).toHaveLength(0);
    expect(card(container).textContent).toBe('I agree to the');
    // The consent itself still works with nothing to link to.
    expect(q.getByLabelText('I agree to the')).toBeTruthy();
  });

  it('shows no separator when there is exactly one link (§12)', () => {
    const { container } = renderThemed(
      <AuthTermsCardV4 links={[{ id: 'terms', label: 'Terms' }]} />
    );
    expect(card(container).textContent).toBe('I agree to the Terms');
  });

  it('disables the box and the links together', () => {
    const { container, q } = renderThemed(<AuthTermsCardV4 disabled />);
    expect((q.getByLabelText('I agree to the') as HTMLInputElement).disabled).toBe(true);
    linkButtons(container).forEach((b) => expect(b.disabled).toBe(true));
    expect(card(container).className).toContain('opacity-[0.38]');
  });

  it('keeps every value in its sheet on a token, with no literal colours', () => {
    renderThemed(<AuthTermsCardV4 />);
    const css = sheet(AUTH_TERMS_V4_STYLE_ID);
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/rgba?\(/);
    // Motion comes off the shared M3 scale, never a number picked here.
    expect(css).toContain('200ms cubic-bezier(0.2, 0, 0, 1)');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('forwards className onto the outer stack', () => {
    const { container } = renderThemed(<AuthTermsCardV4 className="mt-lg" />);
    const stack = container.querySelector('.mt-lg') as HTMLElement;
    expect(stack).toBeTruthy();
    // The class lands on the stack that owns the card, not on the card itself.
    expect(stack.contains(card(container))).toBe(true);
  });
});
