/** @jest-environment jsdom */
/**
 * Web v2/v3 alternate designs for the crm module: each drop-in variant renders
 * (smoke), stays token-pure (no hex in inline styles), and honours one key
 * interaction / state contract. Base props unchanged — these are additive.
 */
import { fireEvent, render, within } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { ContactCardV2 } from './ContactCardV2';
import { ContactCardV3 } from './ContactCardV3';
import { DealCardV2 } from './DealCardV2';
import { DealCardV3 } from './DealCardV3';
import { LeadRowV2 } from './LeadRowV2';
import { LeadRowV3 } from './LeadRowV3';
import { PipelineBoardV2 } from './PipelineBoardV2';
import { PipelineBoardV3 } from './PipelineBoardV3';
import type { PipelineStage } from './PipelineBoard';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

function renderWithTheme(node: React.ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{node}</XenitionUIProvider>);
}

beforeEach(() => {
  installMatchMedia(false);
});

const STAGES: PipelineStage[] = [
  { id: 'lead', name: 'Lead', deals: [{ id: 'd1', name: 'Deal One', company: 'Acme', valueCents: 100000 }] },
  { id: 'won', name: 'Won', deals: [{ id: 'd2', name: 'Deal Two', valueCents: 250000, outcome: 'won' }] },
  { id: 'idle', name: 'Idle', deals: [] },
];

describe('ContactCard V2/V3', () => {
  it('V2: centered profile hero renders, is token-pure, and fires a quick action', () => {
    const onCall = jest.fn();
    const { container, getByLabelText, getByText } = renderWithTheme(
      <ContactCardV2
        name="Lee Park"
        title="VP Sales"
        company="Initech"
        tags={['Champion']}
        actions={[{ key: 'call', glyph: '📞', label: 'Call', onClick: onCall }]}
      />
    );
    expect(getByText('Lee Park')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });

  it('V3: compact directory row renders with a trailing tag and stays token-pure', () => {
    const { container, getByText } = renderWithTheme(
      <ContactCardV3 name="Dana Cruz" title="Buyer" company="Globex" tags={['Exec']} />
    );
    expect(getByText('Dana Cruz')).toBeTruthy();
    expect(getByText('Exec')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('DealCard V2/V3', () => {
  it('V2: elevated hero card shows value + outcome word and is keyboard-activated', () => {
    const onClick = jest.fn();
    const { container, getByText, getByLabelText } = renderWithTheme(
      <DealCardV2 name="Acme renewal" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" onClick={onClick} />
    );
    expect(getByText('$45,000.00')).toBeTruthy();
    expect(getByText('Won')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    const card = getByLabelText('Deal Acme renewal, Acme Inc');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3: minimal line renders value + probability and stays token-pure', () => {
    const { container, getByText } = renderWithTheme(
      <DealCardV3 name="Beta deal" company="Beta" valueCents={4500000} stage="Lead" probability={40} outcome="lost" />
    );
    expect(getByText('$45,000.00')).toBeTruthy();
    expect(getByText('40%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('LeadRow V2/V3', () => {
  it('V2: flame-chip card shows the temperature word + glyph and stays token-pure', () => {
    const { container, getByText } = renderWithTheme(
      <LeadRowV2 name="Jane Doe" company="Globex" temperature="hot" valueCents={500000} score={88} selected />
    );
    expect(getByText('Hot')).toBeTruthy();
    expect(getByText('🔥')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3: dense line fires onClick and stays token-pure', () => {
    const onClick = jest.fn();
    const { container, getByLabelText } = renderWithTheme(
      <LeadRowV3 name="Rex Iron" company="Initech" temperature="cold" valueCents={5000} score={40} onClick={onClick} />
    );
    fireEvent.click(getByLabelText('Cold lead Rex Iron, Initech'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PipelineBoard V2/V3', () => {
  it('V2: colored-band columns move a deal forward and stay token-pure', () => {
    const onMoveDeal = jest.fn();
    const { container, getByLabelText } = renderWithTheme(<PipelineBoardV2 stages={STAGES} onMoveDeal={onMoveDeal} />);
    fireEvent.click(getByLabelText('Move Deal One forward'));
    expect(onMoveDeal).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' }),
      'forward'
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V2 + V3: render the empty-board placeholder', () => {
    const v2 = renderWithTheme(<PipelineBoardV2 stages={[]} />);
    expect(within(v2.container).getByLabelText('No stages in this pipeline yet')).toBeTruthy();
    const v3 = renderWithTheme(<PipelineBoardV3 stages={[]} />);
    expect(within(v3.container).getByLabelText('No stages in this pipeline yet')).toBeTruthy();
  });

  it('V3: flat list taps a deal line and stays token-pure', () => {
    const onDealClick = jest.fn();
    const { container, getByLabelText } = renderWithTheme(<PipelineBoardV3 stages={STAGES} onDealClick={onDealClick} />);
    fireEvent.click(getByLabelText('Deal Deal One'));
    expect(onDealClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' })
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
