import { SMTP_PASSWORD, SMTP_USERNAME } from "$env/static/private";
import { APP_CONTACT_INFO } from "$lib/const/contact";
import { Message, SMTPClient, type MessageHeaders } from "emailjs";

const client = new SMTPClient({
  user: SMTP_USERNAME,
  password: SMTP_PASSWORD,
  host: `smtpout.secureserver.net`,
  ssl: true,
  port: 465,
});

export function sendEmail(
  { subject, text, to, attachment }: Partial<MessageHeaders>,
) {
  const msg = new Message({
    to,
    text,
    subject,
    attachment,
    from: APP_CONTACT_INFO.email,
  });

  const { isValid, validationError } = msg.checkValidity();
  console.assert(isValid, validationError);

  return client.sendAsync(msg);
}
