import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, Phone, Mail, MapPin, AlertTriangle, CheckCircle, Info } from 'lucide-react';
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

  const isAugenkrankheit = formData.behandlung === 'augenkrankheit';
  const isFehlsichtig = formData.behandlung === 'fehlsichtig';

  // Determine if result is negative (not suitable for treatment)
  const isNegativeResult = () => {
    // Kurzsichtig with very high diopters
    if (formData.ksDioptrien === 'ks10p') return true;
    // Weitsichtig with very high diopters
    if (formData.wsDioptrien === 'ws4p') return true;
    // Diopter values not stable
    if (formData.dioptrienStabil === 'nein') return true;
    // Dry eyes
    if (formData.trockeneAugen === 'ja') return true;
    // Pre-existing eye condition
    if (formData.vorerkrankung && formData.vorerkrankung !== 'nein') return true;
    return false;
  };

  // Get recommended methods based on diopter values and priority
  const getRecommendedMethods = () => {
    const methods: { name: string; type: 'premium' | 'preis' }[] = [];
    const prio = formData.prioritaet;
    const ksDioptrien = formData.ksDioptrien;
    const wsDioptrien = formData.wsDioptrien;

    if (ksDioptrien) {
      // Kurzsichtig
      if (ksDioptrien === 'ks04') {
        methods.push(
          { name: 'PRK', type: 'preis' },
          { name: 'TransPRK', type: 'preis' },
          { name: 'LASIK', type: 'preis' },
          { name: 'Femto-LASIK', type: 'preis' },
          { name: 'ReLEx SMILE', type: 'premium' },
          { name: 'PresbyOND', type: 'preis' },
          { name: 'PresbyOND', type: 'premium' }
        );
      } else if (ksDioptrien === 'ks56') {
        methods.push(
          { name: 'TransPRK', type: 'preis' },
          { name: 'LASIK', type: 'preis' },
          { name: 'Femto-LASIK', type: 'preis' },
          { name: 'ReLEx SMILE', type: 'premium' },
          { name: 'PresbyOND', type: 'preis' },
          { name: 'PresbyOND', type: 'premium' }
        );
      } else if (ksDioptrien === 'ks78') {
        methods.push(
          { name: 'LASIK', type: 'preis' },
          { name: 'Femto-LASIK', type: 'preis' },
          { name: 'ReLEx SMILE', type: 'premium' },
          { name: 'PresbyOND', type: 'preis' },
          { name: 'PresbyOND', type: 'premium' }
        );
      } else if (ksDioptrien === 'ks910') {
        methods.push(
          { name: 'ReLEx SMILE', type: 'preis' },
          { name: 'ReLEx SMILE', type: 'premium' }
        );
      }
    }

    if (wsDioptrien) {
      // Weitsichtig
      if (wsDioptrien === 'ws02') {
        methods.push(
          { name: 'PRK', type: 'preis' },
          { name: 'LASIK', type: 'preis' },
          { name: 'Femto-LASIK', type: 'preis' },
          { name: 'PresbyOND', type: 'preis' }
        );
      } else if (wsDioptrien === 'ws3') {
        methods.push(
          { name: 'LASIK', type: 'preis' },
          { name: 'Femto-LASIK', type: 'preis' }
        );
      } else if (wsDioptrien === 'ws4') {
        methods.push({ name: 'Femto-LASIK', type: 'preis' });
      }
    }

    // Filter by priority
    if (prio === 'premium' && ksDioptrien) {
      return methods.filter(m => m.type === 'premium');
    } else if (prio === 'premium' && wsDioptrien) {
      return methods.filter(m => m.type === 'preis');
    } else if (prio === 'preis') {
      return methods.filter(m => m.type === 'preis');
    } else if (prio === 'egal') {
      // Show both but remove duplicate presbyond
      const uniqueMethods = methods.filter((m, i, arr) => 
        arr.findIndex(x => x.name === m.name) === i
      );
      return uniqueMethods;
    }

    return methods;
  };

  // Filter methods by age
  const getMethodsFilteredByAge = () => {
    let methods = getRecommendedMethods();
    const alter = formData.alter;

    if (alter === '18-25' || alter === '26-45') {
      // Remove PresbyOND for younger ages
      methods = methods.filter(m => m.name !== 'PresbyOND');
    }

    return methods;
  };

  // Get age-specific message
  const getAgeMessage = () => {
    const alter = formData.alter;
    if (alter === '18-25') {
      return { type: 'info', message: 'In Ihrem Alter (18-25) sind Ihre Augen noch in der Entwicklung. Eine regelmäßige Kontrolle ist wichtig.' };
    } else if (alter === '26-45') {
      return { type: 'success', message: 'Ihr Alter (26-45) ist optimal für eine Augenlaserbehandlung.' };
    } else if (alter === '46-59') {
      return { type: 'info', message: 'Ab 46 Jahren kann eine Alterssichtigkeit (Presbyopie) auftreten. PresbyOND könnte eine Option sein.' };
    } else if (alter === '60+') {
      return { type: 'warning', message: 'Ab 60 Jahren sind nicht alle Methoden geeignet. Eine individuelle Beratung ist besonders wichtig.' };
    }
    return null;
  };

  // Get warnings based on conditions
  const getWarnings = () => {
    const warnings: string[] = [];
    
    if (formData.dioptrienStabil === 'nein') {
      warnings.push('Ihre Dioptrienwerte sind nicht seit 2 Jahren stabil. Eine Behandlung wird erst empfohlen, wenn die Werte stabil sind.');
    }
    if (formData.trockeneAugen === 'ja') {
      warnings.push('Trockene Augen können die Eignung für eine Laserbehandlung einschränken. Eine vorherige Behandlung der trockenen Augen ist empfohlen.');
    }
    if (formData.vorerkrankung && formData.vorerkrankung !== 'nein') {
      warnings.push('Aufgrund Ihrer Vorerkrankung am Auge ist eine individuelle Untersuchung besonders wichtig.');
    }
    if (formData.schwanger === 'ja') {
      warnings.push('Während einer Schwangerschaft wird von einer Augenlaserbehandlung abgeraten. Bitte warten Sie bis nach der Stillzeit.');
    }
    if (formData.ksDioptrien === 'ks10p') {
      warnings.push('Bei sehr hoher Kurzsichtigkeit (-11 Dioptrien und mehr) sind alternative Verfahren wie eine Linsenimplantation möglicherweise besser geeignet.');
    }
    if (formData.wsDioptrien === 'ws4p') {
      warnings.push('Bei sehr hoher Weitsichtigkeit (+5 Dioptrien und mehr) sind alternative Verfahren möglicherweise besser geeignet.');
    }
    if (formData.hornhautverkruemmung === 'ja') {
      warnings.push('Sie haben eine Hornhautverkrümmung. Diese kann bei den meisten Laserverfahren mitbehandelt werden.');
    }

    return warnings;
  };

  const negativeResult = isNegativeResult();
  const recommendedMethods = getMethodsFilteredByAge();
  const ageMessage = getAgeMessage();
  const warnings = getWarnings();

  // Unique methods for display
  const uniqueMethodNames = [...new Set(recommendedMethods.map(m => m.name))];

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

            {/* Warnings Section */}
            {warnings.length > 0 && (
              <div className="mb-8 space-y-3">
                {warnings.map((warning, index) => (
                  <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm">{warning}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Age Message */}
            {ageMessage && (
              <div className={`mb-8 rounded-lg p-4 flex gap-3 ${
                ageMessage.type === 'success' ? 'bg-green-50 border border-green-200' :
                ageMessage.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                {ageMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : ageMessage.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${
                  ageMessage.type === 'success' ? 'text-green-800' :
                  ageMessage.type === 'warning' ? 'text-amber-800' :
                  'text-blue-800'
                }`}>{ageMessage.message}</p>
              </div>
            )}

            {/* Results Section */}
            {isFehlsichtig && (
              <div className="mb-8">
                {negativeResult ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-red-800 mb-3">Einschränkungen festgestellt</h2>
                    <p className="text-red-700">
                      Basierend auf Ihren Angaben gibt es einige Faktoren, die eine Standard-Laserbehandlung einschränken könnten. 
                      Wir empfehlen Ihnen eine individuelle Beratung bei einem Spezialisten, um alternative Behandlungsmöglichkeiten zu besprechen.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-green-800 mb-4">
                      Für Sie geeignete Behandlungsmethoden
                    </h2>
                    {uniqueMethodNames.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {uniqueMethodNames.map((method, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-green-200 text-center">
                            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <span className="font-medium text-green-800">{method}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-700">
                        Basierend auf Ihren Angaben werden geeignete Methoden ermittelt. Ein Spezialist wird sich mit Ihnen in Verbindung setzen.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Augenkrankheit Results */}
            {isAugenkrankheit && (
              <div className="mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-blue-800 mb-3">Behandlung bei Augenkrankheit</h2>
                  <p className="text-blue-700 mb-4">
                    Bei {formData.fehlsichtigkeit === 'grauerstar' ? 'Grauem Star (Katarakt)' : 
                         formData.fehlsichtigkeit === 'gruenerstar' ? 'Grünem Star (Glaukom)' : 
                         'Ihrer Augenkrankheit'} gibt es spezialisierte Behandlungsoptionen.
                  </p>
                  {formData.akFehlsichtigkeit && formData.akFehlsichtigkeit !== 'nein' && (
                    <p className="text-blue-700">
                      Ihre zusätzliche Fehlsichtigkeit ({
                        formData.akFehlsichtigkeit === 'kurzsichtig' ? 'Kurzsichtigkeit' :
                        formData.akFehlsichtigkeit === 'weitsichtig' ? 'Weitsichtigkeit' :
                        'Kurz- und Weitsichtigkeit'
                      }) kann bei der Behandlung berücksichtigt werden.
                    </p>
                  )}
                </div>
              </div>
            )}

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
