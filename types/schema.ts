import * as z from "zod";
import { AgamaValues, StatusKawinValues } from "./types";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: "Tanggal lahir tidak boleh kosong" };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);

export const createWargaSchema = z.object({
  nama: z
    .string()
    .trim()
    .min(1, "Nama tidak boleh kosong")
    .max(75, "Nama maksimal 75 karakter"),
  alamat: z
    .string()
    .trim()
    .min(1, "Alamat tidak boleh kosong")
    .max(120, "Alamat maksimal 120 karakter"),
  agama: z.enum(AgamaValues, {
    required_error: "Agama tidak boleh kosong",
  }),
  no_kk: z.string().trim().length(16, "Nomor KK harus 16 karakter"),
  kewarganegaraan: z
    .string()
    .trim()
    .min(1, "Kewarganegaraan tidak boleh kosong")
    .max(30, "Kewarganegaraan maksimal 30 karakter"),
  nik: z.string().trim().length(16, "NIK harus 16 karakter"),
  pekerjaan: z.string().trim().optional(),
  tanggal_lahir: z.coerce.date({
    errorMap: errorMap,
  }),
  tempat_lahir: z
    .string()
    .trim()
    .min(1, "Tempat lahir tidak boleh kosong")
    .max(50, "Tempat lahir maksimal 50 karakter"),
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
    .trim()
    .min(1, "Username tidak boleh kosong")
    .max(25, "Username maksimal 25 karakter"),
  password: z
    .string({
      required_error: "Password tidak boleh kosong",
    })
    .trim()
    .min(1, "Password tidak boleh kosong")
    .max(255, "Password maksimal 255 karakter"),
});

export const wargaLoginSchema = z.object({
  username: z
    .string({
      required_error: "Username tidak boleh kosong",
    })
    .trim()
    .min(1, "Username tidak boleh kosong"),
  password: z
    .string({
      required_error: "Password tidak boleh kosong",
    })
    .trim()
    .min(1, "Password tidak boleh kosong")
    .max(255, "Password maksimal 255 karakter"),
});

export const changePasswordSchema = z
  .object({
    old_password: z.string().trim().min(1, "Password lama tidak boleh kosong"),
    confirm_new_password: z
      .string()
      .min(1, "Konfirmasi password tidak boleh kosong"),
    new_password: z
      .string()
      .min(1, "Password baru tidak boleh kosong")
      .max(255, "Password maksimal 255 karakter")
      .refine(
        (value) => {
          return !value.includes(" ");
        },
        {
          message: "Password tidak boleh mengandung spasi",
        }
      ),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Password baru dan konfirmasi password tidak sama",
    path: ["confirm_new_password"],
  });

export const changeUsernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username tidak boleh kosong")
    .max(25, "Username maksimal 25 karakter")
    .refine(
      (value) => {
        return /^[a-z0-9_]+$/.test(value);
      },
      {
        message:
          "Username hanya boleh terdiri dari huruf kecil, angka, dan underscore",
      }
    ),
});

export const createSktmSchema = z.object({
  keperluan: z
    .string()
    .trim()
    .min(1, "Keperluan pengajuan harus diisi")
    .max(100, "Keperluan maksimal 100 karakter"),
  informasi: z.array(z.string()).refine((value) => {
    if (value.length === 0) return {};
    return value.some((item) => item);
  }, {}),
});

export const createSkbpkSchema = z.object({
  keperluan: z
    .string()
    .trim()
    .min(1, "Keperluan pengajuan harus diisi")
    .max(100, "Keperluan maksimal 100 karakter"),
});

export const createSkuSchema = z.object({
  keperluan: z
    .string()
    .trim()
    .min(1, "Keperluan pengajuan harus diisi")
    .max(100, "Keperluan maksimal 100 karakter"),
  nama_usaha: z
    .string()
    .trim()
    .min(1, "Nama usaha harus diisi")
    .max(40, "Nama usaha maksimal 40 karakter"),
  lokasi_usaha: z
    .string({
      required_error: "Lokasi usaha harus dipilih",
    })
    .trim()
    .min(1, "Lokasi usaha harus dipilih")
    .max(120, "Lokasi usaha maksimal 120 karakter"),
  foto_usaha: z
    .any()
    .refine((files: FileList) => {
      console.log(files);
      return files?.length == 1;
    }, "Foto usaha wajib diisi")
    .refine((files: FileList) => {
      if (files?.[0]?.size) {
        return files?.[0]?.size <= MAX_FILE_SIZE;
      }
      return false;
    }, `Ukuran foto maksimum 5MB`)
    .refine((files: FileList) => {
      if (files?.[0]?.type) {
        return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      }
      return false;
    }, "Hanya menerima file .jpg, .jpeg, .png and .webp"),
});

export const insertSkuSchema = z.object({
  keperluan: z
    .string()
    .trim()
    .min(1, "Keperluan pengajuan harus diisi")
    .max(100, "Keperluan maksimal 100 karakter"),
  nama_usaha: z
    .string()
    .trim()
    .min(1, "Nama usaha harus diisi")
    .max(40, "Nama usaha maksimal 40 karakter"),
  lokasi_usaha: z
    .string({
      required_error: "Lokasi usaha harus diisi",
    })
    .trim()
    .min(1, "Lokasi usaha harus diisi")
    .max(120, "Lokasi usaha maksimal 120 karakter"),
  foto_usaha: z.string().min(1, "Foto usaha wajib diisi"),
});

export const createSkdSchema = z.object({
  keperluan: z
    .string()
    .trim()
    .min(1, "Keperluan pengajuan harus diisi")
    .max(100, "Keperluan maksimal 100 karakter"),
  domisili: z
    .string({
      required_error: "Domisili harus diisi",
    })
    .trim()
    .min(1, "Domisili harus dipilih")
    .max(120, "Domisili maksimal 120 karakter"),
});

export const tolakSuratSchema = z.object({
  pesan_penolakan: z
    .string()
    .trim()
    .min(1, "Pesan penolakan harus diisi")
    .max(255, "Pesan penolakan maksimal 255 karakter"),
});

export const createNomorSuratSchema = z.object({
  no_surat: z.string().trim().optional(),
});
