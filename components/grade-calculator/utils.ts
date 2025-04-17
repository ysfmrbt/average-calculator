import { Module, Subject } from './types';

export const calculateSubjectGrade = (subject: Subject): number | null => {
	if (subject.isSpecialFormula) {
		// Special formula for Data Mining and IELTS: 0.2 * DS + 0.25 * projet + 0.55 * examen
		if (
			subject.ds !== null &&
			subject.projet !== null &&
			subject.examen !== null
		) {
			// Use Math.round to ensure consistent calculation with 2 decimal places
			return (
				Math.round(
					(0.2 * subject.ds + 0.25 * subject.projet + 0.55 * subject.examen) *
						100,
				) / 100
			);
		}
	} else {
		// Standard formula: 0.3 * DS + 0.7 * examen
		if (subject.ds !== null && subject.examen !== null) {
			// Use Math.round to ensure consistent calculation with 2 decimal places
			return Math.round((0.3 * subject.ds + 0.7 * subject.examen) * 100) / 100;
		}
	}
	return null;
};

export const calculateModuleAverage = (
	moduleSubjects: Subject[],
): number | null => {
	let totalWeightedGrade = 0;
	let totalCoefficients = 0;

	moduleSubjects.forEach((subject) => {
		if (subject.grade !== null) {
			totalWeightedGrade += subject.grade * subject.coefficient;
			totalCoefficients += subject.coefficient;
		}
	});

	// Round to 2 decimal places for consistency
	return totalCoefficients > 0
		? Math.round((totalWeightedGrade / totalCoefficients) * 100) / 100
		: null;
};

export const calculateSemesterAverage = (
	semesterModules: Module[],
): number | null => {
	let totalWeightedGrade = 0;
	let totalCoefficients = 0;

	semesterModules.forEach((module) => {
		module.subjects.forEach((subject) => {
			if (subject.grade !== null) {
				totalWeightedGrade += subject.grade * subject.coefficient;
				totalCoefficients += subject.coefficient;
			}
		});
	});

	// Round to 2 decimal places for consistency
	return totalCoefficients > 0
		? Math.round((totalWeightedGrade / totalCoefficients) * 100) / 100
		: null;
};

export const calculateOverallAverage = (modules: Module[]): number | null => {
	let totalWeightedGrade = 0;
	let totalCoefficients = 0;

	modules.forEach((module) => {
		module.subjects.forEach((subject) => {
			if (subject.grade !== null) {
				totalWeightedGrade += subject.grade * subject.coefficient;
				totalCoefficients += subject.coefficient;
			}
		});
	});

	// Round to 2 decimal places for consistency
	return totalCoefficients > 0
		? Math.round((totalWeightedGrade / totalCoefficients) * 100) / 100
		: null;
};

export const getGradeColor = (grade: number | null): string => {
	if (grade === null) return 'text-muted-foreground';
	if (grade >= 16) return 'text-green-600 dark:text-green-400';
	if (grade >= 14) return 'text-green-500 dark:text-green-300';
	if (grade >= 12) return 'text-blue-500 dark:text-blue-300';
	if (grade >= 10) return 'text-yellow-500 dark:text-yellow-300';
	return 'text-destructive dark:text-destructive';
};

export const getGradeStatus = (grade: number | null): string => {
	if (grade === null) return 'Non noté';
	if (grade >= 16) return 'Excellent';
	if (grade >= 14) return 'Très Bien';
	if (grade >= 12) return 'Bien';
	if (grade >= 10) return 'Passable';
	return 'Échec';
};
