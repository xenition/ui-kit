/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ProfileHeaderV4 } from './ProfileHeaderV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The `<header>` the component owns. */
function header(ui: ReactElement): HTMLElement {
  const { container } = renderThemed(ui);
  const el = container.querySelector('[data-xen-v4-profile-header]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The provider's own wrapper — everything the component actually rendered. */
function host(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

/** Every styled run in the block, in document order. */
function runs(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('[data-xen-v4-text]')) as HTMLElement[];
}

/** The composed `AvatarV4`. */
function avatar(el: HTMLElement): HTMLElement | null {
  return el.querySelector('[data-xen-v4-avatar]');
}

describe('ProfileHeaderV4 (web)', () => {
  // ── the identity (§5, §3) ──────────────────────────────────────────

  it('composes `AvatarV4` at `xl` — a real avatar, not a row’s leading slot', () => {
    // `xl` is `2xl + lg` off the spacing scale (72 at the stock scale), so a
    // re-scaled seed re-scales the face.
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" />);
    const face = avatar(el) as HTMLElement;
    expect(face).not.toBeNull();
    expect(face.style.getPropertyValue('--xen-v4-d')).toBe(
      'calc(var(--xen-space-2xl) + var(--xen-space-lg))'
    );
  });

  it('sets the name at `2xl` bold `onSurface` in the seed’s heading face', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" />);
    const name = runs(el)[0] as HTMLElement;
    expect(name.textContent).toBe('Ada Lovelace');
    expect(name.getAttribute('data-xen-v4-text')).toBe('2xl');
    expect(name.className).toContain('font-bold');
    expect(name.className).toContain('text-on-surface');
    expect(name.className).toContain('font-heading');
    // The base set it at `xl`; §5 asks for the confident step.
    expect(name.className).not.toContain('text-xl');
  });

  it('sets the subtitle at `base` in `mutedText`, never the decorative `muted` FILL', () => {
    // `muted` carries no contrast promise against `surface`; a handle is a
    // line the user is meant to read. The base used `sm` + `muted`.
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />);
    const sub = runs(el)[1] as HTMLElement;
    expect(sub.textContent).toBe('@ada');
    expect(sub.className).toContain('text-base');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
    expect(sub.className).not.toContain('text-sm');
    expect(sub.className).toContain('font-body');
  });

  it('forwards `status` to the avatar, named for a screen reader', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" status="online" />);
    const dot = el.querySelector('[data-xen-v4-avatar-dot]') as HTMLElement;
    expect(dot).not.toBeNull();
    expect(dot.getAttribute('aria-label')).toBe('Online');
  });

  it('takes a caller’s own mark in place of the avatar', () => {
    const el = header(
      <ProfileHeaderV4 name="Acme Inc" avatar={<span data-logo>ACME</span>} />
    );
    expect(el.querySelector('[data-logo]')).not.toBeNull();
    expect(avatar(el)).toBeNull();
  });

  // ── rhythm (§4.1) ──────────────────────────────────────────────────

  it('gives the block `spacing.lg` vertically and `spacing.md` beside the avatar', () => {
    // §5: this block tops the account screen and should feel generous, not
    // like a row. The base had no vertical padding at all.
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />);
    expect(el.className).toContain('py-[var(--xen-space-lg)]');
    expect(el.className).toContain('gap-[var(--xen-space-md)]');
  });

  it('sets `spacing.xs` between the name and its supporting line — not the base’s `gap-0.5`', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />);
    expect(el.innerHTML).toContain('gap-[var(--xen-space-xs)]');
    expect(el.innerHTML).not.toContain('gap-0.5');
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline by default — §4.4’s rule, stated', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />);
    expect(el.className).not.toContain('border-b');
    expect(el.hasAttribute('data-divided')).toBe(false);
  });

  it('puts a hairline in, verbatim, on `divided`', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" divided />);
    expect(el.className).toContain('border-b');
    expect(el.className).toContain('border-border');
    expect(el.getAttribute('data-divided')).toBe('');
  });

  it('carries no card — no ground, no radius, no shadow (§4.6)', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" />);
    expect(el.className).not.toMatch(/bg-(card|surface)/);
    expect(el.className).not.toMatch(/rounded/);
    expect(el.className).not.toMatch(/shadow/);
  });

  // ── press (§4.3) ───────────────────────────────────────────────────

  it('is inert with no `onClick` — no button, no state layer', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" />);
    expect(el.querySelector('button')).toBeNull();
    expect(el.querySelector('[data-xen-v4-state]')).toBeNull();
  });

  it('makes the identity one tappable region carrying the state layer', () => {
    const onClick = jest.fn();
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" subtitle="@ada" onClick={onClick} />);
    const button = el.querySelector('button') as HTMLButtonElement;
    expect(button).not.toBeNull();
    expect(button.getAttribute('data-xen-v4-state')).toBe('');
    // The opaque flavour: the name is contrast-checked against `surface`.
    expect(button.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-surface)');
    expect(button.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-surface)');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    // The avatar and both lines are inside the one region.
    expect(button.querySelector('[data-xen-v4-avatar]')).not.toBeNull();
    expect(button.querySelectorAll('[data-xen-v4-text]')).toHaveLength(2);
  });

  it('never dims its content — no `hover:opacity-80` anywhere (§4.3)', () => {
    const el = header(<ProfileHeaderV4 name="Ada Lovelace" onClick={() => {}} />);
    expect(el.outerHTML).not.toContain('hover:opacity');
    expect(el.outerHTML).not.toContain('hover:bg-neutral');
  });

  it('keeps `actions` OUTSIDE the tappable region, so no button nests in a button', () => {
    const el = header(
      <ProfileHeaderV4
        name="Ada Lovelace"
        onClick={() => {}}
        actions={<button data-edit>Edit</button>}
      />
    );
    const identity = el.querySelector('button') as HTMLElement;
    expect(identity.querySelector('[data-edit]')).toBeNull();
    expect(el.querySelector('[data-edit]')).not.toBeNull();
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders NOTHING with no name, no subtitle, no avatar and no actions', () => {
    const { container } = renderThemed(<ProfileHeaderV4 />);
    expect(container.querySelector('[data-xen-v4-profile-header]')).toBeNull();
    expect(host(container).innerHTML).toBe('');
  });

  it('treats an empty-string name and avatar URL as absent', () => {
    const { container } = renderThemed(<ProfileHeaderV4 name="" avatarUrl="" subtitle="" />);
    expect(container.querySelector('[data-xen-v4-profile-header]')).toBeNull();
  });

  it('still renders when it has only actions — and draws no empty identity beside them', () => {
    const el = header(<ProfileHeaderV4 actions={<button data-edit>Edit</button>} />);
    expect(el.querySelector('[data-edit]')).not.toBeNull();
    expect(avatar(el)).toBeNull();
    expect(runs(el)).toHaveLength(0);
  });

  it('renders a face for someone whose name has not loaded yet', () => {
    const el = header(<ProfileHeaderV4 avatarUrl="https://example.test/a.png" />);
    expect(avatar(el)).not.toBeNull();
    expect(runs(el)).toHaveLength(0);
  });

  it('renders a name with no subtitle, and a subtitle with no name', () => {
    const named = header(<ProfileHeaderV4 name="Ada Lovelace" />);
    expect(runs(named)).toHaveLength(1);

    const sub = header(<ProfileHeaderV4 subtitle="Signed out" />);
    expect(runs(sub)).toHaveLength(1);
    expect(runs(sub)[0]?.className).toContain('text-muted-text');
  });

  // ── clamping ───────────────────────────────────────────────────────

  it('clamps both lines by default, as the base truncated', () => {
    const el = header(<ProfileHeaderV4 name="A very long display name" subtitle="@handle" />);
    runs(el).forEach((span) => {
      expect(span.style.display).toBe('-webkit-box');
      expect(span.style.overflow).toBe('hidden');
    });
  });

  it('still clamps when a caller opens a line up — the count is the native twin’s assertion', () => {
    // jsdom drops `-webkit-line-clamp` and `-webkit-box-orient` from the CSSOM
    // outright, so the *number* of lines is unreadable here. It is asserted on
    // `numberOfLines` in `ProfileHeaderV4.native.spec.tsx`, where it is a real
    // prop; what the web can prove is that the clamp is applied to each line
    // independently and that neither is left unclamped.
    const el = header(
      <ProfileHeaderV4 name="A very long display name" subtitle="@handle" nameLines={2} />
    );
    expect(runs(el)).toHaveLength(2);
    runs(el).forEach((span) => expect(span.style.display).toBe('-webkit-box'));
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a className and forwards the rest of its props', () => {
    const el = header(
      <ProfileHeaderV4 name="Ada Lovelace" className="mb-lg" id="account-header" />
    );
    expect(el.className).toContain('mb-lg');
    expect(el.className).toContain('py-[var(--xen-space-lg)]');
    expect(el.id).toBe('account-header');
    expect(el.tagName).toBe('HEADER');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    // A caller's own mark stands in for `AvatarV4` here: the V4 avatar stamps
    // compiled colours as inline custom properties, which is the theme rather
    // than a literal, and `AvatarV4`'s own spec is where that is asserted.
    const el = header(
      <ProfileHeaderV4
        name="Ada Lovelace"
        subtitle="@ada"
        divided
        avatar={<span />}
        onClick={() => {}}
        actions={<button>Edit</button>}
      />
    );
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
