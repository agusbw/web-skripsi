import * as z from "zod";
import { AgamaValues, StatusKawinValues } from "./types";

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: "Tanggal lahir tidak boleh kosong" };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);

export const createWargaSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  alamat: z.string().min(1, "Alamat tidak boleh kosong"),
  agama: z.enum(AgamaValues, {
    required_error: "Agama tidak boleh kosong",
  }),
  no_kk: z.string().length(16, "No KK harus terdiri dari 16 digit"),
  kewarganegaraan: z.string().min(1, "Kewarganegaraan tidak boleh kosong"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 digit"),
  pekerjaan: z.string().optional(),
  tanggal_lahir: z.coerce.date({
    errorMap: errorMap,
  }),
  tempat_lahir: z.string().min(1, "Tempat lahir tidak boleh kosong"),
  status_perkawinan: z.enum(StatusKawinValues, {
    required_error: "Status perkawinan tidak boleh kosong",
  }),
  jenis_kelamin: z.enum(["true", "false"], {
    required_error: "Jenis kelamin tidak boleh kosong",
  }),
});

export const adminLoginSchema = z.object({
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

export const wargaLoginSchema = z.object({
  nik: z
    .string({
      required_error: "NIK tidak boleh kosong",
    })
    .min(1, "NIK tidak boleh kosong"),
  password: z
    .string({
      required_error: "Password tidak boleh kosong",
    })
    .min(1, "Password tidak boleh kosong"),
});

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Kata sandi lama tidak boleh kosong"),
    confirm_new_password: z
      .string()
      .min(1, "Konfirmasi kata sandi tidak boleh kosong"),
    new_password: z.string().min(1, "Kata sandi baru tidak boleh kosong"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Kata sandi baru dan konfirmasi kata sandi tidak sama",
    path: ["confirm_new_password"],
  });

export const createSktmSchema = z.object({
  keperluan: z.string().min(1, "Keperluan pengajuan harus diisi"),
  informasi: z.array(z.string()).refine((value) => {
    if (value.length === 0) return {};
    return value.some((item) => item);
  }, {}),
});

export const createSkbpkSchema = z.object({
  keperluan: z.string().min(1, "Keperluan pengajuan harus diisi"),
});

export const createSkuSchema = z.object({
  keperluan: z.string().min(1, "Keperluan pengajuan harus diisi"),
  nama_usaha: z.string().min(1, "Nama usaha harus diisi"),
  lokasi_usaha: z
    .string({
      required_error: "Lokasi usaha harus dipilih",
    })
    .min(1, "Lokasi usaha harus dipilih"),
});

export const createSkdSchema = z.object({
  keperluan: z.string().min(1, "Keperluan pengajuan harus diisi"),
  domisili: z
    .string({
      required_error: "Domisili harus dipilih",
    })
    .min(1, "Domisili harus dipilih"),
});

export const tolakSuratSchema = z.object({
  pesan_penolakan: z.string().min(1, "Pesan penolakan harus diisi"),
});
