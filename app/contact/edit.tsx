// "use client";

// import { useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface EditContactProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   contact: any;
// }

// export function EditContact({
//   open,
//   onOpenChange,
//   contact,
// }: EditContactProps) {
//   const [name, setName] = useState(contact?.name ?? "");
//   const [email, setEmail] = useState(contact?.email ?? "");
//   const [phone, setPhone] = useState(contact?.phone ?? "");
//   const [status, setStatus] = useState(contact.Status);


//   const handleSave = async () => {
//     console.log({
//       name,
//       email,
//       phone,
//     });

//     onOpenChange(false);
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={onOpenChange}
//     >
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             Edit Contact
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <Input
//             value={name}
//             onChange={(e) =>
//               setName(e.target.value)
//             }
//             placeholder="Name"
//           />

//           <Input
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//             placeholder="Email"
//           />

//           <Input
//             value={phone}
//             onChange={(e) =>
//               setPhone(e.target.value)
//             }
//             placeholder="Phone"
//           />
//           <Select
//             value={status}
//             onValueChange={setStatus}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="email">
//                 Email
//               </SelectItem>

//               <SelectItem value="phone">
//                 Phone
//               </SelectItem>

//               <SelectItem value="sim">
//                 SIM
//               </SelectItem>
//             </SelectContent>
//           </Select>

//           <Button
//             className="w-full"
//             onClick={handleSave}
//           >
//             Save Changes
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// // }