// "use client";

// import React, { useState } from "react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { type Warga, wargaSchema } from "@/types/types";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Terminal } from "lucide-react";

// const AddBiodataForm = ({ biodata }: { biodata: Warga | null }) => {
//   const form = useForm<z.infer<typeof wargaSchema>>({
//     resolver: zodResolver(wargaSchema),
//     defaultValues: {
//       nama: biodata?.nama || "",
//       nik: biodata?.nik || "",
//       agama: biodata?.agama,
//       alamat: biodata?.alamat || "",
//       kewarganegaraan: biodata?.kewarganegaraan || "",
//       pekerjaan: biodata?.pekerjaan || "",
//       tanggal_lahir: biodata?.tanggal_lahir,
//       tempat_lahir: biodata?.tempat_lahir || "",
//       jenis_kelamin: biodata?.jenis_kelamin,
//       status_perkawinan: biodata?.status_perkawinan,
//     },
//   });

//   function onSubmit(values: z.infer<typeof wargaSchema>) {
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <Alert
//         variant={"destructive"}
//         className="my-4 w-fit"
//       >
//         <Terminal className="w-4 h-4" />
//         <AlertTitle>Catatan!</AlertTitle>
//         <AlertDescription>
//           Gunakan data diri anda yang{" "}
//           <span className="font-bold">sesuai dengan KTP</span> anda agar
//           pengajuan surat keterangan anda dapat diproses.
//         </AlertDescription>
//       </Alert>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4"
//       >
//         <FormField
//           control={form.control}
//           name="nik"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>NIK</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="5108334XXXXXX"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="nama"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nama Lengkap</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="I Putu xxxx"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="alamat"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Alamat</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Banjar Dinas Pelapuan, Kec Buleleng, Kab Buleleng"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="agama"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Agama</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Pilih Agama" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="ISLAM">Islam</SelectItem>
//                   <SelectItem value="PROTESTAN">Protestan</SelectItem>
//                   <SelectItem value="KATOLIK">Katolik</SelectItem>
//                   <SelectItem value="HINDU">Hindu</SelectItem>
//                   <SelectItem value="BUDHA">Budha</SelectItem>
//                   <SelectItem value="KONGHUCHU">Konghuchu</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="kewarganegaraan"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Kewarganegaraan</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Indonesia"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="pekerjaan"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Pekerjaan</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Buruh Tani"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="tempat_lahir"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tempat Lahir</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Pelapuan"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="tanggal_lahir"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Tanggal Lahir</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-[240px] pl-3 text-left font-normal",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value ? (
//                         format(field.value, "PPP")
//                       ) : (
//                         <span>Pilih tanggal</span>
//                       )}
//                       <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent
//                   className="w-auto p-0"
//                   align="start"
//                 >
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     captionLayout="dropdown-buttons"
//                     fromYear={1900}
//                     toYear={new Date().getFullYear()}
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="jenis_kelamin"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Jenis Kelamin</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 defaultValue={field.value ? "1" : "0"}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Pilih Jenis Kelamin" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="MALE">Laki-Laki</SelectItem>
//                   <SelectItem value="FEMALE">Perempuan</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="status_perkawinan"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Status Perkawinan</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Status Perkawinan" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="KAWIN">Kawin</SelectItem>
//                   <SelectItem value="BELUM_KAWIN">Belum Kawin</SelectItem>
//                   <SelectItem value="CERAI_HIDUP">Cerai Hidup</SelectItem>
//                   <SelectItem value="CERAI_MATI">Cerai Mati</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// export default AddBiodataForm;
