function jsonInit(method: string, body?: unknown): RequestInit {
  return {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Something went wrong. Please try again.");
  }
  return res.json().catch(() => null as T);
}

export const apiClient = {
  get: <T,>(url: string) => requestJson<T>(url),
  post: <T,>(url: string, body?: unknown) => requestJson<T>(url, jsonInit("POST", body)),
  patch: <T,>(url: string, body?: unknown) => requestJson<T>(url, jsonInit("PATCH", body)),
  delete: <T,>(url: string) => requestJson<T>(url, { method: "DELETE" }),
  upload: <T,>(url: string, formData: FormData) => requestJson<T>(url, { method: "POST", body: formData }),
};
