import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepFehlsichtigkeitProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepFehlsichtigkeit = ({ data, onUpdate, onNext, onBack }: StepFehlsichtigkeitProps) => {
  const handleSelect = (value: 'kurzsichtig' | 'weitsichtig') => {
    onUpdate({ fehlsichtigkeit: value });
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Bitte wählen Sie Ihre Fehlsichtigkeiten
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <OptionCard
          label="Kurzsichtig"
          selected={data.fehlsichtigkeit === 'kurzsichtig'}
          onClick={() => handleSelect('kurzsichtig')}
        />
        <OptionCard
          label="Weitsichtig"
          selected={data.fehlsichtigkeit === 'weitsichtig'}
          onClick={() => handleSelect('weitsichtig')}
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

export default StepFehlsichtigkeit;
