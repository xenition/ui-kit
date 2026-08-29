/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { SearchHeaderV4 } from './SearchHeaderV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The bar the component owns. */
function bar(ui: ReactElement): HTMLElement {
  const { container } = renderThemed(ui);
  const el = container.querySelector('[data-xen-v4-search-header]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The composed `SearchInputV4`'s field row. */
function field(el: HTMLElement): HTMLElement {
  const hit = el.querySelector('[data-xen-v4-field]');
  expect(hit).not.toBeNull();
  return hit as HTMLElement;
}

/** The query input inside it. */
function input(el: HTMLElement): HTMLInputElement {
  return el.querySelector('input') as HTMLInputElement;
}

/** The field's clear control, when it is showing. */
function clear(el: HTMLElement): HTMLButtonElement | null {
  return el.querySelector('button[aria-label="Clear search"]');
}

const noop = (): void => {};

describe('SearchHeaderV4 (web)', () => {
  // ── it composes the field (§10.5, §5) ──────────────────────────────

  it('composes `SearchInputV4` instead of re-rolling a second search field', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(field(el)).not.toBeNull();
    expect(input(el).type).toBe('search');
  });

  it('inherits the 48 control metric and the shared focus ring from the field line', () => {
    // §5 asks this component for the `spacing['2xl']` height and
    // `field-v4`'s ring. Both arrive by composition rather than by being
    // restated here, which is the point — one field, one metric.
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(field(el).className).toContain('min-h-[var(--xen-space-2xl)]');
    // The ring is armed off `data-xen-v4-field` by the picker sheet.
    expect(field(el).getAttribute('data-xen-v4-field')).toBe('');
  });

  it('draws no glyph of its own — the marks belong to the field', () => {
    // The base painted `⌕` and `✕` as literal characters in this file, the
    // second with a `hover:text-on-surface` that recoloured the CONTENT.
    const el = bar(<SearchHeaderV4 value="ada" onChangeText={noop} />);
    expect(el.outerHTML).not.toContain('hover:text-');
    expect(el.outerHTML).not.toContain('hover:opacity');
    // The clear control is the field's, with the field line's invisible
    // `spacing['2xl']` target and the state layer.
    const button = clear(el) as HTMLButtonElement;
    expect(button.getAttribute('data-xen-v4-hit')).toBe('');
    expect(button.getAttribute('data-xen-v4-state')).toBe('');
  });

  // ── the query ──────────────────────────────────────────────────────

  it('is controlled, labelled by its placeholder, and reports every keystroke', () => {
    const onChangeText = jest.fn();
    const el = bar(
      <SearchHeaderV4 value="ada" onChangeText={onChangeText} placeholder="Search people" />
    );
    expect(input(el).value).toBe('ada');
    expect(input(el).getAttribute('aria-label')).toBe('Search people');
    expect(input(el).placeholder).toBe('Search people');
    fireEvent.change(input(el), { target: { value: 'adam' } });
    expect(onChangeText).toHaveBeenCalledWith('adam');
  });

  it('takes an explicit accessible name when the placeholder is not one', () => {
    const el = bar(
      <SearchHeaderV4
        value=""
        onChangeText={noop}
        placeholder="e.g. tomato"
        accessibilityLabel="Search recipes"
      />
    );
    expect(input(el).getAttribute('aria-label')).toBe('Search recipes');
  });

  it('submits on Enter, and on nothing else', () => {
    const onSubmit = jest.fn();
    const el = bar(<SearchHeaderV4 value="ada" onChangeText={noop} onSubmit={onSubmit} />);
    fireEvent.keyDown(input(el), { key: 'a' });
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.keyDown(input(el), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('survives having no `onSubmit` at all', () => {
    const el = bar(<SearchHeaderV4 value="ada" onChangeText={noop} />);
    expect(() => fireEvent.keyDown(input(el), { key: 'Enter' })).not.toThrow();
  });

  it('clears the query, and tells the caller it happened', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const el = bar(
      <SearchHeaderV4 value="ada" onChangeText={onChangeText} onClear={onClear} />
    );
    fireEvent.click(clear(el) as HTMLButtonElement);
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('carries no clear control while there is nothing to clear', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(clear(el)).toBeNull();
  });

  it('keeps the clear control on `clearable={false}` — accepted and ignored', () => {
    // The documented exception: the decision belongs to `SearchInputV4`, and
    // suppressing it on one twin and not the other would be the parity break
    // this pass exists to close. Both twins behave identically.
    const el = bar(<SearchHeaderV4 value="ada" onChangeText={noop} clearable={false} />);
    expect(clear(el)).not.toBeNull();
  });

  it('freezes the field on `disabled`', () => {
    const el = bar(<SearchHeaderV4 value="ada" onChangeText={noop} disabled />);
    expect(input(el).disabled).toBe(true);
  });

  it('forwards its ref to the input, so a screen can focus the query on mount', () => {
    const ref = createRef<HTMLInputElement>();
    renderThemed(<SearchHeaderV4 ref={ref} value="" onChangeText={noop} />);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  // ── the row (§4.1) ─────────────────────────────────────────────────

  it('sets the bar out on `spacing.sm`, with the field taking the room', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(el.className).toContain('gap-[var(--xen-space-sm)]');
    expect((el.firstElementChild as HTMLElement).className).toContain('grow');
  });

  it('renders a leading slot and a trailing actions slot that do not shrink', () => {
    const el = bar(
      <SearchHeaderV4
        value=""
        onChangeText={noop}
        leading={<button data-back>Back</button>}
        actions={<button data-filter>Filter</button>}
      />
    );
    expect(el.querySelector('[data-back]')).not.toBeNull();
    expect(el.querySelector('[data-filter]')).not.toBeNull();
    expect((el.firstElementChild as HTMLElement).className).toContain('shrink-0');
    expect((el.lastElementChild as HTMLElement).className).toContain('shrink-0');
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline under the bar by default — §4.4', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(el.className).not.toContain('border-b');
    expect(el.hasAttribute('data-divided')).toBe(false);
  });

  it('puts a hairline in, verbatim, on `divided`', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} divided />);
    expect(el.className).toContain('border-b');
    expect(el.className).toContain('border-border');
    expect(el.className).toContain('pb-[var(--xen-space-md)]');
    expect(el.getAttribute('data-divided')).toBe('');
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders exactly the field with no leading, no actions and no query', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    // One child: the field's column. No empty slots held open beside it.
    expect(el.childElementCount).toBe(1);
    expect(field(el)).not.toBeNull();
    expect(clear(el)).toBeNull();
  });

  it('still draws the bar with an empty query — that is its resting state, not an empty state', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} />);
    expect(input(el).value).toBe('');
    expect(el.isConnected).toBe(true);
  });

  it('renders a leading slot with no actions, and actions with no leading', () => {
    const lead = bar(
      <SearchHeaderV4 value="" onChangeText={noop} leading={<button data-back>Back</button>} />
    );
    expect(lead.childElementCount).toBe(2);
    expect(lead.querySelector('[data-back]')).not.toBeNull();

    const act = bar(
      <SearchHeaderV4 value="" onChangeText={noop} actions={<button data-filter>Filter</button>} />
    );
    expect(act.childElementCount).toBe(2);
    expect(act.querySelector('[data-filter]')).not.toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a className for layout without losing the row', () => {
    const el = bar(<SearchHeaderV4 value="" onChangeText={noop} className="mb-lg" />);
    expect(el.className).toContain('mb-lg');
    expect(el.className).toContain('flex-row');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = bar(
      <SearchHeaderV4
        value="ada"
        onChangeText={noop}
        divided
        leading={<button>Back</button>}
        actions={<button>Filter</button>}
      />
    );
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
