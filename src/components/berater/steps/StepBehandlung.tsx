import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepBehandlungProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepBehandlung = ({ data, onUpdate, onNext, onBack }: StepBehandlungProps) => {
  const handleSelect = (value: 'fehlsichtig' | 'augenkrankheit') => {
    onUpdate({ behandlung: value });
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Was möchten Sie behandeln?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <OptionCard
          label="Fehlsichtigkeit"
          selected={data.behandlung === 'fehlsichtig'}
          onClick={() => handleSelect('fehlsichtig')}
        />
        <OptionCard
          label="Augenkrankheit"
          selected={data.behandlung === 'augenkrankheit'}
          onClick={() => handleSelect('augenkrankheit')}
        />
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.behandlung}
      />
    </div>
  );
};

export default StepBehandlung;
