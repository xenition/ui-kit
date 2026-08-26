/** @jest-environment jsdom */
/**
 * `Text` (web) — the twin of the native `Text`. Same props, same defaults; the
 * assertions are the web form of the same invariants: `variant` resolves to a
 * type-scale class, `tone` to a semantic token class, and no literal colour or
 * font size is ever emitted.
 */
import { render } from '@testing-library/react';
import { Text } from './Text';

describe('Text (web)', () => {
  it('renders children with the base step and the onSurface slot by default', () => {
    const { getByText } = render(<Text>Pantry is empty</Text>);
    const el = getByText('Pantry is empty');
    expect(el.className).toContain('text-base');
    expect(el.className).toContain('text-on-surface');
    expect(el.className).toContain('font-normal');
  });

  it('maps `variant` onto the type-scale class, never an inline font size', () => {
    const { getByText, container } = render(<Text size="2xl">Recipes</Text>);
    expect(getByText('Recipes').className).toContain('text-2xl');
    expect(container.innerHTML).not.toMatch(/font-size/i);
  });

  it('maps `tone` onto a semantic token class, including the contrast-safe text forms', () => {
    const { getByText } = render(
      <>
        <Text tone="muted">Caption</Text>
        <Text tone="dangerText">Out of date</Text>
        <Text tone="primaryText">Sign in</Text>
      </>
    );
    expect(getByText('Caption').className).toContain('text-muted');
    expect(getByText('Out of date').className).toContain('text-danger-text');
    expect(getByText('Sign in').className).toContain('text-primary-text');
  });

  it('never emits a literal colour', () => {
    const { container } = render(
      <Text tone="danger" weight="bold">
        Expired
      </Text>
    );
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(container.innerHTML).not.toMatch(/rgb\(/);
  });

  it('maps weight and align onto token-free utility classes', () => {
    const { getByText } = render(
      <Text weight="semibold" align="center">
        Heading
      </Text>
    );
    const cls = getByText('Heading').className;
    expect(cls).toContain('font-semibold');
    expect(cls).toContain('text-center');
  });

  it('clamps for `numberOfLines` (the native prop name, kept for parity)', () => {
    // jsdom's CSS engine drops the vendor-prefixed `-webkit-line-clamp` /
    // `-webkit-box-orient` pair, so the observable half here is the overflow
    // rule that comes with them.
    const clamped = render(<Text numberOfLines={2}>Long method step</Text>);
    expect((clamped.getByText('Long method step') as HTMLElement).style.overflow).toBe('hidden');

    const plain = render(<Text>Unclamped step</Text>);
    expect((plain.getByText('Unclamped step') as HTMLElement).style.overflow).toBe('');
  });

  it('forwards className and the rest of the span props', () => {
    const { getByTestId } = render(
      <Text className="mt-2" data-testid="t" id="hint">
        Hint
      </Text>
    );
    const el = getByTestId('t');
    expect(el.className).toContain('mt-2');
    expect(el.id).toBe('hint');
  });
});
