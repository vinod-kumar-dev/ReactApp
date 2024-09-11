const getApi = async function getJSON<T>(config: { url: string }): Promise<{ status: number, body: T }> {
  const fetchConfig = { method: 'GET' };
  const response = await fetch(config.url, fetchConfig);
  const body = await response.json() as T;
  const status = await response.status;
  return { status, body };
}
const postApi = async function postJSON<T>(config: { url: string; body: any; }): Promise<T> {
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.body),
  };

  const response = await fetch(config.url, fetchConfig);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
export { getApi, postApi };
