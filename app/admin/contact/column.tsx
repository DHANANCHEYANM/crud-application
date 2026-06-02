"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { contactSchema } from "@/lib/validations/contact";

export type Payment = {
    id: string;
    name: string;
    email: string;
    Phonenumber: number;
    Status: string;
};

function ActionsCell({
    contact,
}: {
    contact: Payment;
}) {
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(
        String(contact.Phonenumber)
    );
    const [status, setStatus] = useState(contact.Status);

    const handleEditSave = async () => {
        const result = contactSchema.safeParse({
            name,
            email,
            phone,
            status,
        });

        if (!result.success) {
            console.log(
                result.error.flatten().fieldErrors
            );
            return;
        }

        try {
            const response = await fetch(
                `/api/contact/${contact.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        status,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }


            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `/api/contact/${contact.id}`,
                {
                    method: "DELETE",
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
             <div className="container mx-auto pt-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[650px] bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>
                            Edit Contact
                        </DialogTitle>

                        <DialogDescription>
                            Update contact information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <input
                            className="w-full border p-2 rounded"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <input
                            className="w-full border p-2 rounded"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <input
                            className="w-full border p-2 rounded"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />
                        <div className="grid gap-2">
                        <label>Status</label>
                        <Select
                            value={status}
                            onValueChange={setStatus}
                        >
                            <SelectTrigger >
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="email">
                                    Email
                                </SelectItem>

                                <SelectItem value="phone">
                                    Phone
                                </SelectItem>

                                <SelectItem value="sim">
                                    Sim
                                </SelectItem>
                            </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={
                                handleEditSave
                            }
                        >
                            update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="sm:max-w-[650px] bg-white text-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Contact?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                           Are you sure you want to delete this contact?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={
                                handleDelete
                            }
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "Phonenumber",
        header: "Phone Number",
    },
    {
        accessorKey: "Status",
        header: "Status",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <ActionsCell
                contact={row.original}
            />
        ),
    },
];