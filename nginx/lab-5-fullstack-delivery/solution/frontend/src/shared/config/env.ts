const fallbackUrl = 'http://localhost:3000/api/v1';
const rawUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const env = {
  apiBaseUrl: rawUrl || fallbackUrl,
};
