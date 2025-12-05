import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepDioptrienStabilProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepDioptrienStabil = ({ data, onUpdate, onNext, onBack }: StepDioptrienStabilProps) => {
  const handleSelect = (value: 'ja' | 'nein') => {
    onUpdate({ dioptrienStabil: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Sind Ihre Dioptrienwerte seit zwei Jahren unverändert?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <OptionCard
          label="Ja"
          selected={data.dioptrienStabil === 'ja'}
          onClick={() => handleSelect('ja')}
        />
        <OptionCard
          label="Nein"
          selected={data.dioptrienStabil === 'nein'}
          onClick={() => handleSelect('nein')}
        />
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.dioptrienStabil}
      />
    </div>
  );
};

export default StepDioptrienStabil;
