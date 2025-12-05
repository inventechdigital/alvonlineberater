import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepAugenkrankheitProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepAugenkrankheit = ({ data, onUpdate, onNext, onBack }: StepAugenkrankheitProps) => {
  const handleSelect = (value: 'grauerstar' | 'gruenerstar' | 'sonstige') => {
    onUpdate({ fehlsichtigkeit: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Welche Vorerkrankung haben Sie?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <OptionCard
          label="Grauer Star"
          sublabel="(Katarakt)"
          selected={data.fehlsichtigkeit === 'grauerstar'}
          onClick={() => handleSelect('grauerstar')}
        />
        <OptionCard
          label="Grüner Star"
          sublabel="(Glaukom)"
          selected={data.fehlsichtigkeit === 'gruenerstar'}
          onClick={() => handleSelect('gruenerstar')}
        />
        <OptionCard
          label="Sonstige"
          selected={data.fehlsichtigkeit === 'sonstige'}
          onClick={() => handleSelect('sonstige')}
        />
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.fehlsichtigkeit}
      />
    </div>
  );
};

export default StepAugenkrankheit;
