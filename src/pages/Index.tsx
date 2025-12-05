import OnlineBerater from '@/components/berater/OnlineBerater';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Augenlasern Online Berater - Eignungstest & Methodencheck</title>
        <meta 
          name="description" 
          content="Kostenloser Online-Eignungstest für Augenlaser-Behandlungen. Methodencheck, Anbietervergleich und persönliche Empfehlungen in Ihrer Region." 
        />
      </Helmet>
      <OnlineBerater />
    </>
  );
};

export default Index;
