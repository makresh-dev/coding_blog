import fs from "fs/promises";
import path from "path";

export async function loadAllConcepts(): Promise<string[]> {
  const dir = path.join(process.cwd(), "content/concepts");
  const files = await fs.readdir(dir);

  return files
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""));
}
