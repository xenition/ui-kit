/** @jest-environment jsdom */
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import {
  installMatchMedia,
  installMockIntersectionObserver,
} from '../spec-support/mock-io';
import { Carousel } from './Carousel';
import { ComparisonTable } from './ComparisonTable';
import { NewsletterSignup } from './NewsletterSignup';
import { PricingToggle } from './PricingToggle';

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(false);
});

describe('Carousel', () => {
  it('renders every slide as a labelled group', () => {
    const { getByText, container } = render(
      <Carousel items={[<div key="a">Slide A</div>, <div key="b">Slide B</div>]} label="Quotes" />
    );
    expect(getByText('Slide A')).toBeTruthy();
    expect(getByText('Slide B')).toBeTruthy();
    expect(container.querySelectorAll('[data-xen-carousel-slide]')).toHaveLength(2);
    expect(container.querySelector('[data-xen-carousel]')?.getAttribute('aria-label')).toBe(
      'Quotes'
    );
  });

  it('advances the active slide when Next is clicked', () => {
    const { getByLabelText } = render(
      <Carousel items={[<div key="a">A</div>, <div key="b">B</div>, <div key="c">C</div>]} />
    );
    const dot1 = getByLabelText('Go to slide 1');
    const dot2 = getByLabelText('Go to slide 2');
    expect(dot1.getAttribute('aria-selected')).toBe('true');
    expect(dot2.getAttribute('aria-selected')).toBe('false');

    fireEvent.click(getByLabelText('Next slide'));

    expect(dot1.getAttribute('aria-selected')).toBe('false');
    expect(dot2.getAttribute('aria-selected')).toBe('true');
  });

  it('navigates with the ArrowRight key', () => {
    const { getByLabelText, container } = render(
      <Carousel items={[<div key="a">A</div>, <div key="b">B</div>]} />
    );
    fireEvent.keyDown(container.querySelector('[data-xen-carousel]') as HTMLElement, {
      key: 'ArrowRight',
    });
    expect(getByLabelText('Go to slide 2').getAttribute('aria-selected')).toBe('true');
  });
});

describe('ComparisonTable', () => {
  const columns = [{ name: 'Free' }, { name: 'Pro', highlight: true }];
  const rows = [
    { label: 'Projects', values: ['1', 'Unlimited'] },
    { label: 'SSO', values: [false, true] },
  ];

  it('renders header, feature rows, and check/dash/text cells', () => {
    const { getByText, getAllByRole, container } = render(
      <ComparisonTable columns={columns} rows={rows} />
    );
    expect(getByText('Free')).toBeTruthy();
    expect(getByText('Pro')).toBeTruthy();
    expect(getByText('Projects')).toBeTruthy();
    expect(getByText('Unlimited')).toBeTruthy();
    // one row header per feature + a row-group + col headers → assert body row headers
    expect(getAllByRole('rowheader')).toHaveLength(2);
    // check and dash icons are decorative svgs
    expect(container.querySelectorAll('svg[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('marks and badges the highlighted column', () => {
    const { getByText, container } = render(
      <ComparisonTable columns={columns} rows={rows} highlightLabel="Best value" />
    );
    expect(getByText('Best value')).toBeTruthy();
    const highlighted = container.querySelectorAll('[data-highlight="true"]');
    expect(highlighted.length).toBeGreaterThan(0);
  });
});

describe('PricingToggle', () => {
  const options = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly', badge: 'Save 20%' },
  ];

  it('renders options with the save badge and reflects the active value', () => {
    const { getByText, getByRole } = render(
      <PricingToggle options={options} value="monthly" onChange={() => {}} />
    );
    expect(getByText('Save 20%')).toBeTruthy();
    expect(getByRole('radio', { name: /Monthly/ }).getAttribute('aria-checked')).toBe('true');
  });

  it('fires onChange with the newly selected value', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <PricingToggle options={options} value="monthly" onChange={onChange} />
    );
    fireEvent.click(getByText('Yearly'));
    expect(onChange).toHaveBeenCalledWith('yearly');
  });
});

describe('NewsletterSignup', () => {
  it('renders heading, subtext, input, and button', () => {
    const { getByText, getByLabelText, getByRole } = render(
      <NewsletterSignup heading="Join us" subtext="Weekly digest." onSubmit={jest.fn()} />
    );
    expect(getByText('Join us')).toBeTruthy();
    expect(getByText('Weekly digest.')).toBeTruthy();
    expect(getByLabelText('Email address')).toBeTruthy();
    expect(getByRole('button', { name: 'Subscribe' })).toBeTruthy();
  });

  it('blocks invalid emails and surfaces an error without calling onSubmit', () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <NewsletterSignup onSubmit={onSubmit} invalidMessage="Bad email" />
    );
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'not-an-email' } });
    fireEvent.click(getByRole('button', { name: 'Subscribe' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText('Bad email')).toBeTruthy();
  });

  it('calls onSubmit with a valid email and shows the success state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByLabelText, getByRole, findByText } = render(
      <NewsletterSignup onSubmit={onSubmit} successMessage="You're in!" />
    );
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(getByRole('button', { name: 'Subscribe' }));
    expect(onSubmit).toHaveBeenCalledWith('ada@example.com');
    expect(await findByText("You're in!")).toBeTruthy();
  });

  it('shows the error state when onSubmit rejects', async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error('Server down'));
    const { getByLabelText, getByRole, findByText } = render(
      <NewsletterSignup onSubmit={onSubmit} />
    );
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(getByRole('button', { name: 'Subscribe' }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(await findByText('Server down')).toBeTruthy();
  });
});
