import React from 'react';
// Removed ReportGenerator import and useState for demo mode simplification

const translations = {
  en: {
    analysisResults: 'Analysis Results',
    localDoctorRecommendations: 'Local Doctor Recommendations',
    demoNote: 'Demo Mode: Advanced features like PDF reports are disabled for demonstration',
  },
  es: {
    analysisResults: 'Resultados del Análisis',
    localDoctorRecommendations: 'Recomendaciones de Médicos Locales',
    demoNote: 'Modo Demo: Las funciones avanzadas como informes PDF están deshabilitadas para demostración',
  },
  fr: {
    analysisResults: 'Résultats de l\'Analyse',
    localDoctorRecommendations: 'Recommandations de Médecins Locaux',
    demoNote: 'Mode Démo: Les fonctionnalités avancées comme les rapports PDF sont désactivées pour la démonstration',
  },
  // Add more languages as needed
};

const Results = ({ analysis, recommendations, language, symptoms }) => {
  // Removed showReportGenerator state for demo mode

  if (!analysis) return null;

  const t = translations[language] || translations.en;

  return (
    <>
      <div className="mt-6 space-y-4 slide-in-left">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md glow-animation">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t.analysisResults}</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{analysis}</p>
        </div>
        {recommendations.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md slide-in-right">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t.localDoctorRecommendations}</h2>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-md bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-gray-900 dark:text-white">{rec.name}</strong>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.address}</div>
                    </div>
                    <div className="text-yellow-600 dark:text-yellow-400 font-semibold">
                      ★ {rec.rating}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Simplified demo mode - removed PDF/QR buttons */}
        <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-lg">
          <p className="text-orange-700 dark:text-orange-300 text-sm text-center">{t.demoNote}</p>
        </div>
      </div>

      {/* Removed ReportGenerator modal for demo mode */}
    </>
  );
};

export default Results;
