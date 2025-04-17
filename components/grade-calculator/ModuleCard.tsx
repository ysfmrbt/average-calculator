'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Module } from './types';
import { SubjectRow } from './SubjectRow';
import { useGradeContext } from './GradeContext';
import { calculateModuleAverage, getGradeColor } from './utils';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const { expandedModules, toggleModuleExpansion } = useGradeContext();
  const isExpanded = expandedModules[module.id];
  const moduleAverage = calculateModuleAverage(module.subjects);

  return (
    <Collapsible
      key={module.id}
      open={isExpanded}
      onOpenChange={() => toggleModuleExpansion(module.id)}
      className='mb-4'>
      <Card className='bg-card/80 backdrop-blur-md border border-border shadow-sm hover:shadow-md transition-all'>
        <CollapsibleTrigger asChild>
          <CardHeader className='pb-2 cursor-pointer'>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='flex items-center text-foreground font-sans'>
                  {module.name}
                  {isExpanded ? (
                    <ChevronUp className='ml-2 h-4 w-4' />
                  ) : (
                    <ChevronDown className='ml-2 h-4 w-4' />
                  )}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Crédits: {module.totalCredits}
                </CardDescription>
              </div>
              {moduleAverage !== null && (
                <div className='flex flex-col items-end'>
                  <span className='text-sm text-muted-foreground'>
                    Moyenne du Module
                  </span>
                  <span className={`text-xl font-bold ${getGradeColor(moduleAverage)}`}>
                    {moduleAverage.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className='space-y-4'>
              {module.subjects.map((subject) => (
                <SubjectRow 
                  key={subject.id} 
                  subject={subject} 
                  moduleId={module.id} 
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
