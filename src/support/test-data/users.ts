/**
 * Central place for reusable test data.
 *
 * Replace these values with the confirmed progression credentials once provided.
 * Never hardcode credentials directly in feature files or step definitions —
 * always reference them from here (or from .env for secrets like passwords).
 */
export const Users = {
  zincUser: {
    email: "casey@zinc.test",
    password: "Passw0rd!"
  }
} as const;

export type User = (typeof Users)[keyof typeof Users];

