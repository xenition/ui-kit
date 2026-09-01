/** @jest-environment jsdom */
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { shadowCss } from './internal/v4-depth';
import { V4_MOTION } from './internal/v4-motion';
import * as fs from 'fs';
import * as path from 'path';
import type { ThemeSeed } from '../theme/types';
import { useToast } from './Toast';
import type { ToastOptions, ToastTone } from './Toast';
import { ToastProviderV4 } from './ToastProviderV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const TONES: ToastTone[] = ['info', 'success', 'warn', 'danger'];

/**
 * A consumer that reaches the toast API the way a real app does — through
 * `useToast()` imported from `Toast.tsx`, NOT through anything this component
 * exports. If `ToastProviderV4` had declared a second context, every one of
 * these tests would throw at this line.
 */
function Trigger({ options, label = 'fire' }: { options: ToastOptions; label?: string }) {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast(options)}>
      {label}
    </button>
  );
}

function renderProvider(ui: React.ReactNode) {
  return render(
    <XenitionUIProvider theme={SEED}>
      <ToastProviderV4>{ui}</ToastProviderV4>
    </XenitionUIProvider>
  );
}

/** The single toast card currently on screen. */
function card(): HTMLElement {
  const el = document.querySelector('[data-xen-v4-toast]');
  if (el === null) throw new Error('no toast rendered');
  return el as HTMLElement;
}

function fire(name = 'fire'): void {
  fireEvent.click(screen.getByRole('button', { name }));
}

function sheet(id: string): string {
  return document.getElementById(id)?.textContent ?? '';
}

afterEach(() => {
  // The injected sheets are idempotent per document; jsdom keeps one document
  // for the file, so nothing to reset — but the portal nodes must not leak.
  document.querySelectorAll('[data-xen-v4-toast-viewport]').forEach((n) => n.remove());
});

describe('ToastProviderV4 (web) — the shared context', () => {
  it('serves `useToast()` from `Toast.tsx` — one context, not two', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    // No throw from `useToast` is already half the proof; the toast actually
    // painting in V4 markup is the other half.
    expect(document.querySelector('[data-xen-v4-toast]')).toBeNull();
    fire();
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(card().getAttribute('data-xen-v4-toast')).toBe('info');
  });

  it('provides the base context object itself, never a second one', () => {
    // Providing the base's own `ToastContext` is what makes the test above
    // pass. Assert the mechanism directly, so a refactor that quietly declares
    // a second context fails here first with a clear reason rather than
    // surfacing as `useToast()` throwing somewhere far away.
    const file = fs.readFileSync(path.join(__dirname, 'ToastProviderV4.tsx'), 'utf8');
    expect(file).not.toMatch(/createContext\(/);
    expect(file).toContain("import { ToastContext");
  });

  it('hands back an id `dismiss()` can close', () => {
    function IdTrigger() {
      const { toast, dismiss } = useToast();
      const idRef = React.useRef<number | null>(null);
      return (
        <>
          <button type="button" onClick={() => (idRef.current = toast({ title: 'Bye' }))}>
            fire
          </button>
          <button type="button" onClick={() => idRef.current !== null && dismiss(idRef.current)}>
            close
          </button>
        </>
      );
    }
    renderProvider(<IdTrigger />);
    fire();
    expect(screen.getByText('Bye')).toBeTruthy();
    fire('close');
    expect(document.querySelector('[data-xen-v4-toast]')).toBeNull();
  });
});

describe('ToastProviderV4 (web) — showing, dismissing, tones', () => {
  it('renders the title and the description', () => {
    renderProvider(<Trigger options={{ title: 'Saved', description: 'Your changes are live.' }} />);
    fire();
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Your changes are live.')).toBeTruthy();
  });

  it('dismisses on the ✕', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(document.querySelector('[data-xen-v4-toast]')).toBeNull();
  });

  it('paints every tone from the shared feedback slot table', () => {
    const expected: Record<ToastTone, { token: string; rule: string }> = {
      info: { token: 'primary', rule: 'border-l-primary' },
      success: { token: 'success', rule: 'border-l-success' },
      warn: { token: 'warn', rule: 'border-l-warn' },
      danger: { token: 'danger', rule: 'border-l-danger' },
    };
    TONES.forEach((tone) => {
      const view = renderProvider(<Trigger options={{ title: tone, tone }} />);
      fire();
      const el = card();
      expect(el.className).toContain(
        `bg-[color-mix(in_srgb,var(--xen-${expected[tone].token})_10%,var(--xen-surface))]`
      );
      expect(el.className).toContain(expected[tone].rule);
      // The rule is a spacing step, not Tailwind's `border-l-4`.
      expect(el.className).toContain('border-l-[length:var(--xen-space-xs)]');
      expect(el.className).not.toContain('border-l-4');
      view.unmount();
    });
  });

  it('keeps the live region, and lets `danger` interrupt', () => {
    (['info', 'success', 'warn'] as const).forEach((tone) => {
      const view = renderProvider(<Trigger options={{ title: tone, tone }} />);
      fire();
      expect(card().getAttribute('role')).toBe('status');
      view.unmount();
    });
    renderProvider(<Trigger options={{ title: 'Failed', tone: 'danger' }} />);
    fire();
    expect(card().getAttribute('role')).toBe('alert');
  });

  it('stacks several toasts and dismisses them one at a time', () => {
    renderProvider(
      <>
        <Trigger options={{ title: 'One' }} label="a" />
        <Trigger options={{ title: 'Two' }} label="b" />
      </>
    );
    fire('a');
    fire('b');
    expect(document.querySelectorAll('[data-xen-v4-toast]')).toHaveLength(2);
    const [first] = screen.getAllByRole('button', { name: 'Dismiss' });
    fireEvent.click(first as HTMLElement);
    expect(document.querySelectorAll('[data-xen-v4-toast]')).toHaveLength(1);
    expect(screen.getByText('Two')).toBeTruthy();
  });
});

describe('ToastProviderV4 (web) — the empty state', () => {
  it('renders no viewport at all when nothing is showing', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    expect(document.querySelector('[data-xen-v4-toast-viewport]')).toBeNull();
    fire();
    expect(document.querySelector('[data-xen-v4-toast-viewport]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    // Back to nothing: no fixed-position node left over the page for a pointer
    // or a screen reader to walk into.
    expect(document.querySelector('[data-xen-v4-toast-viewport]')).toBeNull();
  });

  it('still renders its children with no toasts', () => {
    renderProvider(<span>app</span>);
    expect(screen.getByText('app')).toBeTruthy();
  });
});

describe('ToastProviderV4 (web) — auto-dismiss', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('closes itself after the 4000ms default', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    act(() => {
      jest.advanceTimersByTime(3999);
    });
    expect(document.querySelector('[data-xen-v4-toast]')).not.toBeNull();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(document.querySelector('[data-xen-v4-toast]')).toBeNull();
  });

  it('honours a custom duration', () => {
    renderProvider(<Trigger options={{ title: 'Saved', duration: 1000 }} />);
    fire();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(document.querySelector('[data-xen-v4-toast]')).toBeNull();
  });

  it('stays put at `duration: 0`', () => {
    renderProvider(<Trigger options={{ title: 'Sticky', duration: 0 }} />);
    fire();
    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    expect(document.querySelector('[data-xen-v4-toast]')).not.toBeNull();
  });

  it('clears pending timers on unmount', () => {
    const view = renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    view.unmount();
    // The web base left `window.setTimeout`s running, firing `setItems` on a
    // dead tree. Advancing past the dwell must produce no React warning.
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    act(() => {
      jest.advanceTimersByTime(10_000);
    });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('ToastProviderV4 (web) — the dismiss control', () => {
  it('clears the 44px touch floor', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    const css = sheet('xen-v4-toast-styles');
    expect(css).toContain('min-width: 44px');
    expect(css).toContain('min-height: 44px');
    const close = screen.getByRole('button', { name: 'Dismiss' });
    expect(close.getAttribute('data-xen-v4-toast-close')).toBe('');
  });

  it('is labelled, focusable and takes the shared M3 state layer', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    const close = screen.getByRole('button', { name: 'Dismiss' });
    expect(close.tagName).toBe('BUTTON');
    expect(close.getAttribute('type')).toBe('button');
    // Opting into `data-xen-v4-state` is what replaces the base's
    // `hover:text-on-surface` colour swap.
    expect(close.getAttribute('data-xen-v4-state')).toBe('');
    expect(document.getElementById('xen-v4-state-styles')).not.toBeNull();
  });

  it('transitions on the M3 scale, and not at all under reduced motion', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    const css = sheet('xen-v4-toast-styles');
    // The base had `transition-colors` — a Tailwind class with no duration at
    // all, so the browser's 0s default applied and nothing transitioned.
    expect(css).toContain(`${V4_MOTION.quick}ms`);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(css).toMatch(/transition: none/);
  });
});

describe('ToastProviderV4 (web) — depth and motion', () => {
  it('takes `elevation.sheet` off the compiled theme, one value per scheme', () => {
    const theme = compileTheme(SEED);
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    const style = card().getAttribute('style') ?? '';
    expect(style).toContain(shadowCss(theme.lightElevation.sheet));
    expect(style).toContain(shadowCss(theme.darkElevation.sheet));
    // Never Tailwind's shadow, which ignores the seed entirely.
    expect(card().className).not.toMatch(/shadow-(sm|md|lg|xl|2xl)/);
  });

  it('goes flat under a `depth: "flat"` seed with no branch at the call site', () => {
    const flat: ThemeSeed = { ...SEED, depth: 'flat' };
    render(
      <XenitionUIProvider theme={flat}>
        <ToastProviderV4>
          <Trigger options={{ title: 'Saved' }} />
        </ToastProviderV4>
      </XenitionUIProvider>
    );
    fire();
    const style = card().getAttribute('style') ?? '';
    // `shadowCss` of a zeroed token: a shadow that paints nothing.
    expect(style).toContain(shadowCss(compileTheme(flat).lightElevation.sheet));
    expect(style).toMatch(/\/ 0\)/);
  });

  it('arrives on the M3 enter duration and fades instead under reduced motion', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    const css = sheet('xen-v4-toast-styles');
    expect(css).toContain(`xen-v4-toast-in ${V4_MOTION.enter}ms`);
    expect(css).toContain(`xen-v4-toast-fade ${V4_MOTION.standard}ms`);
    // The travel is a spacing step, never a literal px offset.
    expect(css).toContain('translateY(calc(var(--xen-space-lg) * -1))');
  });
});

describe('ToastProviderV4 (web) — token purity', () => {
  it('colours text with `mutedText`, never with the `muted` FILL', () => {
    renderProvider(<Trigger options={{ title: 'Saved', description: 'Body' }} />);
    fire();
    const body = screen.getByText('Body');
    expect(body.className).toContain('text-muted-text');
    // The exact bug the shadcn review closed: `muted` has no contrast promise.
    expect(body.className).not.toMatch(/(^|\s)text-muted(\s|$)/);
    const close = screen.getByRole('button', { name: 'Dismiss' });
    expect(close.className).toContain('text-muted-text');
    expect(close.className).not.toMatch(/(^|\s)text-muted(\s|$)/);
  });

  it('resolves every spacing, radius and size through the `--xen-*` scale', () => {
    renderProvider(<Trigger options={{ title: 'Saved', description: 'Body' }} />);
    fire();
    const viewport = document.querySelector('[data-xen-v4-toast-viewport]') as HTMLElement;
    // This component's own nodes. `TextV4`'s spans are excluded on purpose:
    // their `leading-[1.55]` / `tracking-[0.005em]` are unitless ratios off
    // that component's own scale, and re-auditing them here would only make
    // this spec fail when `TextV4` is retuned.
    const nodes = [
      viewport,
      ...Array.from(viewport.querySelectorAll('[data-xen-v4-toast], [data-xen-v4-toast-close]')),
    ] as HTMLElement[];
    const classes = nodes.map((n) => n.className).join(' ');

    // No Tailwind numeric spacing utilities — the base carried `top-4`,
    // `gap-2`, `gap-3`, `px-4` and `p-3`, none of which move with the seed.
    expect(classes).not.toMatch(/(^|\s)(p|px|py|pt|pb|pl|pr|m|mx|my|gap|top|bottom)-\d+(\s|$)/);
    expect(classes).not.toContain('max-w-sm');
    expect(classes).not.toContain('z-[100]');

    // Every arbitrary value that survives is a token expression — apart from
    // the one named stacking layer, which is an order rather than a metric.
    const arbitrary = (classes.match(/\[[^\]]+\]/g) ?? []).filter((v) => v !== '[60]');
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => {
      expect(value).toContain('--xen-');
    });

    // No literal colours anywhere.
    expect(classes).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(classes).not.toMatch(/\brgba?\(/);
  });

  it('caps its width and its layer from named, scale-bound values', () => {
    renderProvider(<Trigger options={{ title: 'Saved' }} />);
    fire();
    expect(card().className).toContain('max-w-[calc(var(--xen-space-2xl)*8)]');
    const viewport = document.querySelector('[data-xen-v4-toast-viewport]') as HTMLElement;
    expect(viewport.className).toContain('top-[var(--xen-space-lg)]');
    expect(viewport.className).toContain('gap-[var(--xen-space-sm)]');
    expect(viewport.className).toContain('px-[var(--xen-space-md)]');
    // One step above the V4 overlay line's `z-50`, so a toast fired from inside
    // a dialog is not hidden by it.
    expect(viewport.className).toContain('z-[60]');
  });
});

describe('ToastProviderV4 (web) — the surface-token decision', () => {
  it('stays on `surface`, because `popover` breaks the compiler’s AA promise', () => {
    // The justification in the component's doc comment, as an assertion: this
    // is why a floating panel does NOT take the floating-panel token here.
    const dark = compileTheme(SEED).dark;
    expect(contrastRatio(dark.mutedText, dark.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(dark.mutedText, dark.popover)).toBeLessThan(4.5);
    expect(contrastRatio(dark.dangerText, dark.popover)).toBeLessThan(4.5);
  });

  it('renders the tone tint over `surface`, matching AlertV4’s subtle variant', () => {
    renderProvider(<Trigger options={{ title: 'Saved', tone: 'success' }} />);
    fire();
    expect(card().className).toContain('var(--xen-surface)');
    expect(card().className).not.toContain('popover');
  });
});
