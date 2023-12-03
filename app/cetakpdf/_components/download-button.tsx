// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { PDFDocument } from "pdf-lib";
// import { Input } from "@/components/ui/input";

// const signer = {
//   signer_name: "Ketut Agus Arimka Yasa",
//   signer_position: "Perbekel Desa Pelapuan",
//   signer_address: "Desa Pelapuan, Kecamatan Busungbiu, Kab. Buleleng"
// };

// const resident = {
//   resident_name: "Nyoman Agus Budhiarta Waisnawa",
//   resident_nik: "12345678901234567890",
//   resident_pob: "Buleleng",
//   resident_dob: "01-01-2000",
//   resident_gender: "Laki-laki",
//   resident_job: "Wiraswasta",
//   resident_nationality: "Indonesia",
//   resident_religion: "Hindu",
//   resident_address: "Desa Pelapuan, Kecamatan Busungbiu, Kab. Buleleng"
// };

// function DownloadButton({ pdfData }: { pdfData: any }) {
//   const [keperluan, setKeperluan] = React.useState("");
//   const fillForm = async (data: any) => {
//     data = new Uint8Array(data.data);
//     // Step 1: Load the PDF with form fields.
//     const pdfDoc = await PDFDocument.load(data);
//     // Step 2: Retrieve the form fields.
//     const form = pdfDoc.getForm();
//     // Step 3: Fill the form fields.
//     form.getTextField("signer_name").setText(signer.signer_name);
//     form.getTextField("signer_position").setText(signer.signer_position);
//     form.getTextField("signer_address").setText(signer.signer_address);
//     form.getTextField("resident_name").setText(resident.resident_name);
//     form.getTextField("resident_nik").setText(resident.resident_nik);
//     form.getTextField("resident_gender").setText(resident.resident_gender);
//     form.getTextField("resident_job").setText(resident.resident_job);
//     form.getTextField("resident_address").setText(resident.resident_address);
//     form
//       .getTextField("resident_nationality")
//       .setText(resident.resident_nationality);
//     form.getTextField("resident_religion").setText(resident.resident_religion);

//     form
//       .getTextField("resident_dob")
//       .setText(`${resident.resident_pob}/${resident.resident_dob}`);

//     form.getTextField("letter_date").setText(new Date().toLocaleDateString());
//     form.getTextField("letter_needs").setText(keperluan);

//     // Step 4: Save the modified PDF.
//     const pdfBytes = await pdfDoc.save();
//     // Step 5: Create a `Blob` from the PDF bytes,
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });

//     //create a file object from the blob
//     const file = new File([blob], `SKBPK_${resident.resident_name}.pdf`, {
//       type: "application/pdf",
//       lastModified: Date.now()
//     });

//     // Step 6: Create a download URL for the `Blob`.
//     const url = URL.createObjectURL(blob);
//     // Step 7: Create a link element and simulate a click event to trigger the download.
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `SKBPK_${resident.resident_name}.pdf`;
//     link.click();
//   };
//   return (
//     <>
//       <Input
//         type="test"
//         placeholder="keperluan"
//         value={keperluan}
//         onChange={(e) => setKeperluan(e.target.value)}
//       />
//       <Button
//         className="mt-4"
//         onClick={() => fillForm(pdfData)}
//       >
//         Download
//       </Button>
//     </>
//   );
// }

// export default DownloadButton;
