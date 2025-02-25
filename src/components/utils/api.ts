/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequestParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string> | null;
}

export interface BackendResponseFormat<T> {
  statusCode: number;
  message: number;
  data: T;
}

export async function request(params: RequestParams) {
  const { url, method, body } = params;

  const isFormData = body instanceof FormData;
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_PATH;
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: method || "GET",
      body: isFormData ? body : JSON.stringify(body),
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      let error;
      try {
        const errorData = await response.json();
        error = new Error(
          errorData.message ||
            errorData.error ||
            errorData.errors ||
            response.statusText
        );
        (error as any).data = errorData;
      } catch {
        error = new Error(response.statusText);
      }

      throw error;
    }
  } catch (error) {
    console.log(error);
  }
}
