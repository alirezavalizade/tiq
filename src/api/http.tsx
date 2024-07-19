interface HttpArgs {
  url: string;
  params?: Record<string | number, string | number>;
}

interface HttpResponse<T> {
  data?: T;
  error?: string;
}

export async function http<T>(args: HttpArgs): Promise<HttpResponse<T>> {
  const baseURL = window.location.href;
  const url = new URL(baseURL);

  url.pathname = args.url;

  if (args.params) {
    url.search = new URLSearchParams(args.params).toString();
  }

  try {
    const response = await fetch(url.toString());

    if (response.ok) {
      const data = await response.json();
      return { data };
    }

    throw new Error(response.statusText);
  } catch (e) {
    return { error: (e as Error).message };
  }
}
