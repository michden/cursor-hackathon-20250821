import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de' | 'pl';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: React.ReactNode;
}

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.map': 'Map',
    'nav.report': 'Report',
    'nav.events': 'Events',
    'nav.impact': 'Impact',
    
    // Hero Section
    'hero.title.line1': 'Make Hamburg',
    'hero.title.line2': 'Great Again',
    'hero.subtitle': 'Join the community-driven initiative to keep our waterways clean',
    'hero.reportButton': 'Report Pollution',
    'hero.joinButton': 'Join Event',
    'hero.activeSpots': 'Active Spots',
    'hero.volunteers': 'Volunteers',
    'hero.wasteCollected': 'Waste Collected',
    
    // Map View
    'map.title': 'Pollution Map',
    'map.subtitle': 'Click on markers to see details and vote for cleanup priority',
    'map.reported': 'Reported',
    'map.beingCleaned': 'Being Cleaned',
    'map.cleaned': 'Cleaned',
    'map.reportedBy': 'Reported by',
    'map.voteToClean': 'Vote to Clean',
    'map.votes': 'votes',
    
    // Report Form
    'report.title': 'Report Pollution',
    'report.subtitle': 'Help us identify areas that need cleaning',
    'report.pollutionType': 'Pollution Type',
    'report.severityLevel': 'Severity Level',
    'report.streetAddress': 'Street Address',
    'report.district': 'District',
    'report.selectDistrict': 'Select a district',
    'report.description': 'Description',
    'report.descriptionPlaceholder': 'Describe the pollution you\'ve found...',
    'report.photo': 'Photo (Optional)',
    'report.uploadPhoto': 'Upload a photo',
    'report.dragDrop': 'or drag and drop',
    'report.fileTypes': 'PNG, JPG, GIF up to 10MB',
    'report.yourName': 'Your Name (Optional)',
    'report.anonymousPlaceholder': 'Leave blank to report anonymously',
    'report.submitReport': 'Submit Report',
    'report.removeImage': 'Remove image',
    'report.severity.low': 'Low',
    'report.severity.medium': 'Medium',
    'report.severity.high': 'High',
    'report.type.plastic': 'Plastic',
    'report.type.chemical': 'Chemical',
    'report.type.trash': 'Trash',
    'report.type.oil': 'Oil',
    'report.type.other': 'Other',
    
    // Events
    'events.title': 'Cleanup Events',
    'events.subtitle': 'Join our community events and make a difference',
    'events.filter.all': 'All',
    'events.filter.upcoming': 'Upcoming',
    'events.filter.completed': 'Completed',
    'events.participants': 'participants',
    'events.impactGoal': 'Impact Goal',
    'events.organizedBy': 'Organized by',
    'events.joinEvent': 'Join Event',
    'events.eventFull': 'Event Full',
    'events.completed': 'Completed',
    'events.noEvents': 'No events found',
    'events.upcoming': 'upcoming',
    
    // Leaderboard
    'leaderboard.title': 'Top Eco Warriors',
    'leaderboard.points': 'points',
    'leaderboard.events': 'events',
    'leaderboard.viewAll': 'View all {count} volunteers →',
    
    // Impact Dashboard
    'impact.title': 'Community Impact',
    'impact.ourImpact': 'Our Impact',
    'impact.subtitle': 'Together we\'re making Hamburg cleaner, one spot at a time',
    'impact.topContributors': 'Top Contributors',
    'impact.wasteCollected': 'Waste Collected',
    'impact.activeVolunteers': 'Active Volunteers',
    'impact.totalEvents': 'Total Events',
    'impact.activeSpots': 'Active Spots',
    'impact.co2Saved': 'CO₂ Saved',
    'impact.growthRate': 'Growth Rate',
    'impact.monthlyProgress': 'Monthly Progress',
    'impact.cleanupGoal': 'Cleanup Goal',
    'impact.volunteerTarget': 'Volunteer Target',
    'impact.areaCoverage': 'Area Coverage',
    'impact.complete': 'Complete',
    'impact.achieved': 'Achieved',
    'impact.covered': 'Covered',
    'impact.environmentalImpact': 'Environmental Impact',
    'impact.co2Description': 'Your efforts have saved {amount}kg of CO₂ emissions this month',
    'impact.kgTotal': 'kg total',
    'impact.thisMonth': 'this month',
    'impact.equivalentTrees': 'Equivalent to 45 trees',
    'impact.vsLastMonth': 'vs last month',
    'impact.cleaned': 'cleaned',
    
    // Footer
    'footer.description': 'Community-driven initiative to keep Hamburg\'s waterways clean and beautiful.',
    'footer.quickLinks': 'Quick Links',
    'footer.getInvolved': 'Get Involved',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDescription': 'Stay updated with our cleanup events and impact reports.',
    'footer.yourEmail': 'Your email',
    'footer.subscribe': 'Subscribe',
    'footer.volunteer': 'Volunteer',
    'footer.donate': 'Donate',
    'footer.partner': 'Partner with Us',
    'footer.organize': 'Organize Event',
    'footer.madeWith': 'Made with',
    'footer.forHackathon': 'for Hamburg Hackathon 2025',
    'footer.allRights': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.kg': 'kg',
    'common.tons': 't',
  },
  de: {
    // Navigation
    'nav.map': 'Karte',
    'nav.report': 'Melden',
    'nav.events': 'Events',
    'nav.impact': 'Impact',
    
    // Hero Section
    'hero.title.line1': 'Hamburg wieder',
    'hero.title.line2': 'großartig machen',
    'hero.subtitle': 'Schließen Sie sich der Community-Initiative an, um unsere Gewässer sauber zu halten',
    'hero.reportButton': 'Verschmutzung melden',
    'hero.joinButton': 'Event beitreten',
    'hero.activeSpots': 'Aktive Stellen',
    'hero.volunteers': 'Freiwillige',
    'hero.wasteCollected': 'Müll gesammelt',
    
    // Map View
    'map.title': 'Verschmutzungskarte',
    'map.subtitle': 'Klicken Sie auf Marker, um Details zu sehen und für Reinigungspriorität zu stimmen',
    'map.reported': 'Gemeldet',
    'map.beingCleaned': 'Wird gereinigt',
    'map.cleaned': 'Gereinigt',
    'map.reportedBy': 'Gemeldet von',
    'map.voteToClean': 'Für Reinigung stimmen',
    'map.votes': 'Stimmen',
    
    // Report Form
    'report.title': 'Verschmutzung melden',
    'report.subtitle': 'Helfen Sie uns, Bereiche zu identifizieren, die gereinigt werden müssen',
    'report.pollutionType': 'Art der Verschmutzung',
    'report.severityLevel': 'Schweregrad',
    'report.streetAddress': 'Straßenadresse',
    'report.district': 'Bezirk',
    'report.selectDistrict': 'Bezirk auswählen',
    'report.description': 'Beschreibung',
    'report.descriptionPlaceholder': 'Beschreiben Sie die gefundene Verschmutzung...',
    'report.photo': 'Foto (Optional)',
    'report.uploadPhoto': 'Foto hochladen',
    'report.dragDrop': 'oder per Drag & Drop',
    'report.fileTypes': 'PNG, JPG, GIF bis 10MB',
    'report.yourName': 'Ihr Name (Optional)',
    'report.anonymousPlaceholder': 'Leer lassen für anonyme Meldung',
    'report.submitReport': 'Meldung absenden',
    'report.removeImage': 'Bild entfernen',
    'report.severity.low': 'Niedrig',
    'report.severity.medium': 'Mittel',
    'report.severity.high': 'Hoch',
    'report.type.plastic': 'Plastik',
    'report.type.chemical': 'Chemisch',
    'report.type.trash': 'Müll',
    'report.type.oil': 'Öl',
    'report.type.other': 'Andere',
    
    // Events
    'events.title': 'Aufräum-Events',
    'events.subtitle': 'Nehmen Sie an unseren Community-Events teil und bewirken Sie etwas',
    'events.filter.all': 'Alle',
    'events.filter.upcoming': 'Anstehend',
    'events.filter.completed': 'Abgeschlossen',
    'events.participants': 'Teilnehmer',
    'events.impactGoal': 'Impact-Ziel',
    'events.organizedBy': 'Organisiert von',
    'events.joinEvent': 'Event beitreten',
    'events.eventFull': 'Event voll',
    'events.completed': 'Abgeschlossen',
    'events.noEvents': 'Keine Events gefunden',
    'events.upcoming': 'anstehend',
    
    // Leaderboard
    'leaderboard.title': 'Top Öko-Krieger',
    'leaderboard.points': 'Punkte',
    'leaderboard.events': 'Events',
    'leaderboard.viewAll': 'Alle {count} Freiwillige anzeigen →',
    
    // Impact Dashboard
    'impact.title': 'Community Impact',
    'impact.ourImpact': 'Unser Impact',
    'impact.subtitle': 'Gemeinsam machen wir Hamburg sauberer, einen Ort nach dem anderen',
    'impact.topContributors': 'Top Mitwirkende',
    'impact.wasteCollected': 'Müll gesammelt',
    'impact.activeVolunteers': 'Aktive Freiwillige',
    'impact.totalEvents': 'Gesamt Events',
    'impact.activeSpots': 'Aktive Stellen',
    'impact.co2Saved': 'CO₂ gespart',
    'impact.growthRate': 'Wachstumsrate',
    'impact.monthlyProgress': 'Monatlicher Fortschritt',
    'impact.cleanupGoal': 'Aufräum-Ziel',
    'impact.volunteerTarget': 'Freiwilligen-Ziel',
    'impact.areaCoverage': 'Gebietsabdeckung',
    'impact.complete': 'Abgeschlossen',
    'impact.achieved': 'Erreicht',
    'impact.covered': 'Abgedeckt',
    'impact.environmentalImpact': 'Umwelt-Impact',
    'impact.co2Description': 'Ihre Bemühungen haben diesen Monat {amount}kg CO₂-Emissionen gespart',
    'impact.kgTotal': 'kg gesamt',
    'impact.thisMonth': 'diesen Monat',
    'impact.equivalentTrees': 'Entspricht 45 Bäumen',
    'impact.vsLastMonth': 'vs. letzter Monat',
    'impact.cleaned': 'gereinigt',
    
    // Footer
    'footer.description': 'Community-getriebene Initiative, um Hamburgs Gewässer sauber und schön zu halten.',
    'footer.quickLinks': 'Quick Links',
    'footer.getInvolved': 'Mitmachen',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDescription': 'Bleiben Sie über unsere Aufräum-Events und Impact-Berichte informiert.',
    'footer.yourEmail': 'Ihre E-Mail',
    'footer.subscribe': 'Abonnieren',
    'footer.volunteer': 'Freiwilliger werden',
    'footer.donate': 'Spenden',
    'footer.partner': 'Partner werden',
    'footer.organize': 'Event organisieren',
    'footer.madeWith': 'Gemacht mit',
    'footer.forHackathon': 'für Hamburg Hackathon 2025',
    'footer.allRights': 'Alle Rechte vorbehalten.',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.view': 'Anzeigen',
    'common.close': 'Schließen',
    'common.next': 'Weiter',
    'common.previous': 'Zurück',
    'common.kg': 'kg',
    'common.tons': 't',
  },
  pl: {
    // Navigation
    'nav.map': 'Mapa',
    'nav.report': 'Zgłoś',
    'nav.events': 'Wydarzenia',
    'nav.impact': 'Wpływ',
    
    // Hero Section
    'hero.title.line1': 'Uczyńmy Hamburg',
    'hero.title.line2': 'znów wspaniałym',
    'hero.subtitle': 'Dołącz do inicjatywy społecznej, aby utrzymać nasze drogi wodne w czystości',
    'hero.reportButton': 'Zgłoś zanieczyszczenie',
    'hero.joinButton': 'Dołącz do wydarzenia',
    'hero.activeSpots': 'Aktywne miejsca',
    'hero.volunteers': 'Wolontariusze',
    'hero.wasteCollected': 'Zebrane odpady',
    
    // Map View
    'map.title': 'Mapa zanieczyszczeń',
    'map.subtitle': 'Kliknij na znaczniki, aby zobaczyć szczegóły i głosować na priorytet sprzątania',
    'map.reported': 'Zgłoszone',
    'map.beingCleaned': 'W trakcie sprzątania',
    'map.cleaned': 'Wyczyszczone',
    'map.reportedBy': 'Zgłoszone przez',
    'map.voteToClean': 'Głosuj za sprzątaniem',
    'map.votes': 'głosy',
    
    // Report Form
    'report.title': 'Zgłoś zanieczyszczenie',
    'report.subtitle': 'Pomóż nam zidentyfikować obszary wymagające sprzątania',
    'report.pollutionType': 'Rodzaj zanieczyszczenia',
    'report.severityLevel': 'Poziom nasilenia',
    'report.streetAddress': 'Adres ulicy',
    'report.district': 'Dzielnica',
    'report.selectDistrict': 'Wybierz dzielnicę',
    'report.description': 'Opis',
    'report.descriptionPlaceholder': 'Opisz znalezione zanieczyszczenie...',
    'report.photo': 'Zdjęcie (Opcjonalne)',
    'report.uploadPhoto': 'Prześlij zdjęcie',
    'report.dragDrop': 'lub przeciągnij i upuść',
    'report.fileTypes': 'PNG, JPG, GIF do 10MB',
    'report.yourName': 'Twoje imię (Opcjonalne)',
    'report.anonymousPlaceholder': 'Zostaw puste dla anonimowego zgłoszenia',
    'report.submitReport': 'Wyślij zgłoszenie',
    'report.removeImage': 'Usuń obraz',
    'report.severity.low': 'Niski',
    'report.severity.medium': 'Średni',
    'report.severity.high': 'Wysoki',
    'report.type.plastic': 'Plastik',
    'report.type.chemical': 'Chemiczny',
    'report.type.trash': 'Śmieci',
    'report.type.oil': 'Olej',
    'report.type.other': 'Inne',
    
    // Events
    'events.title': 'Wydarzenia sprzątania',
    'events.subtitle': 'Dołącz do naszych wydarzeń społecznych i zrób różnicę',
    'events.filter.all': 'Wszystkie',
    'events.filter.upcoming': 'Nadchodzące',
    'events.filter.completed': 'Zakończone',
    'events.participants': 'uczestników',
    'events.impactGoal': 'Cel wpływu',
    'events.organizedBy': 'Organizowane przez',
    'events.joinEvent': 'Dołącz do wydarzenia',
    'events.eventFull': 'Wydarzenie pełne',
    'events.completed': 'Zakończone',
    'events.noEvents': 'Nie znaleziono wydarzeń',
    'events.upcoming': 'nadchodzące',
    
    // Leaderboard
    'leaderboard.title': 'Najlepsi Eko-Wojownicy',
    'leaderboard.points': 'punkty',
    'leaderboard.events': 'wydarzenia',
    'leaderboard.viewAll': 'Zobacz wszystkich {count} wolontariuszy →',
    
    // Impact Dashboard
    'impact.title': 'Wpływ społeczności',
    'impact.ourImpact': 'Nasz wpływ',
    'impact.subtitle': 'Razem czynimy Hamburg czystszym, jedno miejsce na raz',
    'impact.topContributors': 'Najlepsi współtwórcy',
    'impact.wasteCollected': 'Zebrane odpady',
    'impact.activeVolunteers': 'Aktywni wolontariusze',
    'impact.totalEvents': 'Łączne wydarzenia',
    'impact.activeSpots': 'Aktywne miejsca',
    'impact.co2Saved': 'Zaoszczędzone CO₂',
    'impact.growthRate': 'Tempo wzrostu',
    'impact.monthlyProgress': 'Miesięczny postęp',
    'impact.cleanupGoal': 'Cel sprzątania',
    'impact.volunteerTarget': 'Cel wolontariuszy',
    'impact.areaCoverage': 'Pokrycie obszaru',
    'impact.complete': 'Ukończone',
    'impact.achieved': 'Osiągnięte',
    'impact.covered': 'Pokryte',
    'impact.environmentalImpact': 'Wpływ środowiskowy',
    'impact.co2Description': 'Twoje wysiłki pozwoliły zaoszczędzić {amount}kg emisji CO₂ w tym miesiącu',
    'impact.kgTotal': 'kg łącznie',
    'impact.thisMonth': 'w tym miesiącu',
    'impact.equivalentTrees': 'Równowartość 45 drzew',
    'impact.vsLastMonth': 'vs. poprzedni miesiąc',
    'impact.cleaned': 'wyczyszczone',
    
    // Footer
    'footer.description': 'Inicjatywa społeczna mająca na celu utrzymanie czystości i piękna dróg wodnych Hamburga.',
    'footer.quickLinks': 'Szybkie linki',
    'footer.getInvolved': 'Zaangażuj się',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDescription': 'Bądź na bieżąco z naszymi wydarzeniami sprzątania i raportami wpływu.',
    'footer.yourEmail': 'Twój email',
    'footer.subscribe': 'Subskrybuj',
    'footer.volunteer': 'Zostań wolontariuszem',
    'footer.donate': 'Przekaż darowiznę',
    'footer.partner': 'Zostań partnerem',
    'footer.organize': 'Zorganizuj wydarzenie',
    'footer.madeWith': 'Stworzone z',
    'footer.forHackathon': 'dla Hamburg Hackathon 2025',
    'footer.allRights': 'Wszystkie prawa zastrzeżone.',
    
    // Common
    'common.loading': 'Ładowanie...',
    'common.error': 'Błąd',
    'common.success': 'Sukces',
    'common.cancel': 'Anuluj',
    'common.save': 'Zapisz',
    'common.delete': 'Usuń',
    'common.edit': 'Edytuj',
    'common.view': 'Zobacz',
    'common.close': 'Zamknij',
    'common.next': 'Dalej',
    'common.previous': 'Poprzedni',
    'common.kg': 'kg',
    'common.tons': 't',
  }
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'en' || saved === 'de' || saved === 'pl')) {
      return saved as Language;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('de')) {
      return 'de';
    }
    if (browserLang.startsWith('pl')) {
      return 'pl';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key as keyof typeof translations['en']] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
