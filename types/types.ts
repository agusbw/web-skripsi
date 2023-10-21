import * as z from "zod";

const indonesianPhoneNumberPattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
const usernamePattern = /^[a-zA-Z0-9_]{1,25}$/;

// TYPES

export type ComplaintStep = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const AgamaValues = [
  "ISLAM",
  "PROTESTAN",
  "KATOLIK",
  "HINDU",
  "BUDHA",
  "KONGHUCU",
] as const;

const StatusKawinValues = [
  "KAWIN",
  "BELUM_KAWIN",
  "CERAI_HIDUP",
  "CERAI_MATI",
] as const;

type Agama = (typeof AgamaValues)[number];
type StatusKawin = (typeof StatusKawinValues)[number];

export type Warga = {
  id: string;
  nama: string;
  alamat: string;
  agama: Agama;
  id_user: string;
  kewarganegaraan: string;
  nik: string;
  no_telp: string;
  pekerjaan: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  status_perkawinan: StatusKawin;
  jenis_kelamin: boolean;
};

export type Signer = {
  id: string;
  nama: string;
  alamat: string;
  jabatan: string;
};

// ZOD SCHEMAS
export const wargaSchema = z.object({
  nama: z
    .string({
      required_error: "Nama tidak boleh kosong",
    })
    .min(1, "Nama tidak boleh kosong"),
  alamat: z
    .string({
      required_error: "Alamat tidak boleh kosong",
    })
    .min(1, "Alamat tidak boleh kosong"),
  agama: z.enum(AgamaValues, {
    required_error: "Agama tidak boleh kosong",
  }),
  kewarganegaraan: z
    .string({
      required_error: "Kewarganegaraan tidak boleh kosong",
    })
    .min(1, "Kewarganegaraan tidak boleh kosong"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 digit"),
  no_telp: z
    .string({
      required_error: "Nomor telepon tidak boleh kosong",
    })
    .regex(indonesianPhoneNumberPattern, {
      message: "Nomor telepon tidak valid",
    })
    .min(1, "Nomor telepon tidak boleh kosong"),
  pekerjaan: z
    .string({
      required_error: "Pekerjaan tidak boleh kosong",
    })
    .min(1, "Pekerjaan tidak boleh kosong"),
  tanggal_lahir: z.coerce
    .date({
      required_error: "Tanggal lahir tidak boleh kosong",
    })
    .min(new Date(1900, 1, 1), {
      message: "Tanggal lahir tidak valid",
    }),
  tempat_lahir: z
    .string({
      required_error: "Tempat lahir tidak boleh kosong",
    })
    .min(1, "Tempat lahir tidak boleh kosong"),
  status_perkawinan: z.enum(StatusKawinValues, {
    required_error: "Status perkawinan tidak boleh kosong",
  }),
  jenis_kelamin: z.boolean({
    required_error: "Jenis kelamin tidak boleh kosong",
  }),
});

export const registerUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username tidak boleh kosong",
      })
      .regex(usernamePattern, {
        message:
          "Username harus terdiri dari 1-25 karakter alfanumerik dan tidak mengandung spasi.",
      }),
    password: z
      .string({
        required_error: "Password tidak boleh kosong",
      })
      .min(8, { message: "Password harus terdiri dari 8 karakter atau lebih" }),
    confirmPassword: z
      .string({
        required_error: "Konfirmasi password tidak boleh kosong",
      })
      .min(1, { message: "Konfirmasi password tidak boleh kosong" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username tidak boleh kosong",
    })
    .min(1, "Username tidak boleh kosong"),
  password: z
    .string({
      required_error: "Password tidak boleh kosong",
    })
    .min(1, "Password tidak boleh kosong"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "Password lama tidak boleh kosong",
      })
      .min(1, "Password lama tidak boleh kosong"),
    newPassword: z
      .string({
        required_error: "Password tidak boleh kosong",
      })
      .min(8, { message: "Password harus terdiri dari 8 karakter atau lebih" }),
    confirmPassword: z
      .string({
        required_error: "Konfirmasi password tidak boleh kosong",
      })
      .min(1, { message: "Konfirmasi password tidak boleh kosong" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "Username tidak boleh kosong",
    })
    .regex(usernamePattern, {
      message:
        "Username harus terdiri dari 1-25 karakter alfanumerik dan tidak mengandung spasi.",
    }),
  role: z.enum(["ADMIN", "WARGA"], {
    required_error: "Role tidak boleh kosong",
  }),
});

export const signersSchema = z.object({
  nama: z
    .string({
      required_error: "Nama tidak boleh kosong",
    })
    .min(1, "Nama tidak boleh kosong"),
  alamat: z
    .string({
      required_error: "Alamat tidak boleh kosong",
    })
    .min(1, "Alamat tidak boleh kosong"),
  jabatan: z
    .string({
      required_error: "Jabatan tidak boleh kosong",
    })
    .min(1, "Jabatan tidak boleh kosong"),
});
