import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  programmeId?: string
  programmeName?: string
  submittedAt?: string
  fullName?: string
  email?: string
  phone?: string
  educationalQualification?: string
  preferredSpell?: string | null
  enquiry?: string
  reference?: string
}

const Email = ({ programmeId, programmeName, submittedAt, fullName, email, phone, educationalQualification, preferredSpell, enquiry, reference }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry for {programmeName || 'an SVU programme'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New programme enquiry</Heading>
        <Text style={text}>A programme enquiry has been saved on the SVU Data Science website.</Text>
        <Section style={details}>
          <Text style={detail}><strong>Programme:</strong> {programmeName || 'Not supplied'}</Text>
          <Text style={detail}><strong>Programme identifier:</strong> {programmeId || 'Not supplied'}</Text>
          <Text style={detail}><strong>Submitted at:</strong> {submittedAt || 'Not supplied'}</Text>
          <Text style={detail}><strong>Reference:</strong> {reference || 'Not supplied'}</Text>
        </Section>
        <Hr style={rule} />
        <Text style={detail}><strong>Name:</strong> {fullName || 'Not supplied'}</Text>
        <Text style={detail}><strong>Email:</strong> {email || 'Not supplied'}</Text>
        <Text style={detail}><strong>Phone:</strong> {phone || 'Not supplied'}</Text>
        {educationalQualification ? <Text style={detail}><strong>Educational Qualification:</strong> {educationalQualification}</Text> : null}
        {preferredSpell ? <Text style={detail}><strong>Preferred spell:</strong> {preferredSpell}</Text> : null}
        <Text style={detail}><strong>Consent:</strong> Agreed to be contacted about this enquiry.</Text>
        <Text style={label}>Enquiry</Text>
        <Text style={message}>{enquiry || 'Not supplied'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => `New programme enquiry — ${data.programmeName || 'SVU programme'}`,
  displayName: 'Programme enquiry notification',
  to: 'admissions@svudatascience.in',
  previewData: {
    programmeId: 'ms-quantum-computing',
    programmeName: 'M.S. Quantum Computing',
    submittedAt: '2026-11-16T09:00:00.000Z',
    fullName: 'Example Applicant',
    email: 'applicant@example.com',
    phone: '9876543210',
    educationalQualification: 'B.Sc. Mathematics (currently studying)',
    preferredSpell: null,
    enquiry: 'Please share information about the application process.',
    reference: '00000000-0000-0000-0000-000000000000',
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
