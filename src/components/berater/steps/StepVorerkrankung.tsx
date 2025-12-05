import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepVorerkrankungProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepVorerkrankung = ({ data, onUpdate, onNext, onBack }: StepVorerkrankungProps) => {
  const options = [
    { value: 'nein', label: 'Nein / Keine Angabe' },
    { value: 'grauerstar', label: 'Grauer Star', sublabel: '(Katarakt)' },
    { value: 'gruenerstar', label: 'Grüner Star', sublabel: '(Glaukom)' },
  ] as const;

  const handleSelect = (value: typeof options[number]['value']) => {
    onUpdate({ vorerkrankung: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Haben Sie eine Vorerkrankung am Auge?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={'sublabel' in option ? option.sublabel : undefined}
            selected={data.vorerkrankung === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.vorerkrankung}
      />
    </div>
  );
};

export default StepVorerkrankung;
