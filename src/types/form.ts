export interface FormData {
  // Step 1 - Behandlungstyp
  behandlung: 'fehlsichtig' | 'augenkrankheit' | null;
  
  // Step 2 - Fehlsichtigkeit oder Augenkrankheit
  fehlsichtigkeit: 'kurzsichtig' | 'weitsichtig' | 'grauerstar' | 'gruenerstar' | 'sonstige' | null;
  
  // Step 3 - Dioptrien (nur bei Fehlsichtigkeit)
  ksDioptrien: string | null;
  wsDioptrien: string | null;
  akFehlsichtigkeit: 'nein' | 'kurzsichtig' | 'weitsichtig' | 'kurzweitsichtig' | null;
  
  // Step 4 - Dioptrien stabil
  dioptrienStabil: 'ja' | 'nein' | null;
  
  // Step 5 - Hornhautverkrümmung
  hornhautverkruemmung: 'ja' | 'nein' | null;
  
  // Step 6 - Trockene Augen
  trockeneAugen: 'ja' | 'nein' | null;
  
  // Step 7 - Alter
  alter: '18-25' | '26-45' | '46-59' | '60+' | null;
  
  // Step 8 - Vorerkrankung
  vorerkrankung: 'nein' | 'grauerstar' | 'gruenerstar' | null;
  
  // Step 9 - Schwanger
  schwanger: 'ja' | 'nein' | null;
  
  // Step 10 - Priorität
  prioritaet: 'egal' | 'premium' | 'preis' | null;
  
  // Step 11 - PLZ
  plz: string;
  
  // Step 12 - Kontaktdaten
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  datenschutz: boolean;
}

export const initialFormData: FormData = {
  behandlung: null,
  fehlsichtigkeit: null,
  ksDioptrien: null,
  wsDioptrien: null,
  akFehlsichtigkeit: null,
  dioptrienStabil: null,
  hornhautverkruemmung: null,
  trockeneAugen: null,
  alter: null,
  vorerkrankung: null,
  schwanger: null,
  prioritaet: null,
  plz: '',
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  datenschutz: false,
};
