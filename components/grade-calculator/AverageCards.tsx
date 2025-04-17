'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGradeContext } from './GradeContext';
import { getGradeColor, getGradeStatus } from './utils';

export const AverageCards: React.FC = () => {
  const { overallAverage, semesterAverages } = useGradeContext();

  if (overallAverage === null) return null;

  return (
    <Card className='bg-background/80 backdrop-blur-md shadow-lg border border-border'>
      <CardContent className='pt-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Overall Average */}
          <div className='flex flex-col items-center p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow transition-all'>
            <span className='text-muted-foreground mb-1'>
              Moyenne Générale
            </span>
            <span
              className={`text-3xl font-bold ${getGradeColor(
                overallAverage,
              )}`}>
              {overallAverage.toFixed(2)}
            </span>
            <Badge
              className='mt-2'
              variant={overallAverage >= 10 ? 'default' : 'destructive'}>
              {getGradeStatus(overallAverage)}
            </Badge>
          </div>

          {/* Semester 1 Average */}
          <div className='flex flex-col items-center p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow transition-all'>
            <span className='text-muted-foreground mb-1'>
              Moyenne Semestre 1
            </span>
            <span
              className={`text-3xl font-bold ${getGradeColor(
                semesterAverages.semester1,
              )}`}>
              {semesterAverages.semester1
                ? semesterAverages.semester1.toFixed(2)
                : 'N/A'}
            </span>
            {semesterAverages.semester1 && (
              <Badge
                className='mt-2'
                variant={
                  semesterAverages.semester1 >= 10
                    ? 'default'
                    : 'destructive'
                }>
                {getGradeStatus(semesterAverages.semester1)}
              </Badge>
            )}
          </div>

          {/* Semester 2 Average */}
          <div className='flex flex-col items-center p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow transition-all'>
            <span className='text-muted-foreground mb-1'>
              Moyenne Semestre 2
            </span>
            <span
              className={`text-3xl font-bold ${getGradeColor(
                semesterAverages.semester2,
              )}`}>
              {semesterAverages.semester2
                ? semesterAverages.semester2.toFixed(2)
                : 'N/A'}
            </span>
            {semesterAverages.semester2 && (
              <Badge
                className='mt-2'
                variant={
                  semesterAverages.semester2 >= 10
                    ? 'default'
                    : 'destructive'
                }>
                {getGradeStatus(semesterAverages.semester2)}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
