import Prompt from "@/app/components/Prompt";
import Explorer from "@/app/components/Explorer";
import ComparisonGrid from "@/app/components/ComparisonGrid";
import StatusBar from "@/app/components/StatusBar";

import { loadConcept } from "@/lib/loadConcept";
import { loadSupportedLangs } from "@/lib/loadSupportedLangs";
import { loadAllConcepts } from "@/lib/loadAllConcepts";

export default async function ConceptPage({ params }) {
  const { name } = await params;    // FIX → unwrap params

  const concept = await loadConcept(name);
  const supported = await loadSupportedLangs();
  const concepts = await loadAllConcepts();

  const visibleLanguages = Object.keys(concept.languages).filter(
    (lang) => supported[lang]
  );

  return (
    <div className="flex w-full gap-8 p-6">

      <div className="w-64">
        <Explorer concepts={concepts} active={name} />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <Prompt concepts={concepts} />

        <ComparisonGrid
          concept={concept}
          visibleLanguages={visibleLanguages}
        />

        <StatusBar />
      </div>

    </div>
  );
}
