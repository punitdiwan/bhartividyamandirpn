const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path, school_id } = req.body;

  if (!path) {
    return res.status(400).json({ error: 'Path is required' });
  }

  const ERP_BASE_URL = 'https://schoolscoop-supa-git-mkmay1-acef3f-school-scoop-indias-projects.vercel.app';

  try {
    const response = await axios.post(`${ERP_BASE_URL}${path}`, {
      // school_id: school_id || 'technicaltesting'
      school_id: 'bhartividyamandirpn'
    }, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.SERVICE_ROLE_KEY}`
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q`
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('ERP Proxy Error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
  }
}
