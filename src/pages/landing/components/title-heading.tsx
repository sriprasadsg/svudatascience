import type { HTMLAttributes, ReactNode } from "react";
import { IconAtom, IconBook2, IconBuildingBank, IconCalendarEvent, IconCertificate, IconDeviceLaptop, IconHelpCircle, IconMail, IconSchool, IconWorld } from "@tabler/icons-react";

function iconForTitle(title: string) {
  if (/quantum/i.test(title)) return IconAtom;
  if (/enquir|contact/i.test(title)) return IconMail;
  if (/timeline|schedule|admission process/i.test(title)) return IconCalendarEvent;
  if (/international|outside india|travel/i.test(title)) return IconWorld;
  if (/eligibility|qualification|certificate/i.test(title)) return IconCertificate;
  if (/learn|academic/i.test(title)) return IconBook2;
  if (/question/i.test(title)) return IconHelpCircle;
  if (/university|funding/i.test(title)) return IconBuildingBank;
  if (/examination|assessment/i.test(title)) return IconDeviceLaptop;
  return IconSchool;
}

export function TitleHeading({ children, as: Tag = "h2", ...props }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode; as?: "h1" | "h2" }) {
  const Icon = iconForTitle(typeof children === "string" ? children : "");
  return <Tag {...props}><span className="inline-flex max-w-full items-start gap-3 align-middle"><Icon aria-hidden="true" className="mt-1 size-6 shrink-0" /><span className="min-w-0">{children}</span></span></Tag>;
}