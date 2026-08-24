/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Marquee } from './Marquee';
import { installMatchMedia } from '../spec-support/mock-io';

beforeEach(() => {
  installMatchMedia(false);
});

describe('Marquee', () => {
  it('renders the content twice for a seamless loop', () => {
    const { getAllByText } = render(
      <Marquee>
        <span>Logo A</span>
      </Marquee>
    );
    expect(getAllByText('Logo A')).toHaveLength(2);
  });

  it('hides exactly one copy from assistive technology', () => {
    const { getAllByText } = render(
      <Marquee>
        <span>Logo A</span>
      </Marquee>
    );
    const hiddenCopies = getAllByText('Logo A').filter(
      (el) => el.closest('[aria-hidden="true"]') !== null
    );
    expect(hiddenCopies).toHaveLength(1);
  });

  it('exposes pauseOnHover as a data attribute for the hover CSS rule', () => {
    const { getByTestId, rerender } = render(<Marquee data-testid="m">x</Marquee>);
    expect(getByTestId('m').getAttribute('data-pause-on-hover')).toBe('true');
    rerender(
      <Marquee data-testid="m" pauseOnHover={false}>
        x
      </Marquee>
    );
    expect(getByTestId('m').getAttribute('data-pause-on-hover')).toBe('false');
  });

  it('injects keyframes plus a prefers-reduced-motion kill switch (once)', () => {
    render(<Marquee>x</Marquee>);
    render(<Marquee>y</Marquee>);
    const styles = document.querySelectorAll('#xen-marquee-styles');
    expect(styles).toHaveLength(1);
    const css = styles[0]?.textContent ?? '';
    expect(css).toContain('@keyframes xen-marquee');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('animation: none');
  });

  it('sets an animation duration on the track', () => {
    const { container } = render(<Marquee>x</Marquee>);
    const track = container.querySelector<HTMLElement>('[data-xen-marquee-track]');
    expect(track?.style.animationDuration).toMatch(/^\d+(\.\d+)?s$/);
  });
});
