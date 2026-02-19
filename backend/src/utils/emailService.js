const sgMail = require('@sendgrid/mail');
const env = require('../config/env');
const AppError = require('./AppError');

const ensureEmailConfig = () => {
  if (!env.sendgridApiKey || !env.emailFrom) {
    throw new AppError(
      'Missing email config. Add SENDGRID_API_KEY and EMAIL_FROM to backend .env.',
      500
    );
  }

  sgMail.setApiKey(env.sendgridApiKey);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimitError = (error) => {
  return error?.code === 429 || error?.response?.statusCode === 429;
};

const splitIntoBatches = (items, batchSize) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += batchSize) {
    chunks.push(items.slice(index, index + batchSize));
  }

  return chunks;
};

const sendEmailToRecipient = async ({ to, subject, message }) => {
  let attempt = 0;

  while (attempt <= env.sendgridMaxRetries) {
    try {
      await sgMail.send({
        to,
        from: env.emailFrom,
        subject,
        text: message
      });

      return { success: true };
    } catch (error) {
      const shouldRetry = isRateLimitError(error) && attempt < env.sendgridMaxRetries;

      if (!shouldRetry) {
        const providerMessage = error?.response?.body || error.message;
        console.error(`SendGrid failed for ${to}:`, providerMessage);
        return { success: false };
      }

      const backoffMs = env.sendgridBaseBackoffMs * 2 ** attempt;
      await wait(backoffMs);
      attempt += 1;
    }
  }

  return { success: false };
};

const sendBulkEmailInBatches = async ({ recipients, subject, message, batchSize = 50 }) => {
  ensureEmailConfig();

  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new AppError('No recipients found for this class.', 404);
  }

  const batches = splitIntoBatches(recipients, batchSize);
  let successCount = 0;
  let failureCount = 0;

  for (const batch of batches) {
    const results = await Promise.all(
      batch.map(async (recipientEmail) =>
        sendEmailToRecipient({
          to: recipientEmail,
          subject,
          message
        })
      )
    );

    for (const result of results) {
      if (result.success) {
        successCount += 1;
      } else {
        failureCount += 1;
      }
    }

    await new Promise((resolve) => setImmediate(resolve));
  }

  return { successCount, failureCount };
};

module.exports = {
  sendBulkEmailInBatches
};
