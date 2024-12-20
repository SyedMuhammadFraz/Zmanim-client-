export const getGrsit = async () => {
  const API_URL = 'https://lakewoodluach.getgrist.com/api/docs/mfG1uWuVC9zwM1kapuvW1U/tables/Shuls/data';
  const API_KEY = '75556160058f1b29607ff9421a798f89039dbc42'; // Replace with your actual API key

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`, // Assuming Bearer token authorization
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Grsit data:', error);
    throw error;
  }
};
