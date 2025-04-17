import GradeCalculator from '@/components/grade-calculator';

export default function Home() {
	return (
		<main className='min-h-screen p-4 md:p-8 bg-background text-foreground'>
			<div className='max-w-6xl mx-auto'>
				<h1 className='text-3xl font-bold text-center mb-6 font-sans'>
					Calculateur de Notes
				</h1>
				<GradeCalculator />
			</div>
		</main>
	);
}
