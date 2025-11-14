'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card } from '@/shared/components/ui/card';
import { Exercise } from '@/shared/types';

interface TranslationExerciseProps {
  exercise: Exercise;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export function TranslationExercise({ exercise, onSubmit, disabled }: TranslationExerciseProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <Card className="border-none bg-white/90 p-10 shadow-[0_35px_80px_rgba(20,84,50,0.08)]">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-duo-ink/50">
            Перевод
          </p>
          <p className="text-3xl font-black text-duo-ink md:text-4xl">{exercise.question}</p>
        </div>

        {exercise.hint && (
          <div className="rounded-3xl bg-duo-blue/10 p-5 text-base font-semibold text-duo-blue">
            💡 Подсказка: {exercise.hint}
          </div>
        )}

        <div className="space-y-4">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Введите перевод..."
            disabled={disabled}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="text-lg py-6"
          />

          <Button
            onClick={handleSubmit}
            disabled={disabled || !answer.trim()}
            className="w-full"
            size="lg"
            variant="duo"
          >
            Проверить
          </Button>
        </div>
      </div>
    </Card>
  );
}
