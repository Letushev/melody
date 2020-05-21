const API_URL = 'http://localhost:4000'

export const fetchGQL = ({ operation, ...variables }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = localStorage.getItem('authToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body = { query: operation };
  if (variables) {
    body = {
      query: operation,
      variables
    };
  }

  return fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json());
};
