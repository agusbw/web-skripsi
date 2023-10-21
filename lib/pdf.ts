import path from "path";
const fs = require("fs/promises"); //note fs/promises, not fs her;
import { PDFDocument } from "pdf-lib";

const rootDirectory = path.join(process.cwd(), "app", "assets");

export const getPDFData = async (fileName: string) => {
  const filePath = path.join(rootDirectory, fileName);

  const fileContent = await fs.readFile(filePath);

  return fileContent;
};
