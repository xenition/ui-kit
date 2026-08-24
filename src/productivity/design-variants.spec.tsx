/** @jest-environment jsdom */
/**
 * Alternate productivity designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of TaskRow, ProjectCard, NoteCard, MilestoneRow. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal hex
 * in inline styles beyond geometric widths), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { TaskRowV2 } from './TaskRowV2';
import { TaskRowV3 } from './TaskRowV3';
import { ProjectCardV2 } from './ProjectCardV2';
import { ProjectCardV3 } from './ProjectCardV3';
import { NoteCardV2 } from './NoteCardV2';
import { NoteCardV3 } from './NoteCardV3';
import { MilestoneRowV2 } from './MilestoneRowV2';
import { MilestoneRowV3 } from './MilestoneRowV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('TaskRow alternates (web)', () => {
  it('V2 toggles done', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(<TaskRowV2 title="Write brief" variant="priority" priority="high" onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
  it('V3 toggles done', () => {
    const onToggle = jest.fn();
    const { getByRole, container } = render(<TaskRowV3 title="Review PR" variant="dated" dueLabel="Tomorrow" dueTone="upcoming" onToggle={onToggle} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('ProjectCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ProjectCardV2 title="Apollo" description="Launch" progress={65} taskCount={12} assignees={[{ name: 'Ada' }]} dueLabel="Aug 30" dueTone="upcoming" onClick={onClick} />);
    expect(getByText('Apollo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Apollo'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ProjectCardV3 title="Zephyr" progress={30} taskCount={4} onClick={onClick} />);
    expect(getByText('Zephyr')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Zephyr'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('NoteCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<NoteCardV2 title="Idea" body="A great idea" timestamp="2h ago" pinned onClick={onClick} />);
    expect(getByText('Idea')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Idea'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<NoteCardV3 title="Reminder" body="Call client" timestamp="1d" />);
    expect(getByText('Reminder')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MilestoneRow alternates (web)', () => {
  it('V2 renders progress', () => {
    const { getByText, container } = render(<MilestoneRowV2 title="Beta launch" progress={80} dateLabel="Sep 1" dateTone="upcoming" />);
    expect(getByText('Beta launch')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a reached milestone', () => {
    const { getByText, container } = render(<MilestoneRowV3 title="Alpha done" reached dateLabel="Aug 1" />);
    expect(getByText('Alpha done')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
