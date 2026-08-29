/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import type { ThemeSeed } from '../theme/types';
import { AuthHeadingV4 } from './AuthHeadingV4';

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

function block(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = renderThemed(ui, seed);
  const el = container.querySelector('[data-xen-v4-auth-heading]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The provider's own wrapper — everything the component actually rendered. */
function host(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

/** The headline's own span — the styled run inside the `h1`. */
function titleSpan(el: HTMLElement): HTMLElement {
  return el.querySelector('h1 [data-xen-v4-text]') as HTMLElement;
}

describe('AuthHeadingV4 (web)', () => {
  it('renders NOTHING when there is neither a title nor a subtitle — §12', () => {
    // An opening block with no words in it must not leave a gap where two
    // lines would be: no column, no `gap-sm`, nothing.
    const { container } = renderThemed(<AuthHeadingV4 />);
    expect(container.querySelector('[data-xen-v4-auth-heading]')).toBeNull();
    expect(host(container).childElementCount).toBe(0);

    const empty = renderThemed(<AuthHeadingV4 align="center" size="3xl" measure={false} />);
    expect(host(empty.container).innerHTML).toBe('');
  });

  it('renders a title with no subtitle cleanly', () => {
    const el = block(<AuthHeadingV4 title="Welcome back" />);
    expect(el.querySelectorAll('h1')).toHaveLength(1);
    expect(el.textContent).toBe('Welcome back');
    // One child, not a headline plus an empty second row.
    expect(el.childElementCount).toBe(1);
  });

  it('renders a subtitle with no title cleanly', () => {
    const el = block(<AuthHeadingV4 subtitle="Sign in to continue" />);
    expect(el.querySelector('h1')).toBeNull();
    expect(el.textContent).toBe('Sign in to continue');
    expect(el.childElementCount).toBe(1);
  });

  it('sets §9’s headline: a bold `h1` in the seed’s HEADING face', () => {
    const el = block(<AuthHeadingV4 title="Create your account" />);
    const span = titleSpan(el);
    expect(span).not.toBeNull();
    expect(span.textContent).toBe('Create your account');
    expect(span.className).toContain('font-bold');
    // §10 puts typography before containers: the most prominent line in the
    // product is not left to inherit whatever the page happens to be set in.
    expect(span.className).toContain('font-heading');
    // The `h1`'s user-agent margin would sit inside the `gap-sm` and widen it.
    expect((el.querySelector('h1') as HTMLElement).className).toContain('m-0');
  });

  it('takes the headline step it is given, and defaults to `xl`', () => {
    expect(titleSpan(block(<AuthHeadingV4 title="Welcome" />)).getAttribute('data-xen-v4-text')).toBe(
      'xl'
    );
    // §9's auth screens pass `3xl`.
    const big = titleSpan(block(<AuthHeadingV4 title="Welcome" size="3xl" />));
    expect(big.getAttribute('data-xen-v4-text')).toBe('3xl');
    expect(big.className).toContain('text-3xl');
  });

  it('sets the subhead in `mutedText`, not the decorative `muted` slot', () => {
    // `muted` carries no contrast promise against `surface`; `mutedText` is
    // the same quietness walked until it clears AA (§46), and a subhead is a
    // sentence the user is meant to read.
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in to continue" />);
    const sub = el.querySelectorAll('[data-xen-v4-text]')[1] as HTMLElement;
    expect(sub.textContent).toBe('Sign in to continue');
    expect(sub.className).toContain('text-muted-text');
    expect(sub.className).not.toMatch(/text-muted(?![-\w])/);
    expect(sub.className).toContain('text-base');
    expect(sub.className).toContain('font-body');
  });

  it('uses §4’s `sm` step between the two lines, not the base’s `xs`', () => {
    // 8 against 4 at the default scale — the difference between a headline
    // with a subhead under it and one with a subhead stuck to it.
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in" />);
    expect(el.className).toContain('gap-sm');
    expect(el.className).not.toMatch(/gap-xs\b/);
  });

  it('styles a string but passes any other node through exactly as given', () => {
    const el = block(
      <AuthHeadingV4
        title={<span data-custom-title>Welcome, <b>Ada</b></span>}
        subtitle={<em data-custom-sub>with a link</em>}
      />
    );
    // No `h1`, no `TextV4` wrapper — the caller's markup, untouched.
    expect(el.querySelector('h1')).toBeNull();
    expect(el.querySelector('[data-xen-v4-text]')).toBeNull();
    expect(el.querySelector('[data-custom-title]')).not.toBeNull();
    expect(el.querySelector('[data-custom-sub]')).not.toBeNull();
    expect(el.textContent).toBe('Welcome, Adawith a link');
  });

  it('mixes the two: a string title beside a node subtitle', () => {
    const el = block(<AuthHeadingV4 title="Welcome" subtitle={<em data-custom-sub>now</em>} />);
    expect(titleSpan(el).textContent).toBe('Welcome');
    expect(el.querySelectorAll('[data-xen-v4-text]')).toHaveLength(1);
    expect(el.querySelector('[data-custom-sub]')).not.toBeNull();
  });

  it('left-aligns by default — §9 is explicit that auth opens left', () => {
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in" align="left" />);
    expect(el.getAttribute('data-align')).toBe('left');
    expect(el.className).toContain('items-start');
    expect(el.className).toContain('text-left');
    expect(el.className).not.toContain('mx-auto');
    el.querySelectorAll('[data-xen-v4-text]').forEach((span) =>
      expect(span.className).toContain('text-left')
    );
  });

  it('centres the block as well as the text when asked', () => {
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in" align="center" />);
    expect(el.getAttribute('data-align')).toBe('center');
    expect(el.className).toContain('items-center');
    expect(el.className).toContain('text-center');
    // A capped block that is meant to be centred has to be centred as a block,
    // not only as text — otherwise it sits left inside its own column.
    expect(el.className).toContain('mx-auto');
    el.querySelectorAll('[data-xen-v4-text]').forEach((span) =>
      expect(span.className).toContain('text-center')
    );
  });

  it('caps at §4’s comfortable measure, composed from the spacing scale', () => {
    // `2xl × 10` is 480 at the default scale — ~60 characters at the base
    // step, inside the 45–75 band, and it re-scales with a re-scaled seed.
    expect(compileTheme(SEED).spacing['2xl'] * 10).toBe(480);
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in" />);
    expect(el.className).toContain('max-w-[calc(var(--xen-space-2xl)*10)]');
  });

  it('drops the measure — and the block centring with it — on measure={false}', () => {
    const el = block(<AuthHeadingV4 title="Welcome" align="center" measure={false} />);
    expect(el.className).not.toContain('max-w-[calc(var(--xen-space-2xl)*10)]');
    // No cap, no column to centre inside; the text is still centred.
    expect(el.className).not.toContain('mx-auto');
    expect(el.className).toContain('text-center');
  });

  it('never clamps unasked — §4’s line caps are a brief, not a truncation', () => {
    // The spec's own diagnosis table lists a clipped label as a *defect*, so
    // the caps are offered and never applied to copy the app actually passed.
    const el = block(<AuthHeadingV4 title="A headline long enough to wrap" subtitle="And a subhead" />);
    el.querySelectorAll('[data-xen-v4-text]').forEach((span) => {
      expect((span as HTMLElement).style.display).toBe('');
      expect((span as HTMLElement).style.overflow).toBe('');
    });
  });

  it('clamps each line independently when the caller does ask', () => {
    // jsdom keeps the box and the overflow but drops the vendored
    // `-webkit-line-clamp` count, so the observable claim is the clamp itself.
    const el = block(
      <AuthHeadingV4
        title="A headline long enough to wrap"
        subtitle="And a subhead long enough to wrap too"
        titleLines={2}
        subtitleLines={3}
      />
    );
    const spans = el.querySelectorAll('[data-xen-v4-text]');
    expect((spans[0] as HTMLElement).style.display).toBe('-webkit-box');
    expect((spans[0] as HTMLElement).style.overflow).toBe('hidden');
    expect((spans[1] as HTMLElement).style.display).toBe('-webkit-box');

    // Asking for one does not silently clamp the other.
    const one = block(<AuthHeadingV4 title="Headline" subtitle="Subhead" titleLines={2} />);
    const onlyTitle = one.querySelectorAll('[data-xen-v4-text]');
    expect((onlyTitle[0] as HTMLElement).style.display).toBe('-webkit-box');
    expect((onlyTitle[1] as HTMLElement).style.display).toBe('');
  });

  it('takes a className for layout without losing its own', () => {
    const el = block(<AuthHeadingV4 title="Welcome" className="mb-lg" />);
    expect(el.className).toContain('mb-lg');
    expect(el.className).toContain('gap-sm');
    expect(el.className).toContain('flex-col');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = block(<AuthHeadingV4 title="Welcome" subtitle="Sign in" size="3xl" align="center" />);
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
