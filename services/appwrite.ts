import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

/*
 * Centralised Appwrite SDK instance.
 * Values come from the runtime environment so make sure they are defined either via
 *   - .env loaded through `react-native-dotenv` (development), or
 *   - Expo `extra` values (CI / EAS build).
 */

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  // Fail fast – you don't want to run the app without backend connectivity.
  throw new Error('Missing Appwrite configuration. Did you set APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID?');
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// Convenience export of the underlying client in case you need to customise.
export { client };

