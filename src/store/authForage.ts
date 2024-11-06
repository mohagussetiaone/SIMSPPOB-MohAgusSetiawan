import localforage from 'localforage';

export function setToken(token: string): Promise<string> {
  return localforage.setItem('authToken', token);
}

export async function clearAllStorage(): Promise<void> {
  localStorage.clear();
  sessionStorage.clear();
  try {
    await localforage.clear();
  } catch (error) {
    throw error;
  }
}
