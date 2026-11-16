# Programme content and enquiry handover

## Authorised enquiry activation completed — 16 November 2026, 13:15 UTC request

This update supersedes the enquiry-schema/deployment blockers in the earlier activation record below. Changes were limited to the original project.

- Applied `drizzle/migrations/0010_add_programme_enquiry_metadata.sql` to the original project's database through the migration tool. Added nullable `programme_id`, `preferred_spell`, `consent`, and `educational_qualification`, all without defaults. No legacy consent was assumed; no rows were backfilled, removed or modified.
- The reviewed SQL's fixed checks were retained with conditional constraint creation so both ADD COLUMN and constraint additions are repeat-safe. Checks permit historical nulls and validate new non-null metadata against the original six programmes, January/July spells, true consent and qualification length of at most 200. Historical review SQL remains a reference, not an instruction to apply a second migration.
- Before/after verification: 13 enquiries; original-column fingerprint unchanged (`5bdb17ea435c53cabeea50a14d10f8dc`); all four new fields null on all existing rows. Existing INSERT policy text and row-level security remained unchanged. Existing service-role INSERT/SELECT access was confirmed; no grants or policies were broadened.
- First enquiry deployment failed because its Deno import map lacked the shared schema's bare `zod` resolution. Added the same pinned `npm:zod@4.4.3` import mapping already used by registration; redeployment succeeded. `submit-programme-enquiry` source SHA-256: `0b7c36cbdaf0aec6bf1c7c571f5977a9a516202275ba767037e77fa16ca82868`.
- Original `submit-registration`, `submit-programme-enquiry`, and `preview-transactional-email` are now deployed. Notification templates still target `admissions@svudatascience.in` through Lovable managed app emails. No provider, sender, website content or duplicate-project configuration was changed.
- Non-sending live checks: enquiry POST `{}` returned 400 required-field validation; GET returned 405 Method not allowed. These confirm startup/import resolution and early validation, not successful saving or email acceptance. No applicant records or emails were created. 42 focused registration/programme tests passed; preview build reports build OK.
- Remaining blocker: `notify.svudatascience.in` still reports **Verifying DNS**. Review the assigned NS records in **More → Emails → Domain settings**; no DNS was changed. Required names remain `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`; no new user-provided secret is known to be missing, and database runtime credential availability remains unverified by non-writing requests.
- After sender verification, an explicitly approved save-and-notify test is still required to confirm database acceptance, email send events and inbox arrival. The website frontend was not published and the duplicate was not touched.

## Authorised original-only activation — 16 November 2026, 13:12 UTC request

This section supersedes the historical deployment status below. Only the original project was changed; no frontend publication, provider change, DNS edit, migration, applicant insertion or email send was performed.

### Isolation

- Original Lovable project: `63a3fc70-96ab-4339-9758-b3ba694ce9f1`; backend ref `aujtjyzcffmkpcetahtc`, confirmed by the live project-info tool and original client/config.
- Duplicate Lovable project: `c7331980-9076-47d3-9ef2-ca4e9785d5a0`; backend ref `ciafhelakfdxcdvmfhbw`, confirmed in its read-only snapshot client/config. No live duplicate administration was attempted from this project.
- The configured backends are separate. Original enquiries retain six programme IDs including Quantum; duplicate enquiries define five without Quantum. Both submission entrypoints differ. Nothing was copied or deployed to the duplicate.

### Deployment and non-sending checks

- Successfully deployed original `submit-registration` and `preview-transactional-email`. Shared registration/programme notification templates are bundled in the preview and registration deployment; this does not activate the programme-enquiry route.
- Live `POST submit-registration` with `{}` returned 400 required-field validation, proving route startup/import resolution without saving or sending.
- Live email-preview GET with an intentionally invalid authorization value returned 401 Unauthorized rather than its missing-key 500, establishing that `LOVABLE_API_KEY` is present in that deployed runtime. Template rendering/send acceptance was not exercised.
- `submit-programme-enquiry` returned 404 and was deliberately not deployed: live `enquiries` lacks `programme_id`, `preferred_spell`, `consent`, and `educational_qualification`. Deploying the prepared handler now would make every valid insert fail. The existing additive SQL in `docs/review/programme-enquiry-fields.sql` needs separate migration approval before activation. No field was dropped or silently omitted to bypass this blocker.
- Both destination tables have row-level security enabled. Existing registration columns match the prepared insert. Runtime service credentials/database insert permissions remain unverified because no valid submission or privileged diagnostic route was used.
- 73 tests passed across registration orchestration/validation, online registration, programme validation/form and catalogue. The live save-and-send flow remains intentionally untested.

### Provider, DNS and secrets

- Provider remains Lovable managed app emails, pinned `@lovable.dev/email-js@0.7.0`; sender/from remain `notify.svudatascience.in`; both templates have fixed recipient `admissions@svudatascience.in` and applicant reply-to.
- Domain check reports **Verifying DNS**, not ready for sending. Exact assigned delegation records: `notify.svudatascience.in NS ns3.lovable.cloud` and `notify.svudatascience.in NS ns4.lovable.cloud` (relative host `notify` in the `svudatascience.in` zone). Public Google DNS lookup returned no NS answers for this hostname; that observation alone does not establish authoritative DNS state.
- Open this project's **More → Emails → Domain settings** to review the assigned records and use Check again after the domain provider has them. Do not alter root website/email records, provider or delegation arbitrarily. No shared DNS was edited. General setup reference: https://docs.lovable.dev/features/emails .
- Required secret names: `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. The secrets tool confirms the managed email key; platform configuration lists the two platform runtime secrets, which are not shown by the user-secret listing. No values were read or disclosed. No new user-supplied secret is currently identified as missing; do not ask for managed service credentials. Actual runtime availability of the two database secrets remains unverified by these deliberately non-writing checks.

### Remaining actions

1. Complete sender DNS verification in More → Emails; verification alone does not prove email delivery.
2. Obtain separate approval for the original reviewed additive enquiry migration, apply it without changing historical data, then deploy original `submit-programme-enquiry`.
3. Activate the duplicate from its own project against its separate backend and five-programme schema.
4. Obtain approval for an actual end-to-end registration and programme-enquiry test, confirm saved records and email acceptance events, and independently confirm inbox arrival. No real emails or fake applicant records were created here.

Frontend publication is not required for this backend activation and was not performed.

## AVIT primary homepage reference — 16 November 2026

Visually inspected a fetched screenshot and read `https://avit.ac.in/vemerge-plus/`. Adapted the visible introductory CTA/benefits layout and the text-verified grouped features/programme-summary hierarchy, not an exact visual reproduction of the full source page. AVIT supersedes True Hope for the main page only; existing coherent detail pages are retained.

The homepage now opens with unchanged original headline/subtitle and Explore Programmes/Enquire anchors, followed by the existing concise learning-benefits grid and grouped learning resources, academic/industry collaboration, and six programme summary panels. Quantum leads with restrained blue emphasis; five equally styled white panels include approved duration/mode and two catalogue highlights with View Full Programme Details/Enquire links. The shared form remains below the programme list and comparison, and all admissions, international-student, contact, FAQ and official navigation/footer content is retained. No AVIT claims, fees, certifications, guarantees, assets or statistics were imported. Royal/navy accents are scoped to the main page.

Changed public route: `/`. All six existing `/programmes/...` destinations are unchanged. Verified original hero wording against `b0ae2bc`, all six links/direct routes/preselects, both hero anchors, one common form, placeholder validation, numeric phone, consent, optional blank/populated qualification, stale spell clearing, error retention and mocked accepted references. All 38 focused tests passed; desktop 1280px and mobile 390px/360px checks had no overflow or runtime errors; preview build passed.

Current email-domain listing reports the project's configured `svudatascience.in` domain is still verifying DNS. Existing notification setup uses `notify.svudatascience.in`; its sender configuration must be reconciled with the verified project domain before authorised activation. The existing review SQL and submission/email functions remain unapplied/undeployed. Programme identity and qualification inclusion are unchanged, with notifications intended for `admissions@svudatascience.in`. No actual acceptance/storage or delivery was tested, and no real submissions, migrations, deployments or publishing occurred. Existing approved logo asset pointers remain unchanged; localhost still returns non-image content for them, so hosted artwork rendering remains unverified.

## Reference-inspired layout — 16 November 2026

Visually inspected `https://truehopefoundation.in/` through a fetched screenshot. Adapted its leading feature, category navigation and repeated content/action hierarchy, not its charity imagery, text, payment features or visual identity. Quantum now leads as a pale-blue full-row feature on desktop; five consistent white cards follow with compact duration/mode facts and separate View Programme/Enquire actions. Titles also open real detail routes. Programme category links jump to the relevant group without hiding courses or changing their order.

All six detail routes share compact facts, section navigation, grouped learning/admissions sections, the retained admission tables (Quantum keeps only the three requested rows), shared-form enquiry links, and six-course onward navigation. Existing main title/subtitle source comparison passed; programme catalogue wording and backend/form code are unchanged. Mobile admission cells wrap without requiring horizontal scrolling.

Checks: all six overview View Programme/Enquire actions and detail preselects, six direct HTTP 200 routes at 1280/390/360px, no page overflow/runtime errors; 38 focused tests and intercepted browser checks for placeholder selection, consent, numeric phone, qualification, spell clearing and saved/error states. Preview build reports `build OK`. Pending: existing review SQL, submission/email-function deployment and sender-domain DNS verification; none activated or applied. Notifications remain intended for `admissions@svudatascience.in` after storage in `enquiries`; no real delivery/storage test was performed. Original logo pointers remain unchanged and still do not render as image bytes in localhost checks.

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

### Optional Educational Qualification — 16 November 2026

The common form includes an optional text field after Phone and before the diploma spell/Enquiry fields, with placeholder `e.g., B.Sc. Mathematics, B.Tech. CSE, BCA`. It accepts current or completed qualifications without eligibility inference. The frontend payload and shared client/server validation use `educationalQualification` (optional, trimmed, maximum 200 characters); missing values remain valid for older callers. The existing handler maps it to nullable `educational_qualification` storage and passes it to the fixed admissions notification, where the line appears only when populated. Entries persist on selection changes and submission errors.

The nullable column and length constraint are added only to the review SQL above, not applied to the database. Before activation, apply the reviewed enquiry metadata/qualification SQL and deploy the existing submission and email preview functions together; the domain still needs verification before email delivery can be confirmed. No real submission, email, migration, deployment or publishing occurred. All 38 focused tests passed, including blank/populated payloads, backwards compatibility and qualification error retention; intercepted browser checks passed at 1280px, 390px and 360px, and the preview build reports `build OK`.

The supplied M.S. Data Science, PG Diploma and Specialist Diplomas presentations support the existing broad learning and admission descriptions. They are brochures/presentations, not full authoritative syllabi for the three specialist diplomas. Their public delivery mode therefore says `Confirm with the admissions team`; replace this only after an approved syllabus or delivery confirmation is supplied. The learning highlights use the owner-approved wording from the change request, not inferred curriculum, fees, eligibility, dates, or employment guarantees.

## Prepared backend changes — not applied or deployed

- `docs/review/programme-enquiry-fields.sql` is a review-only additive database change for `public.enquiries`: programme identifier, preferred spell and consent. Historical rows and the existing public enquiry policy remain unchanged. Apply it before deploying the new enquiry handler.
- `supabase/functions/submit-programme-enquiry/` validates the fixed programme identifier, required contact fields, digits-only phone (`^[0-9]{1,15}$`), applicable January/July spell and consent. It rate-limits requests, saves the enquiry first, and returns an acceptance reference only after the database confirms the insert.
- The notification template has a fixed recipient, `admissions@svudatascience.in`, and includes the programme identifier, programme name, database submission timestamp and enquiry reference. Account signup/login/password emails are separate and are not enquiry notifications.
- The sender domain `notify.svudatascience.in` was still verifying DNS when checked on 16 November 2026. The notification code is prepared, but no real email was sent and delivery is not confirmed. Complete verification in More → Emails before authorised delivery testing.
- Deploy `submit-programme-enquiry` and `preview-transactional-email` together only after review and migration approval. Until then, programme forms retain the visitor's entries and show the admissions email fallback instead of a success message.
- The function returns `notificationSent: false` when a saved enquiry cannot be emailed. The visitor-facing success wording says only that the enquiry was saved; it does not claim that an email was delivered.

No publishing, function deployment, database migration, real form submission or real email send was performed for this change.

## Online registration admissions notification (prepared, not deployed)

- Provider: Lovable managed email (`@lovable.dev/email-js` via the shared `sendTemplateEmail` helper), sender domain `notify.svudatascience.in`, fixed recipient `admissions@svudatascience.in`, reply-to set to the applicant's email. Template: `registration-notification` (all values rendered as escaped React text).
- Flow: `submit-registration` saves to `registration_submissions` first; only then sends. Response `{ id, saved: true, notificationAccepted }` (201) or `{ saved: false, error }` (503). A failed send is logged with the registration id and never reported as a failed registration; the page tells the applicant not to resubmit. "Accepted for sending" is shown only when the email API accepts it — delivery is not claimed. Idempotency key `registration-notification-<id>` prevents duplicate sends on retries.
- Programme enquiry notifications to the same mailbox are unchanged.
- Required secret names (already present in the project): `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Tests: `src/pages/landing/components/registration-submission.test.ts` (save+send success, save failure, saved-but-notification-failed).
- Remaining steps (not performed): verify DNS for `notify.svudatascience.in`; deploy `submit-registration`, `submit-programme-enquiry` and `preview-transactional-email`; publish the frontend; then send one approved test registration and confirm it in the email logs. No migration is needed (insert now also selects the existing `created_at`).
