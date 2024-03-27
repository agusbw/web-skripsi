import crypto from "crypto";

export function encryptData(data: string, key: string) {
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return iv.toString("hex") + ":" + encryptedData;
}

export function decryptData(encryptedData: string, key: string) {
  if (!key) {
    throw new Error("Decryption key is required.");
  }
  const parts = encryptedData.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted data format.");
  }
  const [ivString, encryptedString] = parts;
  if (!ivString || !encryptedString) {
    throw new Error("Initialization vector or encrypted data is missing.");
  }
  const iv = Buffer.from(ivString, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let decryptedData = decipher.update(Buffer.from(encryptedString, "hex"));
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  return decryptedData.toString("utf-8");
}
