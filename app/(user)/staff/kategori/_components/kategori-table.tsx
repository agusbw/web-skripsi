import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCountSuratByKategoriFiltered } from "@/lib/server/data";
import DateFilter from "./date-filter";
import { Skeleton } from "@/components/ui/skeleton";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import ExportPDF from "./export-pdf";

export async function KategoriTable({
  dateFilter,
}: {
  dateFilter: {
    startDate: string | null;
    endDate: string | null;
  };
}) {
  const startDate = dateFilter.startDate
    ? new Date(dateFilter.startDate)
    : null;

  startDate?.setUTCHours(0, 0, 0, 0);

  const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null;
  endDate?.setUTCHours(23, 59, 59, 999);

  const data = await fetchCountSuratByKategoriFiltered(startDate, endDate);

  const { SKBPK, SKD, SKTM, SKU } = data;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <DateFilter />
        <ExportPDF
          data={data}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <p className="my-2 text-sm">
        Menampilkan data:{" "}
        {startDate && endDate
          ? `${format(startDate, "dd MMMM yyyy", {
              locale: id,
            })} -  ${format(endDate.setUTCHours(10, 0, 0, 0), "dd MMMM yyyy", {
              locale: id,
            })}`
          : "Semua periode"}
      </p>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Jenis Surat</TableHead>
            <TableHead>Jumlah Pengajuan</TableHead>
            <TableHead>Pending</TableHead>
            <TableHead>Diproses</TableHead>
            <TableHead>Diterima</TableHead>
            <TableHead>Diambil</TableHead>
            <TableHead>Ditolak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Tidak Mampu
            </TableCell>
            <TableCell>{SKTM.total}</TableCell>
            <TableCell>{SKTM.pending}</TableCell>
            <TableCell>{SKTM.diproses}</TableCell>
            <TableCell>{SKTM.diterima}</TableCell>
            <TableCell>{SKTM.diambil}</TableCell>
            <TableCell>{SKTM.ditolak}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Usaha
            </TableCell>
            <TableCell>{SKU.total}</TableCell>
            <TableCell>{SKU.pending}</TableCell>
            <TableCell>{SKU.diproses}</TableCell>
            <TableCell>{SKU.diterima}</TableCell>
            <TableCell>{SKU.diambil}</TableCell>
            <TableCell>{SKU.ditolak}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Domisili
            </TableCell>
            <TableCell>{SKD.total}</TableCell>
            <TableCell>{SKD.pending}</TableCell>
            <TableCell>{SKD.diproses}</TableCell>
            <TableCell>{SKD.diterima}</TableCell>
            <TableCell>{SKD.diambil}</TableCell>
            <TableCell>{SKD.ditolak}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Belum Pernah Kawin
            </TableCell>
            <TableCell>{SKBPK.total}</TableCell>
            <TableCell>{SKBPK.pending}</TableCell>
            <TableCell>{SKBPK.diproses}</TableCell>
            <TableCell>{SKBPK.diterima}</TableCell>
            <TableCell>{SKBPK.diambil}</TableCell>
            <TableCell>{SKBPK.ditolak}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {SKTM.total + SKBPK.total + SKU.total + SKD.total}
            </TableCell>
            <TableCell>
              {SKTM.pending + SKU.pending + SKD.pending + SKBPK.pending}
            </TableCell>
            <TableCell>
              {SKTM.diproses + SKU.diproses + SKD.diproses + SKBPK.diproses}
            </TableCell>
            <TableCell>
              {SKTM.diterima + SKU.diterima + SKD.diterima + SKBPK.diterima}
            </TableCell>
            <TableCell>
              {SKTM.diambil + SKU.diambil + SKD.diambil + SKBPK.diambil}
            </TableCell>
            <TableCell>
              {SKTM.ditolak + SKU.ditolak + SKD.ditolak + SKBPK.ditolak}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export async function KategoriTableSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <DateFilter />
      </div>
      <p className="my-2 text-sm">Sedang memuat data...</p>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Jenis Surat</TableHead>
            <TableHead>Jumlah Pengajuan</TableHead>
            <TableHead>Pending</TableHead>
            <TableHead>Diproses</TableHead>
            <TableHead>Diterima</TableHead>
            <TableHead>Diambil</TableHead>
            <TableHead>Ditolak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Tidak Mampu
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Usaha
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Domisili
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium py-2">
              Surat Keterangan Belum Pernah Kawin
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
