import Prompt from "./components/Prompt";
import Explorer from "./components/Explorer";
import StatusBar from "./components/StatusBar";
import { loadAllConcepts } from "@/lib/loadAllConcepts";

export default async function Home() {
  const concepts = await loadAllConcepts();

  return (
    <div className="flex min-h-screen w-screen gap-8 px-6 py-6 overflow-hidden box-border">

      {/* Explorer Left */}
      <div className="w-64">
        <Explorer concepts={concepts} active={null} />
      </div>

      {/* Main Center */}
      <div className="flex-1">
        <Prompt concepts={concepts} />

        <div className="mt-10 text-[#006644] text-sm">
          Type a concept name to begin. Example: closures, recursion, pointers.
        </div>

        <StatusBar />
      </div>

    </div>
  );
}
