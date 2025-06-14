const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const postData = async <T = any>(endpoint: string, data: object): Promise<T> => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
export async function postFile(url: string, formData: FormData) {
  const fullUrl = `${API_BASE}${url}`;
  console.log('📤 Uploading to:', fullUrl); // debug đường dẫn

  const res = await fetch(fullUrl, {
    method: 'POST',
    body: formData, // ✅ KHÔNG set headers ở đây
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ Upload error:', errorText);
    throw new Error(errorText || 'Upload thất bại');
  }

  return await res.json();
}


export const getData = async <T = any>(endpoint: string): Promise<T> => {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
