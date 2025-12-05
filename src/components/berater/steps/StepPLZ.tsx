import { useState } from 'react';
import { Input } from '@/components/ui/input';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepPLZProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepPLZ = ({ data, onUpdate, onNext, onBack }: StepPLZProps) => {
  const [error, setError] = useState<string>('');

  const validatePLZ = (plz: string): boolean => {
    // Deutsche PLZ: genau 5 Ziffern
    const plzRegex = /^[0-9]{5}$/;
    return plzRegex.test(plz);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    onUpdate({ plz: value });
    
    if (value.length === 5 && !validatePLZ(value)) {
      setError('Bitte geben Sie eine gültige 5-stellige PLZ ein');
    } else {
      setError('');
    }
  };

  const isValid = validatePLZ(data.plz);

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Geben Sie Ihre Postleitzahl für die regionale Suche an.
      </h2>
      <div className="max-w-md mx-auto">
        <Input
          type="text"
          inputMode="numeric"
          placeholder="PLZ"
          value={data.plz}
          onChange={handleChange}
          className="text-center text-lg h-14"
          maxLength={5}
        />
        {error && (
          <p className="text-destructive text-sm mt-2 text-center">{error}</p>
        )}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!isValid}
      />
    </div>
  );
};

export default StepPLZ;
