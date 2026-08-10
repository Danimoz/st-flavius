import 'server-only';

import nodemailer, { type SendMailOptions, type Transporter } from 'nodemailer';

let gmailTransporter: Transporter | undefined;

function getGmailCredentials() {
  const user = process.env.EMAIL_SEND_CREDENTIAL;
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) return null;
  return { user, pass };
}

function getGmailTransporter(credentials: { user: string; pass: string }) {
  if (!gmailTransporter) {
    gmailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: credentials,
    });
  }
  return gmailTransporter;
}

export async function sendParishEmail(options: Omit<SendMailOptions, 'from' | 'to'>) {
  const credentials = getGmailCredentials();
  if (!credentials) {
    throw new Error('Gmail delivery is not configured. Set EMAIL_USERNAME and GMAIL_APP_PASSWORD.');
  }

  return getGmailTransporter(credentials).sendMail({
    ...options,
    from: `St. Flavius Catholic Church <${credentials.user}>`,
    to: process.env.EMAIL_USERNAME,
  });
}
