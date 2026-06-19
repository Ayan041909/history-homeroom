import { redirect } from "next/navigation";
import { STUDENT_DASHBOARD } from "@/lib/redirect";

export default function TutorPage() {
  redirect(STUDENT_DASHBOARD);
}
