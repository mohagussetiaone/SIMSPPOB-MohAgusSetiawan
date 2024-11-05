import localforage from 'localforage';

// Function to set the authentication token
export function setToken(token: string): Promise<string> {
  return localforage.setItem('authToken', token);
}

// Function to remove the authentication token
export async function removeToken(): Promise<void> {
  return localforage.removeItem('authToken');
}

// Function to clear all storage
export async function clearAllStorage(): Promise<void> {
  localStorage.clear();
  sessionStorage.clear();
  try {
    await localforage.clear();
  } catch (error) {
    throw error;
  }
}
