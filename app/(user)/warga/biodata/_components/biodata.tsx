import { getUserBiodata } from "@/lib/server/data";
import UserData, {
  UserDataSkeleton,
} from "../../pengajuan/(jenis)/_components/user-data";

import { Suspense } from "react";

export default async function Biodata() {
  const biodata = await getUserBiodata();

  if (!biodata) return;

  return (
    <div>
      <h2 className="text-2xl font-medium mb-2">Biodata</h2>
      <Suspense fallback={<UserDataSkeleton />}>
        <UserData />
      </Suspense>
    </div>
  );
}
