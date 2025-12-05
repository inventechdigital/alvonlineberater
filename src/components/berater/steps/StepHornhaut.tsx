import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepHornhautProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepHornhaut = ({ data, onUpdate, onNext, onBack }: StepHornhautProps) => {
  const handleSelect = (value: 'ja' | 'nein') => {
    onUpdate({ hornhautverkruemmung: value });
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Haben Sie eine Hornhautverkrümmung?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <OptionCard
          label="Ja"
          selected={data.hornhautverkruemmung === 'ja'}
          onClick={() => handleSelect('ja')}
        />
        <OptionCard
          label="Nein"
          selected={data.hornhautverkruemmung === 'nein'}
          onClick={() => handleSelect('nein')}
        />
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.hornhautverkruemmung}
      />
    </div>
  );
};

export default StepHornhaut;
