"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { contactSchema } from "@/lib/validations/contact";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AddContactDialog() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("email");

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        status?:string;
    }>({});
    const handleSave = async () => {
        const result = contactSchema.safeParse({
            name,
            email,
            phone,
            status,
        });

        if (!result.success) {
            const fieldErrors =
                result.error.flatten().fieldErrors;

            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                phone: fieldErrors.phone?.[0],
                status:fieldErrors.status?.[0]
            });

            return;
        }

        setErrors({});

        try {
            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",
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

            
            setName("");
            setEmail("");
            setPhone("");
            setStatus("");

            window.location.reload();
        } catch (error) {
            console.error(
                "SAVE ERROR:",
                error
            );
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black text-white mx-3">
                    Add Contact
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[650px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>

                    <DialogDescription>
                        Create a new contact here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>

                        <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                        />

                        {errors.phone && (
                            <p className="text-sm text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>

                        <Select
                            value={status}
                            onValueChange={setStatus}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="email">
                                    Email
                                </SelectItem>

                                <SelectItem value="phone">
                                    Phone
                                </SelectItem>

                                <SelectItem value="sms">
                                    SIM
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="bg-black text-white"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}