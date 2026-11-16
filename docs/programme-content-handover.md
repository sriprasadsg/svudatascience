# Programme content and enquiry handover

## Public routes

The overview at `/#programmes` links to six routes in this order:

1. `/programmes/ms-quantum-computing`
2. `/programmes/ms-data-science`
3. `/programmes/pg-diploma-data-science`
4. `/programmes/diploma-python-ai-ml-generative-ai`
5. `/programmes/diploma-data-visualization`
6. `/programmes/diploma-cloud-technologies`

The Quantum admission content is the owner-approved BoS wording supplied with the change request. No January or July spell is assigned to Quantum.

## Final prompt reconciliation — 16 November 2026

The existing six routes, shared enquiry form and prepared submission service are reused, not duplicated. The homepage headline and supporting subtitle match pre-rework revision `b0ae2bc`; the programme heading is restored to `Choose the programme that fits your goals`, with the rework's added marketing subtitles removed. The existing website title is unchanged. Approved programme-specific subtitles and content remain intact.

Quantum is first with a pale-blue panel, royal-blue border and slightly larger medium-weight heading. The other five overview cards use the same white background, thin borders, spacing and medium-weight headings. Detail pages use the same hierarchy without altering admissions wording.

The prepared service stores accepted programme enquiries in `public.enquiries` (More → Database → enquiries), then attempts the distinct admissions notification with programme identity. This is not the account-email hook. The sender-domain status was checked again on 16 November and remains `Verifying DNS`; actual acceptance/storage and email delivery are untested because real submissions were prohibited. The review SQL and enquiry functions still require authorised application/deployment; neither was performed.

Checks passed: 27 focused catalogue/schema/form tests, including all six programme identities, digits-only phone boundaries and rejection of responses without a saved reference; exact source comparison of the original headline, main subtitle and document title; all six card clicks and direct HTTP 200 routes at 1280px, 390px and 360px; correct prefill/admission-spell selectors and no horizontal overflow. Browser requests were intercepted to verify invalid-phone blocking, retained entries on failure and saved-reference display on mocked acceptance. No runtime errors occurred; the preview build reports `build OK`.

Known preview limitation: the two existing programme-page logo asset URLs return HTML rather than image bytes on localhost, so they display their alternative text in this browser check. The approved asset pointers were not replaced; artwork rendering remains unverified in the hosted preview.

## Source verification limits

## Common enquiry form correction — 16 November 2026

One editable programme enquiry form now sits below the homepage programme list/comparison at `/#programme-enquiry`. Normal opening shows the required `Select a programme` placeholder; six detail-page CTAs use `/?programme=<slug>#programme-enquiry` for editable preselection. Detail pages no longer contain forms. The dropdown uses the owner's exact option labels and order, while the existing handler resolves the validated ID to its canonical programme name for storage and notification. Applicant details persist during selection changes; switching to either MS programme clears the diploma-only preferred spell. The floating Registration shortcut hides while the shared form is visible to avoid covering consent on phones.

Verified 30 tests and browser checks for all six CTA preselects, placeholder validation, selection changes, consent, phone boundaries, selected identity payloads, spell clearing, retained error entries and mocked success. Desktop and 390px/360px mobile layouts have no horizontal overflow. No backend code, service deployment, migration, publishing or real enquiry/email submission was performed. The existing prepared handler and review SQL still require authorised activation; sender DNS remains verifying, so admissions email delivery is not confirmed.

## Source verification limits (unchanged)

The supplied M.S. Data Science, PG Diploma and Specialist Diplomas presentations support the existing broad learning and admission descriptions. They are brochures/presentations, not full authoritative syllabi for the three specialist diplomas. Their public delivery mode therefore says `Confirm with the admissions team`; replace this only after an approved syllabus or delivery confirmation is supplied. The learning highlights use the owner-approved wording from the change request, not inferred curriculum, fees, eligibility, dates, or employment guarantees.

## Prepared backend changes — not applied or deployed

- `docs/review/programme-enquiry-fields.sql` is a review-only additive database change for `public.enquiries`: programme identifier, preferred spell and consent. Historical rows and the existing public enquiry policy remain unchanged. Apply it before deploying the new enquiry handler.
- `supabase/functions/submit-programme-enquiry/` validates the fixed programme identifier, required contact fields, digits-only phone (`^[0-9]{1,15}$`), applicable January/July spell and consent. It rate-limits requests, saves the enquiry first, and returns an acceptance reference only after the database confirms the insert.
- The notification template has a fixed recipient, `admissions@svudatascience.in`, and includes the programme identifier, programme name, database submission timestamp and enquiry reference. Account signup/login/password emails are separate and are not enquiry notifications.
- The sender domain `notify.svudatascience.in` was still verifying DNS when checked on 16 November 2026. The notification code is prepared, but no real email was sent and delivery is not confirmed. Complete verification in More → Emails before authorised delivery testing.
- Deploy `submit-programme-enquiry` and `preview-transactional-email` together only after review and migration approval. Until then, programme forms retain the visitor's entries and show the admissions email fallback instead of a success message.
- The function returns `notificationSent: false` when a saved enquiry cannot be emailed. The visitor-facing success wording says only that the enquiry was saved; it does not claim that an email was delivered.

No publishing, function deployment, database migration, real form submission or real email send was performed for this change.
