/** @jest-environment jsdom */
/**
 * Alternate survey designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of LikertScale, MultipleChoice, NPSScale, QuestionCard. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal
 * hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { LikertScaleV2 } from './LikertScaleV2';
import { LikertScaleV3 } from './LikertScaleV3';
import { MultipleChoiceV2 } from './MultipleChoiceV2';
import { MultipleChoiceV3 } from './MultipleChoiceV3';
import { NPSScaleV2 } from './NPSScaleV2';
import { NPSScaleV3 } from './NPSScaleV3';
import { QuestionCardV2 } from './QuestionCardV2';
import { QuestionCardV3 } from './QuestionCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const OPTIONS = [
  { id: 'a', label: 'Alpha', description: 'first' },
  { id: 'b', label: 'Beta' },
];

describe('LikertScale alternates (web)', () => {
  it('V2 emits the point', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<LikertScaleV2 points={5} minLabel="Disagree" maxLabel="Agree" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('4'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
  it('V3 emits the point', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<LikertScaleV3 points={5} onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

describe('MultipleChoice alternates (web)', () => {
  it('V2 selects a single option', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(<MultipleChoiceV2 options={OPTIONS} value={null} onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Alpha'));
    expect(onChange).toHaveBeenCalledWith('a');
  });
  it('V3 toggles a multiple option', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(<MultipleChoiceV3 options={OPTIONS} value={['a']} selection="multiple" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Beta'));
    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  });
});

describe('NPSScale alternates (web)', () => {
  it('V2 emits the score', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<NPSScaleV2 colorByBucket onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('9'));
    expect(onChange).toHaveBeenCalledWith(9);
  });
  it('V3 emits the score', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<NPSScaleV3 onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});

describe('QuestionCard alternates (web)', () => {
  it('V2 renders prompt + error', () => {
    const { getByText, container } = render(<QuestionCardV2 title="Your name?" number={1} total={5} required error="Required"><input aria-label="name" /></QuestionCardV2>);
    expect(getByText('Your name?')).toBeTruthy();
    expect(getByText('Required')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders prompt', () => {
    const { getByText, container } = render(<QuestionCardV3 title="Age?" number={2}><input aria-label="age" /></QuestionCardV3>);
    expect(getByText('Age?')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
