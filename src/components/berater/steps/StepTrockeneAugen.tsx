import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepTrockeneAugenProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTrockeneAugen = ({ data, onUpdate, onNext, onBack }: StepTrockeneAugenProps) => {
  const handleSelect = (value: 'ja' | 'nein') => {
    onUpdate({ trockeneAugen: value });
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Leiden Sie unter entzündungsbedingt trockenen Augen?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <OptionCard
          label="Ja"
          selected={data.trockeneAugen === 'ja'}
          onClick={() => handleSelect('ja')}
        />
        <OptionCard
          label="Nein"
          selected={data.trockeneAugen === 'nein'}
          onClick={() => handleSelect('nein')}
        />
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!data.trockeneAugen}
      />
    </div>
  );
};

export default StepTrockeneAugen;
