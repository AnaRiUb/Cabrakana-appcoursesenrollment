const BASE_URL = process.env.REACT_APP_API_URL || 'sv-okqeu9h5xb.cloud.elastika.pe:4000';

export const fetchData = async (endpoint: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error('Error fetching data');
  return await response.json();
};
