export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  contactHours: number;
  credit: number;
  grade: number | null;
  ds: number | null; // Devoir Surveillé
  projet: number | null; // Projet/Oral
  examen: number | null; // Examen final
  isSpecialFormula: boolean; // Flag for Data Mining and IELTS subjects
}

export interface Module {
  id: string;
  name: string;
  semester: number;
  subjects: Subject[];
  totalCredits: number;
  isExpanded?: boolean;
}

export interface SemesterAverages {
  [key: string]: number | null;
}

export interface ExpandedModules {
  [key: string]: boolean;
}
