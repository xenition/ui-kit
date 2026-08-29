/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { SettingsRowV4 } from './SettingsRowV4';
import {
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from './internal/row-v4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function row(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-xen-v4-row]') as HTMLElement;
}

function icons(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-icon]'));
}

const CHEVRON = resolveIconGlyph('chevron-right');

function chevrons(container: HTMLElement): HTMLElement[] {
  return icons(container).filter((el) => el.textContent === CHEVRON);
}

describe('SettingsRowV4 (web) — props', () => {
  it('keeps every base prop working and adds only optional ones', () => {
    const seen: string[] = [];
    const { container, getByText } = renderThemed(
      <SettingsRowV4
        label="Notifications"
        value="On"
        description="Push, email and SMS"
        onClick={() => seen.push('tap')}
        className="custom-row"
      />
    );
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('On')).toBeTruthy();
    expect(getByText('Push, email and SMS')).toBeTruthy();
    expect(row(container).className).toContain('custom-row');
    fireEvent.click(getByText('Notifications'));
    expect(seen).toEqual(['tap']);
  });

  it('renders a custom trailing control in place of the chevron', () => {
    const { container } = renderThemed(
      <SettingsRowV4
        label="Dark mode"
        rightSlot={<span data-testid="switch" />}
        onClick={() => undefined}
      />
    );
    expect(container.querySelector('[data-testid="switch"]')).toBeTruthy();
    expect(chevrons(container)).toHaveLength(0);
  });

  it('renders as a div until it is given something to do', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" value="1.2.0" />);
    expect(row(container).tagName).toBe('DIV');
    expect(row(container).getAttribute('data-interactive')).toBe('false');

    const clickable = renderThemed(<SettingsRowV4 label="Account" onClick={() => undefined} />);
    expect(row(clickable.container).tagName).toBe('BUTTON');
    expect(row(clickable.container).getAttribute('data-interactive')).toBe('true');
  });

  it('forwards its ref to whichever element it rendered', () => {
    const staticRef = createRef<HTMLElement>();
    renderThemed(<SettingsRowV4 ref={staticRef} label="Version" value="1.2.0" />);
    expect(staticRef.current?.tagName).toBe('DIV');

    const buttonRef = createRef<HTMLElement>();
    renderThemed(<SettingsRowV4 ref={buttonRef} label="Account" onClick={() => undefined} />);
    expect(buttonRef.current?.tagName).toBe('BUTTON');
  });

  it('typesets the label, the description and the value, and never inks with a fill', () => {
    const { getByText } = renderThemed(
      <SettingsRowV4 label="Notifications" description="Push and email" value="On" />
    );
    const label = getByText('Notifications');
    const description = getByText('Push and email');
    const value = getByText('On');
    // §5: `medium`, not the family's `semibold` — twenty semibold labels down a
    // settings screen is a wall, and there is no avatar carrying the weight.
    expect(label.className).toContain('text-base');
    expect(label.className).toContain('font-medium');
    expect(label.className).toContain('text-on-surface');
    [description, value].forEach((el) => {
      expect(el.className).toContain('text-sm');
      // `mutedText`, not `muted` — `muted` is a FILL. The lookahead is
      // load-bearing: `text-muted-text` contains `text-muted` as a substring.
      expect(el.className).toContain('text-muted-text');
      expect(el.className).not.toMatch(/text-muted(?!-text)/);
    });
    expect(label.style.overflow).toBe('hidden');
  });
});

describe('SettingsRowV4 (web) — the family metric', () => {
  it('takes the one-line height with a label alone', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" value="1.2.0" />);
    expect(row(container).className).toContain(rowHeightClass(false));
    expect(row(container).className).not.toContain(rowHeightClass(true));
  });

  it('takes the two-line height once it carries a description', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Notifications" description="Push and email" />
    );
    expect(row(container).className).toContain(rowHeightClass(true));
  });

  it('treats an empty description as no description', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" description="" />);
    expect(row(container).className).toContain(rowHeightClass(false));
  });

  it('agrees with the rest of the row family instead of inventing a gutter', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" />);
    const cls = row(container).className;
    // The base row paid `px-lg` — §5 calls that mismatch the reason a settings
    // list and a people list did not look related.
    expect(cls).toContain('px-md');
    expect(cls).not.toContain('px-lg');
    // `min-h-[48px]` is named in brief §1 as a violation to remove.
    expect(cls).not.toContain('48px');
    expect(cls).toContain('bg-transparent');
    expect(cls).not.toContain('shadow');
    expect(cls).not.toContain('rounded');
  });

  it('lays the text column out with the shared recipe', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" value="1.2.0" />);
    const text = row(container).firstElementChild as HTMLElement;
    expect(text.className).toBe(ROW_V4_TEXT_CLASS);
    expect(text.className).toContain('min-w-0');
    const trailing = row(container).lastElementChild as HTMLElement;
    expect(trailing.className).toBe(ROW_V4_TRAILING_CLASS);
    expect(trailing.className).toContain('shrink-0');
  });
});

describe('SettingsRowV4 (web) — the leading slot', () => {
  it('has none by default, so nothing existing moves', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" />);
    expect((row(container).firstElementChild as HTMLElement).className).toBe(ROW_V4_TEXT_CLASS);
  });

  it('draws a settings group as a tinted circular badge, never a bare dot', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Alerts" icon="bell" iconTone="warn" />
    );
    const slot = row(container).firstElementChild as HTMLElement;
    expect(slot.className).toBe(ROW_V4_LEADING_CLASS);
    const badge = icons(container)[0] as HTMLElement;
    expect(badge.getAttribute('data-badge')).toBe('soft');
    expect(badge.getAttribute('data-shape')).toBe('circle');
  });

  it('lets an explicit leading slot win over the badge', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Alerts" icon="bell" leading={<span data-testid="own" />} />
    );
    expect(container.querySelector('[data-testid="own"]')).toBeTruthy();
    expect(icons(container).filter((el) => el.getAttribute('data-badge') !== null)).toHaveLength(0);
  });
});

describe('SettingsRowV4 (web) — the chevron means navigation', () => {
  it('draws no chevron on a row that does nothing', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Version" value="1.2.0" />);
    expect(chevrons(container)).toHaveLength(0);
  });

  it('draws one on a row that navigates', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Account" onClick={() => undefined} />
    );
    expect(chevrons(container)).toHaveLength(1);
  });

  it('gives a toggling row its control instead of a chevron', () => {
    const { container } = renderThemed(
      <SettingsRowV4
        label="Dark mode"
        rightSlot={<span data-testid="switch" />}
        onClick={() => undefined}
      />
    );
    // §4.3: a chevron when the row navigates, a control when it toggles — never
    // both, or the row promises a screen it never pushes.
    expect(chevrons(container)).toHaveLength(0);
    expect(container.querySelector('[data-testid="switch"]')).toBeTruthy();
  });

  it('lets a caller force the affordance either way', () => {
    const off = renderThemed(
      <SettingsRowV4 label="Account" onClick={() => undefined} chevron={false} />
    );
    expect(chevrons(off.container)).toHaveLength(0);

    const on = renderThemed(<SettingsRowV4 label="Account" chevron />);
    expect(chevrons(on.container)).toHaveLength(1);
  });

  it('draws the chevron as an icon, not as the `›` the base row typed', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Account" onClick={() => undefined} />
    );
    const mark = chevrons(container)[0] as HTMLElement;
    expect(mark.getAttribute('data-xen-v4-icon')).toBe('');
    expect((mark.parentElement as HTMLElement).className).toBe(ROW_V4_TRAILING_CLASS);
    // Every `›` in the markup belongs to the icon component; none is loose text.
    Array.from(row(container).querySelectorAll('*'))
      .filter((el) => el.children.length === 0 && el.textContent === CHEVRON)
      .forEach((el) => expect(el.closest('[data-xen-v4-icon]')).toBeTruthy());
  });

  it('keeps the value ahead of the affordance, in anatomy order', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Theme" value="System" onClick={() => undefined} />
    );
    const trailing = row(container).lastElementChild as HTMLElement;
    expect(trailing.textContent).toBe(`System${CHEVRON}`);
  });
});

describe('SettingsRowV4 (web) — press is the state layer', () => {
  it('opts into the shared layer and nothing else', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="Account" onClick={() => undefined} />
    );
    const el = row(container);
    expect(el.getAttribute('data-xen-v4-state')).toBe('');
    // The feedbacks §4.3 deletes rather than translates.
    expect(el.className).not.toContain('hover:bg-neutral-100');
    expect(el.className).not.toMatch(/hover:/);
    expect(el.className).not.toMatch(/opacity/);
  });

  it('mixes the layer from the pair the row is actually drawn on', () => {
    renderThemed(<SettingsRowV4 label="Account" onClick={() => undefined} />);
    const css = document.getElementById(ROW_V4_STYLE_ID)?.textContent ?? '';
    expect(css).toContain('--xen-v4-state-ground: var(--xen-card)');
    expect(css).toContain('--xen-v4-state-ink: var(--xen-on-card)');
    expect(css).not.toContain('box-shadow');
  });

  it('paints the selected ground from the one token that ships a contrast pair', () => {
    const { container } = renderThemed(<SettingsRowV4 label="Account" selected />);
    expect(row(container).className).toContain('bg-selected');
    expect(row(container).className).toContain('text-on-selected');
    expect(row(container).className).not.toContain('neutral-');
  });
});

describe('SettingsRowV4 (web) — token purity', () => {
  it('names no colour, spacing, radius or size literal on the row itself', () => {
    const { container } = renderThemed(
      <SettingsRowV4
        label="Notifications"
        description="Push and email"
        value="On"
        selected
        onClick={() => undefined}
      />
    );
    const el = row(container);
    expect(el.className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(el.className).not.toMatch(/rgb|hsl/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
    expect(el.className).not.toMatch(/neutral-/);
    const arbitrary = el.className.match(/\[[^\]]+\]/g) ?? [];
    expect(arbitrary.length).toBeGreaterThan(0);
    arbitrary.forEach((value) => expect(value).toContain('var(--xen-'));
  });

  it('keeps hex out of the injected sheet too', () => {
    renderThemed(<SettingsRowV4 label="Account" onClick={() => undefined} />);
    const css = document.getElementById(ROW_V4_STYLE_ID)?.textContent ?? '';
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css.length).toBeGreaterThan(0);
  });
});

describe('SettingsRowV4 (web) — the empty state', () => {
  it('renders nothing rather than a blank band when it has nothing to show', () => {
    const { container } = renderThemed(<SettingsRowV4 label="" />);
    expect(container.querySelector('[data-xen-v4-row]')).toBeNull();
  });

  it('treats whitespace and empty strings as empty', () => {
    const { container } = renderThemed(<SettingsRowV4 label="  " description="" value="" />);
    expect(container.querySelector('[data-xen-v4-row]')).toBeNull();
  });

  it('still renders when only a trailing control has something to say', () => {
    const { container } = renderThemed(
      <SettingsRowV4 label="" rightSlot={<span data-testid="switch" />} />
    );
    expect(row(container)).toBeTruthy();
    expect(container.querySelector('[data-testid="switch"]')).toBeTruthy();
  });
});
