import crypto from "crypto";

export function encryptData(data: string, key: string) {
  const cipher = crypto.createCipheriv(
    "aes-256-ecb",
    Buffer.from(key, "hex"),
    null
  );
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

export function decryptData(encryptedData: string, key: string) {
  if (!key) {
    throw new Error("Decryption key is required.");
  }
  const decipher = crypto.createDecipheriv(
    "aes-256-ecb",
    Buffer.from(key, "hex"),
    null
  );
  let decryptedData = decipher.update(Buffer.from(encryptedData, "hex"));
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  return decryptedData.toString("utf-8");
}
