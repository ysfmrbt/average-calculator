'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap, Calculator } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { useGradeContext } from './GradeContext';

export const Header: React.FC = () => {
	const { resetGrades, fillRandomGrades, calculateAverages } =
		useGradeContext();

	return (
		<div className='sticky top-0 z-30 backdrop-blur-md bg-background/80 p-4 rounded-lg shadow-sm border border-border'>
			<div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
				<div>
					<h2 className='text-xl font-semibold text-foreground font-sans'>
						Calculateur de Moyennes Académiques
					</h2>
					<p className='text-muted-foreground'>
						Entrez vos notes pour calculer les moyennes par module et par
						semestre
					</p>
				</div>
				<div className='flex flex-wrap gap-2 items-center'>
					<ThemeToggle />
					<Button
						variant='outline'
						onClick={resetGrades}
						size='sm'
						className='flex items-center gap-1'>
						<RefreshCw className='h-4 w-4' />
						<span className='hidden sm:inline'>Réinitialiser</span>
					</Button>
					<Button
						variant='outline'
						onClick={fillRandomGrades}
						size='sm'
						className='flex items-center gap-1'>
						<Zap className='h-4 w-4' />
						<span className='hidden sm:inline'>Notes Aléatoires</span>
					</Button>
					<Button
						onClick={calculateAverages}
						size='sm'
						className='flex items-center gap-1'>
						<Calculator className='h-4 w-4' />
						<span className='hidden sm:inline'>Calculer les Moyennes</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
