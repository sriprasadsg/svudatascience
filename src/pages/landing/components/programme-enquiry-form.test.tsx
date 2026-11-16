import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProgrammeEnquiryForm } from "./programme-enquiry-form";
import { programmes } from "../programmes";

const mocks = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: mocks.invoke } } }));
vi.stubGlobal("ResizeObserver", class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

function completeForm() {
  fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Example Applicant" } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "applicant@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "9876543210" } });
  fireEvent.change(screen.getByLabelText(/Preferred admission spell/), { target: { value: "January" } });
  fireEvent.change(screen.getByLabelText(/^Enquiry/), { target: { value: "Please share admission information." } });
  fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
}

describe("programme enquiry form", () => {
  beforeEach(() => mocks.invoke.mockReset());

  it("prefills the programme and shows success only after backend acceptance", async () => {
    mocks.invoke.mockResolvedValue({ data: { id: "enquiry-reference" }, error: null });
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    expect(screen.getByRole("combobox", { name: /^Programme/ })).toHaveValue("pg-diploma-data-science");
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Enquiry saved");
    expect(mocks.invoke).toHaveBeenCalledWith("submit-programme-enquiry", {
      body: expect.objectContaining({ programme_id: "pg-diploma-data-science", preferred_spell: "January", consent: true }),
    });
  });

  it("preserves entries and shows no success when the backend rejects the enquiry", async () => {
    mocks.invoke.mockResolvedValue({ data: null, error: new Error("Unavailable") });
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Your entries are still here");
    expect(screen.getByLabelText(/Full name/)).toHaveValue("Example Applicant");
    expect(screen.getByLabelText(/Phone/)).toHaveValue("9876543210");
    expect(screen.queryByText("Enquiry saved")).not.toBeInTheDocument();
  });

  it("does not treat a response without a saved reference as acceptance", async () => {
    mocks.invoke.mockResolvedValue({ data: { notificationSent: false }, error: null });
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    await screen.findByRole("alert");
    expect(screen.getByLabelText(/Phone/)).toHaveValue("9876543210");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it.each(programmes)("sends the identity of $name with its enquiry", async (programme) => {
    mocks.invoke.mockResolvedValue({ data: { id: "mock-saved-reference", notificationSent: false }, error: null });
    render(<ProgrammeEnquiryForm initialProgrammeId={programme.slug} />);
    expect(screen.getByRole("combobox", { name: /^Programme/ })).toHaveValue(programme.slug);
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Example Applicant" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "applicant@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "7" } });
    fireEvent.change(screen.getByLabelText(/^Enquiry/), { target: { value: "Please share admission information." } });
    if (programme.hasPreferredSpell) {
      fireEvent.change(screen.getByLabelText(/Preferred admission spell/), { target: { value: "July" } });
    }
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    await screen.findByRole("status");
    expect(mocks.invoke).toHaveBeenCalledWith("submit-programme-enquiry", {
      body: expect.objectContaining({ programme_id: programme.slug, phone: "7", preferred_spell: programme.hasPreferredSpell ? "July" : null }),
    });
  });

  it("does not send an invalid phone number", async () => {
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[0].slug} />);
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Example Applicant" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "applicant@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "+91 98765" } });
    fireEvent.change(screen.getByLabelText(/^Enquiry/), { target: { value: "Question" } });
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByText("Phone number must be 1 to 15 digits (0-9 only).")).toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it("requires an explicit programme on normal opening", async () => {
    render(<ProgrammeEnquiryForm />);
    expect(screen.getByRole("combobox", { name: /^Programme/ })).toHaveValue("");
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByText("Select a programme.")).toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it("keeps applicant details and clears a diploma spell when changing to either MS programme", () => {
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    completeForm();
    const select = screen.getByRole("combobox", { name: /^Programme/ });
    for (const programme of programmes.slice(0, 2)) {
      fireEvent.change(select, { target: { value: programme.slug } });
      expect(screen.queryByLabelText(/Preferred admission spell/)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/Full name/)).toHaveValue("Example Applicant");
      expect(screen.getByLabelText(/Phone/)).toHaveValue("9876543210");
      expect(screen.getByLabelText(/^Enquiry/)).toHaveValue("Please share admission information.");
      expect(screen.getByLabelText(/I agree to be contacted/)).toBeChecked();
      fireEvent.change(select, { target: { value: programmes[2].slug } });
      expect(screen.getByLabelText(/Preferred admission spell/)).toHaveValue("");
      fireEvent.change(screen.getByLabelText(/Preferred admission spell/), { target: { value: "January" } });
    }
  });

  it("requires contact consent", async () => {
    render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    completeForm();
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByText("Please agree to be contacted about this enquiry.")).toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it("shows a spell selector for diplomas but not Quantum", () => {
    const { rerender } = render(<ProgrammeEnquiryForm initialProgrammeId={programmes[2].slug} />);
    expect(screen.getByLabelText(/Preferred admission spell/)).toBeInTheDocument();
    rerender(<ProgrammeEnquiryForm initialProgrammeId={programmes[0].slug} />);
    expect(screen.queryByLabelText(/Preferred admission spell/)).not.toBeInTheDocument();
  });
});
