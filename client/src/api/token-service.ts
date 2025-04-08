const TOKEN_KEY = 'access_token';

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime) {
      clearToken();
      return null;
    }
    return token;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  };
}

