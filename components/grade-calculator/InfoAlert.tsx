'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export const InfoAlert: React.FC = () => {
  return (
    <Alert className='bg-background/80 backdrop-blur-md shadow-sm border border-border'>
      <Info className='h-4 w-4' />
      <AlertTitle className='text-foreground'>
        Comment les notes sont calculées
      </AlertTitle>
      <AlertDescription className='text-muted-foreground'>
        <p>
          Les moyennes des modules sont calculées en utilisant le coefficient
          (poids) de chaque matière. Les moyennes des semestres et la moyenne
          générale sont pondérées en fonction des coefficients de toutes les
          matières. L'échelle de notation est de 0 à 20, avec 10 comme note de
          passage.
        </p>
        <p className='mt-2'>
          <strong>Formules de calcul:</strong>
        </p>
        <ul className='list-disc pl-5 mt-1 space-y-1'>
          <li>
            <strong>Matières standard:</strong> 0.3 × Devoir Surveillé + 0.7 ×
            Examen
          </li>
          <li>
            <strong>Data Mining et matières IELTS:</strong> 0.2 × DS + 0.25 ×
            Projet/Oral + 0.55 × Examen
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};
