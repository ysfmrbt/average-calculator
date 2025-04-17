'use client';

import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Save } from 'lucide-react';
import { useGradeContext } from './GradeContext';
import { getGradeColor, getGradeStatus } from './utils';
// We need the type definitions for TypeScript, but they're used implicitly
// in the component through the useGradeContext hook
import type { Subject } from './types';

interface GradeTableProps {
	semester: number;
}

export const GradeTable: React.FC<GradeTableProps> = ({ semester }) => {
	const {
		modules,
		handleDSChange,
		handleProjetChange,
		handleExamenChange,
		calculateAverages,
	} = useGradeContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [editMode, setEditMode] = useState(true); // Default to edit mode
	const [changedRows, setChangedRows] = useState<Set<string>>(new Set());

	// Filter modules by semester
	const semesterModules = modules.filter(
		(module) => module.semester === semester,
	);

	// Flatten all subjects from all modules in this semester
	const allSubjects = semesterModules.flatMap((module) =>
		module.subjects.map((subject) => ({
			...subject,
			moduleId: module.id,
			moduleName: module.name,
		})),
	);

	// Filter subjects by search term
	const filteredSubjects = searchTerm
		? allSubjects.filter(
				(subject) =>
					subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					subject.moduleName.toLowerCase().includes(searchTerm.toLowerCase()),
		  )
		: allSubjects;

	const handleInputChange = (
		moduleId: string,
		subjectId: string,
		field: 'ds' | 'projet' | 'examen',
		value: string,
	) => {
		setChangedRows((prev) => new Set(prev).add(`${moduleId}-${subjectId}`));

		if (field === 'ds') {
			handleDSChange(moduleId, subjectId, value);
		} else if (field === 'projet') {
			handleProjetChange(moduleId, subjectId, value);
		} else if (field === 'examen') {
			handleExamenChange(moduleId, subjectId, value);
		}
	};

	const saveChanges = () => {
		// Calculate averages to ensure they're up to date
		calculateAverages();
		setChangedRows(new Set());
		setEditMode(false);
	};

	return (
		<div className='space-y-4'>
			<div className='pb-2 pt-1'>
				<div className='flex flex-col sm:flex-row justify-between gap-4'>
					<div className='relative flex-1'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Rechercher une matière ou un module...'
							className='pl-8'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className='flex gap-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => setEditMode(!editMode)}>
							<Filter className='h-4 w-4 mr-2' />
							{editMode ? 'Mode Lecture' : 'Mode Édition'}
						</Button>
						{editMode && changedRows.size > 0 && (
							<Button
								size='sm'
								onClick={saveChanges}>
								<Save className='h-4 w-4 mr-2' />
								Enregistrer
							</Button>
						)}
					</div>
				</div>
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[300px]'>Matière</TableHead>
							<TableHead>Module</TableHead>
							<TableHead className='text-center'>Coef</TableHead>
							<TableHead className='text-center'>DS</TableHead>
							{editMode && (
								<TableHead className='text-center'>Projet</TableHead>
							)}
							<TableHead className='text-center'>Examen</TableHead>
							<TableHead className='text-center'>Note</TableHead>
							{!editMode && (
								<TableHead className='text-center'>Statut</TableHead>
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredSubjects.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={editMode ? 7 : 7}
									className='text-center py-8 text-muted-foreground'>
									Aucune matière trouvée
								</TableCell>
							</TableRow>
						) : (
							filteredSubjects.map((subject) => {
								const isChanged = changedRows.has(
									`${subject.moduleId}-${subject.id}`,
								);
								return (
									<TableRow
										key={`${subject.moduleId}-${subject.id}`}
										className={isChanged ? 'bg-muted/50' : ''}>
										<TableCell className='font-medium'>
											{subject.name}
											{subject.isSpecialFormula && (
												<span className='text-xs block text-accent-foreground'>
													Formule spéciale
												</span>
											)}
										</TableCell>
										<TableCell className='text-muted-foreground text-sm'>
											{subject.moduleName}
										</TableCell>
										<TableCell className='text-center'>
											{subject.coefficient}
										</TableCell>
										<TableCell className='text-center'>
											{editMode ? (
												<Input
													type='number'
													min='0'
													max='20'
													step='0.25'
													value={subject.ds === null ? '' : subject.ds}
													onChange={(e) =>
														handleInputChange(
															subject.moduleId,
															subject.id,
															'ds',
															e.target.value,
														)
													}
													className='w-16 mx-auto text-center'
												/>
											) : subject.ds === null ? (
												'-'
											) : (
												subject.ds.toFixed(2)
											)}
										</TableCell>
										{editMode && (
											<TableCell className='text-center'>
												{subject.isSpecialFormula ? (
													<Input
														type='number'
														min='0'
														max='20'
														step='0.25'
														value={
															subject.projet === null ? '' : subject.projet
														}
														onChange={(e) =>
															handleInputChange(
																subject.moduleId,
																subject.id,
																'projet',
																e.target.value,
															)
														}
														className='w-16 mx-auto text-center'
													/>
												) : (
													<span className='text-muted-foreground'>N/A</span>
												)}
											</TableCell>
										)}
										<TableCell className='text-center'>
											{editMode ? (
												<Input
													type='number'
													min='0'
													max='20'
													step='0.25'
													value={subject.examen === null ? '' : subject.examen}
													onChange={(e) =>
														handleInputChange(
															subject.moduleId,
															subject.id,
															'examen',
															e.target.value,
														)
													}
													className='w-16 mx-auto text-center'
												/>
											) : subject.examen === null ? (
												'-'
											) : (
												subject.examen.toFixed(2)
											)}
										</TableCell>
										<TableCell className='text-center'>
											{subject.grade !== null ? (
												<span
													className={`font-bold ${getGradeColor(
														subject.grade,
													)}`}>
													{subject.grade.toFixed(2)}
												</span>
											) : (
												'-'
											)}
										</TableCell>
										{!editMode && (
											<TableCell className='text-center'>
												{subject.grade !== null && (
													<Badge
														variant={
															subject.grade >= 10 ? 'outline' : 'destructive'
														}>
														{getGradeStatus(subject.grade)}
													</Badge>
												)}
											</TableCell>
										)}
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
