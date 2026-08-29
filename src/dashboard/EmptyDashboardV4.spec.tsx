/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { EmptyDashboardV4 } from './EmptyDashboardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The primitive's own root mark — only `EmptyStateV4` stamps it. */
function emptyState(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-empty-state]');
}

function badge(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-empty-badge]');
}

function cta(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-v4-empty-cta]');
}

describe('EmptyDashboardV4 (web)', () => {
  describe('§4.5 — every empty state routes through EmptyStateV4', () => {
    it('draws no empty state of its own; the primitive draws it', () => {
      const { container, getByText } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />
      );

      const state = emptyState(container);
      expect(state).not.toBeNull();
      // The headline and the body are the primitive's nodes, not this
      // component's — an empty dashboard and an empty list are one object.
      expect(state?.contains(getByText('Nothing here yet'))).toBe(true);
      expect(state?.contains(getByText('Add your first project.'))).toBe(true);
    });

    it('keeps the primitive type ramp rather than re-deciding it', () => {
      const { getByText } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />
      );
      // `lg`/semibold headline, `sm`/`muted-text` body: EmptyStateV4's ramp,
      // untouched. Overriding it here would be the divergence §4.5 removes.
      expect(getByText('Nothing here yet').className).toContain('text-lg');
      expect(getByText('Nothing here yet').className).toContain('font-semibold');
      const body = getByText('Add your first project.');
      expect(body.className).toContain('text-sm');
      // `muted-text`, never the `muted` FILL.
      expect(body.className).toContain('text-muted-text');
      expect(body.className).not.toMatch(/\btext-muted(?![-\w])/);
    });

    it('drops the base max-w-[340px] literal — the measure is the primitive s', () => {
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" message="Add your first project." />
      );
      expect(container.innerHTML).not.toContain('340');
    });

    it('renders with nothing but a title — no message, no icon, no action', () => {
      const { container, getByText } = renderThemed(<EmptyDashboardV4 title="All clear" />);
      expect(getByText('All clear')).toBeTruthy();
      expect(emptyState(container)).not.toBeNull();
      expect(badge(container)).toBeNull();
      expect(cta(container)).toBeNull();
    });
  });

  describe('§4.5 / §4.7 — the illustration is a 64 tinted circular badge', () => {
    it('builds it from IconV4 at the empty-state diameter', () => {
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" />
      );

      const disc = badge(container);
      expect(disc).not.toBeNull();
      // It is IconV4's badge, not a local one — §10.5.
      expect(disc?.getAttribute('data-xen-v4-icon')).toBe('');
      expect(disc?.getAttribute('data-badge')).toBe('soft');
      expect(disc?.getAttribute('data-shape')).toBe('circle');
      // 64, composed off the spacing scale: `2xl + md`. Never a literal.
      expect(disc?.style.getPropertyValue('--xen-v4-icon-d')).toBe(
        'calc(var(--xen-space-2xl) + var(--xen-space-md))'
      );
    });

    it('takes its tone from the semantic family, primary by default', () => {
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" iconName="sparkle" tone="success" />
      );
      const disc = badge(container);
      // The badge composites its ground from the tone, so the tone shows up as
      // the pair of per-scheme grounds IconV4 derived rather than as a class.
      expect(disc?.style.getPropertyValue('--xen-v4-icon-ground-l')).not.toBe('');
      expect(disc?.style.getPropertyValue('--xen-v4-icon-ink-l')).not.toBe('');
    });

    it('lets a caller-supplied icon node win over iconName — the additive rule', () => {
      const { container, getByTestId } = renderThemed(
        <EmptyDashboardV4
          title="Nothing here yet"
          iconName="sparkle"
          icon={<span data-testid="own-art" />}
        />
      );
      expect(getByTestId('own-art')).toBeTruthy();
      expect(badge(container)).toBeNull();
    });
  });

  describe('the action — one full-width pill, inset from the edge', () => {
    it('renders it full width, pill-radiused and inset by lg', () => {
      const onAction = jest.fn();
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" actionLabel="Add a project" onAction={onAction} />
      );

      const button = cta(container);
      expect(button).not.toBeNull();
      expect(button?.tagName).toBe('BUTTON');
      expect(button?.className).toContain('w-full');
      // The pill comes from the radius token, so a `sharp` seed still squares.
      expect(button?.className).toContain('rounded-[var(--xen-radius-full)]');
      // HIG: a full-width button is inset from the screen edge. `lg` is the
      // page gutter (§4.1), and it belongs to the container.
      expect(button?.parentElement?.className).toContain('px-lg');

      fireEvent.click(button as HTMLElement);
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('is exactly one action — a label with no handler renders nothing', () => {
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" actionLabel="Add a project" />
      );
      expect(cta(container)).toBeNull();
      expect(container.querySelectorAll('button')).toHaveLength(0);
    });

    it('closes the state s own bottom padding down so the gap stays one step', () => {
      const { container } = renderThemed(
        <EmptyDashboardV4 title="Nothing here yet" actionLabel="Go" onAction={() => {}} />
      );
      expect(emptyState(container)?.className).toContain('pb-lg');
    });

    it('leaves the state s padding alone when there is no action', () => {
      const { container } = renderThemed(<EmptyDashboardV4 title="Nothing here yet" />);
      expect(emptyState(container)?.className).not.toContain('pb-lg');
    });
  });

  describe('the props it inherits', () => {
    it('keeps the accessible label and forwards className, ref and rest', () => {
      const ref = { current: null as HTMLDivElement | null };
      const { getByTestId } = renderThemed(
        <EmptyDashboardV4
          ref={ref}
          data-testid="empty"
          id="dash"
          className="mt-md"
          title="Nothing here yet"
        />
      );
      const el = getByTestId('empty');
      expect(ref.current).toBe(el);
      expect(el.getAttribute('aria-label')).toBe('Nothing here yet');
      expect(el.getAttribute('id')).toBe('dash');
      expect(el.className).toContain('mt-md');
    });
  });

  it('names no literal colour, spacing or radius — every value is a token', () => {
    const { container } = renderThemed(
      <EmptyDashboardV4
        title="Nothing here yet"
        message="Add your first project."
        iconName="sparkle"
        actionLabel="Add a project"
        onAction={() => {}}
      />
    );
    const painted = Array.from(container.querySelectorAll<HTMLElement>('[class],[style]'));
    painted.forEach((el) => {
      expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      // No `px`/`rem` literal in a class either — every length is `--xen-*`.
      expect(el.className).not.toMatch(/\[\d+(px|rem)\]/);
    });
    // Every custom property this component sets resolves through the scale.
    expect(badge(container)?.style.getPropertyValue('--xen-v4-icon-d')).not.toMatch(/\d+px/);
  });
});
