import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const REGION = "us-west-1" // n california

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_KEY) {
  throw new Error("Missing AWS Credentials in Environment Variables")
}

export const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  }
});

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