/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { ReportListingV4 } from './ReportListingV4';
import type { ReportReason } from './ReportListing';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const REASONS: ReportReason[] = [
  { id: 'counterfeit', label: 'Counterfeit item' },
  { id: 'other', label: 'Something else', requiresDetails: true },
];

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function panel(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-report-listing]');
}

function reasonRows(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-report-reason]'));
}

function submitButton(container: HTMLElement): HTMLButtonElement {
  return container.querySelector('[data-xen-report-submit]') as HTMLButtonElement;
}

const CHECK = resolveIconGlyph('check');

describe('ReportListingV4 (web) — the confirmation step', () => {
  it('does not submit on a single tap — it opens the confirmation', () => {
    const onSubmit = jest.fn();
    const { container, getByText, queryByRole } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />
    );

    fireEvent.click(getByText('Counterfeit item'));
    expect(submitButton(container).disabled).toBe(false);
    expect(queryByRole('dialog')).toBeNull();

    fireEvent.click(submitButton(container));
    // One tap: a question, not a report.
    expect(onSubmit).not.toHaveBeenCalled();
    expect(queryByRole('dialog')).toBeTruthy();
  });

  it('submits only once the confirmation is answered', () => {
    const onSubmit = jest.fn();
    const { container, getByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />
    );
    fireEvent.click(getByText('Counterfeit item'));
    fireEvent.click(submitButton(container));
    fireEvent.click(getByText('Report'));
    expect(onSubmit).toHaveBeenCalledWith('counterfeit', undefined);
  });

  it('lets the confirmation be backed out of, with nothing sent', () => {
    const onSubmit = jest.fn();
    const { container, getByText, queryByRole } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />
    );
    fireEvent.click(getByText('Counterfeit item'));
    fireEvent.click(submitButton(container));
    fireEvent.click(getByText('Cancel'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(queryByRole('dialog')).toBeNull();
  });

  it('confirmMessage and confirmLabel (new) are the caller\'s words', () => {
    const { container, getByText, getByRole } = renderThemed(
      <ReportListingV4
        reasons={REASONS}
        confirmMessage="This goes to a moderator."
        confirmLabel="Send it"
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(getByText('Counterfeit item'));
    fireEvent.click(submitButton(container));
    expect(getByRole('dialog').textContent).toContain('This goes to a moderator.');
    expect(getByText('Send it')).toBeTruthy();
  });

  it('keeps a disabled submit from opening anything at all', () => {
    const onSubmit = jest.fn();
    const { container, queryByRole } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />
    );
    expect(submitButton(container).disabled).toBe(true);
    fireEvent.click(submitButton(container));
    expect(queryByRole('dialog')).toBeNull();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('ReportListingV4 (web) — props and selection', () => {
  it('keeps every base prop working', () => {
    const onCancel = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const { container, getByText } = renderThemed(
      <ReportListingV4
        ref={ref}
        reasons={REASONS}
        title="Report it"
        submitLabel="File report"
        onCancel={onCancel}
        className="custom"
      />
    );
    expect(getByText('Report it')).toBeTruthy();
    expect(getByText('File report')).toBeTruthy();
    expect(panel(container)?.className).toContain('custom');
    expect(ref.current?.getAttribute('data-xen-report-listing')).toBe('');

    fireEvent.click(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('confirms the chosen reason with a highlight and a mark, never a tone alone', () => {
    const { container, getByText } = renderThemed(<ReportListingV4 reasons={REASONS} />);
    const [first] = reasonRows(container);
    expect(first?.getAttribute('aria-checked')).toBe('false');
    expect(first?.className).toContain('bg-transparent');

    fireEvent.click(getByText('Counterfeit item'));
    const [chosen] = reasonRows(container);
    expect(chosen?.getAttribute('aria-checked')).toBe('true');
    expect(chosen?.className).toContain('bg-selected');
    expect(chosen?.textContent).toContain(CHECK);
    expect(container.querySelectorAll('[data-xen-report-check]')).toHaveLength(1);
  });

  it('asks for details in words when the reason requires them', () => {
    const onSubmit = jest.fn();
    const { container, getByText, getByRole, queryByRole } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />
    );
    fireEvent.click(getByText('Something else'));
    expect(getByText('Details (required)')).toBeTruthy();
    expect(submitButton(container).disabled).toBe(true);
    expect(queryByRole('alert')).toBeNull();

    const details = container.querySelector('[data-testid="xen-mkt-report-details"]') as HTMLInputElement;
    fireEvent.change(details, { target: { value: '   ' } });
    expect(getByRole('alert').textContent).toBe('Tell us what happened — this reason needs details.');

    fireEvent.change(details, { target: { value: 'It arrived broken' } });
    fireEvent.click(submitButton(container));
    fireEvent.click(getByText('Report'));
    expect(onSubmit).toHaveBeenCalledWith('other', 'It arrived broken');
  });
});

describe('ReportListingV4 (web) — the empty case and the label', () => {
  it('degrades to EmptyStateV4 with no reasons', () => {
    const { container, getByText } = renderThemed(<ReportListingV4 reasons={[]} />);
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
    expect(getByText('No report reasons available')).toBeTruthy();
    expect(reasonRows(container)).toHaveLength(0);
    expect(submitButton(container).disabled).toBe(true);
  });

  it('hides cancel entirely when nothing is listening for it', () => {
    const { queryByText } = renderThemed(<ReportListingV4 reasons={REASONS} />);
    expect(queryByText('Cancel')).toBeNull();
  });

  it('names the reason group and every reason in it', () => {
    const { container, getByRole } = renderThemed(<ReportListingV4 reasons={REASONS} />);
    expect(getByRole('radiogroup').getAttribute('aria-label')).toBe('Report this listing');
    expect(reasonRows(container).map((el) => el.getAttribute('aria-label'))).toEqual([
      'Counterfeit item',
      'Something else',
    ]);
  });
});
