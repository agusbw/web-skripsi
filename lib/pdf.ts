import path from "path";
import fs from "fs/promises"; //note fs/promises, not fs her;
// import { PDFDocument } from "pdf-lib";

const rootDirectory = path.join(process.cwd(), "app", "assets");

export const getPDFData = async (fileName: string) => {
  const filePath = path.join(rootDirectory, fileName);

  const fileContent = await fs.readFile(filePath);

  return fileContent;
};
