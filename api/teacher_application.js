const { IncomingForm } = require('formidable');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser is necessary for forrnadible to work
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable Error:', err);
      return res.status(500).json({ error: 'Error parsing form' });
    }

    try {
      const baseUrl = process.env.VITE_BASE_URL || 'https://cms.maitretech.com';
      const school = process.env.VITE_SCHOOL || 'bhartividyamandirpn';
      // const apiToken = process.env.VITE_API_TOKEN; // Loaded from .env
      const apiToken = "UKmjTqR4xJP7uXncUdNXpDNP";

      const uploadFile = async (fileKey) => {
        if (!files[fileKey]) return null;
        const file = Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey];

        const filePayload = new FormData();
        filePayload.append('data', fs.readFileSync(file.filepath), {
          filename: file.originalFilename,
          contentType: file.mimetype,
        });

        console.log(`Uploading ${fileKey} with token...`);
        const res = await axios.post(`${baseUrl}/${school}/files`, filePayload, {
          headers: {
            ...filePayload.getHeaders(),
            'Authorization': `Bearer ${apiToken}`
          }
        });

        return res.data.data.id;
      };

      // Step 1: Upload Files
      const resumeId = await uploadFile('resume');
      const photoId = await uploadFile('passport_photo');

      // Step 2: Submit Form Data
      const cmsUrl = `${baseUrl}/${school}/items/teacher_job_application`;
      const finalData = {};

      Object.keys(fields).forEach((key) => {
        const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        if (value === 'true') finalData[key] = true;
        else if (value === 'false') finalData[key] = false;
        else finalData[key] = value;
      });

      if (resumeId) finalData.resume = resumeId;
      if (photoId) finalData.passport_photo = photoId;

      const response = await axios.post(cmsUrl, finalData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Two-Step Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  });
}
