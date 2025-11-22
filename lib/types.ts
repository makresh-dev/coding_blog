export interface ConceptRecord {
  concept: string;
  description?: string;
  languages: Record<string, { code: string; notes?: string }>;
}
