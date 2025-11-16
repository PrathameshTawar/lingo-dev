import React from 'react';

const translations = {
  en: {
    healthTips: 'Health Tips',
    tip1: 'Stay hydrated by drinking at least 8 glasses of water a day.',
    tip2: 'Eat a balanced diet rich in fruits and vegetables.',
    tip3: 'Get at least 7-8 hours of sleep each night.',
    tip4: 'Exercise regularly to maintain physical and mental health.',
    tip5: 'Practice good hygiene to prevent illnesses.',
  },
  es: {
    healthTips: 'Consejos de Salud',
    tip1: 'Mantente hidratado bebiendo al menos 8 vasos de agua al día.',
    tip2: 'Come una dieta equilibrada rica en frutas y verduras.',
    tip3: 'Duerme al menos 7-8 horas cada noche.',
    tip4: 'Ejercítate regularmente para mantener la salud física y mental.',
    tip5: 'Practica una buena higiene para prevenir enfermedades.',
  },
  fr: {
    healthTips: 'Conseils de Santé',
    tip1: 'Restez hydraté en buvant au moins 8 verres d\'eau par jour.',
    tip2: 'Mangez une alimentation équilibrée riche en fruits et légumes.',
    tip3: 'Dormez au moins 7-8 heures chaque nuit.',
    tip4: 'Faites de l\'exercice régulièrement pour maintenir la santé physique et mentale.',
    tip5: 'Pratiquez une bonne hygiène pour prévenir les maladies.',
  },
  // Add more languages as needed
};

const HealthTips = ({ language }) => {
  const t = translations[language] || translations.en;

  const tips = [t.tip1, t.tip2, t.tip3, t.tip4, t.tip5];

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-md">
      <h2 className="text-lg font-semibold mb-2">{t.healthTips}</h2>
      <ul className="space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="text-gray-700 flex items-start">
            <span className="text-green-500 mr-2">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthTips;
