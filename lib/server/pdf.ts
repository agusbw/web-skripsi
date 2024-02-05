import path from "path";
import fs from "fs/promises";

const rootDirectory = path.join(
  process.cwd(),
  "app",
  "assets",
  "letter-template"
);

export const getPDFData = async (fileName: string) => {
  const filePath = path.join(rootDirectory, fileName);

  try {
    const fileContent = await fs.readFile(filePath);

    return fileContent;
  } catch (err) {
    console.log(err);
    return null;
  }
};
