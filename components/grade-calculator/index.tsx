'use client';

import React from 'react';
import { GradeProvider } from './GradeContext';
import { Header } from './Header';
import { GradeSummary } from './GradeSummary';
import { SemesterTabs } from './SemesterTabs';
import { InfoAlert } from './InfoAlert';

export default function GradeCalculator() {
	return (
		<GradeProvider>
			<div className='space-y-6'>
				<Header />
				<GradeSummary />
				<SemesterTabs />
				<InfoAlert />
			</div>
		</GradeProvider>
	);
}
