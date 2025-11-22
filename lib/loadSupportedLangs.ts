import fs from "fs/promises";
import path from "path";

export async function loadSupportedLangs() {
  const file = path.join(process.cwd(), "content/languages/supported.json");
  const content = await fs.readFile(file, "utf-8");
  return JSON.parse(content);
}
