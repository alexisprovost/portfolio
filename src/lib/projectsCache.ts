import { API_URLS } from "./constants";

let cachedProjects: any[] | null = null;
let cacheLocale: string | null = null;
let fetchPromise: Promise<any[]> | null = null;

async function fetchProjectsData(locale: string): Promise<any[]> {
  const lang = locale.split("-")[0];

  try {
    const response = await fetch(`${API_URLS.projects}${lang}/projects`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error();
    return await response.json();
  } catch {
    const fallbackResponse = await fetch(`${API_URLS.fallback}${lang}/projects`);
    if (!fallbackResponse.ok) throw new Error();
    return await fallbackResponse.json();
  }
}

export function prefetchProjects(locale: string) {
  if (cachedProjects && cacheLocale === locale) return;
  if (fetchPromise && cacheLocale === locale) return;

  cacheLocale = locale;
  fetchPromise = fetchProjectsData(locale)
    .then((data) => {
      cachedProjects = data;
      return data;
    })
    .catch(() => {
      fetchPromise = null;
      return [];
    });
}

export function getProjectsCache(locale: string): { data: any[] | null; fetch: () => Promise<any[]> } {
  if (cachedProjects && cacheLocale === locale) {
    return { data: cachedProjects, fetch: () => Promise.resolve(cachedProjects!) };
  }

  if (fetchPromise && cacheLocale === locale) {
    return { data: null, fetch: () => fetchPromise! };
  }

  cacheLocale = locale;
  fetchPromise = fetchProjectsData(locale).then((data) => {
    cachedProjects = data;
    return data;
  });

  return { data: null, fetch: () => fetchPromise! };
}

export function invalidateProjectsCache() {
  cachedProjects = null;
  cacheLocale = null;
  fetchPromise = null;
}
