/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { AspectRatioV4 } from './AspectRatioV4';

function draw(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container;
}

/** The frame itself — the one element carrying the V4 marker. */
function frame(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-aspect]') as HTMLElement;
}

describe('AspectRatioV4 (web)', () => {
  it('locks the box to the ratio it was given and clips to it', () => {
    const el = frame(draw(<AspectRatioV4 ratio={16 / 9} />));
    expect(el.style.aspectRatio).toBe(String(16 / 9));
    expect(el.className).toContain('w-full');
    expect(el.className).toContain('overflow-hidden');
  });

  it('takes any ratio, including a square', () => {
    expect(frame(draw(<AspectRatioV4 ratio={1} />)).style.aspectRatio).toBe('1');
    expect(frame(draw(<AspectRatioV4 ratio={4 / 3} />)).style.aspectRatio).toBe(String(4 / 3));
  });

  it('is square-cornered by default — unchanged from the base (§1.4)', () => {
    expect(frame(draw(<AspectRatioV4 ratio={1} />)).className).not.toContain('rounded-');
  });

  it('rounded={true} still means the card radius, exactly as the base did', () => {
    // §4.2's card corner, so a hero panel matches the cards around it.
    expect(frame(draw(<AspectRatioV4 ratio={1} rounded />)).className).toContain(
      'rounded-[var(--xen-radius-lg)]'
    );
  });

  it('rounded takes a step, so a thumbnail need not wear the hero corner', () => {
    expect(frame(draw(<AspectRatioV4 ratio={1} rounded="sm" />)).className).toContain(
      'rounded-[var(--xen-radius-sm)]'
    );
    expect(frame(draw(<AspectRatioV4 ratio={1} rounded="md" />)).className).toContain(
      'rounded-[var(--xen-radius-md)]'
    );
    expect(frame(draw(<AspectRatioV4 ratio={1} rounded="lg" />)).className).toContain(
      'rounded-[var(--xen-radius-lg)]'
    );
  });

  it('rounded={false} clips square', () => {
    expect(frame(draw(<AspectRatioV4 ratio={1} rounded={false} />)).className).not.toContain(
      'rounded-'
    );
  });

  it('renders the media it is handed, untouched', () => {
    const container = draw(
      <AspectRatioV4 ratio={16 / 9}>
        <img alt="Cover" src="cover.png" />
      </AspectRatioV4>
    );
    expect(container.querySelector('img')!.getAttribute('alt')).toBe('Cover');
  });

  it('empty state: an empty frame keeps its geometry rather than collapsing', () => {
    // The whole job is reserving the space before the media arrives; rendering
    // null here would reflow the page around the gap it was preventing.
    const el = frame(draw(<AspectRatioV4 ratio={16 / 9} rounded />));
    expect(el).not.toBeNull();
    expect(el.childNodes).toHaveLength(0);
    expect(el.style.aspectRatio).toBe(String(16 / 9));
  });

  it('empty state: paints no ground and no border to leave behind', () => {
    const el = frame(draw(<AspectRatioV4 ratio={1} />));
    expect(el.className).not.toMatch(/\bbg-/);
    expect(el.className).not.toMatch(/\bborder\b/);
  });

  it('forwards its ref and merges a className without losing the frame', () => {
    const ref = createRef<HTMLDivElement>();
    const container = draw(<AspectRatioV4 ref={ref} ratio={1} className="mt-lg" />);
    const el = frame(container);
    expect(ref.current).toBe(el);
    expect(el.className).toContain('mt-lg');
    expect(el.className).toContain('overflow-hidden');
  });

  it('passes DOM props through and lets a caller add to the style', () => {
    const el = frame(
      draw(<AspectRatioV4 ratio={1} id="hero" aria-label="Cover" style={{ maxWidth: 320 }} />)
    );
    expect(el.getAttribute('id')).toBe('hero');
    expect(el.getAttribute('aria-label')).toBe('Cover');
    expect(el.style.maxWidth).toBe('320px');
    // The caller's style must not cost the ratio.
    expect(el.style.aspectRatio).toBe('1');
  });

  it('names no colour, spacing or radius of its own (§1.1)', () => {
    const container = draw(<AspectRatioV4 ratio={16 / 9} rounded="md" />);
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Every radius is a token; no px/rem literal anywhere in the class list.
    expect(frame(container).className).not.toMatch(/\[\d+(px|rem)/);
  });
});
