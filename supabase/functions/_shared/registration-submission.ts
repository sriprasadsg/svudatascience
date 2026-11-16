// Pure orchestration for online registration: save first, then notify.
// Kept free of Deno/npm imports so it can be unit-tested.
export const REGISTRATION_NOTIFICATION_EMAIL = "admissions@svudatascience.in";

export interface SavedRegistration { id: string; created_at: string }
export interface RegistrationDeps<T> {
  save: (data: T) => Promise<SavedRegistration | null>;
  notify: (saved: SavedRegistration, data: T) => Promise<{ sent: boolean }>;
  logError?: (message: string, meta: Record<string, unknown>) => void;
}
export type RegistrationOutcome =
  | { status: 201; body: { id: string; saved: true; notificationAccepted: boolean } }
  | { status: 503; body: { saved: false; error: string } };

export async function processRegistration<T>(data: T, deps: RegistrationDeps<T>): Promise<RegistrationOutcome> {
  let saved: SavedRegistration | null = null;
  try { saved = await deps.save(data); } catch { saved = null; }
  if (!saved?.id) return { status: 503, body: { saved: false, error: "Could not save your registration. Please try again." } };
  let notificationAccepted = false;
  try {
    notificationAccepted = (await deps.notify(saved, data)).sent === true;
  } catch (error) {
    deps.logError?.("Registration saved but its admissions notification failed", {
      registrationId: saved.id,
      code: error && typeof error === "object" && "code" in error ? String((error as { code: unknown }).code) : "unknown",
    });
  }
  return { status: 201, body: { id: saved.id, saved: true, notificationAccepted } };
}
