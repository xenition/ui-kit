/**
 * Alternate government / civic designs (V2 / V3) — the drop-in variants of
 * ServiceCard, PermitStatus, CivicAppointment, and RepresentativeCard. Each
 * variant is asserted to mount, to stay token-pure under BOTH seeds (every
 * rendered style hex traces to a compiled theme token — the native mirror of
 * the "no literal color" invariant), and to honor one interaction where the
 * base component exposes a callback. The variants share the base components'
 * `Props`, so the same fixtures drive them.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ServiceCardV2 } from './ServiceCardV2';
import { ServiceCardV3 } from './ServiceCardV3';
import { PermitStatusV2 } from './PermitStatusV2';
import { PermitStatusV3 } from './PermitStatusV3';
import { CivicAppointmentV2 } from './CivicAppointmentV2';
import { CivicAppointmentV3 } from './CivicAppointmentV3';
import { RepresentativeCardV2 } from './RepresentativeCardV2';
import { RepresentativeCardV3, type RepresentativeCardV3Props } from './RepresentativeCardV3';

describe('ServiceCard V2 / V3 (native)', () => {
  it('V2 mounts the elevated tile and fires the Start CTA', () => {
    const onStart = jest.fn();
    const { getByText } = renderThemed(
      <ServiceCardV2
        category="license"
        title="Renew driver license"
        description="Renew online in minutes."
        channel="online"
        estimatedTime="5 min"
        onStart={onStart}
      />,
      SEED_LIGHT
    );
    expect(getByText('Renew driver license')).toBeTruthy();
    expect(getByText('Licensing')).toBeTruthy();
    expect(getByText('🌐 Online')).toBeTruthy();
    fireEvent.press(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts a minimal line and fires the whole-line press', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ServiceCardV3 category="permit" title="Apply for permit" channel="in-person" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Apply for permit')).toBeTruthy();
    fireEvent.press(getByLabelText(/Apply for permit/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('PermitStatus V2 / V3 (native)', () => {
  it('V2 mounts the vertical timeline stages', () => {
    const { getByText } = renderThemed(<PermitStatusV2 status="approved" title="Building permit" />, SEED_LIGHT);
    expect(getByText('📨 Submitted')).toBeTruthy();
    expect(getByText('✓ Approved')).toBeTruthy();
    expect(getByText('🏛️ Issued')).toBeTruthy();
  });

  it('V2 branches a denied permit into a danger banner', () => {
    const { getByText } = renderThemed(<PermitStatusV2 status="denied" />, SEED_DARK);
    expect(getByText('Permit denied')).toBeTruthy();
  });

  it('V2 renders a loading placeholder instead of the timeline', () => {
    const { queryByText, getByLabelText } = renderThemed(<PermitStatusV2 status="review" loading />, SEED_LIGHT);
    expect(queryByText('📨 Submitted')).toBeNull();
    expect(getByLabelText('Loading permit status')).toBeTruthy();
  });

  it('V3 mounts a compact status pill row', () => {
    const { getByText } = renderThemed(
      <PermitStatusV3 status="issued" title="Building permit" permitNumber="BLD-2026-0417" updatedDate="Aug 24" />,
      SEED_DARK
    );
    expect(getByText('Building permit')).toBeTruthy();
    expect(getByText('🏛️ Issued')).toBeTruthy();
    expect(getByText('Updated Aug 24')).toBeTruthy();
  });
});

describe('CivicAppointment V2 / V3 (native)', () => {
  it('V2 mounts the date-block card and fires check-in / reschedule', () => {
    const onCheckIn = jest.fn();
    const onReschedule = jest.fn();
    const { getByText } = renderThemed(
      <CivicAppointmentV2
        service="License renewal"
        office="DMV — Downtown"
        date="Mon, Aug 24"
        time="10:30 AM"
        status="confirmed"
        onCheckIn={onCheckIn}
        onReschedule={onReschedule}
      />,
      SEED_LIGHT
    );
    expect(getByText('License renewal')).toBeTruthy();
    expect(getByText('✓ Confirmed')).toBeTruthy();
    fireEvent.press(getByText('Check in'));
    fireEvent.press(getByText('Reschedule'));
    expect(onCheckIn).toHaveBeenCalledTimes(1);
    expect(onReschedule).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts a dense agenda line with a status pill', () => {
    const { getByText } = renderThemed(
      <CivicAppointmentV3 service="Passport pickup" office="City Hall" date="Aug 1" time="9:00 AM" status="scheduled" />,
      SEED_DARK
    );
    expect(getByText('Passport pickup')).toBeTruthy();
    expect(getByText('📅 Scheduled')).toBeTruthy();
  });
});

describe('RepresentativeCard V2 / V3 (native)', () => {
  it('V2 mounts the centered profile card and fires call / email', () => {
    const onCall = jest.fn();
    const onEmail = jest.fn();
    const { getByText } = renderThemed(
      <RepresentativeCardV2
        name="Grace Hopper"
        office="City Council · District 4"
        party="independent"
        district="District 4"
        phone="(555) 010-2048"
        email="grace@city.gov"
        inOffice
        onCall={onCall}
        onEmail={onEmail}
      />,
      SEED_LIGHT
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    expect(getByText('Independent')).toBeTruthy();
    expect(getByText('✓ In office')).toBeTruthy();
    fireEvent.press(getByText('Call'));
    fireEvent.press(getByText('Email'));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onEmail).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts a compact row and fires email', () => {
    const onEmail = jest.fn();
    const props: RepresentativeCardV3Props = {
      name: 'Ada Lovelace',
      office: 'Mayor',
      party: 'green',
      email: 'ada@city.gov',
      inOffice: false,
      onEmail,
    };
    const { getByText } = renderThemed(<RepresentativeCardV3 {...props} />, SEED_DARK);
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('— Former')).toBeTruthy();
    fireEvent.press(getByText('Email'));
    expect(onEmail).toHaveBeenCalledTimes(1);
  });
});

describe('token purity — government design variants (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ServiceCardV2 category="tax" title="File income tax" description="e-File" channel="online" estimatedTime="10 min" onStart={() => {}} onPress={() => {}} />
          <ServiceCardV2 category="utility" title="Pay water bill" channel="unavailable" />
          <ServiceCardV3 category="records" title="Order a record" description="Certified copy" channel="phone" estimatedTime="3 days" onStart={() => {}} />
          <ServiceCardV3 category="benefit" title="Check benefits" channel="in-person" />
          <PermitStatusV2 status="review" title="Permit" permitNumber="BLD-1" updatedDate="Aug 1" />
          <PermitStatusV2 status="denied" title="Denied permit" />
          <PermitStatusV2 status="issued" loading />
          <PermitStatusV3 status="submitted" title="Permit" permitNumber="P-2" updatedDate="Aug 2" />
          <PermitStatusV3 status="denied" title="Denied" />
          <PermitStatusV3 status="approved" loading />
          <CivicAppointmentV2 service="Visit" office="DMV" date="Aug 1" time="9:00" status="scheduled" location="Room 2" reference="A-042" onCheckIn={() => {}} onReschedule={() => {}} />
          <CivicAppointmentV2 service="Pickup" office="City Hall" date="Aug 3" time="1:00" status="completed" />
          <CivicAppointmentV3 service="Hearing" office="Courthouse" date="Aug 4" time="11:00" status="checked-in" location="Room 9" reference="H-7" />
          <CivicAppointmentV3 service="Consult" office="Clinic" date="Aug 5" time="2:00" status="no-show" />
          <RepresentativeCardV2 name="Ada" office="Mayor" party="green" district="Citywide" termInfo="Term ends 2028" phone="555" email="a@b.gov" inOffice={false} onCall={() => {}} onEmail={() => {}} />
          <RepresentativeCardV2 name="Alan" office="Council" party="nonpartisan" inOffice />
          <RepresentativeCardV3 name="Grace" office="Council · D4" party="independent" phone="555" email="g@c.gov" inOffice onCall={() => {}} onEmail={() => {}} />
          <RepresentativeCardV3 name="Katherine" office="Assessor" inOffice={false} />
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
