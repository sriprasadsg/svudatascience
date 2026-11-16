import { describe, expect, it, vi } from "vitest";
import { processRegistration, REGISTRATION_NOTIFICATION_EMAIL } from "../../../../supabase/functions/_shared/registration-submission";

const saved = { id: "reg-1", created_at: "2026-11-16T00:00:00Z" };
const data = { full_name: "A", email: "a@example.com" };

describe("registration submission", () => {
  it("notifies admissions@svudatascience.in", () => {
    expect(REGISTRATION_NOTIFICATION_EMAIL).toBe("admissions@svudatascience.in");
  });
  it("save success + send success reports both", async () => {
    const notify = vi.fn().mockResolvedValue({ sent: true });
    const out = await processRegistration(data, { save: async () => saved, notify });
    expect(out).toEqual({ status: 201, body: { id: "reg-1", saved: true, notificationAccepted: true } });
    expect(notify).toHaveBeenCalledWith(saved, data);
  });
  it("save failure returns 503 and never notifies", async () => {
    const notify = vi.fn();
    const out = await processRegistration(data, { save: async () => null, notify });
    expect(out.status).toBe(503);
    expect(out.body.saved).toBe(false);
    expect(notify).not.toHaveBeenCalled();
  });
  it("saved but notification failed still reports saved", async () => {
    const logError = vi.fn();
    const out = await processRegistration(data, { save: async () => saved, notify: async () => { throw Object.assign(new Error("x"), { code: "domain_not_verified" }); }, logError });
    expect(out).toEqual({ status: 201, body: { id: "reg-1", saved: true, notificationAccepted: false } });
    expect(logError.mock.calls[0][1]).toEqual({ registrationId: "reg-1", code: "domain_not_verified" });
  });
});
