const getApi = function getJSON<T>(config: { url: string }): Promise<T> {
  const fetchConfig = { method: 'GET' };
  return fetch(config.url, fetchConfig)
    .then(response => response.json() as T);
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
