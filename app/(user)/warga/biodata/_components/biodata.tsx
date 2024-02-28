import { Contact } from "lucide-react";
import UserData, {
  UserDataSkeleton,
} from "../../pengajuan/(jenis)/_components/user-data";

import { Suspense } from "react";

export default async function Biodata() {
  return (
    <div>
      <div className="flex gap-x-2 mb-2">
        <Contact />
        <p className="text-2xl font-medium ">Biodata</p>
      </div>
      <Suspense fallback={<UserDataSkeleton />}>
        <UserData />
      </Suspense>
    </div>
  );
}
