'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGradeContext } from './GradeContext';
import { Subject } from './types';

interface GradeInputsProps {
  subject: Subject;
  moduleId: string;
}

export const GradeInputs: React.FC<GradeInputsProps> = ({ subject, moduleId }) => {
  const { handleDSChange, handleProjetChange, handleExamenChange } = useGradeContext();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {/* DS Input */}
      <div>
        <Label
          htmlFor={`${subject.id}-ds`}
          className='text-sm text-foreground'>
          Devoir Surveillé (DS)
        </Label>
        <Input
          id={`${subject.id}-ds`}
          type='number'
          min='0'
          max='20'
          step='0.25'
          placeholder='Note DS'
          value={subject.ds === null ? '' : subject.ds}
          onChange={(e) => handleDSChange(moduleId, subject.id, e.target.value)}
          className='mt-1 focus:ring-2 focus:ring-offset-1 bg-background border-input'
        />
      </div>

      {/* Projet Input (only for special formula subjects) */}
      {subject.isSpecialFormula && (
        <div>
          <Label
            htmlFor={`${subject.id}-projet`}
            className='text-sm text-foreground'>
            Projet/Oral
          </Label>
          <Input
            id={`${subject.id}-projet`}
            type='number'
            min='0'
            max='20'
            step='0.25'
            placeholder='Note Projet'
            value={subject.projet === null ? '' : subject.projet}
            onChange={(e) => handleProjetChange(moduleId, subject.id, e.target.value)}
            className='mt-1 focus:ring-2 focus:ring-offset-1 bg-background border-input'
          />
        </div>
      )}

      {/* Examen Input */}
      <div>
        <Label
          htmlFor={`${subject.id}-examen`}
          className='text-sm text-foreground'>
          Examen Final
        </Label>
        <Input
          id={`${subject.id}-examen`}
          type='number'
          min='0'
          max='20'
          step='0.25'
          placeholder='Note Examen'
          value={subject.examen === null ? '' : subject.examen}
          onChange={(e) => handleExamenChange(moduleId, subject.id, e.target.value)}
          className='mt-1 focus:ring-2 focus:ring-offset-1 bg-background border-input'
        />
      </div>
    </div>
  );
};
