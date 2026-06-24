import { jsPDF } from 'jspdf';

import type { Contract } from '../shared/types/Contract';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const PAGE_TOP = 20;
const PAGE_BOTTOM = 277;

const ensurePageSpace = (pdf: jsPDF, y: number, requiredHeight: number) => {
  if (y + requiredHeight <= PAGE_BOTTOM) {
    return y;
  }

  pdf.addPage();

  return PAGE_TOP;
};

const drawSectionTitle = (pdf: jsPDF, title: string, y: number) => {
  const safeY = ensurePageSpace(pdf, y, 18);

  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, safeY, 170, 10, 2, 2, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(30, 30, 30);
  pdf.text(title, 25, safeY + 6.5);

  return safeY + 18;
};

const drawField = (pdf: jsPDF, label: string, value: string, y: number) => {
  const normalizedValue = value || 'No informado';
  const lines = pdf.splitTextToSize(normalizedValue, 125);
  const fieldHeight = Math.max(lines.length * 5, 8);
  const safeY = ensurePageSpace(pdf, y, fieldHeight);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  pdf.text(`${label}:`, 25, safeY);

  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(20, 20, 20);

  pdf.text(lines, 62, safeY);

  return safeY + fieldHeight;
};

export const downloadContractPdf = (contract: Contract) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let y = 20;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(25, 25, 25);
  pdf.text('CONTRATO DE ALQUILER', 20, y);

  y += 9;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(90, 90, 90);
  pdf.text('Documento ficticio generado por Rentia.', 20, y);

  y += 14;

  pdf.setDrawColor(220, 220, 220);
  pdf.line(20, y, 190, y);

  y += 12;

  y = drawSectionTitle(pdf, 'DATOS DE LA PROPIEDAD', y);

  y = drawField(pdf, 'Propiedad', contract.property.title, y);
  y = drawField(pdf, 'Tipo', contract.property.type, y);
  y = drawField(pdf, 'Dirección', contract.property.address, y);
  y = drawField(pdf, 'Ubicación', contract.property.location, y);

  y += 7;

  y = drawSectionTitle(pdf, 'PARTES DEL CONTRATO', y);

  y = drawField(pdf, 'Propietario', contract.owner.fullName, y);
  y = drawField(pdf, 'Email del propietario', contract.owner.email, y);

  y += 4;

  y = drawField(pdf, 'Inquilino', contract.tenant.fullName, y);
  y = drawField(pdf, 'Email del inquilino', contract.tenant.email, y);

  if (contract.rentalApplication) {
    const application = contract.rentalApplication;

    y += 7;

    y = drawSectionTitle(pdf, 'DATOS DEL INQUILINO', y);

    y = drawField(pdf, 'DNI', application.dni, y);
    y = drawField(pdf, 'Teléfono', application.phone, y);
    y = drawField(pdf, 'Estado civil', application.maritalStatus, y);
    y = drawField(pdf, 'Ocupación', application.occupation, y);
    y = drawField(
      pdf,
      'Domicilio laboral',
      application.workAddressNotApplicable
        ? 'No aplica (trabajo remoto o sin domicilio laboral)'
        : (application.workAddress ?? 'No informado'),
      y,
    );

    y += 7;

    y = drawSectionTitle(pdf, 'DOCUMENTACIÓN PRESENTADA', y);

    y = drawField(pdf, 'Foto del DNI', application.dniImageUrl, y);
    y = drawField(pdf, 'Recibo de sueldo 1', application.salaryReceiptUrls[0], y);
    y = drawField(pdf, 'Recibo de sueldo 2', application.salaryReceiptUrls[1], y);

    application.guarantors.forEach((guarantor, index) => {
      y += 7;
      y = drawSectionTitle(pdf, `GARANTE ${index + 1}`, y);
      y = drawField(pdf, 'Nombre y apellido', guarantor.fullName, y);
      y = drawField(pdf, 'DNI', guarantor.dni, y);
      y = drawField(pdf, 'Teléfono', guarantor.phone, y);
      y = drawField(pdf, 'Ocupación', guarantor.occupation, y);
    });
  }

  y += 7;

  y = drawSectionTitle(pdf, 'CONDICIONES PRINCIPALES', y);

  y = drawField(pdf, 'Alquiler mensual', formatPrice(contract.monthlyAmount), y);

  y = drawField(
    pdf,
    'Vigencia',
    `${formatDate(contract.startDate)} al ${formatDate(contract.endDate)}`,
    y,
  );

  y = drawField(pdf, 'Estado', 'Contrato activo', y);

  y += 10;
  y = ensurePageSpace(pdf, y, 30);

  pdf.setDrawColor(220, 220, 220);
  pdf.line(20, y, 190, y);

  y += 10;

  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);

  const disclaimer =
    'Este documento fue generado con fines demostrativos para el proyecto académico Rentia y no constituye un contrato legal válido.';

  const disclaimerLines = pdf.splitTextToSize(disclaimer, 170);

  pdf.text(disclaimerLines, 20, y);

  const fileName = `contrato-${contract.property.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}.pdf`;

  pdf.save(fileName);
};
