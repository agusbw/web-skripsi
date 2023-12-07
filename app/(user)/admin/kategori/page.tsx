import DashboardContainer from "@/components/layouts/dashboard-container";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchKategoriSurat } from "@/lib/data";

export default async function KategoriPage() {
  const kategori = await fetchKategoriSurat();

  return (
    <DashboardContainer title={"Kategori Surat"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kateogri</TableHead>
            <TableHead>Jumlah Pengajuan</TableHead>
            <TableHead>Pending</TableHead>
            <TableHead>Diterima</TableHead>
            <TableHead>Ditolak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kategori.map((k) => (
            <TableRow key={k.id}>
              <TableCell className="font-medium py-2">{k.nama}</TableCell>
              <TableCell>{1}</TableCell>
              <TableCell>{90}</TableCell>
              <TableCell>{100}</TableCell>
              <TableCell>{90}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>4</TableCell>
            <TableCell>10</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>80</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DashboardContainer>
  );
}
