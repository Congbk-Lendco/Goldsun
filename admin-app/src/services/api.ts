const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getData(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
}

export async function postData(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return res.json();
}

export async function putData(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
  return res.json();
}

export async function deleteData(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
  return res.json();
}
