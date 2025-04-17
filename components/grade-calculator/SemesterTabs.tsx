'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGradeContext } from './GradeContext';
import { GradeTable } from './GradeTable';

export const SemesterTabs: React.FC = () => {
	const { activeTab, setActiveTab } = useGradeContext();

	return (
		<div className='relative'>
			<div className='sticky top-[88px] z-20 bg-background/95 backdrop-blur-md pb-2 border-b border-border'>
				<Tabs
					defaultValue='semester1'
					value={activeTab}
					onValueChange={setActiveTab}
					className='w-full'>
					<TabsList className='grid w-full grid-cols-2 mb-1'>
						<TabsTrigger value='semester1'>Semestre 1</TabsTrigger>
						<TabsTrigger value='semester2'>Semestre 2</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<div className='mt-4 pt-2'>
				{activeTab === 'semester1' ? (
					<div>
						<GradeTable semester={1} />
					</div>
				) : (
					<div>
						<GradeTable semester={2} />
					</div>
				)}
			</div>
		</div>
	);
};
