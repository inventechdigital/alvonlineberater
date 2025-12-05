import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepPrioritaetProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepPrioritaet = ({ data, onUpdate, onNext, onBack }: StepPrioritaetProps) => {
  const options = [
    { value: 'egal', label: 'Keine Angabe' },
    { value: 'premium', label: 'Schmerzfreie Behandlung' },
    { value: 'preis', label: 'Günstigerer Preis' },
  ] as const;

  const handleSelect = (value: typeof options[number]['value']) => {
    onUpdate({ prioritaet: value });
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Was ist Ihnen wichtiger?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={data.prioritaet === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.prioritaet}
      />
    </div>
  );
};

export default StepPrioritaet;
