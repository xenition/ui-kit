/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { MIN_TAP_CLASS } from './internal/nav-v4';
import { V4_STATE } from './internal/v4-state';
import type { ThemeSeed } from '../theme/types';
import { AUTH_FOOTER_V4_CSS, AuthSwitchFooterV4 } from './AuthSwitchFooterV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

function row(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-auth-switch]');
}

function link(container: HTMLElement): HTMLButtonElement {
  return container.querySelector('[data-xen-v4-auth-link]') as HTMLButtonElement;
}

/**
 * Just what the component drew. The provider stamps a `<style>` of compiled
 * tokens and a `data-theme` wrapper into the same container, and neither is
 * this component's markup.
 */
function markup(container: HTMLElement): string {
  return container.querySelector('[data-theme]')!.innerHTML;
}

describe('AuthSwitchFooterV4 (web)', () => {
  it('draws one centred line: muted prompt, weighted action (§9)', () => {
    const container = draw(
      <AuthSwitchFooterV4 prompt="Don't have an account?" label="Register" />
    );
    const el = row(container)!;
    expect(el.className).toContain('justify-center');
    expect(el.className).toContain('items-center');
    expect(el.textContent).toBe("Don't have an account?Register");
    // The prompt takes the CORRECTED muted slot, not raw `muted` — a footer
    // line is small type and cannot afford ink nobody measured.
    expect(el.querySelector('.text-muted-text')).not.toBeNull();
  });

  it('paints the action with the TEXT form of primary, never the fill', () => {
    const container = draw(<AuthSwitchFooterV4 label="Register" />);
    const label = link(container).querySelector('span')!;
    expect(label.className).toContain('text-primary-text');
    expect(label.className).toContain('font-semibold');
    // `text-primary` is the FILL slot; it carries no promise on a surface.
    expect(label.className).not.toMatch(/text-primary(?![-\w])/);
  });

  it('tone="muted" steps down BOTH colour and weight so it cannot compete (§5)', () => {
    const container = draw(<AuthSwitchFooterV4 tone="muted" label="No thanks" />);
    expect(row(container)!.getAttribute('data-xen-v4-auth-switch')).toBe('muted');
    const label = link(container).querySelector('span')!;
    expect(label.className).toContain('text-muted-text');
    expect(label.className).toContain('font-medium');
    expect(label.className).not.toContain('font-semibold');
  });

  it('defaults to the loud tone — the §9 register line', () => {
    expect(row(draw(<AuthSwitchFooterV4 label="Register" />))!.getAttribute(
      'data-xen-v4-auth-switch'
    )).toBe('primary');
  });

  it('makes the LINK the tap target, not the row around it', () => {
    const container = draw(<AuthSwitchFooterV4 prompt="New here?" label="Register" />);
    // The base put `min-h-11` on the row and left the button the size of the
    // word. The minimum belongs on the thing you press.
    expect(link(container).className).toContain(MIN_TAP_CLASS);
    expect(row(container)!.className).not.toContain(MIN_TAP_CLASS);
  });

  it('answers the pointer with an M3 state layer rather than nothing', () => {
    const el = link(draw(<AuthSwitchFooterV4 label="Register" />));
    expect(el.getAttribute('data-xen-v4-state')).toBe('');
    // The scale is M3's, read from the shared module rather than retyped.
    expect(V4_STATE.pressed).toBeGreaterThan(V4_STATE.hover);
  });

  it('rings itself off the one focus slot every V4 control shares', () => {
    draw(<AuthSwitchFooterV4 label="Register" />);
    const sheet = document.getElementById('xen-v4-auth-footer-styles');
    expect(sheet).not.toBeNull();
    expect(sheet!.textContent).toContain('outline: 2px solid var(--xen-ring);');
    expect(AUTH_FOOTER_V4_CSS).toContain('[data-xen-v4-auth-link]:focus-visible');
  });

  it('reports the press and disables at M3 0.38, not by dimming to a round number', () => {
    const onClick = jest.fn();
    const container = draw(<AuthSwitchFooterV4 label="Register" onClick={onClick} />);
    fireEvent.click(link(container));
    expect(onClick).toHaveBeenCalledTimes(1);

    const frozen = draw(<AuthSwitchFooterV4 label="Register" disabled />);
    expect(link(frozen).disabled).toBe(true);
    expect(link(frozen).className).toContain('disabled:opacity-[0.38]');
    expect(link(frozen).className).not.toContain('opacity-50');
  });

  it('empty state: no prompt is fine — the action stands alone', () => {
    const container = draw(<AuthSwitchFooterV4 label="Register" />);
    expect(row(container)).not.toBeNull();
    expect(row(container)!.textContent).toBe('Register');
    expect(container.querySelector('.text-muted-text')).toBeNull();
  });

  it('empty state: no label, no line (§12)', () => {
    // A footer line with no action on it is the defect §9 names for a divider
    // above no providers.
    expect(markup(draw(<AuthSwitchFooterV4 label="" />))).toBe('');
    expect(markup(draw(<AuthSwitchFooterV4 prompt="New here?" label="" />))).toBe('');
  });

  it('merges a className and passes DOM props through', () => {
    const container = draw(
      <AuthSwitchFooterV4 label="Register" id="switch" className="mt-md" />
    );
    expect(row(container)!.getAttribute('id')).toBe('switch');
    expect(row(container)!.className).toContain('mt-md');
    expect(row(container)!.className).toContain('justify-center');
  });

  it('names no colour, spacing or radius of its own (§10.1)', () => {
    const container = draw(
      <AuthSwitchFooterV4 prompt="Don't have an account?" label="Register" />
    );
    expect(markup(container)).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(link(container).className).toContain('rounded-[var(--xen-radius-md)]');
  });
});
