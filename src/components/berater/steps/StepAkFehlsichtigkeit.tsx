import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepAkFehlsichtigkeitProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepAkFehlsichtigkeit = ({ data, onUpdate, onNext, onBack }: StepAkFehlsichtigkeitProps) => {
  const options = [
    { value: 'nein', label: 'Nein' },
    { value: 'kurzsichtig', label: 'Kurzsichtig' },
    { value: 'weitsichtig', label: 'Weitsichtig' },
    { value: 'kurzweitsichtig', label: 'Kurz- und Weitsichtig' },
  ] as const;

  const handleSelect = (value: typeof options[number]['value']) => {
    onUpdate({ akFehlsichtigkeit: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Haben Sie zusätzlich eine Fehlsichtigkeit?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={data.akFehlsichtigkeit === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.akFehlsichtigkeit}
      />
    </div>
  );
};

export default StepAkFehlsichtigkeit;
