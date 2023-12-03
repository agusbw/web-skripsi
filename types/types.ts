export type ComplaintStep = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export const AgamaValues = [
  "ISLAM",
  "PROTESTAN",
  "KATOLIK",
  "HINDU",
  "BUDHA",
  "KONGHUCU",
] as const;

export const StatusKawinValues = [
  "KAWIN",
  "BELUM_KAWIN",
  "CERAI_HIDUP",
  "CERAI_MATI",
] as const;

export type ActionsResponse = {
  success: boolean;
  message: string;
  data?: object;
};

export type Agama = (typeof AgamaValues)[number];
export type StatusKawin = (typeof StatusKawinValues)[number];

export type Warga = {
  id: string;
  nama: string;
  alamat: string;
  agama: Agama;
  id_user: string;
  kewarganegaraan: string;
  nik: string;
  pekerjaan: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  status_perkawinan: StatusKawin;
  jenis_kelamin: boolean;
};
