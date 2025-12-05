import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  isSubmit?: boolean;
}

const NavigationButtons = ({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextLabel = 'weiter',
  nextDisabled = false,
  isSubmit = false,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {showBack && (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          zurück
        </Button>
      )}
      {showNext && (
        <Button
          type={isSubmit ? 'submit' : 'button'}
          onClick={isSubmit ? undefined : onNext}
          disabled={nextDisabled}
          className="px-8"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
