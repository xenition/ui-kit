/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { AuthCardV4 } from './AuthCardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

/** The shell's outer column. */
function shell(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = renderThemed(ui, seed);
  const el = container.querySelector('[data-xen-v4-auth-card]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The `CardV4` surface inside the column. */
function card(el: HTMLElement): HTMLElement {
  return el.querySelector('[data-xen-v4-card]') as HTMLElement;
}

const SM_CLASS = 'max-w-[calc(var(--xen-space-2xl)*8)]';
const MD_CLASS = 'max-w-[calc(var(--xen-space-2xl)*10)]';

describe('AuthCardV4 (web)', () => {
  // ───────────────────────────────────────────────────────────────────────────
  // §12 — the empty states
  // ───────────────────────────────────────────────────────────────────────────

  it('renders children alone: no brand, no headline, no footer, no holes', () => {
    const el = shell(
      <AuthCardV4>
        <form data-form>fields</form>
      </AuthCardV4>
    );
    const surface = card(el);
    expect(surface.querySelector('[data-form]')).not.toBeNull();
    // The tile, the headline block and the footer each render NOTHING rather
    // than an empty box — so the card's only child is the form.
    expect(surface.querySelector('[data-xen-v4-brand-tile]')).toBeNull();
    expect(surface.querySelector('[data-xen-v4-auth-heading]')).toBeNull();
    expect(surface.querySelector('[data-xen-v4-auth-footer]')).toBeNull();
    expect(surface.childElementCount).toBe(1);
  });

  it('drops the brand tile when the app supplies neither a glyph nor a name', () => {
    // The kit ships no brand marks, so "no mark" is a state to survive.
    const el = shell(<AuthCardV4 title="Welcome back">fields</AuthCardV4>);
    expect(card(el).querySelector('[data-xen-v4-brand-tile]')).toBeNull();
    expect(card(el).querySelector('[data-xen-v4-auth-heading]')).not.toBeNull();
  });

  it('drops the whole headline block when there is no title and no subtitle', () => {
    const el = shell(
      <AuthCardV4 brandIcon="lock" footer="Need help?">
        fields
      </AuthCardV4>
    );
    expect(card(el).querySelector('[data-xen-v4-auth-heading]')).toBeNull();
    // The tile and the footer are still there — only the missing band is gone.
    expect(card(el).querySelector('[data-xen-v4-brand-tile]')).not.toBeNull();
    expect(card(el).querySelector('[data-xen-v4-auth-footer]')).not.toBeNull();
  });

  it('renders a title with no subtitle, and a subtitle with no title', () => {
    const titleOnly = shell(<AuthCardV4 title="Welcome back">fields</AuthCardV4>);
    const block = titleOnly.querySelector('[data-xen-v4-auth-heading]') as HTMLElement;
    expect(block.textContent).toBe('Welcome back');
    expect(block.childElementCount).toBe(1);

    const subOnly = shell(<AuthCardV4 subtitle="Sign in to continue">fields</AuthCardV4>);
    const subBlock = subOnly.querySelector('[data-xen-v4-auth-heading]') as HTMLElement;
    expect(subBlock.querySelector('h1')).toBeNull();
    expect(subBlock.textContent).toBe('Sign in to continue');
  });

  it('renders no footer wrapper when there is no footer', () => {
    const el = shell(
      <AuthCardV4 title="Welcome" footerDivider>
        fields
      </AuthCardV4>
    );
    // Asking for the divider does not conjure a rule with nothing under it.
    expect(el.querySelector('[data-xen-v4-auth-footer]')).toBeNull();
    expect(el.innerHTML).not.toContain('border-t');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §10.5 — a V4 composite composes V4 children
  // ───────────────────────────────────────────────────────────────────────────

  it('composes the V4 parts, not the base ones', () => {
    const el = shell(
      <AuthCardV4 brandGlyph="◆" title="Welcome back" subtitle="Sign in" footer="Register">
        fields
      </AuthCardV4>
    );
    expect(card(el)).not.toBeNull();
    expect(el.querySelector('[data-xen-v4-brand-tile]')).not.toBeNull();
    expect(el.querySelector('[data-xen-v4-auth-heading]')).not.toBeNull();
    // The footer line is a `TextV4` run, not a bare node.
    const foot = el.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(foot.querySelector('[data-xen-v4-text]')).not.toBeNull();
  });

  it('lays the four bands out in §1 order', () => {
    const el = shell(
      <AuthCardV4 brandGlyph="◆" title="Welcome" footer="Register">
        <form data-form>fields</form>
      </AuthCardV4>
    );
    const order = Array.from(card(el).children).map((c) =>
      c.hasAttribute('data-xen-v4-brand-tile')
        ? 'tile'
        : c.hasAttribute('data-xen-v4-auth-heading')
          ? 'heading'
          : c.hasAttribute('data-xen-v4-auth-footer')
            ? 'footer'
            : 'body'
    );
    expect(order).toEqual(['tile', 'heading', 'body', 'footer']);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The rhythm — §4
  // ───────────────────────────────────────────────────────────────────────────

  it('uses §4’s `lg` between the bands, not the base’s flat `md`', () => {
    // 24 against 16: the difference between four bands and five things stacked
    // at equal pitch.
    const el = shell(<AuthCardV4 title="Welcome">fields</AuthCardV4>);
    expect(card(el).className).toContain('gap-lg');
    expect(card(el).className).not.toMatch(/gap-md\b/);
    expect(card(el).className).toContain('flex-col');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // width
  // ───────────────────────────────────────────────────────────────────────────

  it('composes the column from the spacing scale, defaulting to the base’s 384', () => {
    // `2xl × 8` is 384 at the default scale — `max-w-sm` to the pixel, now
    // derived from the seed rather than typed.
    expect(compileTheme(SEED).spacing['2xl'] * 8).toBe(384);
    const el = shell(<AuthCardV4 title="Welcome">fields</AuthCardV4>);
    expect(el.getAttribute('data-width')).toBe('sm');
    expect(el.className).toContain(SM_CLASS);
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain('w-full');
  });

  it('widens to the headline’s own measure at width="md"', () => {
    // Deliberately the same 480 `AuthHeadingV4` caps at, so a wide card and a
    // headline measure agree rather than nearly agreeing.
    expect(compileTheme(SEED).spacing['2xl'] * 10).toBe(480);
    const el = shell(
      <AuthCardV4 title="Welcome" width="md">
        fields
      </AuthCardV4>
    );
    expect(el.className).toContain(MD_CLASS);
    expect(el.className).not.toContain(SM_CLASS);
  });

  it('gives up the cap at width="full" and hands the measure back to the heading', () => {
    const capped = shell(<AuthCardV4 title="Welcome" subtitle="Sign in">fields</AuthCardV4>);
    // The card is the column, so the heading must not cap a second time inside
    // it — that would be a 480 measure inside a 384 card.
    expect(
      (capped.querySelector('[data-xen-v4-auth-heading]') as HTMLElement).className
    ).not.toContain(MD_CLASS);

    const full = shell(
      <AuthCardV4 title="Welcome" subtitle="Sign in" width="full">
        fields
      </AuthCardV4>
    );
    expect(full.getAttribute('data-width')).toBe('full');
    expect(full.className).not.toContain(SM_CLASS);
    // §4's measure is now the only thing stopping the subhead running the
    // width of a tablet, so it comes back on.
    expect((full.querySelector('[data-xen-v4-auth-heading]') as HTMLElement).className).toContain(
      MD_CLASS
    );
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The subtitle decision
  // ───────────────────────────────────────────────────────────────────────────

  it('hands a string subtitle to AuthHeadingV4’s own step, not the base’s sm/muted', () => {
    // §4 sets the subhead at `base`, and `mutedText` is the AA-safe slot
    // `muted` is not. Re-wrapping here would reach around both.
    const el = shell(<AuthCardV4 title="Welcome" subtitle="Sign in to continue">fields</AuthCardV4>);
    const block = el.querySelector('[data-xen-v4-auth-heading]') as HTMLElement;
    const sub = block.querySelectorAll('[data-xen-v4-text]')[1] as HTMLElement;
    expect(sub.textContent).toBe('Sign in to continue');
    expect(sub.className).toContain('text-base');
    expect(sub.className).not.toContain('text-sm');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
  });

  it('passes a non-string subtitle through untouched', () => {
    const el = shell(
      <AuthCardV4 title="Welcome" subtitle={<em data-custom-sub>with a link</em>}>
        fields
      </AuthCardV4>
    );
    const block = el.querySelector('[data-xen-v4-auth-heading]') as HTMLElement;
    expect(block.querySelector('[data-custom-sub]')).not.toBeNull();
    // One styled run — the headline. The subtitle node was not re-wrapped.
    expect(block.querySelectorAll('[data-xen-v4-text]')).toHaveLength(1);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The footer
  // ───────────────────────────────────────────────────────────────────────────

  it('styles a string footer as a centred sm/mutedText line — the twins agreed', () => {
    const el = shell(<AuthCardV4 title="Welcome" footer="Already have an account?">fields</AuthCardV4>);
    const foot = el.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(foot.className).toContain('text-center');
    const run = foot.querySelector('[data-xen-v4-text]') as HTMLElement;
    expect(run.textContent).toBe('Already have an account?');
    expect(run.className).toContain('text-sm');
    expect(run.className).toContain('text-muted-text');
    expect(run.className).toContain('text-center');
  });

  it('renders any other footer node as given — §9’s footer carries a link', () => {
    const el = shell(
      <AuthCardV4 title="Welcome" footer={<a href="/register" data-link>Register</a>}>
        fields
      </AuthCardV4>
    );
    const foot = el.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(foot.querySelector('[data-link]')).not.toBeNull();
    expect(foot.querySelector('[data-xen-v4-text]')).toBeNull();
  });

  it('draws §5’s hairline above the footer only when asked', () => {
    const plain = shell(<AuthCardV4 footer="Register">fields</AuthCardV4>);
    const plainFoot = plain.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(plainFoot.className).not.toContain('border-t');

    const ruled = shell(
      <AuthCardV4 footer="Register" footerDivider>
        fields
      </AuthCardV4>
    );
    const ruledFoot = ruled.querySelector('[data-xen-v4-auth-footer]') as HTMLElement;
    expect(ruledFoot.className).toContain('border-t');
    expect(ruledFoot.className).toContain('border-border');
    expect(ruledFoot.className).toContain('pt-lg');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The brand tile pass-through
  // ───────────────────────────────────────────────────────────────────────────

  it('forwards the tile’s size, shape and label', () => {
    const el = shell(
      <AuthCardV4 brandIcon="lock" brandSize="lg" brandShape="circle" brandLabel="Acme">
        fields
      </AuthCardV4>
    );
    const tile = el.querySelector('[data-xen-v4-brand-tile]') as HTMLElement;
    expect(tile.getAttribute('data-size')).toBe('lg');
    expect(tile.getAttribute('data-shape')).toBe('circle');
    expect(el.querySelector('[aria-label="Acme"]')).not.toBeNull();
  });

  it('defaults the tile to §9’s rounded md square', () => {
    const el = shell(<AuthCardV4 brandGlyph="◆">fields</AuthCardV4>);
    const tile = el.querySelector('[data-xen-v4-brand-tile]') as HTMLElement;
    expect(tile.getAttribute('data-size')).toBe('md');
    expect(tile.getAttribute('data-shape')).toBe('rounded');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Alignment and the headline step
  // ───────────────────────────────────────────────────────────────────────────

  it('opens LEFT by default — §9 is explicit the tile is not centred', () => {
    const el = shell(
      <AuthCardV4 brandGlyph="◆" title="Welcome" subtitle="Sign in">
        fields
      </AuthCardV4>
    );
    expect(el.getAttribute('data-align')).toBe('left');
    expect((el.querySelector('[data-xen-v4-brand-tile]') as HTMLElement).className).toContain(
      'mr-auto'
    );
    expect((el.querySelector('[data-xen-v4-auth-heading]') as HTMLElement).getAttribute('data-align')).toBe(
      'left'
    );
  });

  it('centres the tile and the headline together on align="center"', () => {
    const el = shell(
      <AuthCardV4 brandGlyph="◆" title="Welcome" align="center">
        fields
      </AuthCardV4>
    );
    expect(el.getAttribute('data-align')).toBe('center');
    expect((el.querySelector('[data-xen-v4-brand-tile]') as HTMLElement).className).toContain(
      'mx-auto'
    );
    expect(
      (el.querySelector('[data-xen-v4-auth-heading]') as HTMLElement).className
    ).toContain('items-center');
  });

  it('keeps `xl` as the headline default and forwards §9’s 3xl when asked', () => {
    // The step is the screen's decision; a shell that forced `3xl` could not be
    // embedded in a modal.
    const base = shell(<AuthCardV4 title="Welcome">fields</AuthCardV4>);
    expect(
      (base.querySelector('h1 [data-xen-v4-text]') as HTMLElement).getAttribute('data-xen-v4-text')
    ).toBe('xl');

    const big = shell(
      <AuthCardV4 title="Welcome" titleSize="3xl">
        fields
      </AuthCardV4>
    );
    expect(
      (big.querySelector('h1 [data-xen-v4-text]') as HTMLElement).getAttribute('data-xen-v4-text')
    ).toBe('3xl');
  });

  // ───────────────────────────────────────────────────────────────────────────
  // The surface
  // ───────────────────────────────────────────────────────────────────────────

  it('raises the card by default, and forwards variant + padding to CardV4', () => {
    // The auth card is the only container on its page, so the shadow is layer
    // order made visible — and it is the seed's shadow, not this file's.
    const raised = shell(<AuthCardV4 title="Welcome">fields</AuthCardV4>);
    expect(card(raised).getAttribute('data-raised')).toBe('true');
    expect(card(raised).className).toContain('border-border');
    expect(card(raised).className).toContain('p-[var(--xen-space-lg)]');

    const flat = shell(
      <AuthCardV4 title="Welcome" variant="outlined" padding="md">
        fields
      </AuthCardV4>
    );
    expect(card(flat).getAttribute('data-raised')).toBe('false');
    expect(card(flat).className).toContain('p-[var(--xen-space-md)]');
  });

  it('takes a className for layout without losing its own', () => {
    const el = shell(<AuthCardV4 className="my-lg">fields</AuthCardV4>);
    expect(el.className).toContain('my-lg');
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain(SM_CLASS);
  });

  // ───────────────────────────────────────────────────────────────────────────
  // §10.1
  // ───────────────────────────────────────────────────────────────────────────

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = shell(
      <AuthCardV4
        brandGlyph="◆"
        title="Welcome back"
        subtitle="Sign in to continue"
        footer="Register"
        footerDivider
        align="center"
        width="md"
        titleSize="3xl"
      >
        <form>fields</form>
      </AuthCardV4>
    );
    // The shell itself writes no inline style at all — everything it paints is
    // a class bound to a `--xen-*` token.
    expect(el.getAttribute('style')).toBeNull();

    /*
      `CardV4` emits `--xen-v4-shadow-l/-d` from the compiled theme's
      `elevation.card`, so the `rgb()` inside them is a TOKEN value, not a
      literal this file typed. Drop that pair and assert on everything else.
    */
    const markup = el.outerHTML.replace(/--xen-v4-shadow-[ld]:[^;"]*;?/g, '');
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    // No px width, radius or font size anywhere in the shell's own classes.
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
