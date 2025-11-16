import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

const ReportGenerator = ({ analysis, recommendations, language, symptoms, onClose }) => {
  const reportRef = useRef();

  const translations = {
    en: {
      title: 'Healthcare Analysis Report',
      symptoms: 'Symptoms',
      analysis: 'Analysis',
      recommendations: 'Local Doctor Recommendations',
      generated: 'Generated on',
      share: 'Share Report',
      download: 'Download PDF',
      qrCode: 'Scan QR Code to Share',
    },
    es: {
      title: 'Informe de Análisis de Salud',
      symptoms: 'Síntomas',
      analysis: 'Análisis',
      recommendations: 'Recomendaciones de Médicos Locales',
      generated: 'Generado el',
      share: 'Compartir Informe',
      download: 'Descargar PDF',
      qrCode: 'Escanea el Código QR para Compartir',
    },
    fr: {
      title: 'Rapport d\'Analyse de Santé',
      symptoms: 'Symptômes',
      analysis: 'Analyse',
      recommendations: 'Recommandations de Médecins Locaux',
      generated: 'Généré le',
      share: 'Partager le Rapport',
      download: 'Télécharger PDF',
      qrCode: 'Scanner le Code QR pour Partager',
    },
  };

  const t = translations[language] || translations.en;

  const generatePDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('healthcare-report.pdf');
  };

  const generateQRCode = async () => {
    const reportData = {
      symptoms,
      analysis,
      recommendations,
      timestamp: new Date().toISOString(),
    };

    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(reportData));
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  };

  const shareReport = async () => {
    const reportData = {
      title: t.title,
      text: `Healthcare Analysis Report\n\nSymptoms: ${symptoms}\n\nAnalysis: ${analysis}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(reportData);
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to clipboard
        navigator.clipboard.writeText(`${reportData.title}\n\n${reportData.text}\n\n${reportData.url}`);
        alert('Report copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`${reportData.title}\n\n${reportData.text}\n\n${reportData.url}`);
      alert('Report copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div ref={reportRef} className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.symptoms}</h3>
              <p className="text-gray-700 dark:text-gray-300">{symptoms}</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.analysis}</h3>
              <p className="text-gray-700 dark:text-gray-300">{analysis}</p>
            </div>

            {recommendations.length > 0 && (
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.recommendations}</h3>
                <div className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div className="font-medium text-gray-900 dark:text-white">{rec.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{rec.address}</div>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">★ {rec.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t.generated} {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
            <button
              onClick={generatePDF}
              className="btn-hover bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              {t.download}
            </button>
            <button
              onClick={shareReport}
              className="btn-hover bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              {t.share}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
