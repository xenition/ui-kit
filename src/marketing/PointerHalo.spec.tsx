/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { PointerHalo } from './PointerHalo';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** matchMedia stub with independent reduced-motion and pointer-fineness axes. */
function installMedia({ reduced = false, fine = true } = {}): void {
  (window as unknown as { matchMedia: (query: string) => MediaQueryList }).matchMedia = (
    query: string
  ) =>
    ({
      matches: query.includes('prefers-reduced-motion')
        ? reduced
        : query.includes('pointer: fine')
          ? fine
          : false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

function moveMouse(target: Element | Window, x = 10, y = 10): void {
  const event = new Event('pointermove', { bubbles: true });
  Object.assign(event, { pointerType: 'mouse', clientX: x, clientY: y });
  act(() => {
    target.dispatchEvent(event);
  });
}

describe('PointerHalo', () => {
  it('renders nothing under prefers-reduced-motion', () => {
    installMedia({ reduced: true, fine: true });
    const { container } = render(<PointerHalo />);
    expect(container.querySelector('[data-xen-pointer-halo]')).toBeNull();
  });

  it('renders nothing on coarse (touch) pointers', () => {
    installMedia({ reduced: false, fine: false });
    const { container } = render(<PointerHalo />);
    expect(container.querySelector('[data-xen-pointer-halo]')).toBeNull();
  });

  it('mounts for fine pointers as a decorative fixed halo', () => {
    installMedia();
    const { container } = render(<PointerHalo />);
    const halo = container.querySelector<HTMLElement>('[data-xen-pointer-halo]');
    expect(halo).not.toBeNull();
    expect(halo?.getAttribute('aria-hidden')).toBe('true');
    expect(halo?.getAttribute('data-mode')).toBe('idle');
    const css = document.getElementById('xen-pointer-halo-styles')?.textContent ?? '';
    expect(css).toContain('pointer-events: none');
    expect(css).toContain('color-mix(in srgb, var(--xen-accent)');
    expect(css).toContain('(pointer: coarse)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('tightens over interactive elements and swells over [data-halo="grow"]', () => {
    installMedia();
    const { container } = render(
      <div>
        <a href="#x">link</a>
        <div data-halo="grow">cover</div>
        <PointerHalo size={22} linkSize={12} growSize={72} label="View" />
      </div>
    );
    const halo = (): HTMLElement =>
      container.querySelector<HTMLElement>('[data-xen-pointer-halo]') as HTMLElement;

    moveMouse(container.querySelector('a') as Element);
    expect(halo().getAttribute('data-mode')).toBe('link');
    expect(halo().style.width).toBe('12px');

    moveMouse(container.querySelector('[data-halo="grow"]') as Element);
    expect(halo().getAttribute('data-mode')).toBe('grow');
    expect(halo().style.width).toBe('72px');
    expect(halo().textContent).toBe('View');

    moveMouse(window);
    expect(halo().getAttribute('data-mode')).toBe('idle');
    expect(halo().style.width).toBe('22px');
    expect(halo().textContent).toBe('');
  });

  it('ignores non-mouse pointer events (touch/pen never move it)', () => {
    installMedia();
    const { container } = render(
      <div>
        <a href="#x">link</a>
        <PointerHalo />
      </div>
    );
    const event = new Event('pointermove', { bubbles: true });
    Object.assign(event, { pointerType: 'touch', clientX: 5, clientY: 5 });
    act(() => {
      (container.querySelector('a') as Element).dispatchEvent(event);
    });
    expect(
      container.querySelector('[data-xen-pointer-halo]')?.getAttribute('data-mode')
    ).toBe('idle');
  });
});
