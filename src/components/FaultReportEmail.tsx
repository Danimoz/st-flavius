import type { ReactElement } from 'react';
import type { FaultReportData } from '@/libs/validations';

type FaultReportEmailProps = FaultReportData & {
  attachmentNames: string[];
};

const labelStyle = { color: '#6f2633', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const };
const valueStyle = { color: '#211d19', fontSize: '16px', lineHeight: '24px', margin: '4px 0 18px' };

export function FaultReportEmail({
  fullName,
  phone,
  role,
  organisation,
  observedAt,
  location,
  category,
  equipment,
  briefSummary,
  description,
  severity,
  safetyRisks: risks,
  attachmentNames,
}: FaultReportEmailProps): ReactElement {
  return (
    <div style={{ backgroundColor: '#f2ece2', fontFamily: 'Arial, sans-serif', padding: '28px' }}>
      <div style={{ backgroundColor: '#181613', borderTop: '4px solid #c9a760', color: '#ffffff', padding: '24px' }}>
        <p style={{ color: '#c9a760', fontSize: '12px', letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Facility &amp; equipment</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', margin: '8px 0 0' }}>New fault report</h1>
      </div>
      <div style={{ backgroundColor: '#ffffff', padding: '28px' }}>
        <p style={labelStyle}>Urgency</p><p style={valueStyle}>{severity}</p>
        <p style={labelStyle}>Summary</p><p style={valueStyle}>{briefSummary}</p>
        <p style={labelStyle}>Location</p><p style={valueStyle}>{location}</p>
        <p style={labelStyle}>Category / equipment</p><p style={valueStyle}>{category}{equipment ? ` — ${equipment}` : ''}</p>
        <p style={labelStyle}>Observed</p><p style={valueStyle}>{observedAt}</p>
        <p style={labelStyle}>Description</p><p style={{ ...valueStyle, whiteSpace: 'pre-wrap' }}>{description}</p>
        <p style={labelStyle}>Immediate safety risk</p><p style={valueStyle}>{risks.join(', ')}</p>
        <hr style={{ border: 0, borderTop: '1px solid #d8cdbd', margin: '24px 0' }} />
        <p style={labelStyle}>Reported by</p><p style={valueStyle}>{fullName} · {phone}<br />{role}{organisation ? ` · ${organisation}` : ''}</p>
        <p style={labelStyle}>Evidence attached</p><p style={valueStyle}>{attachmentNames.length ? attachmentNames.join(', ') : 'No files attached'}</p>
      </div>
    </div>
  );
}
