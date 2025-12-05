import { cn } from '@/lib/utils';

interface OptionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const OptionCard = ({ label, sublabel, selected, onClick, className }: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'option-card w-full text-center',
        selected && 'selected',
        className
      )}
    >
      <span className="text-lg font-semibold text-primary block">
        {label}
      </span>
      {sublabel && (
        <span className="text-sm text-muted-foreground mt-1 block">
          {sublabel}
        </span>
      )}
    </button>
  );
};

export default OptionCard;
