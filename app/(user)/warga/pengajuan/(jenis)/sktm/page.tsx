import SktmForm from "./_components/form";
import UserData from "../_components/user-data";

export default function SktmPage() {
  return (
    <>
      <p className="text-xl font-medium">
        Pengajuan Surat Keterangan Tidak Mampu (SKTM)
      </p>
      <p className="text-muted-foreground text-sm mb-5">
        Isi form dibawah ini untuk mengajukan surat keterangan tidak mampu
      </p>
      <div className="space-y-5">
        <UserData />
        <SktmForm />
      </div>
    </>
  );
}
