import { AIHealthAnalysis, Symptom } from '../types';

export function generateReportHtml(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const triage = analysis.triage || {
    level: 'routine',
    headline: 'Consult a Healthcare Professional',
    actionPoints: ['Monitor symptoms', 'Seek doctor review if symptoms persist'],
    timeframe: 'Within 24 to 48 hours',
  };

  const triageBadgeColor =
    triage.level === 'emergency'
      ? '#e11d48'
      : triage.level === 'urgent'
      ? '#d97706'
      : triage.level === 'self_care'
      ? '#059669'
      : '#2563eb';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>AuraHealth - Clinical Symptom & Health Report</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #171717;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #171717;
      padding-bottom: 12px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .title {
      font-size: 22px;
      font-weight: 700;
      color: #171717;
      margin: 0;
    }
    .subtitle {
      font-size: 11px;
      color: #525252;
      margin-top: 3px;
    }
    .date {
      font-size: 11px;
      color: #737373;
      text-align: right;
    }
    .triage-box {
      border: 1.5px solid ${triageBadgeColor};
      background: #fafafa;
      border-left: 6px solid ${triageBadgeColor};
      border-radius: 6px;
      padding: 12px 14px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .triage-badge {
      display: inline-block;
      background: ${triageBadgeColor};
      color: #ffffff;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .triage-headline {
      font-size: 15px;
      font-weight: 700;
      color: #171717;
      margin: 0 0 4px 0;
    }
    .triage-timeframe {
      font-size: 11px;
      font-weight: 600;
      color: #525252;
      margin-bottom: 8px;
    }
    .section {
      margin-bottom: 18px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #262626;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background: #f5f5f5;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 12px;
    }
    .grid-item label {
      display: block;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      color: #737373;
      margin-bottom: 2px;
    }
    .grid-item span {
      font-size: 12px;
      font-weight: 600;
      color: #171717;
    }
    .pill {
      display: inline-block;
      background: #ffffff;
      border: 1px solid #d4d4d4;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: 600;
      margin: 2px 2px 2px 0;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: #171717;
      margin: 0 0 4px 0;
    }
    .uncertainty-note {
      font-size: 10px;
      color: #b45309;
      background: #fef3c7;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 4px;
    }
    .warning-box {
      border: 1px solid #fecdd3;
      background: #fff1f2;
      border-radius: 6px;
      padding: 10px 12px;
      color: #9f1239;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .warning-box ul {
      margin: 4px 0 0 0;
      padding-left: 18px;
    }
    .disclaimer-box {
      border-top: 2px solid #171717;
      padding-top: 10px;
      margin-top: 24px;
      font-size: 10px;
      color: #525252;
      line-height: 1.4;
      page-break-inside: avoid;
    }
    ul {
      margin: 4px 0 0 0;
      padding-left: 18px;
    }
    li {
      margin-bottom: 3px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">AuraHealth Clinical Intake Summary</h1>
      <div class="subtitle">AI Symptom Analysis & Pharmacist Health Reference Report</div>
    </div>
    <div class="date">
      <strong>Generated:</strong><br />${currentDate}
    </div>
  </div>

  <div class="triage-box">
    <div class="triage-badge">${triage.level.toUpperCase()} LEVEL</div>
    <h2 class="triage-headline">${triage.headline}</h2>
    <div class="triage-timeframe">Recommended Action Window: ${triage.timeframe}</div>
    <ul>
      ${triage.actionPoints.map((pt) => `<li>${pt}</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Patient Reported Symptoms & Clinical Timeline</div>
    <div class="summary-grid">
      <div class="grid-item">
        <label>Selected Symptoms</label>
        <div>${analysis.symptomSummary.symptoms.map((s) => `<span class="pill">${s}</span>`).join('')}</div>
      </div>
      <div class="grid-item">
        <label>Duration & Onset</label>
        <span>${analysis.symptomSummary.duration}</span>
        <div style="font-size:10px; color:#737373; margin-top:2px;">Onset: ${analysis.symptomSummary.keyAnswers?.['Onset Pattern'] || 'Noted'}</div>
      </div>
      <div class="grid-item">
        <label>Reported Severity</label>
        <span>${analysis.symptomSummary.severity} Impact</span>
        <div style="font-size:10px; color:#737373; margin-top:2px;">Age: ${analysis.symptomSummary.keyAnswers?.['Age Group'] || 'Adult'}</div>
      </div>
    </div>

    ${
      analysis.symptomSummary.keyAnswers
        ? `<div style="font-size:11px; color:#525252; background:#fafafa; border:1px solid #f0f0f0; border-radius:4px; padding:6px 10px; margin-bottom:10px;">
            <strong>Clinical Context Details: </strong>
            ${Object.entries(analysis.symptomSummary.keyAnswers)
              .map(([k, v]) => `<span><strong>${k}:</strong> ${v}</span>`)
              .join(' • ')}
          </div>`
        : ''
    }
  </div>

  ${
    analysis.warningSigns && analysis.warningSigns.length > 0
      ? `<div class="warning-box">
          <strong style="text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">Emergency Warning Signs & Critical Red Flags:</strong>
          <ul>
            ${analysis.warningSigns.map((w) => `<li>${w}</li>`).join('')}
          </ul>
        </div>`
      : ''
  }

  ${
    analysis.allergyAlerts && analysis.allergyAlerts.length > 0
      ? `<div class="card" style="border-left: 4px solid #f59e0b; background:#fffbeb;">
          <strong style="color:#b45309; font-size:11px; text-transform:uppercase;">Allergy Cross-Reference Alerts:</strong>
          <ul>
            ${analysis.allergyAlerts.map((a) => `<li>${a}</li>`).join('')}
          </ul>
        </div>`
      : ''
  }

  <div class="section">
    <div class="section-title">Possible General Explanations (Educational Reference)</div>
    ${analysis.possibleExplanations
      .map(
        (exp) => `<div class="card">
        <div class="card-title">${exp.title}</div>
        <div style="color:#404040; margin-bottom:4px;">${exp.description}</div>
        <div class="uncertainty-note">Note: ${exp.uncertaintyNote}</div>
        ${
          exp.typicalCharacteristics && exp.typicalCharacteristics.length > 0
            ? `<div style="font-size:11px; color:#525252; margin-top:4px;">
                <strong>Typical characteristics: </strong>${exp.typicalCharacteristics.join(', ')}
               </div>`
            : ''
        }
      </div>`
      )
      .join('')}
  </div>

  <div class="section">
    <div class="section-title">Questions to Discuss with Your Doctor or Pharmacist</div>
    <ul>
      ${analysis.pharmacistConsultationGuide
        .map((q) => `<li>${q}</li>`)
        .join('')}
    </ul>
  </div>

  <div class="disclaimer-box">
    <strong>MANDATORY DISCLAIMER:</strong><br />
    "${analysis.mandatoryDisclaimer}"
  </div>
</body>
</html>`;
}

/**
 * Triggers printing using an invisible iframe to guarantee proper isolation
 * and bypass any parent iframe/layout issues. Falls back to window.print().
 */
export function printClinicalReport(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
): boolean {
  try {
    const htmlContent = generateReportHtml(analysis, selectedSymptoms);

    // Create an invisible iframe in the document
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('title', 'Print Document');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.warn('Iframe print failed, falling back to window.print():', e);
          window.print();
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 60000); // Clean up after print dialog finishes
        }
      }, 350);
      return true;
    } else {
      window.print();
      return true;
    }
  } catch (error) {
    console.error('Print execution error:', error);
    try {
      window.print();
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Downloads the report as a clean self-contained HTML file (which can be opened in any browser and saved as PDF)
 */
export function downloadHtmlReport(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
) {
  const html = generateReportHtml(analysis, selectedSymptoms);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AuraHealth_Report_${new Date().toISOString().slice(0, 10)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads the report as a clean plain text file (.txt)
 */
export function downloadTextReport(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
) {
  const triage = analysis.triage || {
    level: 'routine',
    headline: 'Consult a Healthcare Professional',
    actionPoints: ['Monitor symptoms'],
    timeframe: '24-48 hours',
  };

  const text = `=====================================================
AURAHEALTH - CLINICAL SYMPTOM & HEALTH INTAKE REPORT
Date: ${new Date().toLocaleString()}
=====================================================

1. TRIAGE LEVEL & ACTION
Level: ${triage.level.toUpperCase()}
Headline: ${triage.headline}
Recommended Window: ${triage.timeframe}
Action Points:
${triage.actionPoints.map((p) => `  - ${p}`).join('\n')}

2. PATIENT REPORTED SYMPTOMS
Symptoms: ${analysis.symptomSummary.symptoms.join(', ')}
Duration: ${analysis.symptomSummary.duration}
Severity: ${analysis.symptomSummary.severity}
Clinical Context:
${
  analysis.symptomSummary.keyAnswers
    ? Object.entries(analysis.symptomSummary.keyAnswers)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join('\n')
    : '  None provided'
}

3. EMERGENCY WARNING SIGNS & RED FLAGS
${
  analysis.warningSigns && analysis.warningSigns.length > 0
    ? analysis.warningSigns.map((w) => `  [!] ${w}`).join('\n')
    : '  No immediate emergency flags reported.'
}

4. ALLERGY ALERTS
${
  analysis.allergyAlerts && analysis.allergyAlerts.length > 0
    ? analysis.allergyAlerts.map((a) => `  * ${a}`).join('\n')
    : '  No specific medicine allergy conflicts detected.'
}

5. POSSIBLE GENERAL EXPLANATIONS (EDUCATIONAL ONLY)
${analysis.possibleExplanations
  .map(
    (e, idx) =>
      `  ${idx + 1}. ${e.title}
     ${e.description}
     Uncertainty Note: ${e.uncertaintyNote}`
  )
  .join('\n\n')}

6. QUESTIONS FOR YOUR DOCTOR OR PHARMACIST
${analysis.pharmacistConsultationGuide.map((q, idx) => `  ${idx + 1}. ${q}`).join('\n')}

=====================================================
MANDATORY DISCLAIMER:
"${analysis.mandatoryDisclaimer}"
=====================================================
`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AuraHealth_Report_${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
