import * as React from 'react';
import { Text } from 'react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Container } from './Container';
import { Row } from './Row';
import { Section } from './Section';
import { PageHeader } from './PageHeader';
import { Divider } from './Divider';

describe('native layout module', () => {
  it('mounts Container, Row and Section with their content', () => {
    const { getByText } = renderThemed(
      <Container>
        <Section title="Overview" subtitle="A quick summary">
          <Row gap="md">
            <Text>Left</Text>
            <Text>Right</Text>
          </Row>
        </Section>
      </Container>,
      SEED_LIGHT
    );
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('A quick summary')).toBeTruthy();
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });

  it('renders PageHeader as a header with an actions slot', () => {
    const { getByText } = renderThemed(
      <PageHeader title="Dashboard" subtitle="Today" actions={<Text>Edit</Text>} />,
      SEED_LIGHT
    );
    const title = getByText('Dashboard');
    expect(title.props.accessibilityRole).toBe('header');
    expect(getByText('Edit')).toBeTruthy();
  });

  it('applies a token width to a numeric-max Container', () => {
    const { getByTestId } = renderThemed(
      <Container testID="c" maxWidth={640} />,
      SEED_LIGHT
    );
    const styles = getByTestId('c').props.style as Array<Record<string, unknown>>;
    const flat = Object.assign({}, ...styles.filter(Boolean));
    expect(flat.maxWidth).toBe(640);
  });

  it('draws the Divider using only theme-token colors (no hardcoded hex)', () => {
    const { root } = renderThemed(<Divider inset="md" />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    const used = renderedStyleHexes(root);
    // Divider paints a border color; every hex it emits must trace to a token.
    expect(used.length).toBeGreaterThan(0);
    used.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
