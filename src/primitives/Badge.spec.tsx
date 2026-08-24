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
});
