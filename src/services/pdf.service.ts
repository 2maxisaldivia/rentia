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

const drawSectionTitle = (pdf: jsPDF, title: string, y: number) => {
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, y, 170, 10, 2, 2, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(30, 30, 30);
  pdf.text(title, 25, y + 6.5);

  return y + 18;
};

const drawField = (pdf: jsPDF, label: string, value: string, y: number) => {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  pdf.text(`${label}:`, 25, y);

  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(20, 20, 20);

  const lines = pdf.splitTextToSize(value, 125);

  pdf.text(lines, 62, y);

  return y + Math.max(lines.length * 5, 8);
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
