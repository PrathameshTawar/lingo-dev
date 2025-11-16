import React from 'react';

const translations = {
  en: {
    symptomHistory: 'Symptom History',
    noHistory: 'No symptom history yet.',
    clearHistory: 'Clear History',
  },
  es: {
    symptomHistory: 'Historial de Síntomas',
    noHistory: 'Aún no hay historial de síntomas.',
    clearHistory: 'Borrar Historial',
  },
  fr: {
    symptomHistory: 'Historique des Symptômes',
    noHistory: 'Aucun historique des symptômes pour le moment.',
    clearHistory: 'Effacer l\'Historique',
  },
  // Add more languages as needed
};

const SymptomHistory = ({ history, language, onClearHistory }) => {
  const t = translations[language] || translations.en;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h2 className="text-lg font-semibold mb-2">{t.symptomHistory}</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">{t.noHistory}</p>
      ) : (
        <div className="space-y-2">
          {history.map((entry, index) => (
            <div key={index} className="p-2 bg-white rounded border">
              <p className="text-sm text-gray-600">{new Date(entry.timestamp).toLocaleString()}</p>
              <p className="text-gray-800">{entry.symptoms}</p>
            </div>
          ))}
          <button
            onClick={onClearHistory}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {t.clearHistory}
          </button>
        </div>
      )}
    </div>
  );
};

export default SymptomHistory;
