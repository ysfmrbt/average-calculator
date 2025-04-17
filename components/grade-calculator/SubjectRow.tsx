'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Subject } from './types';
import { GradeInputs } from './GradeInputs';
import { getGradeColor } from './utils';

interface SubjectRowProps {
  subject: Subject;
  moduleId: string;
}

export const SubjectRow: React.FC<SubjectRowProps> = ({ subject, moduleId }) => {
  return (
    <div className='space-y-4 pb-4 border-b border-border'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
        <div className='md:col-span-6'>
          <Label
            htmlFor={subject.id}
            className='text-foreground font-sans'>
            {subject.name}
          </Label>
          {subject.isSpecialFormula && (
            <p className='text-xs text-accent-foreground mt-1'>
              Formule spéciale: 0.2 × DS + 0.25 × Projet + 0.55 × Examen
            </p>
          )}
          {!subject.isSpecialFormula && (
            <p className='text-xs text-muted-foreground mt-1'>
              Formule standard: 0.3 × DS + 0.7 × Examen
            </p>
          )}
        </div>
        <div className='md:col-span-2 text-sm text-muted-foreground'>
          Coef: {subject.coefficient}
        </div>
        <div className='md:col-span-2 text-sm text-muted-foreground'>
          {subject.grade !== null ? (
            <span className={`font-semibold ${getGradeColor(subject.grade)}`}>
              {subject.grade.toFixed(2)}
            </span>
          ) : (
            'Non calculé'
          )}
        </div>
      </div>

      <GradeInputs subject={subject} moduleId={moduleId} />
    </div>
  );
};
