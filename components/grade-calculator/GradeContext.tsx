'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { Module, SemesterAverages, ExpandedModules } from './types';
import {
	calculateSubjectGrade,
	calculateSemesterAverage,
	calculateOverallAverage,
} from './utils';
import { initialModulesData } from './data';

interface GradeContextType {
	modules: Module[];
	activeTab: string;
	overallAverage: number | null;
	semesterAverages: SemesterAverages;
	expandedModules: ExpandedModules;
	setActiveTab: (tab: string) => void;
	handleDSChange: (moduleId: string, subjectId: string, value: string) => void;
	handleProjetChange: (
		moduleId: string,
		subjectId: string,
		value: string,
	) => void;
	handleExamenChange: (
		moduleId: string,
		subjectId: string,
		value: string,
	) => void;
	toggleModuleExpansion: (moduleId: string) => void;
	expandAllModules: () => void;
	collapseAllModules: () => void;
	calculateAverages: () => void;
	resetGrades: () => void;
	fillRandomGrades: () => void;
}

const GradeContext = createContext<GradeContextType | undefined>(undefined);

export const useGradeContext = () => {
	const context = useContext(GradeContext);
	if (!context) {
		throw new Error('useGradeContext must be used within a GradeProvider');
	}
	return context;
};

interface GradeProviderProps {
	children: ReactNode;
}

export const GradeProvider: React.FC<GradeProviderProps> = ({ children }) => {
	const [modules, setModules] = useState<Module[]>([]);
	const [activeTab, setActiveTab] = useState('semester1');
	const [overallAverage, setOverallAverage] = useState<number | null>(null);
	const [semesterAverages, setSemesterAverages] = useState<SemesterAverages>({
		semester1: null,
		semester2: null,
	});
	const [expandedModules, setExpandedModules] = useState<ExpandedModules>({});

	useEffect(() => {
		// Initialize all modules as expanded
		const initialExpandedState: ExpandedModules = {};
		initialModulesData.forEach((module) => {
			initialExpandedState[module.id] = true;
		});
		setExpandedModules(initialExpandedState);
		setModules(initialModulesData);
	}, []);

	const handleDSChange = (
		moduleId: string,
		subjectId: string,
		value: string,
	) => {
		const numValue = value === '' ? null : Number.parseFloat(value);

		setModules((prevModules) => {
			const updatedModules = prevModules.map((module) => {
				if (module.id === moduleId) {
					return {
						...module,
						subjects: module.subjects.map((subject) => {
							if (subject.id === subjectId) {
								const updatedSubject = {
									...subject,
									ds: numValue,
								};

								// Calculate the grade based on the formula
								updatedSubject.grade = calculateSubjectGrade(updatedSubject);
								return updatedSubject;
							}
							return subject;
						}),
					};
				}
				return module;
			});

			// Auto-calculate averages
			updateAverages(updatedModules);

			return updatedModules;
		});
	};

	// Helper function to update averages based on current modules state
	const updateAverages = (modules: Module[]) => {
		// Calculate semester averages
		const semester1Modules = modules.filter((module) => module.semester === 1);
		const semester2Modules = modules.filter((module) => module.semester === 2);

		const semester1Average = calculateSemesterAverage(semester1Modules);
		const semester2Average = calculateSemesterAverage(semester2Modules);

		setSemesterAverages({
			semester1: semester1Average,
			semester2: semester2Average,
		});

		// Calculate overall average
		const overall = calculateOverallAverage(modules);
		setOverallAverage(overall);
	};

	const handleProjetChange = (
		moduleId: string,
		subjectId: string,
		value: string,
	) => {
		const numValue = value === '' ? null : Number.parseFloat(value);

		setModules((prevModules) => {
			const updatedModules = prevModules.map((module) => {
				if (module.id === moduleId) {
					return {
						...module,
						subjects: module.subjects.map((subject) => {
							if (subject.id === subjectId) {
								const updatedSubject = {
									...subject,
									projet: numValue,
								};

								// Calculate the grade based on the formula
								updatedSubject.grade = calculateSubjectGrade(updatedSubject);
								return updatedSubject;
							}
							return subject;
						}),
					};
				}
				return module;
			});

			// Auto-calculate averages
			updateAverages(updatedModules);

			return updatedModules;
		});
	};

	const handleExamenChange = (
		moduleId: string,
		subjectId: string,
		value: string,
	) => {
		const numValue = value === '' ? null : Number.parseFloat(value);

		setModules((prevModules) => {
			const updatedModules = prevModules.map((module) => {
				if (module.id === moduleId) {
					return {
						...module,
						subjects: module.subjects.map((subject) => {
							if (subject.id === subjectId) {
								const updatedSubject = {
									...subject,
									examen: numValue,
								};

								// Calculate the grade based on the formula
								updatedSubject.grade = calculateSubjectGrade(updatedSubject);
								return updatedSubject;
							}
							return subject;
						}),
					};
				}
				return module;
			});

			// Auto-calculate averages
			updateAverages(updatedModules);

			return updatedModules;
		});
	};

	const toggleModuleExpansion = (moduleId: string) => {
		setExpandedModules((prev) => ({
			...prev,
			[moduleId]: !prev[moduleId],
		}));
	};

	const expandAllModules = () => {
		const newExpandedState: ExpandedModules = {};
		modules.forEach((module) => {
			newExpandedState[module.id] = true;
		});
		setExpandedModules(newExpandedState);
	};

	const collapseAllModules = () => {
		const newExpandedState: ExpandedModules = {};
		modules.forEach((module) => {
			newExpandedState[module.id] = false;
		});
		setExpandedModules(newExpandedState);
	};

	const calculateAverages = () => {
		// Use the same updateAverages function that's used for automatic calculations
		updateAverages(modules);
	};

	const resetGrades = () => {
		setModules((prevModules) =>
			prevModules.map((module) => ({
				...module,
				subjects: module.subjects.map((subject) => ({
					...subject,
					grade: null,
					ds: null,
					projet: null,
					examen: null,
				})),
			})),
		);
		// Reset averages
		setOverallAverage(null);
		setSemesterAverages({
			semester1: null,
			semester2: null,
		});
	};

	const fillRandomGrades = () => {
		// Generate random grades with consistent calculation
		const generateRandomGrades = (modules: Module[]): Module[] => {
			return modules.map((module) => ({
				...module,
				subjects: module.subjects.map((subject) => {
					const ds = Math.floor(Math.random() * 11) + 10; // Random grade between 10 and 20
					const projet = Math.floor(Math.random() * 11) + 10;
					const examen = Math.floor(Math.random() * 11) + 10;

					// Calculate grade using the same formula as in calculateSubjectGrade
					let grade;
					if (subject.isSpecialFormula) {
						grade = 0.2 * ds + 0.25 * projet + 0.55 * examen;
					} else {
						grade = 0.3 * ds + 0.7 * examen;
					}

					return {
						...subject,
						ds,
						projet,
						examen,
						grade,
					};
				}),
			}));
		};

		// Generate the new modules with random grades
		const newModules = generateRandomGrades(modules);

		// Update the modules state
		setModules(newModules);

		// Calculate averages based on the new modules
		updateAverages(newModules);
	};

	const value = {
		modules,
		activeTab,
		overallAverage,
		semesterAverages,
		expandedModules,
		setActiveTab,
		handleDSChange,
		handleProjetChange,
		handleExamenChange,
		toggleModuleExpansion,
		expandAllModules,
		collapseAllModules,
		calculateAverages,
		resetGrades,
		fillRandomGrades,
	};

	return (
		<GradeContext.Provider value={value}>{children}</GradeContext.Provider>
	);
};
