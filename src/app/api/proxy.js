import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow the methods you need
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization and Content-Type headers
  origin: '*',  // Allow requests from all origins, change this to a specific origin if needed
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const { method } = req;

  // Handle OPTIONS preflight request (needed for CORS)
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET and POST requests
  if (method !== 'GET' && method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Run the CORS middleware
    await runMiddleware(req, res, cors);

    // Forward the request to the Grist API
    const response = await fetch(
      'https://lakewoodluach.getgrist.com/api/docs/mfG1uWuVC9zwM1kapuvW1U/tables/Shuls/data',
      {
        method: 'GET',  // Change this to 'POST' if you need to send data in the request body
        headers: {
          Authorization: `Bearer 75556160058f1b29607ff9421a798f89039dbc42`, // Replace with your actual API key
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle the response from Grist
    if (!response.ok) {
      throw new Error(`Failed to fetch data from Grist: ${response.statusText}`);
    }

    const data = await response.json();

    // Pass through the response from Grist
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching data from Grist:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
}
