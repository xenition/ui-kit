/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { Popover } from './Popover';
import { Menu } from './Menu';
import { Accordion } from './Accordion';
import { Drawer } from './Drawer';
import { Popconfirm } from './Popconfirm';

describe('Tooltip', () => {
  it('shows label on hover', () => {
    const { getByText, queryByRole } = render(
      <Tooltip label="Hi there">
        <button>hover</button>
      </Tooltip>
    );
    expect(queryByRole('tooltip')).toBeNull();
    fireEvent.mouseEnter(getByText('hover').parentElement!);
    expect(getByText('Hi there')).toBeTruthy();
  });
});

describe('Popover / Menu', () => {
  it('Popover opens on trigger click', () => {
    const { getByText, queryByText } = render(
      <Popover trigger={<button>open</button>}>panel body</Popover>
    );
    expect(queryByText('panel body')).toBeNull();
    fireEvent.click(getByText('open'));
    expect(getByText('panel body')).toBeTruthy();
  });

  it('Menu fires onSelect and closes', () => {
    const onSelect = jest.fn();
    const { getByText, queryByText } = render(
      <Menu trigger={<button>menu</button>} items={[{ label: 'Edit', onSelect }]} />
    );
    fireEvent.click(getByText('menu'));
    fireEvent.click(getByText('Edit'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(queryByText('Edit')).toBeNull();
  });
});

describe('Accordion', () => {
  it('opens a panel and (single) closes the others', () => {
    const { getByText, queryByText } = render(
      <Accordion
        items={[
          { value: 'a', title: 'A', content: 'body A' },
          { value: 'b', title: 'B', content: 'body B' },
        ]}
      />
    );
    expect(queryByText('body A')).toBeNull();
    fireEvent.click(getByText('A'));
    expect(getByText('body A')).toBeTruthy();
    fireEvent.click(getByText('B'));
    expect(queryByText('body A')).toBeNull(); // single mode
    expect(getByText('body B')).toBeTruthy();
  });
});

describe('Drawer / Popconfirm', () => {
  it('Drawer renders only when open', () => {
    const { rerender, queryByText, getByText } = render(
      <Drawer open={false} onClose={() => {}} title="Panel">
        drawer body
      </Drawer>
    );
    expect(queryByText('drawer body')).toBeNull();
    rerender(
      <Drawer open onClose={() => {}} title="Panel">
        drawer body
      </Drawer>
    );
    expect(getByText('drawer body')).toBeTruthy();
  });

  it('Popconfirm confirms', () => {
    const onConfirm = jest.fn();
    const { getByText } = render(
      <Popconfirm trigger={<button>del</button>} message="Sure?" onConfirm={onConfirm} />
    );
    fireEvent.click(getByText('del'));
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
