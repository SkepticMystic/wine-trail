import { SMTP_PASSWORD, SMTP_USERNAME } from "$env/static/private";
import { Message, type MessageHeaders, SMTPClient } from "emailjs";

// TODO: Change this to the actual email address
const Source = "hello@yogalist.co.za";

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
    from: Source,
    text,
    subject,
    attachment,
  });

  const { isValid, validationError } = msg.checkValidity();
  console.assert(isValid, validationError);

  return client.sendAsync(msg);
}
