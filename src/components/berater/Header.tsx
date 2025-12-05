import { Check } from 'lucide-react';

const Header = () => {
  const features = [
    'Eignungsprüfung und Methodencheck',
    'Sofortergebnis',
    '100% kostenloser Anbietervergleich',
  ];

  return (
    <header className="gradient-header text-primary-foreground py-8 px-4 rounded-t-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Augenlasern Online Berater
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{feature}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
