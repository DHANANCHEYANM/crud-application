import { columns, Payment } from "./column";
import { DataTable } from "./data-table";
import { AddContactDialog } from "@/components/contacts/add-contact-dialog";

async function getData(): Promise<Payment[]> {
  const response = await fetch(
    "http://localhost:3000/api/contact",
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data.map((contact: any) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    Phonenumber: Number(contact.phone),
    Status: contact.status,
  }));
}

export default async function ContactPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <AddContactDialog />
      </div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}