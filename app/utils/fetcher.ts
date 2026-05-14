type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetcher = async (
  method: Method,
  url: string | undefined,
  params?: object
) => {
  if (!url) {
    throw new Error("fetcher: url is required");
  }
  const isGet = method.toUpperCase() === "GET";
  let finalUrl = url;
  let body: string | undefined;

  if (params) {
    if (isGet) {
      const search = new URLSearchParams();
      for (const [k, v] of Object.entries(params as Record<string, unknown>)) {
        if (v !== undefined && v !== null) search.append(k, String(v));
      }
      finalUrl = `${url}?${search.toString()}`;
    } else {
      body = JSON.stringify(params);
    }
  }

  const res = await fetch(finalUrl, {
    method,
    ...(body !== undefined && {
      body,
      headers: {"Content-Type": "application/json"},
    }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};
