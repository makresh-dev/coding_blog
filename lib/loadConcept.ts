import fs from "fs/promises";
import path from "path";
import { ConceptRecord } from "./types";

export async function loadConcept(name: string): Promise<ConceptRecord> {
  const file = path.join(process.cwd(), "content/concepts", `${name}.json`);
  const content = await fs.readFile(file, "utf-8");
  return JSON.parse(content);
}
