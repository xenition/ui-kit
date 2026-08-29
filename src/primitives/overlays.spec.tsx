/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { Popover } from './Popover';
import { Menu } from './Menu';
import { Accordion } from './Accordion';
import { Button } from './Button';
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

  // Tooltip is the one of the four that keeps its wrapper, because hover is not
  // a gesture a nested control can swallow and not one that activates anything.
  // A kit Button child must therefore show the tip AND keep its own onClick.
  it('shows the label over a kit Button child and leaves its onClick alone', () => {
    const onClick = jest.fn();
    const { getByText, queryByRole } = render(
      <Tooltip label="Saves the row">
        <Button onClick={onClick}>Save</Button>
      </Tooltip>
    );
    expect(queryByRole('tooltip')).toBeNull();
    fireEvent.mouseEnter(getByText('Save').parentElement!);
    expect(getByText('Saves the row')).toBeTruthy();
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(getByText('Save'));
    expect(onClick).toHaveBeenCalledTimes(1);
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

  // The twins of the native regression: both inject their handler into the
  // trigger instead of wrapping it, so a kit Button opens the overlay and keeps
  // whatever it already did on click, and a disabled one opens nothing.
  it('Popover opens from a kit Button trigger and keeps its own onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Popover trigger={<Button onClick={onClick}>open</Button>}>panel body</Popover>
    );
    fireEvent.click(getByText('open'));
    expect(getByText('panel body')).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Popover does not open from a disabled trigger', () => {
    const { getByText, queryByText } = render(
      <Popover trigger={<Button disabled>open</Button>}>panel body</Popover>
    );
    fireEvent.click(getByText('open'));
    expect(queryByText('panel body')).toBeNull();
  });

  it('Menu opens from a kit Button trigger and keeps its own onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Menu trigger={<Button onClick={onClick}>menu</Button>} items={[{ label: 'Edit' }]} />
    );
    fireEvent.click(getByText('menu'));
    expect(getByText('Edit')).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Menu does not open from a disabled trigger', () => {
    const { getByText, queryByText } = render(
      <Menu trigger={<Button disabled>menu</Button>} items={[{ label: 'Edit' }]} />
    );
    fireEvent.click(getByText('menu'));
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

  // The twin of the native regression: Popconfirm injects its handler into the
  // trigger instead of wrapping it, so a kit Button opens the bubble and keeps
  // whatever it already did on click, and a disabled one opens nothing.
  it('Popconfirm opens from a kit Button trigger and keeps its own onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Popconfirm
        trigger={<Button onClick={onClick}>Delete</Button>}
        message="Sure?"
        onConfirm={() => {}}
      />
    );
    fireEvent.click(getByText('Delete'));
    expect(getByText('Sure?')).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Popconfirm does not open from a disabled trigger', () => {
    const { getByText, queryByText } = render(
      <Popconfirm trigger={<Button disabled>Delete</Button>} message="Sure?" onConfirm={() => {}} />
    );
    fireEvent.click(getByText('Delete'));
    expect(queryByText('Sure?')).toBeNull();
  });
});
