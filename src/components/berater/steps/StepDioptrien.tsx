import OptionCard from '../OptionCard';
import NavigationButtons from '../NavigationButtons';
import { FormData } from '@/types/form';

interface StepDioptrienProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepDioptrien = ({ data, onUpdate, onNext, onBack }: StepDioptrienProps) => {
  const isKurzsichtig = data.fehlsichtigkeit === 'kurzsichtig';

  const kurzsichtigOptions = [
    { value: 'ks04', label: '-0.x', sublabel: 'bis -4.x' },
    { value: 'ks56', label: '-5.x', sublabel: 'bis -6.x' },
    { value: 'ks78', label: '-7.x', sublabel: 'bis -8.x' },
    { value: 'ks910', label: '-9.x', sublabel: 'bis -10.x' },
    { value: 'ks10p', label: '-11.x', sublabel: 'und mehr' },
  ];

  const weitsichtigOptions = [
    { value: 'ws02', label: '+0.x', sublabel: 'bis +2.x' },
    { value: 'ws3', label: '+3.x', sublabel: '' },
    { value: 'ws4', label: '+4.x', sublabel: '' },
    { value: 'ws4p', label: '+5.x', sublabel: 'und mehr' },
  ];

  const options = isKurzsichtig ? kurzsichtigOptions : weitsichtigOptions;
  const currentValue = isKurzsichtig ? data.ksDioptrien : data.wsDioptrien;

  const handleSelect = (value: string) => {
    if (isKurzsichtig) {
      onUpdate({ ksDioptrien: value });
    } else {
      onUpdate({ wsDioptrien: value });
    }
    setTimeout(() => onNext(), 150);
  };

  return (
    <div className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Wie {isKurzsichtig ? 'kurzsichtig' : 'weitsichtig'} sind Sie? (Dioptrien)
      </h2>
      <div className={`grid grid-cols-2 md:grid-cols-${isKurzsichtig ? '5' : '4'} gap-3 max-w-4xl mx-auto`}>
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            sublabel={option.sublabel}
            selected={currentValue === option.value}
            onClick={() => handleSelect(option.value)}
            className="py-4"
          />
        ))}
      </div>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!currentValue}
      />
    </div>
  );
};

export default StepDioptrien;
