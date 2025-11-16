import React, { useState, useEffect } from 'react';
import SymptomInput from './components/SymptomInput';
import Results from './components/Results';
import SymptomHistory from './components/SymptomHistory';
import HealthTips from './components/HealthTips';

const translations = {
  en: {
    title: 'Healthcare AI Assistant',
    lightMode: '☀️ Light',
    darkMode: '🌙 Dark',
    demoMode: 'Demo Mode',
    disclaimer: 'This is for educational purposes only. Not for actual medical advice.',
  },
  es: {
    title: 'Asistente de IA para la Salud',
    lightMode: '☀️ Claro',
    darkMode: '🌙 Oscuro',
    demoMode: 'Modo Demo',
    disclaimer: 'Esto es solo para fines educativos. No para consejos médicos reales.',
  },
  fr: {
    title: 'Assistant IA pour la Santé',
    lightMode: '☀️ Lumière',
    darkMode: '🌙 Sombre',
    demoMode: 'Mode Démo',
    disclaimer: 'Ceci est uniquement à des fins éducatives. Pas pour des conseils médicaux réels.',
  },
  // Add more languages as needed
};

function App() {
  const [analysis, setAnalysis] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [demoMode, setDemoMode] = useState(true); // Default to demo mode for hackathon

  useEffect(() => {
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      setSymptomHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleAnalysis = async (symptoms, language, location) => {
    setLanguage(language); // Update language state
    setLoading(true);

    // Add to history
    const newEntry = { symptoms, timestamp: new Date().toISOString() };
    const updatedHistory = [newEntry, ...symptomHistory.slice(0, 9)]; // Keep last 10 entries
    setSymptomHistory(updatedHistory);
    localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory));

    if (demoMode) {
      // Enhanced demo mode with comprehensive mock data and translations
      setTimeout(() => {
        // Enhanced mock data with more comprehensive medical scenarios
        const mockAnalyses = {
          en: {
            analysis: symptoms.toLowerCase().includes('headache') ?
              'Based on your headache symptoms, this could be tension headache, migraine, or dehydration. Rest in a dark room, stay hydrated, and consider over-the-counter pain relievers. If headaches are severe, frequent, or accompanied by other symptoms, consult a healthcare professional immediately.' :
              symptoms.toLowerCase().includes('fever') ?
              'Your fever symptoms suggest possible infection or inflammatory response. Monitor your temperature, stay hydrated, and rest. Take acetaminophen or ibuprofen if needed. Seek medical attention if fever exceeds 103°F (39.4°C) or persists beyond 3 days.' :
              'Based on your symptoms, this could be a common cold or seasonal allergies. Rest, stay hydrated, and consider over-the-counter antihistamines or decongestants. Monitor your temperature and consult a healthcare professional if symptoms worsen or persist beyond 7-10 days.',
            recommendations: [
              { name: 'City General Hospital', address: '123 Main Street, Downtown', rating: 4.5 },
              { name: 'Downtown Medical Clinic', address: '456 Oak Avenue, Medical District', rating: 4.2 },
              { name: 'Family Health Center', address: '789 Pine Road, Residential Area', rating: 4.0 },
              { name: 'Urgent Care Plus', address: '321 Elm Street, Central', rating: 3.8 },
              { name: 'Wellness Medical Group', address: '654 Maple Drive, Suburban', rating: 4.3 }
            ]
          },
          es: {
            analysis: symptoms.toLowerCase().includes('dolor de cabeza') ?
              'Basado en sus síntomas de dolor de cabeza, esto podría ser dolor de cabeza tensional, migraña o deshidratación. Descanse en una habitación oscura, manténgase hidratado y considere analgésicos de venta libre. Si los dolores de cabeza son severos, frecuentes o acompañados de otros síntomas, consulte a un profesional de la salud inmediatamente.' :
              symptoms.toLowerCase().includes('fiebre') ?
              'Sus síntomas de fiebre sugieren posible infección o respuesta inflamatoria. Controle su temperatura, manténgase hidratado y descanse. Tome acetaminofén o ibuprofeno si es necesario. Busque atención médica si la fiebre supera los 39.4°C o persiste más allá de 3 días.' :
              'Basado en sus síntomas, esto podría ser un resfriado común o alergias estacionales. Descanse, manténgase hidratado y considere antihistamínicos o descongestionantes de venta libre. Controle su temperatura y consulte a un profesional de la salud si los síntomas empeoran o persisten más allá de 7-10 días.',
            recommendations: [
              { name: 'Hospital General Ciudad', address: '123 Calle Principal, Centro', rating: 4.5 },
              { name: 'Clínica Médica Centro', address: '456 Avenida Roble, Distrito Médico', rating: 4.2 },
              { name: 'Centro de Salud Familiar', address: '789 Camino Pino, Área Residencial', rating: 4.0 },
              { name: 'Urgencias Plus', address: '321 Calle Olmo, Centro', rating: 3.8 },
              { name: 'Grupo Médico Bienestar', address: '654 Camino Arce, Suburbano', rating: 4.3 }
            ]
          },
          fr: {
            analysis: symptoms.toLowerCase().includes('mal de tête') ?
              'D\'après vos symptômes de mal de tête, il pourrait s\'agir de céphalée de tension, de migraine ou de déshydratation. Reposez-vous dans une pièce sombre, restez hydraté et envisagez des analgésiques en vente libre. Si les maux de tête sont sévères, fréquents ou accompagnés d\'autres symptômes, consultez un professionnel de santé immédiatement.' :
              symptoms.toLowerCase().includes('fièvre') ?
              'Vos symptômes de fièvre suggèrent une possible infection ou réponse inflammatoire. Surveillez votre température, restez hydraté et reposez-vous. Prenez de l\'acétaminophène ou de l\'ibuprofène si nécessaire. Cherchez une attention médicale si la fièvre dépasse 39.4°C ou persiste au-delà de 3 jours.' :
              'D\'après vos symptômes, il pourrait s\'agir d\'un rhume ordinaire ou d\'allergies saisonnières. Reposez-vous, restez hydraté et envisagez des antihistaminiques ou décongestionnants en vente libre. Surveillez votre température et consultez un professionnel de santé si les symptômes s\'aggravent ou persistent au-delà de 7-10 jours.',
            recommendations: [
              { name: 'Hôpital Général Ville', address: '123 Rue Principale, Centre-Ville', rating: 4.5 },
              { name: 'Clinique Médicale Centre', address: '456 Avenue Chêne, Quartier Médical', rating: 4.2 },
              { name: 'Centre de Santé Familial', address: '789 Route Pin, Zone Résidentielle', rating: 4.0 },
              { name: 'Urgences Plus', address: '321 Rue Orme, Centre', rating: 3.8 },
              { name: 'Groupe Médical Bien-être', address: '654 Route Érable, Banlieue', rating: 4.3 }
            ]
          }
        };

        const mockData = mockAnalyses[language] || mockAnalyses.en;
        setAnalysis(mockData.analysis);
        setRecommendations(mockData.recommendations);
        setLoading(false);
      }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s for realism
      return;
    }

    try {
      // Check if we're online
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }

      const response = await fetch('http://localhost:5000/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);

      // Fetch recommendations if location provided
      if (location) {
        try {
          const recResponse = await fetch('http://localhost:5000/api/local-recommendations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat: location.lat, lng: location.lng, language }),
          });

          if (recResponse.ok) {
            const recData = await recResponse.json();
            setRecommendations(recData.recommendations || []);
          } else {
            console.warn('Failed to fetch recommendations, using empty list');
            setRecommendations([]);
          }
        } catch (recError) {
          console.warn('Error fetching recommendations:', recError);
          setRecommendations([]);
        }
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Enhanced error handling with offline support
      if (!navigator.onLine) {
        setAnalysis('You appear to be offline. Please check your internet connection and try again.');
      } else {
        setAnalysis('Error analyzing symptoms. Please check your connection and try again.');
      }
      setRecommendations([]);
    }
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
  };

  const clearHistory = () => {
    setSymptomHistory([]);
    localStorage.removeItem('symptomHistory');
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} flex items-center justify-center p-4`}>
      <div className={`max-w-lg w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 fade-in`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center pulse-animation">{t.title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={toggleDemoMode}
              className={`px-3 py-1 rounded-md transition-colors duration-200 ${demoMode ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              {t.demoMode}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-3 py-1 rounded-md transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              {darkMode ? t.lightMode : t.darkMode}
            </button>
          </div>
        </div>
        <div className="text-center mb-4 text-sm text-red-600 font-semibold bg-red-50 p-2 rounded">
          {t.disclaimer}
        </div>
        {demoMode && (
          <div className="text-center mb-4 text-sm text-blue-600 font-semibold bg-blue-50 p-2 rounded">
            🔄 Demo Mode Active - Using sample data for demonstration
          </div>
        )}
        <SymptomInput onAnalyze={handleAnalysis} loading={loading} />
        <Results analysis={analysis} recommendations={recommendations} language={language} symptoms={symptomHistory.length > 0 ? symptomHistory[0].symptoms : ''} />
        <SymptomHistory history={symptomHistory} language={language} onClearHistory={clearHistory} />
        <HealthTips language={language} />
      </div>
    </div>
  );
}

export default App;
