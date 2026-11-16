import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  reference?: string
  submittedAt?: string
  fullName?: string
  phone?: string
  email?: string
  courses?: string[]
  gender?: string
  occupation?: string
  college?: string
  educationQualification?: string
  passedOutYear?: string
  location?: string
  address?: string
}

// All values are rendered as React text children, so they are escaped.
const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={detail}><strong>{label}:</strong> {value || 'Not supplied'}</Text>
)

const Email = (p: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New online registration from {p.fullName || 'an applicant'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New online registration</Heading>
        <Text style={text}>An online registration has been saved on the SVU Data Science website.</Text>
        <Section style={details}>
          <Row label="Reference" value={p.reference} />
          <Row label="Submitted at" value={p.submittedAt} />
        </Section>
        <Hr style={rule} />
        <Row label="Name" value={p.fullName} />
        <Row label="Mobile number" value={p.phone} />
        <Row label="Email" value={p.email} />
        <Row label="Courses interested" value={p.courses?.length ? p.courses.join('; ') : undefined} />
        <Row label="Gender" value={p.gender} />
        <Row label="Present occupation" value={p.occupation} />
        <Row label="College" value={p.college} />
        <Row label="Educational qualification" value={p.educationQualification} />
        <Row label="Passed-out year" value={p.passedOutYear} />
        <Row label="Location" value={p.location} />
        <Text style={label}>Address</Text>
        <Text style={message}>{p.address || 'Not supplied'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => `New online registration — ${data.fullName || 'Applicant'}`,
  displayName: 'Online registration notification',
  to: 'admissions@svudatascience.in',
  previewData: {
    reference: '00000000-0000-0000-0000-000000000000',
    submittedAt: '2026-11-16T09:00:00.000Z',
    fullName: 'Example Applicant',
    phone: '9876543210',
    email: 'applicant@example.com',
    courses: ['M.S. Data Science – 2 Years'],
    gender: 'Prefer not to say',
    occupation: 'Student',
    college: 'Example College',
    educationQualification: 'B.Sc',
    passedOutYear: '2026',
    location: 'Tirupati',
    address: '',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '640px' }
const heading = { color: '#0a2e57', fontSize: '24px', fontWeight: '500' }
const text = { color: '#374151', fontSize: '15px', lineHeight: '24px' }
const details = { backgroundColor: '#f5f8fc', padding: '8px 16px', borderRadius: '6px' }
const detail = { color: '#27364a', fontSize: '14px', lineHeight: '22px', margin: '8px 0' }
const rule = { borderColor: '#dbe3ed', margin: '20px 0' }
const label = { color: '#0a2e57', fontSize: '14px', fontWeight: '500', marginTop: '20px' }
const message = { color: '#27364a', fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap' as const }
