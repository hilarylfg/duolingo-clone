'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Exercise } from '@/shared/types';
import { cn } from '@/shared/utils/clsx';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceExercise({ exercise, onSubmit, disabled }: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = exercise.options as string[];

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <Card className="border-none bg-white/90 p-10 shadow-[0_35px_80px_rgba(20,84,50,0.08)]">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50">
            Выберите правильный вариант
          </p>
          <p className="text-3xl font-black text-duo-ink md:text-4xl">{exercise.question}</p>
        </div>

        {exercise.hint && (
          <div className="rounded-3xl bg-duo-blue/10 p-5 text-base font-semibold text-duo-blue">
            💡 Подсказка: {exercise.hint}
          </div>
        )}

        <div className="grid gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !disabled && setSelectedOption(option)}
              disabled={disabled}
              className={cn(
                "w-full rounded-2xl border-2 p-6 text-left text-lg font-semibold transition-all",
                selectedOption === option
                  ? "border-duo-green bg-duo-green/10 text-duo-green shadow-[0_12px_30px_rgba(88,204,2,0.2)]"
                  : "border-duo-ink/10 bg-white text-duo-ink hover:border-duo-green/50 hover:bg-duo-green/5 hover:-translate-y-0.5",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="flex items-center gap-4">
                <span className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  selectedOption === option
                    ? "bg-duo-green text-white"
                    : "bg-duo-ink/10 text-duo-ink/60"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={disabled || !selectedOption}
          className="w-full"
          size="lg"
          variant="duo"
        >
          Проверить
        </Button>
      </div>
    </Card>
  );
}
