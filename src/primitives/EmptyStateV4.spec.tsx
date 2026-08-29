/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { Button } from './Button';
import type { EmptyState } from './EmptyState';
import { EmptyStateV4 } from './EmptyStateV4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(props: Partial<React.ComponentProps<typeof EmptyStateV4>> = {}) {
  return render(
    <XenitionUIProvider theme={seed}>
      <EmptyStateV4
        icon={<span>Icon</span>}
        title="No habits yet"
        description="Create your first habit and start building your streak."
        action={<Button>Create habit</Button>}
        {...props}
      />
    </XenitionUIProvider>
  );
}

describe('EmptyStateV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof EmptyState> = {
      icon: <span>Icon</span>,
      title: 'No habits yet',
      description: 'Create your first habit.',
      action: <Button>Create habit</Button>,
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof EmptyStateV4> = same;
    expect(asV4).toBe(same);
  });

  it('answers §15’s three questions in order, ending with the action', () => {
    const { container, getByText } = mount();
    const order = Array.from(container.querySelector('[data-xen-empty-state]')!.children).map(
      (el) => el.textContent
    );
    expect(order).toEqual([
      'Icon',
      'No habits yet',
      'Create your first habit and start building your streak.',
      'Create habit',
    ]);
    expect(getByText('Create habit')).toBeTruthy();
  });

  it('gives the ACTION the largest gap, and the illustration the smallest', () => {
    const { container, getByText } = mount();
    // The action is separated by `lg`, the biggest step in the component — that
    // separation is what makes it terminal rather than a caption (§15, §5).
    expect(getByText('Create habit').parentElement!.className).toContain('mt-lg');
    // The icon is one `sm` step from the title: a quiet mark on the heading,
    // not the subject of the screen.
    expect(container.querySelector('[data-xen-empty-icon]')!.className).toContain('mb-sm');
  });

  it('subordinates the illustration in colour and hides it from screen readers', () => {
    const { container } = mount();
    const icon = container.querySelector('[data-xen-empty-icon]')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.className).toContain('text-muted-text');
    expect(icon.className).not.toMatch(/text-muted(?!-text)/);
  });

  it('drops the dashed box — the container did not earn itself', () => {
    // §11, and §8 lists a dashed placeholder rectangle among the tells of
    // generic generated UI. An empty state already occupies the region whose
    // emptiness it is explaining.
    const { container } = mount();
    const root = container.querySelector('[data-xen-empty-state]')!;
    expect(root.className).not.toContain('border');
    expect(root.className).not.toContain('dashed');
    expect(root.className).not.toContain('bg-surface');
    // What replaces it is space (§9).
    expect(root.className).toContain('py-2xl');
  });

  it('gives the title the weight the icon gave up', () => {
    const { getByText } = mount();
    const title = getByText('No habits yet');
    expect(title.className).toContain('font-heading');
    expect(title.className).toContain('text-lg');
    expect(title.className).toContain('font-semibold');
  });

  it('wraps the explanation at a measure off the spacing scale', () => {
    const { getByText } = mount();
    const copy = getByText('Create your first habit and start building your streak.');
    expect(copy.className).toContain('max-w-[calc(var(--xen-space-2xl)*7)]');
    expect(copy.className).not.toContain('max-w-sm');
    expect(copy.className).toContain('text-muted-text');
  });

  it('survives its empty state: title only', () => {
    const { container, getByText } = render(
      <XenitionUIProvider theme={seed}>
        <EmptyStateV4 title="Nothing here" />
      </XenitionUIProvider>
    );
    expect(getByText('Nothing here')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-icon]')).toBeNull();
    expect(container.querySelector('[data-xen-empty-state]')!.children).toHaveLength(1);
  });

  it('introduces no literal colours', () => {
    const { container } = mount();
    for (const el of Array.from(container.querySelectorAll('*'))) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
