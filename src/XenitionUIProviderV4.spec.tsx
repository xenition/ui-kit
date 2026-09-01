/** @jest-environment jsdom */
import * as fs from 'fs';
import * as path from 'path';
import { TextDecoder, TextEncoder } from 'util';
import { render } from '@testing-library/react';
import { XenitionUIProviderV4, V4_SHARED_SHEETS } from './XenitionUIProviderV4';
import { useXenitionCompiledTheme, XenitionUIProvider } from './provider';
import { useOptionalCompiledTheme } from './primitives/internal/v4-depth';
import { compileTheme } from './theme/compile';
import { CheckboxV4 } from './primitives/CheckboxV4';
import type { CompiledTheme, ThemeSeed } from './theme/types';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/**
 * `react-dom/server` reads `TextEncoder` at module scope and jsdom ships none,
 * so it is polyfilled and the module required lazily rather than imported.
 */
function ssr(): typeof import('react-dom/server') {
  Object.assign(globalThis, { TextEncoder, TextDecoder });
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('react-dom/server') as typeof import('react-dom/server');
}

/** Every `<style>` in the document carrying this id. Length is the assertion. */
function sheets(id: string): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`style#${id}`));
}

/** Reads the compiled theme out of the context and reports what it found. */
function ThemeProbe({ onRead }: { onRead: (t: CompiledTheme) => void }) {
  onRead(useXenitionCompiledTheme());
  return <span data-testid="probe">read</span>;
}

/** The optional accessor the whole V4 depth line uses. `null` means two contexts. */
function OptionalProbe({ onRead }: { onRead: (t: CompiledTheme | null) => void }) {
  onRead(useOptionalCompiledTheme());
  return null;
}

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('XenitionUIProviderV4 (web)', () => {
  describe('the compiled theme underneath', () => {
    it('resolves through useXenitionCompiledTheme — the SAME context as the base', () => {
      let seen: CompiledTheme | undefined;
      render(
        <XenitionUIProviderV4 theme={SEED}>
          <ThemeProbe onRead={(t) => (seen = t)} />
        </XenitionUIProviderV4>
      );
      // Not just "did not throw": the seed actually compiled, and it compiled
      // to what the base provider would have produced.
      expect(seen).toEqual(compileTheme(SEED));
    });

    it('resolves through useOptionalCompiledTheme, so V4 depth handling stays on', () => {
      // A second, private context would make this `null` with no error at all —
      // every V4 gradient and elevation would quietly fall back to flat.
      let seen: CompiledTheme | null = null;
      render(
        <XenitionUIProviderV4 theme={SEED}>
          <OptionalProbe onRead={(t) => (seen = t)} />
        </XenitionUIProviderV4>
      );
      expect(seen).not.toBeNull();
      expect(seen).toEqual(compileTheme(SEED));
    });

    it('accepts an already-compiled theme and passes it through untouched', () => {
      const compiled = compileTheme(SEED);
      let seen: CompiledTheme | undefined;
      render(
        <XenitionUIProviderV4 theme={compiled}>
          <ThemeProbe onRead={(t) => (seen = t)} />
        </XenitionUIProviderV4>
      );
      expect(seen).toBe(compiled);
    });

    it('emits the base provider’s --xen-* variable sheet', () => {
      const { container } = render(<XenitionUIProviderV4 theme={SEED} />);
      const varSheet = container.querySelector('style[data-xenition-theme]');
      expect(varSheet).not.toBeNull();
      // The state and motion scales a consumer might want in their own CSS are
      // already here, which is why this provider adds no properties of its own.
      expect(varSheet?.textContent).toContain('--xen-state-hover');
      expect(varSheet?.textContent).toContain('--xen-motion-standard');
    });
  });

  describe('the data-theme switch', () => {
    it.each(['light', 'dark'] as const)('stamps data-theme="%s" when asked', (mode) => {
      const { container } = render(
        <XenitionUIProviderV4 theme={SEED} mode={mode}>
          <span data-testid="child" />
        </XenitionUIProviderV4>
      );
      const wrapper = container.querySelector('[data-theme]');
      expect(wrapper?.getAttribute('data-theme')).toBe(mode);
      // Kept from the base on purpose: a `display: block` box here would break
      // every root-level flex or grid an app writes. See the doc comment.
      expect((wrapper as HTMLElement).style.display).toBe('contents');
      expect(wrapper?.querySelector('[data-testid="child"]')).not.toBeNull();
    });

    it('defaults the scheme from the seed, exactly as the base does', () => {
      const dark = render(<XenitionUIProviderV4 theme={{ ...SEED, mode: 'dark' }} />);
      expect(dark.container.querySelector('[data-theme]')?.getAttribute('data-theme')).toBe('dark');
      const both = render(<XenitionUIProviderV4 theme={SEED} />);
      expect(both.container.querySelector('[data-theme]')?.getAttribute('data-theme')).toBe(
        'light'
      );
    });

    it('adds no DOM of its own beyond what the base renders', () => {
      // The sheets go to document.head, never into the app tree, so the V4 and
      // the base produce byte-identical markup at the mount point.
      const v4 = render(
        <XenitionUIProviderV4 theme={SEED} mode="light">
          <span data-testid="child" />
        </XenitionUIProviderV4>
      );
      const base = render(
        <XenitionUIProvider theme={SEED} mode="light">
          <span data-testid="child" />
        </XenitionUIProvider>
      );
      expect(v4.container.innerHTML).toBe(base.container.innerHTML);
    });
  });

  describe('pre-injecting the shared sheets', () => {
    it('has every shared sheet in the document after mount', () => {
      expect(document.head.querySelectorAll('style').length).toBe(0);
      render(<XenitionUIProviderV4 theme={SEED} />);
      expect(V4_SHARED_SHEETS.length).toBeGreaterThan(0);
      for (const [id, css] of V4_SHARED_SHEETS) {
        const found = sheets(id);
        expect(found).toHaveLength(1);
        expect(found[0]?.textContent).toBe(css);
      }
    });

    it('injects during render, so the sheets beat the first child’s render body', () => {
      // The ordering this component exists to fix. A child's render body runs
      // after its parent's, so by the time a V4 control renders the field sheet
      // it needs is already there — an effect in the provider would be too late.
      let atChildRender = 0;
      function Nosy() {
        atChildRender = sheets('xen-v4-field-styles').length;
        return null;
      }
      render(
        <XenitionUIProviderV4 theme={SEED}>
          <Nosy />
        </XenitionUIProviderV4>
      );
      expect(atChildRender).toBe(1);
    });

    it('leaves a V4 control’s own injection a no-op', () => {
      render(
        <XenitionUIProviderV4 theme={SEED}>
          <CheckboxV4 />
        </XenitionUIProviderV4>
      );
      // CheckboxV4 calls injectStyleOnce(FIELD_V4_STYLE_ID, ...) in its render
      // body regardless. The id guard means it costs a getElementById.
      expect(sheets('xen-v4-field-styles')).toHaveLength(1);
    });
  });

  describe('idempotency', () => {
    it('does not duplicate a sheet when mounted twice', () => {
      render(<XenitionUIProviderV4 theme={SEED} />);
      render(<XenitionUIProviderV4 theme={{ ...SEED, primary: '#0EA5E9' }} mode="dark" />);
      for (const [id] of V4_SHARED_SHEETS) expect(sheets(id)).toHaveLength(1);
    });

    it('does not duplicate a sheet across re-renders or theme changes', () => {
      const { rerender } = render(<XenitionUIProviderV4 theme={SEED} />);
      rerender(<XenitionUIProviderV4 theme={{ ...SEED, primary: '#DC2626' }} mode="dark" />);
      rerender(<XenitionUIProviderV4 theme={SEED} mode="light" />);
      for (const [id] of V4_SHARED_SHEETS) expect(sheets(id)).toHaveLength(1);
    });

    it('declares each id exactly once', () => {
      const ids = V4_SHARED_SHEETS.map(([id]) => id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('the empty state', () => {
    it('renders with no children at all and still pre-injects', () => {
      const { container } = render(<XenitionUIProviderV4 theme={SEED} />);
      const wrapper = container.querySelector('[data-theme]');
      expect(wrapper).not.toBeNull();
      expect(wrapper?.childNodes).toHaveLength(0);
      for (const [id] of V4_SHARED_SHEETS) expect(sheets(id)).toHaveLength(1);
    });

    it('survives null and undefined children', () => {
      expect(() =>
        render(<XenitionUIProviderV4 theme={SEED}>{null}</XenitionUIProviderV4>)
      ).not.toThrow();
      expect(() =>
        render(<XenitionUIProviderV4 theme={SEED}>{undefined}</XenitionUIProviderV4>)
      ).not.toThrow();
    });
  });

  describe('SSR safety', () => {
    it('renders to static markup without touching the document', () => {
      document.head.innerHTML = '';
      const html = ssr().renderToStaticMarkup(<XenitionUIProviderV4 theme={SEED} mode="dark" />);
      expect(html).toContain('data-theme="dark"');
      expect(html).toContain('display:contents');
    });

    it('exports the sheet list so a server renderer can emit the same <head>', () => {
      // Injection is a no-op on the server by design (`injectStyleOnce` guards
      // `typeof document`), so the list is the escape hatch. Matching ids mean
      // the client provider then finds them present and adds nothing.
      for (const [id, css] of V4_SHARED_SHEETS) {
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
        expect(css.trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe('the five hand-written ids stay in step with their call sites', () => {
    // `nav-v4.ts`, `picker-v4.ts` and `surface-v4.ts` export CSS but no id, so
    // this file types the id. A rename there would leave the provider injecting
    // under a dead id and every consumer injecting a second copy under the real
    // one — invisible at runtime, caught here.
    const CSS_TO_ID = new Map<string, string>([
      ['NAV_V4_CSS', 'xen-v4-nav-styles'],
      ['PICKER_V4_CSS', 'xen-v4-picker-styles'],
      ['SLIDER_V4_CSS', 'xen-v4-slider-styles'],
      ['SURFACE_V4_CSS', 'xen-surface-v4-styles'],
      ['SURFACE_V4_DRAWER_CSS', 'xen-surface-v4-drawer-styles'],
    ]);

    const dir = path.join(__dirname, 'primitives');
    const calls: Array<{ file: string; id: string; constName: string }> = [];
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.tsx') || file.endsWith('.spec.tsx')) continue;
      const source = fs.readFileSync(path.join(dir, file), 'utf8');
      const re = /injectStyleOnce\(\s*'([^']+)'\s*,\s*([A-Z0-9_]+)\s*\)/g;
      for (let m = re.exec(source); m !== null; m = re.exec(source)) {
        const [, id, constName] = m;
        if (id !== undefined && constName !== undefined && CSS_TO_ID.has(constName)) {
          calls.push({ file, id, constName });
        }
      }
    }

    it('found the call sites at all (the scan itself is not silently empty)', () => {
      expect(calls.length).toBeGreaterThanOrEqual(CSS_TO_ID.size);
      expect(new Set(calls.map((c) => c.constName)).size).toBe(CSS_TO_ID.size);
    });

    it.each([...CSS_TO_ID.entries()])('%s is injected under %s everywhere', (constName, id) => {
      // Declared here...
      expect(V4_SHARED_SHEETS.some(([sheetId]) => sheetId === id)).toBe(true);
      // ...and used with the same id by every component that reaches for it.
      for (const call of calls.filter((c) => c.constName === constName)) {
        expect(`${call.file}: ${call.id}`).toBe(`${call.file}: ${id}`);
      }
    });
  });
});
