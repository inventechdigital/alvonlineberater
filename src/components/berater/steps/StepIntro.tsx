import { Button } from '@/components/ui/button';

interface StepIntroProps {
  onStart: () => void;
}

const StepIntro = ({ onStart }: StepIntroProps) => {
  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <p className="text-foreground max-w-lg mx-auto mb-8">
        <strong>Achtung:</strong> Diese Online-Beratung liefert keinen Ersatz
        gegenüber einer ärztlichen, individuellen Untersuchung und Diagnose.
      </p>
      <Button onClick={onStart} size="lg" className="px-8">
        Eignungstest starten
      </Button>
    </div>
  );
};

export default StepIntro;
