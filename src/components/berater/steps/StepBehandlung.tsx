import { useEffect, useRef } from 'react';
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
  const pendingNavigation = useRef(false);
  
  // Navigate after state has been updated
  useEffect(() => {
    if (pendingNavigation.current && data.behandlung) {
      pendingNavigation.current = false;
      const timer = setTimeout(() => onNext(), 150);
      return () => clearTimeout(timer);
    }
  }, [data.behandlung, onNext]);

  const handleSelect = (value: 'fehlsichtig' | 'augenkrankheit') => {
    // Reset branch-specific data when switching treatment type
    const resetData: Partial<FormData> = {
      behandlung: value,
      fehlsichtigkeit: null,
      akFehlsichtigkeit: null,
      ksDioptrien: null,
      wsDioptrien: null,
      dioptrienStabil: null,
      hornhautverkruemmung: null,
      trockeneAugen: null,
      vorerkrankung: null,
      schwanger: null,
      prioritaet: null,
    };
    
    pendingNavigation.current = true;
    onUpdate(resetData);
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
