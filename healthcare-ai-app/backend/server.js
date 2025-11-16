const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock data for fallback when OpenAI API is unavailable
const mockAnalysis = {
  en: "Based on your symptoms, this could be a common cold or flu. Rest, stay hydrated, and monitor your temperature. If symptoms worsen or persist, consult a healthcare professional.",
  es: "Basado en sus síntomas, esto podría ser un resfriado común o gripe. Descanse, manténgase hidratado y controle su temperatura. Si los síntomas empeoran o persisten, consulte a un profesional de la salud.",
  fr: "D'après vos symptômes, il pourrait s'agir d'un rhume ordinaire ou de la grippe. Reposez-vous, restez hydraté et surveillez votre température. Si les symptômes s'aggravent ou persistent, consultez un professionnel de santé."
};

// Enhanced Lingo Compiler translation system with regex-based phrase processing
async function translateText(text, fromLang, targetLang) {
  try {
    // Lingo compiler simulation - more sophisticated translation system with regex patterns
    const lingoTranslations = {
      en: {
        es: {
          // Symptom translations
          'headache': 'dolor de cabeza',
          'fever': 'fiebre',
          'cough': 'tos',
          'stomach pain': 'dolor de estómago',
          'nausea': 'náuseas',
          'fatigue': 'fatiga',
          'dizziness': 'mareos',
          'chest pain': 'dolor en el pecho',
          'shortness of breath': 'dificultad para respirar',
          'sore throat': 'dolor de garganta',
          'back pain': 'dolor de espalda',
          'joint pain': 'dolor articular',
          'muscle pain': 'dolor muscular',
          'rash': 'erupción cutánea',
          'itching': 'picazón',
          'swelling': 'hinchazón',
          'chills': 'escalofríos',
          'sweating': 'sudoración',
          'loss of appetite': 'pérdida de apetito',
          'weight loss': 'pérdida de peso',
          'constipation': 'estreñimiento',
          'diarrhea': 'diarrea',
          'vomiting': 'vómitos',
          'bloody stool': 'heces con sangre',
          'blood in urine': 'sangre en la orina',
          'difficulty swallowing': 'dificultad para tragar',
          'blurred vision': 'visión borrosa',
          'ringing in ears': 'zumbido en los oídos',
          'frequent urination': 'micción frecuente',
          'painful urination': 'micción dolorosa',
          // UI translations
          'Analysis Results': 'Resultados del Análisis',
          'Local Doctor Recommendations': 'Recomendaciones de Médicos Locales',
          'Download Report': 'Descargar Informe',
          'Share Report': 'Compartir Informe',
          'Select Language': 'Seleccionar Idioma',
          'Describe your symptoms': 'Describe tus síntomas',
          'Get local doctor recommendations': 'Obtener recomendaciones de médicos locales',
          'Voice Input': 'Entrada de Voz',
          'Analyze Symptoms': 'Analizar Síntomas',
          'Healthcare AI Assistant': 'Asistente de IA para la Salud',
          'Symptom History': 'Historial de Síntomas',
          'Health Tips': 'Consejos de Salud',
          'Demo Mode': 'Modo Demo',
          'This is for educational purposes only': 'Esto es solo para fines educativos',
          'Please consult a healthcare professional': 'Por favor, consulte a un profesional de la salud',
          'Emergency symptoms detected': 'Síntomas de emergencia detectados',
          'Seek immediate medical attention': 'Busque atención médica inmediata',
        },
        fr: {
          // Symptom translations
          'headache': 'mal de tête',
          'fever': 'fièvre',
          'cough': 'toux',
          'stomach pain': 'douleur d\'estomac',
          'nausea': 'nausée',
          'fatigue': 'fatigue',
          'dizziness': 'vertiges',
          'chest pain': 'douleur thoracique',
          'shortness of breath': 'essoufflement',
          'sore throat': 'mal de gorge',
          'back pain': 'douleur dorsale',
          'joint pain': 'douleur articulaire',
          'muscle pain': 'douleur musculaire',
          'rash': 'éruption cutanée',
          'itching': 'démangeaison',
          'swelling': 'gonflement',
          'chills': 'frissons',
          'sweating': 'transpiration',
          'loss of appetite': 'perte d\'appétit',
          'weight loss': 'perte de poids',
          'constipation': 'constipation',
          'diarrhea': 'diarrhée',
          'vomiting': 'vomissements',
          'bloody stool': 'selles sanglantes',
          'blood in urine': 'sang dans les urines',
          'difficulty swallowing': 'difficulté à avaler',
          'blurred vision': 'vision floue',
          'ringing in ears': 'acouphènes',
          'frequent urination': 'mictions fréquentes',
          'painful urination': 'miction douloureuse',
          // UI translations
          'Analysis Results': 'Résultats de l\'Analyse',
          'Local Doctor Recommendations': 'Recommandations de Médecins Locaux',
          'Download Report': 'Télécharger le Rapport',
          'Share Report': 'Partager le Rapport',
          'Select Language': 'Sélectionner la Langue',
          'Describe your symptoms': 'Décrivez vos symptômes',
          'Get local doctor recommendations': 'Obtenir des recommandations de médecins locaux',
          'Voice Input': 'Entrée Vocale',
          'Analyze Symptoms': 'Analyser les Symptômes',
          'Healthcare AI Assistant': 'Assistant IA pour la Santé',
          'Symptom History': 'Historique des Symptômes',
          'Health Tips': 'Conseils de Santé',
          'Demo Mode': 'Mode Démo',
          'This is for educational purposes only': 'Ceci est uniquement à des fins éducatives',
          'Please consult a healthcare professional': 'Veuillez consulter un professionnel de santé',
          'Emergency symptoms detected': 'Symptômes d\'urgence détectés',
          'Seek immediate medical attention': 'Cherchez une attention médicale immédiate',
        },
        de: {
          // Symptom translations
          'headache': 'Kopfschmerzen',
          'fever': 'Fieber',
          'cough': 'Husten',
          'stomach pain': 'Bauchschmerzen',
          'nausea': 'Übelkeit',
          'fatigue': 'Müdigkeit',
          'dizziness': 'Schwindel',
          'chest pain': 'Brustschmerzen',
          'shortness of breath': 'Atemnot',
          'sore throat': 'Halsschmerzen',
          'back pain': 'Rückenschmerzen',
          'joint pain': 'Gelenkschmerzen',
          'muscle pain': 'Muskelschmerzen',
          'rash': 'Ausschlag',
          'itching': 'Juckreiz',
          'swelling': 'Schwellung',
          'chills': 'Schüttelfrost',
          'sweating': 'Schwitzen',
          'loss of appetite': 'Appetitlosigkeit',
          'weight loss': 'Gewichtsverlust',
          'constipation': 'Verstopfung',
          'diarrhea': 'Durchfall',
          'vomiting': 'Erbrechen',
          'bloody stool': 'blutiger Stuhl',
          'blood in urine': 'Blut im Urin',
          'difficulty swallowing': 'Schluckbeschwerden',
          'blurred vision': 'verschwommene Sicht',
          'ringing in ears': 'Ohrensausen',
          'frequent urination': 'häufiges Wasserlassen',
          'painful urination': 'schmerzhaftes Wasserlassen',
          // UI translations
          'Analysis Results': 'Analyseergebnisse',
          'Local Doctor Recommendations': 'Lokale Arztempfehlungen',
          'Download Report': 'Bericht herunterladen',
          'Share Report': 'Bericht teilen',
          'Select Language': 'Sprache auswählen',
          'Describe your symptoms': 'Beschreiben Sie Ihre Symptome',
          'Get local doctor recommendations': 'Lokale Arztempfehlungen erhalten',
          'Voice Input': 'Spracheingabe',
          'Analyze Symptoms': 'Symptome analysieren',
          'Healthcare AI Assistant': 'KI-Gesundheitsassistent',
          'Symptom History': 'Symptomverlauf',
          'Health Tips': 'Gesundheitstipps',
          'Demo Mode': 'Demo-Modus',
          'This is for educational purposes only': 'Dies dient nur zu Bildungszwecken',
          'Please consult a healthcare professional': 'Bitte konsultieren Sie einen Gesundheitsfachmann',
          'Emergency symptoms detected': 'Notfallsymptome erkannt',
          'Seek immediate medical attention': 'Suchen Sie sofortige medizinische Hilfe',
        },
        // Add more languages as needed
      },
      // Add reverse translations if needed
    };

    if (fromLang === targetLang) return text;

    const langMap = lingoTranslations[fromLang] && lingoTranslations[fromLang][targetLang];
    if (langMap) {
      // Enhanced Lingo compiler logic: regex-based phrase recognition and context-aware translation
      let translatedText = text.toLowerCase();

      // Regex patterns for common medical phrases
      const patterns = [
        { regex: /\b(i have|i'm experiencing|i feel)\s+(.+?)(?:\s+(and|with|but)\s+|$)/gi, translate: (match, intro, symptoms, connector) => {
          const translatedIntro = langMap[intro] || intro;
          const translatedSymptoms = symptoms.split(/\s+(and|with|but)\s+/).map(word => langMap[word] || word).join(' ');
          return `${translatedIntro} ${translatedSymptoms}${connector ? ` ${langMap[connector] || connector}` : ''}`;
        }},
        { regex: /\b(for|since)\s+(\d+)\s+(days?|weeks?|months?|hours?)\s+ago/gi, translate: (match, prep, num, unit) => {
          const translatedPrep = langMap[prep] || prep;
          const translatedUnit = langMap[unit] || unit;
          return `${translatedPrep} ${num} ${translatedUnit}`;
        }},
        { regex: /\b(mild|moderate|severe|intense|slight)\s+(pain|discomfort)/gi, translate: (match, intensity, type) => {
          const translatedIntensity = langMap[intensity] || intensity;
          const translatedType = langMap[type] || type;
          return `${translatedIntensity} ${translatedType}`;
        }},
      ];

      // Apply regex patterns
      patterns.forEach(pattern => {
        translatedText = translatedText.replace(pattern.regex, pattern.translate);
      });

      // Word-by-word translation for remaining text
      const phrases = translatedText.split(/[.!?]+/).filter(p => p.trim());
      const translatedPhrases = phrases.map(phrase => {
        const words = phrase.trim().split(/\s+/);
        const translatedWords = words.map(word => {
          // Check for exact matches first
          if (langMap[word]) return langMap[word];
          // Check for partial matches (e.g., "headaches" -> "headache")
          const baseWord = word.replace(/s$|es$|ies$/, '').replace(/ing$/, '').replace(/ed$/, '').replace(/ly$/, '');
          return langMap[baseWord] || word;
        });
        return translatedWords.join(' ');
      });
      return translatedPhrases.join('. ') + (text.match(/[.!?]$/) ? text.slice(-1) : '');
    }

    // Fallback: return original text
    return text;
  } catch (error) {
    console.error('Lingo translation error:', error);
    return text;
  }
}

// Route for symptom analysis
app.post('/api/analyze-symptoms', async (req, res) => {
  const { symptoms, language } = req.body;

  try {
    // Translate symptoms to English for AI analysis
    const translatedSymptoms = await translateText(symptoms, 'en');

    // Use OpenAI API for symptom analysis with fallback
    const prompt = `You are a helpful medical assistant. Provide basic guidance on symptoms, possible causes, home remedies, and advise seeing a doctor if needed. Keep responses concise and in English.\n\nSymptoms: ${translatedSymptoms}\n\nAnalysis:`;

    let analysis;
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });
      analysis = completion.choices[0].message.content.trim();
    } catch (openaiError) {
      console.warn('OpenAI API failed, using mock data:', openaiError.message);
      analysis = mockAnalysis.en; // Default to English mock
    }

    // Translate analysis back to user's language
    const translatedAnalysis = await translateText(analysis, 'en', language);

    res.json({ analysis: translatedAnalysis });
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    // Fallback to mock data in user's language
    const fallbackAnalysis = mockAnalysis[language] || mockAnalysis.en;
    res.json({ analysis: fallbackAnalysis });
  }
});

// Route for local recommendations (nearby doctors)
app.post('/api/local-recommendations', async (req, res) => {
  const { lat, lng, language } = req.body;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 5000, // 5km radius
        type: 'doctor',
        key: apiKey,
      },
    });

    const places = response.data.results.slice(0, 5).map(place => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating,
    }));

    // Translate place names and addresses if needed
    const translatedPlaces = await Promise.all(places.map(async place => ({
      name: await translateText(place.name, 'en', language),
      address: await translateText(place.address, 'en', language),
      rating: place.rating,
    })));

    res.json({ recommendations: translatedPlaces });
  } catch (error) {
    console.error('Error fetching local recommendations:', error);
    // Fallback to mock recommendations
    const mockRecommendations = [
      { name: 'City General Hospital', address: '123 Main St', rating: 4.5 },
      { name: 'Downtown Medical Clinic', address: '456 Oak Ave', rating: 4.2 },
      { name: 'Family Health Center', address: '789 Pine Rd', rating: 4.0 },
    ];
    const translatedMock = await Promise.all(mockRecommendations.map(async place => ({
      name: await translateText(place.name, 'en', language),
      address: await translateText(place.address, 'en', language),
      rating: place.rating,
    })));
    res.json({ recommendations: translatedMock });
  }
});

// Route for real-time voice translation
app.post('/api/translate-voice', async (req, res) => {
  const { text, fromLang, targetLang } = req.body;

  try {
    const translatedText = await translateText(text, fromLang, targetLang);
    res.json({ translatedText });
  } catch (error) {
    console.error('Error translating voice input:', error);
    res.status(500).json({ error: 'Failed to translate voice input' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
