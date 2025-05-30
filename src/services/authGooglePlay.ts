import { google } from 'googleapis';
import { env } from '../services';
import { JWT } from 'google-auth-library';

export function authGooglePlay() {
  try {
    google.options({
      auth: new JWT(
        env.GOOGLE_CLIENT_EMAIL,
        '',
        env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/androidpublisher']
      ),
    });

    const androidPublisher = google.androidpublisher({
      version: 'v3',
    });

    return {
      androidPublisher,
    };
  } catch (error: any) {
    throw new Error(
      `Failed to initialize Google Play authentication: ${
        error || 'Unknown error'
      }`
    );
  }
}
