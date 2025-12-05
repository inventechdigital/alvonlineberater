import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ProgressBar from './ProgressBar';
import StepIntro from './steps/StepIntro';
import StepBehandlung from './steps/StepBehandlung';
import StepFehlsichtigkeit from './steps/StepFehlsichtigkeit';
import StepAugenkrankheit from './steps/StepAugenkrankheit';
import StepDioptrien from './steps/StepDioptrien';
import StepAkFehlsichtigkeit from './steps/StepAkFehlsichtigkeit';
import StepDioptrienStabil from './steps/StepDioptrienStabil';
import StepHornhaut from './steps/StepHornhaut';
import StepTrockeneAugen from './steps/StepTrockeneAugen';
import StepAlter from './steps/StepAlter';
import StepVorerkrankung from './steps/StepVorerkrankung';
import StepSchwanger from './steps/StepSchwanger';
import StepPrioritaet from './steps/StepPrioritaet';
import StepPLZ from './steps/StepPLZ';
import StepKontakt from './steps/StepKontakt';
import { FormData, initialFormData } from '@/types/form';

type StepId = 
  | 'intro'
  | 'behandlung'
  | 'fehlsichtigkeit'
  | 'augenkrankheit'
  | 'dioptrien'
  | 'ak-fehlsichtigkeit'
  | 'dioptrien-stabil'
  | 'hornhaut'
  | 'trockene-augen'
  | 'alter'
  | 'vorerkrankung'
  | 'schwanger'
  | 'prioritaet'
  | 'plz'
  | 'kontakt';

const OnlineBerater = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Get the flow based on treatment type
  const getNextStep = (from: StepId): StepId | null => {
    const isFehlsichtig = formData.behandlung === 'fehlsichtig';
    const isAugenkrankheit = formData.behandlung === 'augenkrankheit';

    switch (from) {
      case 'intro':
        return 'behandlung';
      case 'behandlung':
        return isFehlsichtig ? 'fehlsichtigkeit' : 'augenkrankheit';
      case 'fehlsichtigkeit':
        return 'dioptrien';
      case 'augenkrankheit':
        return 'ak-fehlsichtigkeit';
      case 'dioptrien':
        return 'dioptrien-stabil';
      case 'ak-fehlsichtigkeit':
        return 'alter';
      case 'dioptrien-stabil':
        return 'hornhaut';
      case 'hornhaut':
        return 'trockene-augen';
      case 'trockene-augen':
        return 'alter';
      case 'alter':
        return isFehlsichtig ? 'vorerkrankung' : 'schwanger';
      case 'vorerkrankung':
        return 'schwanger';
      case 'schwanger':
        return 'prioritaet';
      case 'prioritaet':
        return 'plz';
      case 'plz':
        return 'kontakt';
      default:
        return null;
    }
  };

  const getPrevStep = (from: StepId): StepId | null => {
    const isFehlsichtig = formData.behandlung === 'fehlsichtig';

    switch (from) {
      case 'behandlung':
        return 'intro';
      case 'fehlsichtigkeit':
        return 'behandlung';
      case 'augenkrankheit':
        return 'behandlung';
      case 'dioptrien':
        return 'fehlsichtigkeit';
      case 'ak-fehlsichtigkeit':
        return 'augenkrankheit';
      case 'dioptrien-stabil':
        return 'dioptrien';
      case 'hornhaut':
        return 'dioptrien-stabil';
      case 'trockene-augen':
        return 'hornhaut';
      case 'alter':
        return isFehlsichtig ? 'trockene-augen' : 'ak-fehlsichtigkeit';
      case 'vorerkrankung':
        return 'alter';
      case 'schwanger':
        return isFehlsichtig ? 'vorerkrankung' : 'alter';
      case 'prioritaet':
        return 'schwanger';
      case 'plz':
        return 'prioritaet';
      case 'kontakt':
        return 'plz';
      default:
        return null;
    }
  };

  const goNext = () => {
    const next = getNextStep(currentStep);
    if (next) setCurrentStep(next);
  };

  const goBack = () => {
    const prev = getPrevStep(currentStep);
    if (prev) setCurrentStep(prev);
  };

  const handleSubmit = () => {
    // Build URL params from form data
    const params = new URLSearchParams();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '' && value !== false) {
        params.set(key, String(value));
      }
    });

    navigate(`/ergebnis?${params.toString()}`);
  };

  // Calculate progress
  const getProgress = (): { current: number; total: number } => {
    const isFehlsichtig = formData.behandlung === 'fehlsichtig';
    const totalSteps = isFehlsichtig ? 12 : 9;
    
    const stepOrder: StepId[] = isFehlsichtig
      ? ['intro', 'behandlung', 'fehlsichtigkeit', 'dioptrien', 'dioptrien-stabil', 'hornhaut', 'trockene-augen', 'alter', 'vorerkrankung', 'schwanger', 'prioritaet', 'plz', 'kontakt']
      : ['intro', 'behandlung', 'augenkrankheit', 'ak-fehlsichtigkeit', 'alter', 'schwanger', 'prioritaet', 'plz', 'kontakt'];
    
    const currentIndex = stepOrder.indexOf(currentStep);
    return { current: Math.max(0, currentIndex), total: totalSteps };
  };

  const { current, total } = getProgress();

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return <StepIntro onStart={goNext} />;
      case 'behandlung':
        return (
          <StepBehandlung
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'fehlsichtigkeit':
        return (
          <StepFehlsichtigkeit
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'augenkrankheit':
        return (
          <StepAugenkrankheit
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'dioptrien':
        return (
          <StepDioptrien
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'ak-fehlsichtigkeit':
        return (
          <StepAkFehlsichtigkeit
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'dioptrien-stabil':
        return (
          <StepDioptrienStabil
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'hornhaut':
        return (
          <StepHornhaut
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'trockene-augen':
        return (
          <StepTrockeneAugen
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'alter':
        return (
          <StepAlter
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'vorerkrankung':
        return (
          <StepVorerkrankung
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'schwanger':
        return (
          <StepSchwanger
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'prioritaet':
        return (
          <StepPrioritaet
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'plz':
        return (
          <StepPLZ
            data={formData}
            onUpdate={updateFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'kontakt':
        return (
          <StepKontakt
            data={formData}
            onUpdate={updateFormData}
            onSubmit={handleSubmit}
            onBack={goBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <Header />
          <div className="min-h-[400px]">
            {renderStep()}
          </div>
          <ProgressBar currentStep={current} totalSteps={total} />
        </div>
      </div>
    </div>
  );
};

export default OnlineBerater;
