export default async function handler(req, res) {
    const { method } = req;

    // Only allow GET requests
    if (method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Forward the request to the Grist API
        const response = await fetch(
            'https://lakewoodluach.getgrist.com/api/docs/mfG1uWuVC9zwM1kapuvW1U/tables/Shuls/data',
            {
                method: 'GET',
                headers: {
                    Authorization: `75556160058f1b29607ff9421a798f89039dbc42`, // Replace with your actual API key
                    'Content-Type': 'application/json',
                },
            }
        );

        // Pass through the response from Grist
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error fetching data from Grist:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}
