import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/form';
import { z } from 'zod';
import { toast } from 'sonner';

interface StepKontaktProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const kontaktSchema = z.object({
  vorname: z.string().trim().min(1, 'Vorname ist erforderlich').max(50),
  nachname: z.string().trim().min(1, 'Nachname ist erforderlich').max(50),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail ein'),
  telefon: z.string().trim().min(6, 'Bitte geben Sie eine gültige Telefonnummer ein').max(20),
  datenschutz: z.literal(true, {
    errorMap: () => ({ message: 'Sie müssen der Datenschutzerklärung zustimmen' }),
  }),
});

// n8n Webhook URL
const N8N_WEBHOOK_URL = 'https://ai.inventech.digital/webhook/ob-form-submit';

const StepKontakt = ({ data, onUpdate, onSubmit, onBack }: StepKontaktProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ [field]: e.target.value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const sendToN8N = async (formData: FormData) => {
    if (!N8N_WEBHOOK_URL) {
      console.warn('N8N Webhook URL nicht konfiguriert');
      return;
    }

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          kontakt: {
            vorname: formData.vorname,
            nachname: formData.nachname,
            email: formData.email,
            telefon: formData.telefon,
            plz: formData.plz,
          },
          behandlung: {
            typ: formData.behandlung,
            fehlsichtigkeit: formData.fehlsichtigkeit,
            ak_fehlsichtigkeit: formData.akFehlsichtigkeit,
          },
          medizinisch: {
            ks_dioptrien: formData.ksDioptrien,
            ws_dioptrien: formData.wsDioptrien,
            dioptrien_stabil: formData.dioptrienStabil,
            hornhautverkruemmung: formData.hornhautverkruemmung,
            trockene_augen: formData.trockeneAugen,
            vorerkrankung: formData.vorerkrankung,
            schwanger: formData.schwanger,
          },
          persoenlich: {
            alter: formData.alter,
            prioritaet: formData.prioritaet,
          },
          meta: {
            timestamp: new Date().toISOString(),
            datenschutz_akzeptiert: formData.datenschutz,
          },
        }),
      });
    } catch (error) {
      console.error('Fehler beim Senden an n8n:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = kontaktSchema.safeParse({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      telefon: data.telefon,
      datenschutz: data.datenschutz,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Sende Daten an n8n
    await sendToN8N(data);
    
    toast.success('Daten erfolgreich gesendet');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="py-8 px-4 animate-slide-up">
      <h2 className="text-xl font-semibold text-center mb-8">
        Wer soll die Auswertung erhalten?
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Vorname"
              value={data.vorname}
              onChange={handleInputChange('vorname')}
              className="h-12"
            />
            {errors.vorname && (
              <p className="text-destructive text-sm mt-1">{errors.vorname}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Nachname"
              value={data.nachname}
              onChange={handleInputChange('nachname')}
              className="h-12"
            />
            {errors.nachname && (
              <p className="text-destructive text-sm mt-1">{errors.nachname}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="E-Mail Adresse"
              value={data.email}
              onChange={handleInputChange('email')}
              className="h-12"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Telefonnummer"
              value={data.telefon}
              onChange={handleInputChange('telefon')}
              className="h-12"
            />
            {errors.telefon && (
              <p className="text-destructive text-sm mt-1">{errors.telefon}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 mt-6">
          <Checkbox
            id="datenschutz"
            checked={data.datenschutz}
            onCheckedChange={(checked) => {
              onUpdate({ datenschutz: checked as boolean });
              if (errors.datenschutz) {
                setErrors((prev) => ({ ...prev, datenschutz: '' }));
              }
            }}
            className="mt-1"
          />
          <label htmlFor="datenschutz" className="text-sm text-foreground cursor-pointer">
            Ich habe die{' '}
            <a href="/datenschutz" target="_blank" className="text-primary underline hover:no-underline">
              Datenschutzerklärung
            </a>{' '}
            gelesen, verstanden und erkläre mich einverstanden.
          </label>
        </div>
        {errors.datenschutz && (
          <p className="text-destructive text-sm">{errors.datenschutz}</p>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            zurück
          </Button>
          <Button type="submit" className="px-8" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gesendet...' : 'Auswertung anzeigen'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StepKontakt;
