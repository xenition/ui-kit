/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a <button> with type="button" by default', () => {
    const { getByRole } = render(<Button>Go</Button>);
    const el = getByRole('button');
    expect(el.tagName).toBe('BUTTON');
    expect(el.getAttribute('type')).toBe('button');
  });

  it('still fires onClick in the button form', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Tap</Button>);
    getByText('Tap').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders an <a> when href is set, sharing the variant/size classes', () => {
    const { getByRole } = render(
      <Button href="/next" variant="primary" size="lg">
        Next
      </Button>
    );
    const link = getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/next');
    // Same variant + size classes as the button form.
    expect(link.className).toContain('bg-primary');
    expect(link.className).toContain('text-lg');
    // `type` is a button-only concern and must not leak onto the anchor.
    expect(link.getAttribute('type')).toBeNull();
  });

  it('passes target/rel through on the anchor form', () => {
    const { getByRole } = render(
      <Button href="https://x.test" target="_blank" rel="noreferrer">
        Ext
      </Button>
    );
    const link = getByRole('link');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noreferrer');
  });

  it('forwards the ref to the button and to the anchor', () => {
    const btnRef = createRef<HTMLButtonElement>();
    render(<Button ref={btnRef}>b</Button>);
    expect(btnRef.current?.tagName).toBe('BUTTON');

    const anchorRef = createRef<HTMLAnchorElement>();
    render(
      <Button ref={anchorRef} href="/x">
        a
      </Button>
    );
    expect(anchorRef.current?.tagName).toBe('A');
  });

  it('keeps the historical variant class strings intact (default tone)', () => {
    const { getByText } = render(<Button variant="secondary">s</Button>);
    const el = getByText('s');
    expect(el.className).toContain('border-primary');
    expect(el.className).toContain('text-primary');
    expect(el.className).toContain('hover:bg-primary-50');
  });

  it('mounts the additive soft/link/elevated variants with token classes', () => {
    const soft = render(<Button variant="soft">soft</Button>).getByText('soft');
    expect(soft.className).toContain('bg-primary-50');
    expect(soft.className).toContain('text-primary');

    const link = render(<Button variant="link">link</Button>).getByText('link');
    expect(link.className).toContain('underline');
    expect(link.className).toContain('text-primary');

    const elevated = render(<Button variant="elevated">el</Button>).getByText('el');
    expect(elevated.className).toContain('bg-surface');
    expect(elevated.className).toContain('shadow');
  });

  it('recolors via the tone prop while defaulting to the historical look', () => {
    const danger = render(
      <Button variant="soft" tone="danger">
        d
      </Button>
    ).getByText('d');
    expect(danger.className).toContain('text-danger');

    const success = render(
      <Button variant="primary" tone="success">
        ok
      </Button>
    ).getByText('ok');
    expect(success.className).toContain('bg-success');
  });
});
