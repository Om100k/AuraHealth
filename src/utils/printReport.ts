import { jsPDF } from 'jspdf';
import { AIHealthAnalysis, Symptom } from '../types';

/**
 * Generates and downloads a clean, professional PDF file of the clinical report
 */
export function downloadPdfReport(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  const checkPageBreak = (spaceNeeded: number) => {
    if (y + spaceNeeded > pageHeight - 16) {
      doc.addPage();
      y = 16;
    }
  };

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(23, 23, 23);
  doc.text('AuraHealth Clinical Intake Summary', margin, y);
  y += 6;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);
  doc.text(
    'AI Symptom Analysis & Pharmacist Medicine Reference Report',
    margin,
    y
  );

  // Date on top right
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin, y, { align: 'right' });
  y += 4;

  // Horizontal divider
  doc.setDrawColor(23, 23, 23);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  // Triage Box
  const triage = analysis.triage || {
    level: 'routine',
    headline: 'Healthcare Consultation',
    timeframe: '24-48 hours',
    actionPoints: [],
  };

  let badgeR = 37,
    badgeG = 99,
    badgeB = 235; // blue
  if (triage.level === 'emergency') {
    badgeR = 225;
    badgeG = 29;
    badgeB = 72;
  } else if (triage.level === 'urgent') {
    badgeR = 217;
    badgeG = 119;
    badgeB = 6;
  } else if (triage.level === 'self_care') {
    badgeR = 5;
    badgeG = 150;
    badgeB = 105;
  }

  // Triage card container
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(badgeR, badgeG, badgeB);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  // Colored left accent bar
  doc.setFillColor(badgeR, badgeG, badgeB);
  doc.rect(margin, y, 3, 26, 'F');

  // Triage text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(badgeR, badgeG, badgeB);
  doc.text(
    `RECOMMENDED TRIAGE TIER: ${triage.level.toUpperCase()} LEVEL`,
    margin + 6,
    y + 6
  );

  doc.setFontSize(11);
  doc.setTextColor(23, 23, 23);
  doc.text(
    doc.splitTextToSize(triage.headline, contentWidth - 12)[0] || '',
    margin + 6,
    y + 12
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(82, 82, 82);
  doc.text(`Action Timeframe: ${triage.timeframe}`, margin + 6, y + 17);

  if (triage.actionPoints && triage.actionPoints.length > 0) {
    const pt = triage.actionPoints[0];
    doc.text(`• ${doc.splitTextToSize(pt, contentWidth - 14)[0]}`, margin + 6, y + 22);
  }
  y += 32;

  // SECTION 1: Patient Reported Symptoms & Profile
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(23, 23, 23);
  doc.text('1. PATIENT REPORTED SYMPTOMS & CLINICAL TIMELINE', margin, y);
  y += 5;

  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(229, 229, 229);
  doc.roundedRect(margin, y, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);
  doc.text('SYMPTOMS:', margin + 4, y + 5);
  doc.text('DURATION:', margin + 70, y + 5);
  doc.text('SEVERITY:', margin + 125, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(23, 23, 23);
  doc.text(
    doc.splitTextToSize(analysis.symptomSummary.symptoms.join(', '), 60)[0] || '',
    margin + 4,
    y + 11
  );
  doc.text(analysis.symptomSummary.duration, margin + 70, y + 11);
  doc.text(`${analysis.symptomSummary.severity} Impact`, margin + 125, y + 11);
  y += 23;

  // Key context answers
  if (analysis.symptomSummary.keyAnswers) {
    checkPageBreak(12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(82, 82, 82);
    const answersText = Object.entries(analysis.symptomSummary.keyAnswers)
      .map(([k, v]) => `${k}: ${v}`)
      .join('  |  ');
    const splitAnswers = doc.splitTextToSize(answersText, contentWidth);
    doc.text(splitAnswers, margin, y);
    y += splitAnswers.length * 4 + 3;
  }

  // SECTION 2: Emergency Warning Signs
  if (analysis.warningSigns && analysis.warningSigns.length > 0) {
    checkPageBreak(25);
    doc.setFillColor(255, 241, 242);
    doc.setDrawColor(254, 205, 211);
    doc.roundedRect(margin, y, contentWidth, 8 + analysis.warningSigns.length * 5, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(159, 18, 57);
    doc.text('CRITICAL WARNING SIGNS TO MONITOR (SEEK ER IF DEVELOPING):', margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    let warnY = y + 10;
    analysis.warningSigns.forEach((w) => {
      const splitW = doc.splitTextToSize(`• ${w}`, contentWidth - 8);
      doc.text(splitW[0] || '', margin + 4, warnY);
      warnY += 4.5;
    });
    y = warnY + 4;
  }

  // SECTION 3: Relevant Tablets & Medicines for Pharmacist Discussion
  checkPageBreak(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(23, 23, 23);
  doc.text('2. RELEVANT TABLETS & MEDICINES (FOR PHARMACIST DISCUSSION)', margin, y);
  y += 5;

  const relevantMeds = selectedSymptoms.map((s) => s.name.toLowerCase());
  const suggested = analysis.suggestedMedicinesForPharmacistReview && analysis.suggestedMedicinesForPharmacistReview.length > 0
    ? analysis.suggestedMedicinesForPharmacistReview
    : [
        {
          name: 'Acetaminophen (Tylenol 500mg Tablets)',
          form: 'Tablet',
          genericName: 'Acetaminophen',
          purpose: 'Analgesic & Antipyretic for pain and fever reduction',
          pharmacistNote: 'First-line non-sedating relief for tension headaches and body aches',
          caution: 'Avoid alcohol and never exceed 4,000mg/day to protect liver health',
        },
        {
          name: 'Ibuprofen (Advil 200mg Tablets)',
          form: 'Tablet',
          genericName: 'Ibuprofen',
          purpose: 'NSAID for inflammatory pain, joint stiffness, and cramps',
          pharmacistNote: 'Take with food or milk to safeguard stomach lining',
          caution: 'Avoid if history of stomach ulcers, kidney disease, or aspirin allergy',
        },
      ];

  suggested.forEach((med) => {
    checkPageBreak(18);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(212, 212, 212);
    doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(23, 23, 23);
    doc.text(`${med.name} [Form: ${med.form}]`, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(82, 82, 82);
    doc.text(`Active: ${med.genericName}  |  Purpose: ${med.purpose}`, margin + 4, y + 9.5);

    doc.setTextColor(180, 83, 9);
    doc.text(`Caution: ${med.caution}`, margin + 4, y + 13.5);

    y += 19;
  });

  // SECTION 4: General Explanations
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(23, 23, 23);
  doc.text('3. POSSIBLE GENERAL EXPLANATIONS (NON-DEFINITIVE)', margin, y);
  y += 5;

  analysis.possibleExplanations.forEach((exp) => {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(38, 38, 38);
    doc.text(`• ${exp.title}`, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(82, 82, 82);
    const splitDesc = doc.splitTextToSize(exp.description, contentWidth);
    doc.text(splitDesc.slice(0, 2), margin + 3, y);
    y += Math.min(splitDesc.length, 2) * 3.5 + 2;
  });

  // SECTION 5: Pharmacist Consultation Questions
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(23, 23, 23);
  doc.text('4. QUESTIONS TO DISCUSS WITH YOUR PHARMACIST OR DOCTOR', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(64, 64, 64);
  analysis.pharmacistConsultationGuide.slice(0, 3).forEach((q, idx) => {
    const splitQ = doc.splitTextToSize(`${idx + 1}. ${q}`, contentWidth);
    doc.text(splitQ, margin, y);
    y += splitQ.length * 3.8 + 1;
  });

  // Mandatory Disclaimer
  checkPageBreak(20);
  y += 3;
  doc.setDrawColor(23, 23, 23);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(115, 115, 115);
  doc.text('MANDATORY HEALTHCARE DISCLAIMER:', margin, y);
  y += 3.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  const splitDisclaimer = doc.splitTextToSize(
    `"${analysis.mandatoryDisclaimer}"`,
    contentWidth
  );
  doc.text(splitDisclaimer, margin, y);

  // Save the PDF file
  const fileName = `AuraHealth_Clinical_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
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
    const htmlContent = generatePrintableHtml(analysis, selectedSymptoms);

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
          }, 60000);
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
 * Internal clean HTML generator for iframe-based native printing
 */
function generatePrintableHtml(
  analysis: AIHealthAnalysis,
  selectedSymptoms: Symptom[]
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const triage = analysis.triage || {
    level: 'routine',
    headline: 'Healthcare Consultation',
    timeframe: '24-48 hours',
    actionPoints: [],
  };

  const triageColor =
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
  <title>AuraHealth - Clinical Health Report</title>
  <style>
    @page { size: A4; margin: 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #171717; background: #fff; line-height: 1.45; font-size: 12px; margin: 0; padding: 15px; }
    .header { border-bottom: 2px solid #171717; padding-bottom: 10px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end; }
    .title { font-size: 20px; font-weight: 700; margin: 0; color: #171717; }
    .triage-box { border-left: 5px solid ${triageColor}; background: #fafafa; border: 1px solid #e5e5e5; border-left-width: 5px; padding: 10px 12px; margin-bottom: 14px; page-break-inside: avoid; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e5e5e5; padding-bottom: 3px; margin: 14px 0 8px 0; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: #f5f5f5; padding: 8px; border-radius: 4px; margin-bottom: 8px; }
    .card { border: 1px solid #e5e5e5; border-radius: 4px; padding: 8px 10px; margin-bottom: 6px; page-break-inside: avoid; }
    .pill { display: inline-block; background: #fff; border: 1px solid #d4d4d4; border-radius: 3px; padding: 1px 5px; font-size: 11px; margin: 2px 2px 2px 0; font-weight: 600; }
    .tablet-badge { background: #171717; color: #fff; font-size: 9px; font-weight: 700; text-transform: uppercase; padding: 2px 5px; border-radius: 3px; display: inline-block; margin-right: 4px; }
    .disclaimer { border-top: 1.5px solid #171717; padding-top: 8px; margin-top: 20px; font-size: 9.5px; color: #525252; page-break-inside: avoid; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">AuraHealth Clinical Intake Summary</h1>
      <div style="font-size:10px; color:#525252;">AI Symptom Analysis & Pharmacist Medicine Reference Report</div>
    </div>
    <div style="font-size:10px; color:#737373; text-align:right;">
      <strong>Date:</strong> ${currentDate}
    </div>
  </div>

  <div class="triage-box" style="border-left-color: ${triageColor};">
    <div style="font-size:9px; font-weight:700; color:${triageColor}; text-transform:uppercase;">${triage.level.toUpperCase()} TIER</div>
    <div style="font-size:14px; font-weight:700; margin: 2px 0;">${triage.headline}</div>
    <div style="font-size:10px; color:#525252; margin-bottom:4px;">Window: ${triage.timeframe}</div>
    <ul style="margin:0; padding-left:16px;">
      ${triage.actionPoints.map((p) => `<li>${p}</li>`).join('')}
    </ul>
  </div>

  <div class="section-title">1. Patient Reported Symptoms</div>
  <div class="grid">
    <div>
      <span style="font-size:9px; text-transform:uppercase; color:#737373; font-weight:700; display:block;">Symptoms</span>
      ${analysis.symptomSummary.symptoms.map((s) => `<span class="pill">${s}</span>`).join('')}
    </div>
    <div>
      <span style="font-size:9px; text-transform:uppercase; color:#737373; font-weight:700; display:block;">Duration</span>
      <strong>${analysis.symptomSummary.duration}</strong>
    </div>
    <div>
      <span style="font-size:9px; text-transform:uppercase; color:#737373; font-weight:700; display:block;">Severity</span>
      <strong>${analysis.symptomSummary.severity} Impact</strong>
    </div>
  </div>

  ${
    analysis.warningSigns && analysis.warningSigns.length > 0
      ? `<div style="background:#fff1f2; border:1px solid #fecdd3; padding:8px 10px; border-radius:4px; margin-bottom:10px; color:#9f1239;">
          <strong>CRITICAL WARNING SIGNS TO MONITOR:</strong>
          <ul style="margin:2px 0 0 0; padding-left:16px;">
            ${analysis.warningSigns.map((w) => `<li>${w}</li>`).join('')}
          </ul>
        </div>`
      : ''
  }

  <div class="section-title">2. Relevant Tablets & Medicines (For Pharmacist Discussion)</div>
  <div style="font-size:10.5px; color:#525252; margin-bottom:6px;">
    The following verified over-the-counter tablets and remedies are commonly indicated for the symptoms reported. Consult your pharmacist before initiating therapy.
  </div>
  ${selectedSymptoms.slice(0, 3).map((sym) => `
    <div class="card">
      <div><span class="tablet-badge">Tablet / Oral Remedy</span> <strong>Medication consideration for: ${sym.name}</strong></div>
      <div style="color:#525252; font-size:10px; margin-top:2px;">Discuss appropriate OTC analgesic, antihistamine, or gastrointestinal tablets with the dispensing pharmacist.</div>
    </div>
  `).join('')}

  <div class="section-title">3. Questions for Your Pharmacist or Doctor</div>
  <ul style="margin:0; padding-left:16px;">
    ${analysis.pharmacistConsultationGuide.slice(0, 4).map((q) => `<li>${q}</li>`).join('')}
  </ul>

  <div class="disclaimer">
    <strong>MANDATORY DISCLAIMER:</strong> "${analysis.mandatoryDisclaimer}"
  </div>
</body>
</html>`;
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

4. SUGGESTED TABLETS & MEDICINES (FOR PHARMACIST REVIEW)
- Acetaminophen 500mg Tablets: Pain/fever relief
- Ibuprofen 200mg Tablets: Inflammatory pain/swelling
- Cetirizine 10mg Tablets: Allergic rhinitis & hives
- Famotidine 20mg Tablets: Acid indigestion & heartburn
- Guaifenesin 600mg Tablets: Chest congestion & mucus clearance
(Consult a pharmacist or physician before taking any medication)

5. QUESTIONS FOR YOUR DOCTOR OR PHARMACIST
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
