/** @jest-environment jsdom */
/**
 * Web field-service V2/V3 alternate designs: render smoke, token-purity (no hex
 * literal in any inline style), and one key interaction per variant. Plain jsdom
 * render (colors are token classes — no provider needed), mirroring the base
 * `fieldservice.spec.tsx`.
 */
import { fireEvent, render } from '@testing-library/react';
import { InspectionRowV2 } from './InspectionRowV2';
import { InspectionRowV3 } from './InspectionRowV3';
import { JobSiteCardV2 } from './JobSiteCardV2';
import { JobSiteCardV3 } from './JobSiteCardV3';
import { TechnicianCardV2 } from './TechnicianCardV2';
import { TechnicianCardV3 } from './TechnicianCardV3';
import { WorkOrderCardV2 } from './WorkOrderCardV2';
import { WorkOrderCardV3 } from './WorkOrderCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** All inline `style` attributes joined — used for the token-purity assertion. */
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('fieldservice web design variants (V2/V3)', () => {
  it('InspectionRowV2 renders, is token-pure, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <InspectionRowV2 label="Fire extinguisher charged" result="fail" code="NFPA 10" onClick={onClick} />
    );
    expect(getByText('Fire extinguisher charged')).toBeTruthy();
    expect(container.innerHTML).toContain('bg-danger/10');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: /Fire extinguisher charged, Fail/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('InspectionRowV3 renders the result word and is token-pure', () => {
    const { getByText, container } = render(
      <InspectionRowV3 label="Guardrails secured" result="pass" code="OSHA 1926" />
    );
    expect(getByText('Guardrails secured')).toBeTruthy();
    expect(container.innerHTML).toContain('text-success');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('JobSiteCardV2 renders the banner + stat tiles and fires onNavigate', () => {
    const onNavigate = jest.fn();
    const { getByRole, getByText, container } = render(
      <JobSiteCardV2 name="Riverside Plaza" address="14 Wharf St" status="active" crewCount={4} onNavigate={onNavigate} />
    );
    expect(getByText('Riverside Plaza')).toBeTruthy();
    expect(getByText('crew')).toBeTruthy();
    expect(container.innerHTML).toContain('bg-accent/10');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: /Directions/ }));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('JobSiteCardV3 renders the compact row and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <JobSiteCardV3 name="Dock 7" address="Pier 22" status="blocked" onClick={onClick} />
    );
    expect(getByText('Dock 7')).toBeTruthy();
    fireEvent.keyDown(getByRole('button', { name: /Dock 7, Pier 22, Blocked/ }), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('TechnicianCardV2 renders the profile card and fires onAssign', () => {
    const onAssign = jest.fn();
    const { getByRole, getByText, getByLabelText, container } = render(
      <TechnicianCardV2 name="Marcus Reyes" role="HVAC Lead" status="available" skills={['EPA 608']} onAssign={onAssign} />
    );
    expect(getByText('Marcus Reyes')).toBeTruthy();
    expect(getByText('EPA 608')).toBeTruthy();
    expect(getByLabelText('Available')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Assign' }));
    expect(onAssign).toHaveBeenCalledTimes(1);
  });

  it('TechnicianCardV3 renders the roster row and fires onCall', () => {
    const onCall = jest.fn();
    const { getByRole, getByLabelText } = render(
      <TechnicianCardV3 name="Dana Lee" role="Electrician" status="en-route" phone="555-0100" onCall={onCall} />
    );
    expect(getByLabelText('En route')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Call Dana Lee' }));
    expect(onCall).toHaveBeenCalledTimes(1);
  });

  it('WorkOrderCardV2 renders the rail card, is token-pure, and fires onClick via keyboard', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <WorkOrderCardV2 workOrderNumber="WO-10482" title="Replace HVAC compressor" status="in-progress" priority="high" site="Riverside Plaza" onClick={onClick} />
    );
    expect(getByText('Replace HVAC compressor')).toBeTruthy();
    expect(getByText(/In progress/)).toBeTruthy();
    expect(container.innerHTML).toContain('bg-primary');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.keyDown(getByRole('button', { name: /Work order WO-10482/ }), { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('WorkOrderCardV3 renders the dense line and shows a loading skeleton', () => {
    const { getByText, container } = render(
      <WorkOrderCardV3 workOrderNumber="WO-1" title="Inspect" status="open" />
    );
    expect(getByText('Inspect')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    const loading = render(<WorkOrderCardV3 workOrderNumber="WO-2" title="x" status="open" loading />);
    expect(loading.container.querySelector('[aria-label="Loading work order"]')).toBeTruthy();
  });
});
