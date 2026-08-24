/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('defaults to the neutral tone', () => {
    const { getByText } = render(<Badge>New</Badge>);
    const el = getByText('New');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('bg-neutral-100');
    expect(el.className).toContain('text-on-surface');
  });

  it('renders the muted tone with the muted token combo', () => {
    const { getByText } = render(<Badge tone="muted">Draft</Badge>);
    const el = getByText('Draft');
    expect(el.className).toContain('bg-neutral-100');
    expect(el.className).toContain('text-muted');
  });

  it('supports the additive accent tone (solid fill)', () => {
    const { getByText } = render(<Badge tone="accent">Beta</Badge>);
    const el = getByText('Beta');
    expect(el.className).toContain('bg-accent');
    expect(el.className).toContain('text-on-accent');
  });

  it('applies the soft and outline variants with token classes', () => {
    const soft = render(
      <Badge tone="primary" variant="soft">
        s
      </Badge>
    ).getByText('s');
    expect(soft.className).toContain('bg-primary-50');
    expect(soft.className).toContain('text-primary');

    const outline = render(
      <Badge tone="danger" variant="outline">
        o
      </Badge>
    ).getByText('o');
    expect(outline.className).toContain('border-danger');
    expect(outline.className).toContain('text-danger');
  });

  it('applies the sm size scale', () => {
    const { getByText } = render(<Badge size="sm">x</Badge>);
    expect(getByText('x').className).toContain('px-1.5');
  });

  it('renders a numeric count clamped by max', () => {
    const { getByText } = render(<Badge count={150} max={99} />);
    expect(getByText('99+')).toBeTruthy();
  });

  it('renders a status dot with the tone fill', () => {
    const { container } = render(<Badge tone="success" dot />);
    const dot = container.querySelector('[aria-hidden]');
    expect(dot?.className).toContain('bg-success');
    expect(dot?.className).toContain('rounded-full');
  });
});
