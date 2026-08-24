/**
 * Test-only IntersectionObserver mock (this folder is excluded from the
 * build). Install with {@link installMockIntersectionObserver} inside a spec
 * and drive visibility with `MockIntersectionObserver.instances[n].trigger()`.
 */

export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number>;
  elements: Element[] = [];
  disconnected = false;

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    const threshold = options?.threshold ?? 0;
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold];
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.elements.push(element);
  }

  unobserve(element: Element): void {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect(): void {
    this.disconnected = true;
    this.elements = [];
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Fire the observer callback for all observed elements. */
  trigger(isIntersecting: boolean): void {
    const entries = this.elements.map(
      (target) => ({ target, isIntersecting }) as IntersectionObserverEntry
    );
    this.callback(entries, this);
  }
}

/** Replace the global IntersectionObserver and reset recorded instances. */
export function installMockIntersectionObserver(): void {
  MockIntersectionObserver.instances = [];
  (globalThis as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver;
}

/** Stub `window.matchMedia`, reporting `matches` for reduced-motion queries. */
export function installMatchMedia(reducedMotion: boolean): void {
  (window as unknown as { matchMedia: (query: string) => MediaQueryList }).matchMedia = (
    query: string
  ) =>
    ({
      matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}
