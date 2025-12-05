import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Ergebnis = () => {
  const [searchParams] = useSearchParams();

  // Extract all form data from URL params
  const formData = {
    behandlung: searchParams.get('behandlung'),
    fehlsichtigkeit: searchParams.get('fehlsichtigkeit'),
    ksDioptrien: searchParams.get('ksDioptrien'),
    wsDioptrien: searchParams.get('wsDioptrien'),
    akFehlsichtigkeit: searchParams.get('akFehlsichtigkeit'),
    dioptrienStabil: searchParams.get('dioptrienStabil'),
    hornhautverkruemmung: searchParams.get('hornhautverkruemmung'),
    trockeneAugen: searchParams.get('trockeneAugen'),
    alter: searchParams.get('alter'),
    vorerkrankung: searchParams.get('vorerkrankung'),
    schwanger: searchParams.get('schwanger'),
    prioritaet: searchParams.get('prioritaet'),
    plz: searchParams.get('plz'),
    vorname: searchParams.get('vorname'),
    nachname: searchParams.get('nachname'),
    email: searchParams.get('email'),
    telefon: searchParams.get('telefon'),
  };

  const getLabelForValue = (key: string, value: string | null): string => {
    if (!value) return '-';
    
    const labels: Record<string, Record<string, string>> = {
      behandlung: { fehlsichtig: 'Fehlsichtigkeit', augenkrankheit: 'Augenkrankheit' },
      fehlsichtigkeit: { 
        kurzsichtig: 'Kurzsichtig', 
        weitsichtig: 'Weitsichtig',
        grauerstar: 'Grauer Star',
        gruenerstar: 'Grüner Star',
        sonstige: 'Sonstige'
      },
      ksDioptrien: {
        ks04: '-0.x bis -4.x',
        ks56: '-5.x bis -6.x',
        ks78: '-7.x bis -8.x',
        ks910: '-9.x bis -10.x',
        ks10p: '-11.x und mehr',
      },
      wsDioptrien: {
        ws02: '+0.x bis +2.x',
        ws3: '+3.x',
        ws4: '+4.x',
        ws4p: '+5.x und mehr',
      },
      akFehlsichtigkeit: {
        nein: 'Nein',
        kurzsichtig: 'Kurzsichtig',
        weitsichtig: 'Weitsichtig',
        kurzweitsichtig: 'Kurz- und Weitsichtig',
      },
      dioptrienStabil: { ja: 'Ja', nein: 'Nein' },
      hornhautverkruemmung: { ja: 'Ja', nein: 'Nein' },
      trockeneAugen: { ja: 'Ja', nein: 'Nein' },
      alter: { '18-25': '18-25', '26-45': '26-45', '46-59': '46-59', '60+': '60+' },
      vorerkrankung: { 
        nein: 'Keine', 
        grauerstar: 'Grauer Star', 
        gruenerstar: 'Grüner Star' 
      },
      schwanger: { ja: 'Ja', nein: 'Nein' },
      prioritaet: { 
        egal: 'Keine Angabe', 
        premium: 'Schmerzfreie Behandlung', 
        preis: 'Günstigerer Preis' 
      },
    };

    return labels[key]?.[value] || value;
  };

  const dataRows = [
    { label: 'Behandlungstyp', value: getLabelForValue('behandlung', formData.behandlung) },
    { label: 'Art', value: getLabelForValue('fehlsichtigkeit', formData.fehlsichtigkeit) },
    ...(formData.ksDioptrien ? [{ label: 'Dioptrien (Kurzsichtigkeit)', value: getLabelForValue('ksDioptrien', formData.ksDioptrien) }] : []),
    ...(formData.wsDioptrien ? [{ label: 'Dioptrien (Weitsichtigkeit)', value: getLabelForValue('wsDioptrien', formData.wsDioptrien) }] : []),
    ...(formData.akFehlsichtigkeit ? [{ label: 'Zusätzliche Fehlsichtigkeit', value: getLabelForValue('akFehlsichtigkeit', formData.akFehlsichtigkeit) }] : []),
    ...(formData.dioptrienStabil ? [{ label: 'Dioptrien stabil (2 Jahre)', value: getLabelForValue('dioptrienStabil', formData.dioptrienStabil) }] : []),
    ...(formData.hornhautverkruemmung ? [{ label: 'Hornhautverkrümmung', value: getLabelForValue('hornhautverkruemmung', formData.hornhautverkruemmung) }] : []),
    ...(formData.trockeneAugen ? [{ label: 'Trockene Augen', value: getLabelForValue('trockeneAugen', formData.trockeneAugen) }] : []),
    { label: 'Altersgruppe', value: getLabelForValue('alter', formData.alter) },
    ...(formData.vorerkrankung ? [{ label: 'Vorerkrankung', value: getLabelForValue('vorerkrankung', formData.vorerkrankung) }] : []),
    { label: 'Schwangerschaft', value: getLabelForValue('schwanger', formData.schwanger) },
    { label: 'Priorität', value: getLabelForValue('prioritaet', formData.prioritaet) },
    { label: 'Postleitzahl', value: formData.plz || '-' },
  ];

  return (
    <div className="min-h-screen bg-background py-4 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <header className="gradient-header text-primary-foreground py-8 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Ihre persönliche Auswertung
            </h1>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2">
                <Check className="w-5 h-5" />
                <span>Erfolgreich übermittelt</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Personal Info */}
            <div className="bg-muted rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Kontaktdaten</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {formData.vorname?.[0]?.toUpperCase()}{formData.nachname?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{formData.vorname} {formData.nachname}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{formData.telefon}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>PLZ {formData.plz}</span>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <h2 className="text-lg font-semibold mb-4">Ihre Angaben im Überblick</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {dataRows.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-muted/50' : 'bg-card'}
                    >
                      <td className="px-4 py-3 text-muted-foreground font-medium">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-primary mb-2">Was passiert als Nächstes?</h3>
              <p className="text-muted-foreground">
                Basierend auf Ihren Angaben werden wir passende Anbieter in Ihrer Region (PLZ: {formData.plz}) für Sie ermitteln. 
                Sie erhalten in Kürze eine E-Mail an <strong>{formData.email}</strong> mit Ihren persönlichen Empfehlungen.
              </p>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Neuen Test starten
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ergebnis;
