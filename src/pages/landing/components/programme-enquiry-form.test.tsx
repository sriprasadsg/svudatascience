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
    render(<ProgrammeEnquiryForm programme={programmes[2]} />);
    expect(screen.getByLabelText("Programme")).toHaveValue("PG Diploma in Data Science");
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Enquiry saved");
    expect(mocks.invoke).toHaveBeenCalledWith("submit-programme-enquiry", {
      body: expect.objectContaining({ programme_id: "pg-diploma-data-science", preferred_spell: "January", consent: true }),
    });
  });

  it("preserves entries and shows no success when the backend rejects the enquiry", async () => {
    mocks.invoke.mockResolvedValue({ data: null, error: new Error("Unavailable") });
    render(<ProgrammeEnquiryForm programme={programmes[2]} />);
    completeForm();
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Your entries are still here");
    expect(screen.getByLabelText(/Full name/)).toHaveValue("Example Applicant");
    expect(screen.getByLabelText(/Phone/)).toHaveValue("9876543210");
    expect(screen.queryByText("Enquiry saved")).not.toBeInTheDocument();
  });

  it("does not send an invalid phone number", async () => {
    render(<ProgrammeEnquiryForm programme={programmes[0]} />);
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Example Applicant" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "applicant@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "+91 98765" } });
    fireEvent.change(screen.getByLabelText(/^Enquiry/), { target: { value: "Question" } });
    fireEvent.click(screen.getByLabelText(/I agree to be contacted/));
    fireEvent.click(screen.getByRole("button", { name: "Send Programme Enquiry" }));
    expect(await screen.findByText("Phone number must be 1 to 15 digits (0-9 only).")).toBeInTheDocument();
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it("shows a spell selector for diplomas but not Quantum", () => {
    const { rerender } = render(<ProgrammeEnquiryForm programme={programmes[2]} />);
    expect(screen.getByLabelText(/Preferred admission spell/)).toBeInTheDocument();
    rerender(<ProgrammeEnquiryForm programme={programmes[0]} />);
    expect(screen.queryByLabelText(/Preferred admission spell/)).not.toBeInTheDocument();
  });
});
