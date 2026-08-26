/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { STACK_OVERLAP } from './internal/identity-v4';
import type { ThemeSeed } from '../theme/types';
import { AvatarGroupV4 } from './AvatarGroupV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const TEAM = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Alan Turing' },
  { name: 'Katherine Johnson' },
  { name: 'Barbara Liskov' },
  { name: 'Edsger Dijkstra' },
];

/**
 * `AvatarGroupProps` takes `className` and nothing else, so there is no
 * `data-testid` to hang on to — the group is found by its own marker attribute,
 * scoped to this render's container because several tests render twice.
 */
function renderThemed(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  const el = container.querySelector<HTMLElement>('[data-xen-v4-avatars]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

function slots(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-xen-v4-avatar-slot]'));
}

describe('AvatarGroupV4 (web)', () => {
  it('slides each face by a fraction of the shared diameter, not by `-ml-2`', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />);
    // The overlap is one `calc()` off the same diameter the avatar uses, so the
    // stack keeps its rhythm at `xs` and at `xl` alike.
    expect(el.style.getPropertyValue('--xen-v4-stack-d')).toContain('--xen-space-');
    expect(STACK_OVERLAP).toBeGreaterThan(0);
    expect(el.className ?? '').not.toContain('-ml-2');
  });

  it('changes the stack diameter with the size, from the spacing scale', () => {
    const d = (size: 'xs' | 'xl'): string =>
      renderThemed(
        <AvatarGroupV4 avatars={TEAM.slice(0, 3)} size={size} />
      ).style.getPropertyValue('--xen-v4-stack-d');
    expect(d('xs')).not.toBe(d('xl'));
    expect(d('xl')).not.toMatch(/^\d+px$/);
  });

  it('puts the LEADING face on top, so the stack reads left to right', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />);
    expect(slots(el).map((s) => s.style.zIndex)).toEqual(['3', '2', '1']);
  });

  it('collapses a real overflow into a countable +N', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM} max={4} />);
    const more = el.querySelector('[data-xen-v4-avatars-more]');
    expect(more?.textContent).toBe('+2');
    // Countable for a screen reader too, not just for the eye.
    expect(more?.getAttribute('aria-label')).toBe('2 more');
    // Behind the faces, not in front of them.
    expect((more as HTMLElement).style.zIndex).toBe('0');
  });

  it('never renders a `+1` — it costs the same width and says less', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 5)} max={4} />);
    expect(el.querySelector('[data-xen-v4-avatars-more]')).toBeNull();
    expect(slots(el)).toHaveLength(5);
  });

  it('keeps the +N readable — `muted` carries no promise against `surface`', () => {
    const theme = compileTheme(SEED);
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM} max={3} />);
    const more = el.querySelector('[data-xen-v4-avatars-more]');
    expect(more).not.toBeNull();
    // `+N` reads the compiler's `mutedText`, not a correction this component
    // makes for itself.
    expect(contrastRatio(theme.light.mutedText, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.dark.mutedText, theme.dark.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('builds every face out of AvatarV4, so the roster is not one brand colour', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 4)} />);
    const grounds = Array.from(el.querySelectorAll<HTMLElement>('[data-xen-v4-avatar]')).map((a) =>
      a.style.getPropertyValue('--xen-v4-ground-l')
    );
    expect(grounds).toHaveLength(4);
    expect(new Set(grounds).size).toBeGreaterThan(1);
  });

  it('renders every avatar when there is no overflow at all', () => {
    const el = renderThemed(<AvatarGroupV4 avatars={TEAM.slice(0, 3)} />);
    expect(el.textContent).toBe('ALGHAT');
  });
});
