'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGradeContext } from './GradeContext';
import { getGradeColor, getGradeStatus } from './utils';
import { Module } from './types';

export const GradeSummary: React.FC = () => {
  const { modules, overallAverage, semesterAverages, activeTab } = useGradeContext();
  
  // Calculate completion percentage
  const calculateCompletionPercentage = (semesterModules: Module[]) => {
    const allSubjects = semesterModules.flatMap(module => module.subjects);
    const totalSubjects = allSubjects.length;
    const completedSubjects = allSubjects.filter(subject => subject.grade !== null).length;
    
    return totalSubjects > 0 ? (completedSubjects / totalSubjects) * 100 : 0;
  };

  const semester1Modules = modules.filter(module => module.semester === 1);
  const semester2Modules = modules.filter(module => module.semester === 2);
  
  const semester1Completion = calculateCompletionPercentage(semester1Modules);
  const semester2Completion = calculateCompletionPercentage(semester2Modules);
  const overallCompletion = calculateCompletionPercentage(modules);

  return (
    <Card className="bg-card border border-border shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Average */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-foreground">Moyenne Générale</h3>
              {overallAverage !== null && (
                <Badge variant={overallAverage >= 10 ? 'default' : 'destructive'}>
                  {getGradeStatus(overallAverage)}
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold">
              {overallAverage !== null ? (
                <span className={getGradeColor(overallAverage)}>
                  {overallAverage.toFixed(2)}
                </span>
              ) : (
                <span className="text-muted-foreground">--</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progression</span>
                <span className="text-muted-foreground">{Math.round(overallCompletion)}%</span>
              </div>
              <Progress value={overallCompletion} className="h-1" />
            </div>
          </div>

          {/* Semester 1 Average */}
          <div className={`space-y-2 ${activeTab === 'semester1' ? 'ring-1 ring-primary/20 rounded-lg p-3' : ''}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-foreground">Semestre 1</h3>
              {semesterAverages.semester1 !== null && (
                <Badge variant={semesterAverages.semester1 >= 10 ? 'default' : 'destructive'}>
                  {getGradeStatus(semesterAverages.semester1)}
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold">
              {semesterAverages.semester1 !== null ? (
                <span className={getGradeColor(semesterAverages.semester1)}>
                  {semesterAverages.semester1.toFixed(2)}
                </span>
              ) : (
                <span className="text-muted-foreground">--</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progression</span>
                <span className="text-muted-foreground">{Math.round(semester1Completion)}%</span>
              </div>
              <Progress value={semester1Completion} className="h-1" />
            </div>
          </div>

          {/* Semester 2 Average */}
          <div className={`space-y-2 ${activeTab === 'semester2' ? 'ring-1 ring-primary/20 rounded-lg p-3' : ''}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-foreground">Semestre 2</h3>
              {semesterAverages.semester2 !== null && (
                <Badge variant={semesterAverages.semester2 >= 10 ? 'default' : 'destructive'}>
                  {getGradeStatus(semesterAverages.semester2)}
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold">
              {semesterAverages.semester2 !== null ? (
                <span className={getGradeColor(semesterAverages.semester2)}>
                  {semesterAverages.semester2.toFixed(2)}
                </span>
              ) : (
                <span className="text-muted-foreground">--</span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progression</span>
                <span className="text-muted-foreground">{Math.round(semester2Completion)}%</span>
              </div>
              <Progress value={semester2Completion} className="h-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
