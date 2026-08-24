/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';
import { Pagination } from './Pagination';
import { List } from './List';
import { Breadcrumb } from './Breadcrumb';
import { Timeline } from './Timeline';
import { Descriptions } from './Descriptions';
import { AvatarGroup } from './AvatarGroup';
import { Segmented } from './Segmented';
import { Steps } from './Steps';

describe('Tag', () => {
  it('renders and removes', () => {
    const onRemove = jest.fn();
    const { getByText, getByLabelText } = render(
      <Tag tone="primary" onRemove={onRemove}>
        react
      </Tag>
    );
    expect(getByText('react')).toBeTruthy();
    fireEvent.click(getByLabelText('Remove'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('keeps the solid default and layers soft/outline variants + accent tone', () => {
    const solid = render(<Tag tone="primary">a</Tag>).getByText('a');
    expect(solid.className).toContain('bg-primary-50');

    const soft = render(
      <Tag tone="accent" variant="soft">
        b
      </Tag>
    ).getByText('b');
    expect(soft.className).toContain('bg-accent-50');
    expect(soft.className).toContain('text-accent');

    const outline = render(
      <Tag tone="success" variant="outline">
        c
      </Tag>
    ).getByText('c');
    expect(outline.className).toContain('border-success');
    expect(outline.className).toContain('text-success');
  });

  it('shows the remove affordance via removable and the sm size + leading dot', () => {
    const { getByLabelText, getByText } = render(
      <Tag size="sm" removable dot>
        d
      </Tag>
    );
    expect(getByLabelText('Remove')).toBeTruthy();
    expect(getByText('d').className).toContain('px-1.5');
    const dot = getByText('d').parentElement?.querySelector('[aria-hidden]');
    expect(dot?.className).toContain('rounded-full');
  });
});

describe('Pagination', () => {
  it('hides for a single page and paginates otherwise', () => {
    const { container } = render(<Pagination page={1} pageCount={1} onPageChange={() => {}} />);
    expect(container.querySelector('nav')).toBeNull();

    const onPageChange = jest.fn();
    const { getByText } = render(<Pagination page={3} pageCount={10} onPageChange={onPageChange} />);
    fireEvent.click(getByText('4'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});

describe('List / Breadcrumb / Segmented / Steps', () => {
  it('List row fires onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(<List items={[{ title: 'Row', onClick }]} />);
    fireEvent.click(getByText('Row'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Breadcrumb marks the last item current', () => {
    const { getByText } = render(
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Now' }]} />
    );
    expect(getByText('Now').getAttribute('aria-current')).toBe('page');
  });

  it('Segmented reports change', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Segmented
        value="a"
        onChange={onChange}
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    );
    fireEvent.click(getByText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('Steps marks done/active', () => {
    const { getByText } = render(
      <Steps current={1} steps={[{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]} />
    );
    expect(getByText('✓')).toBeTruthy(); // step 0 done
    expect(getByText('2')).toBeTruthy(); // active shows its number
  });
});

describe('Timeline / Descriptions / AvatarGroup', () => {
  it('Timeline renders items', () => {
    const { getByText } = render(<Timeline items={[{ title: 'Created' }, { title: 'Shipped' }]} />);
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
  });

  it('Descriptions renders label/value', () => {
    const { getByText } = render(<Descriptions items={[{ label: 'Email', value: 'a@b.c' }]} />);
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('a@b.c')).toBeTruthy();
  });

  it('AvatarGroup collapses overflow into +N', () => {
    const { getByText } = render(
      <AvatarGroup max={2} avatars={[{ name: 'A A' }, { name: 'B B' }, { name: 'C C' }, { name: 'D D' }]} />
    );
    expect(getByText('+2')).toBeTruthy();
  });
});
