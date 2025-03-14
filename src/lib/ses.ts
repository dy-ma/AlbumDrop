import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const REGION = "us-west-1" // n california

export const sesClient = new SESClient({ region: REGION });

export async function sendEmail({ from, to, subject, body }: { from?: string, to: string, subject: string, body: string }) {
  await sesClient.send(new SendEmailCommand({
    Source: from || "noreply@dyma.dev",
    Destination: {
      ToAddresses: [
        to
      ]
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: subject
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: body
        }
      }
    }
  }))
}