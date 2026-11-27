import { requireAdmin } from "../admin/auth";
import AddEntryForm from "./AddEntryForm";

export default async function Page() {
  await requireAdmin();
  return <AddEntryForm />;
}
