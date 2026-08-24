/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { Icon } from './Icon';
import { FloatButton } from './FloatButton';
import { BottomNav } from './BottomNav';
import { ContextMenu } from './ContextMenu';
import { ActionSheet } from './ActionSheet';
import { BottomSheet } from './BottomSheet';
import { Banner } from './Banner';
import { Callout } from './Callout';
import { Result } from './Result';
import { LoadingOverlay } from './LoadingOverlay';
import { ButtonGroup } from './ButtonGroup';
import { Watermark } from './Watermark';

describe('Icon', () => {
  it('renders the glyph and stays decorative without an aria-label', () => {
    const { getByText } = render(<Icon glyph="★" size="xl" color="primary" />);
    const el = getByText('★');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.className).toContain('text-primary');
  });
  it('exposes role="img" when aria-label is set', () => {
    const { getByRole } = render(<Icon name="✓" aria-label="done" />);
    expect(getByRole('img').getAttribute('aria-label')).toBe('done');
  });
});

describe('FloatButton', () => {
  it('renders a fixed FAB and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<FloatButton label="New" onClick={onClick} />);
    const btn = getByRole('button');
    expect(btn.className).toContain('fixed');
    expect(btn.getAttribute('aria-label')).toBe('New');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('BottomNav', () => {
  it('marks the active tab and reports changes', () => {
    const onChange = jest.fn();
    const { getByLabelText, getByRole } = render(
      <BottomNav
        active="home"
        onChange={onChange}
        items={[
          { key: 'home', label: 'Home' },
          { key: 'settings', label: 'Settings' },
        ]}
      />
    );
    expect(getByRole('tablist').className).toContain('fixed');
    expect(getByLabelText('Home').getAttribute('aria-selected')).toBe('true');
    fireEvent.click(getByLabelText('Settings'));
    expect(onChange).toHaveBeenCalledWith('settings');
  });
});

describe('ContextMenu', () => {
  it('opens on right-click and fires the action', () => {
    const onSelect = jest.fn();
    const { getByText, queryByRole, getByRole } = render(
      <ContextMenu actions={[{ label: 'Delete', danger: true, onSelect }]}>
        <span>target</span>
      </ContextMenu>
    );
    expect(queryByRole('menu')).toBeNull();
    fireEvent.contextMenu(getByText('target'));
    expect(getByRole('menu')).toBeTruthy();
    fireEvent.click(getByText('Delete'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(queryByRole('menu')).toBeNull();
  });
});

describe('ActionSheet', () => {
  it('opens, fires an action, and closes on Escape', () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      const pick = jest.fn();
      return (
        <>
          <button onClick={() => setOpen(true)}>open</button>
          <ActionSheet
            open={open}
            onClose={() => setOpen(false)}
            title="Choose"
            actions={[{ label: 'Share', onSelect: pick }]}
          />
        </>
      );
    }
    const { getByText, queryByRole, getByRole } = render(<Harness />);
    fireEvent.click(getByText('open'));
    expect(getByRole('dialog')).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(queryByRole('dialog')).toBeNull();
  });

  it('invokes onSelect + onClose when an action is clicked', () => {
    const onClose = jest.fn();
    const onSelect = jest.fn();
    const { getByText } = render(
      <ActionSheet open onClose={onClose} actions={[{ label: 'Copy', onSelect }]} />
    );
    fireEvent.click(getByText('Copy'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('BottomSheet', () => {
  it('renders content when open and closes via the grabber', () => {
    const onClose = jest.fn();
    const { getByText, getByLabelText } = render(
      <BottomSheet open onClose={onClose} title="Details">
        <p>body</p>
      </BottomSheet>
    );
    expect(getByText('body')).toBeTruthy();
    fireEvent.click(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when closed', () => {
    const { queryByRole } = render(<BottomSheet open={false} onClose={() => {}} />);
    expect(queryByRole('dialog')).toBeNull();
  });
});

describe('Banner', () => {
  it('uses the alert role for danger and dismisses', () => {
    const onClose = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Banner tone="danger" onClose={onClose}>
        Down
      </Banner>
    );
    const el = getByRole('alert');
    expect(el.className).toContain('bg-danger');
    fireEvent.click(getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Callout', () => {
  it('renders title, body and a tone border', () => {
    const { getByText, getByRole } = render(
      <Callout tone="warn" title="Note">
        careful
      </Callout>
    );
    expect(getByText('Note')).toBeTruthy();
    expect(getByText('careful')).toBeTruthy();
    expect(getByRole('note').className).toContain('border-warn');
  });
});

describe('Result', () => {
  it('renders status, title, and fires the action', () => {
    const onAction = jest.fn();
    const { getByText, getByLabelText } = render(
      <Result status="error" title="Failed" description="try again" actionLabel="Retry" onAction={onAction} />
    );
    expect(getByText('Failed')).toBeTruthy();
    expect(getByLabelText('error')).toBeTruthy();
    fireEvent.click(getByText('Retry'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('LoadingOverlay', () => {
  it('renders only when visible with a busy live region', () => {
    const { rerender, queryByRole, getByRole } = render(<LoadingOverlay visible={false} />);
    expect(queryByRole('progressbar')).toBeNull();
    rerender(<LoadingOverlay visible label="Saving" />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-busy')).toBe('true');
    expect(bar.getAttribute('aria-label')).toBe('Saving');
  });
});

describe('ButtonGroup', () => {
  it('joins children with dividers under a group role', () => {
    const { getByRole } = render(
      <ButtonGroup>
        <button>a</button>
        <button>b</button>
        <button>c</button>
      </ButtonGroup>
    );
    const group = getByRole('group');
    // 3 buttons + 2 dividers.
    expect(group.querySelectorAll('span[aria-hidden]')).toHaveLength(2);
  });
});

describe('Watermark', () => {
  it('tiles the text as a non-interactive overlay', () => {
    const { getAllByText, container } = render(
      <Watermark text="DRAFT" count={5}>
        <div>doc</div>
      </Watermark>
    );
    expect(getAllByText('DRAFT')).toHaveLength(5);
    expect(container.querySelector('.pointer-events-none')).toBeTruthy();
  });
});
