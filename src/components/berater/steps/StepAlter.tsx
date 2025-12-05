import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepAlterProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepAlter = ({ data, onUpdate, onNext, onBack }: StepAlterProps) => {
  const options = [
    { value: '18-25', label: '18 - 25' },
    { value: '26-45', label: '26 - 45' },
    { value: '46-59', label: '46 - 59' },
    { value: '60+', label: '60+' },
  ] as const;

  const handleSelect = (value: typeof options[number]['value']) => {
    onUpdate({ alter: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Wie alt sind Sie?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={data.alter === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.alter}
      />
    </div>
  );
};

export default StepAlter;
