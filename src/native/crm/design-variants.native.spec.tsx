import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { DealCardV2 } from './DealCardV2';
import { DealCardV3 } from './DealCardV3';
import { ContactCardV2 } from './ContactCardV2';
import { ContactCardV3 } from './ContactCardV3';
import { PipelineBoardV2 } from './PipelineBoardV2';
import { PipelineBoardV3 } from './PipelineBoardV3';
import { LeadRowV2 } from './LeadRowV2';
import { LeadRowV3 } from './LeadRowV3';
import type { PipelineStage } from './PipelineBoard';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

const STAGES: PipelineStage[] = [
  { id: 'lead', name: 'Lead', deals: [{ id: 'd1', name: 'Deal One', company: 'Acme', valueCents: 100000 }] },
  { id: 'won', name: 'Won', deals: [{ id: 'd2', name: 'Deal Two', valueCents: 250000, outcome: 'won' }] },
  { id: 'idle', name: 'Idle', deals: [] },
];

describe('DealCard alternate designs (native)', () => {
  it('V2: mounts an elevated card with hero value + won word', () => {
    const { getByText } = renderThemed(
      <DealCardV2 name="Acme renewal" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" owner={{ name: 'Ada' }} />,
      SEED_LIGHT
    );
    expect(getByText('$45,000.00')).toBeTruthy();
    expect(getByText('Won')).toBeTruthy();
  });

  it('V2: renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(<DealCardV2 name="X" valueCents={0} loading />, SEED_LIGHT);
    expect(getByLabelText('Loading deal')).toBeTruthy();
  });

  it('V3: mounts a minimal line and tones the value as onSurface', () => {
    const { getByText } = renderThemed(
      <DealCardV3 name="Beta deal" company="Beta" valueCents={4500000} stage="Lead" probability={40} />,
      SEED_LIGHT
    );
    const value = getByText('$45,000.00');
    expect(flatten(value.props.style).color).toBe(lightColors.onSurface);
  });

  it('V2 + V3: fire onPress (interaction)', () => {
    const onV2 = jest.fn();
    const onV3 = jest.fn();
    const { getByLabelText } = renderThemed(
      <>
        <DealCardV2 name="V2 deal" valueCents={1000} onPress={onV2} />
        <DealCardV3 name="V3 deal" valueCents={1000} onPress={onV3} />
      </>,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Deal V2 deal'));
    fireEvent.press(getByLabelText('Deal V3 deal'));
    expect(onV2).toHaveBeenCalledTimes(1);
    expect(onV3).toHaveBeenCalledTimes(1);
  });
});

describe('ContactCard alternate designs (native)', () => {
  it('V2: profile card with a quick-action row (interaction)', () => {
    const onCall = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ContactCardV2
        name="Lee Park"
        title="VP Sales"
        company="Initech"
        tags={['Champion']}
        actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: onCall }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Lee Park')).toBeTruthy();
    fireEvent.press(getByLabelText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });

  it('V3: compact directory row mounts with trailing tag', () => {
    const { getByText } = renderThemed(
      <ContactCardV3 name="Dana Cruz" title="Buyer" company="Globex" tags={['Exec']} />,
      SEED_LIGHT
    );
    expect(getByText('Dana Cruz')).toBeTruthy();
    expect(getByText('Exec')).toBeTruthy();
  });
});

describe('PipelineBoard alternate designs (native)', () => {
  it('V2: moves a deal forward via the arrow affordance (interaction)', () => {
    const onMoveDeal = jest.fn();
    const { getByLabelText } = renderThemed(<PipelineBoardV2 stages={STAGES} onMoveDeal={onMoveDeal} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Move Deal One forward'));
    expect(onMoveDeal).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' }),
      'forward'
    );
  });

  it('V2 + V3: render the empty-board placeholder', () => {
    const v2 = renderThemed(<PipelineBoardV2 stages={[]} />, SEED_LIGHT);
    expect(v2.getByLabelText('No stages in this pipeline yet')).toBeTruthy();
    const v3 = renderThemed(<PipelineBoardV3 stages={[]} />, SEED_LIGHT);
    expect(v3.getByLabelText('No stages in this pipeline yet')).toBeTruthy();
  });

  it('V3: taps a deal line in the flat list (interaction)', () => {
    const onDealPress = jest.fn();
    const { getByLabelText } = renderThemed(<PipelineBoardV3 stages={STAGES} onDealPress={onDealPress} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Deal Deal One'));
    expect(onDealPress).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'd1' }),
      expect.objectContaining({ id: 'lead' })
    );
  });
});

describe('LeadRow alternate designs (native)', () => {
  it('V2: card shows the flame chip glyph + word toned as danger for hot', () => {
    const { getByText } = renderThemed(
      <LeadRowV2 name="Jane Doe" company="Globex" temperature="hot" valueCents={500000} score={88} />,
      SEED_LIGHT
    );
    const label = getByText('Hot');
    expect(flatten(label.props.style).color).toBe(lightColors.danger);
    expect(getByText('🔥')).toBeTruthy();
  });

  it('V3: dense line fires onPress (interaction)', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <LeadRowV3 name="Rex Iron" temperature="cold" valueCents={5000} score={40} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Cold lead Rex Iron'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity — alternate CRM designs (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DealCardV2 name="Acme" company="Acme Inc" valueCents={4500000} stage="Negotiation" probability={70} outcome="won" owner={{ name: 'Ada Rae' }} closeDate="Mar 4" />
          <DealCardV3 name="Beta" company="Beta Co" valueCents={120000} stage="Lead" probability={30} outcome="lost" />
          <ContactCardV2 name="Lee Park" title="VP" company="Initech" tags={['Champion', 'Exec']} actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: jest.fn() }]} />
          <ContactCardV3 name="Dana Cruz" title="Buyer" company="Globex" tags={['Exec']} />
          <PipelineBoardV2
            stages={[
              { id: 's1', name: 'Lead', deals: [{ id: 'd1', name: 'One', valueCents: 100000 }] },
              { id: 's2', name: 'Won', deals: [{ id: 'd2', name: 'Two', valueCents: 250000, outcome: 'won' }] },
              { id: 's3', name: 'Idle', deals: [] },
            ]}
            onMoveDeal={jest.fn()}
            onDealPress={jest.fn()}
          />
          <PipelineBoardV3
            stages={[
              { id: 's1', name: 'Lead', deals: [{ id: 'd1', name: 'One', company: 'Acme', valueCents: 100000 }] },
              { id: 's2', name: 'Won', deals: [] },
            ]}
            onMoveDeal={jest.fn()}
            onDealPress={jest.fn()}
          />
          <LeadRowV2 name="Jane" company="Globex" temperature="warm" valueCents={5000} score={60} selected />
          <LeadRowV3 name="Rex" company="Initech" temperature="hot" valueCents={9000} score={90} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
