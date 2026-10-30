async function request(path, method = 'GET', body) {
  const res = await fetch('/api' + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra');
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, 'POST', body),
  put: (path, body) => request(path, 'PUT', body),
  del: (path) => request(path, 'DELETE')
};