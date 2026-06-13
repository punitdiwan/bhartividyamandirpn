import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { IncomingForm } from 'formidable'
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const env = loadEnv('', process.cwd(), '');

const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/school-data') && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const { path, school_id } = JSON.parse(body);
            const ERP_BASE_URL = 'https://schoolscoop-supa-git-mkmay1-acef3f-school-scoop-indias-projects.vercel.app';

            const response = await axios.post(`${ERP_BASE_URL}${path}`, {
              // school_id: school_id || 'technicaltesting'
              school_id: 'bhartividyamandirpn'
            }, {
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${env.SERVICE_ROLE_KEY}`
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q`
              }
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.data));
          } catch (error) {
            console.error('ERP Proxy Error:', error.response?.data || error.message);
            res.statusCode = error.response?.status || 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(error.response?.data || { error: error.message }));
          }
        });
      } else if (req.url.startsWith('/api/teacher_application') && req.method === 'POST') {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Form parsing error' }));
            return;
          }

          try {
            const baseUrl = 'https://cms.maitretech.com';
            const school = 'bhartividyamandirpn';
            const apiToken = 'UKmjTqR4xJP7uXncUdNXpDNP';

            const uploadFile = async (fileKey) => {
              if (!files[fileKey]) return null;
              const file = Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey];

              const filePayload = new FormData();
              filePayload.append('data', fs.readFileSync(file.filepath), {
                filename: file.originalFilename,
                contentType: file.mimetype,
              });

              const res = await axios.post(`${baseUrl}/${school}/files`, filePayload, {
                headers: {
                  ...filePayload.getHeaders(),
                  'Authorization': `Bearer ${apiToken}`
                }
              });
              return res.data.data.id;
            };

            const resumeId = await uploadFile('resume');
            const photoId = await uploadFile('passport_photo');

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

            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.data));
          } catch (error) {
            res.statusCode = error.response?.status || 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(error.response?.data || { error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [
    apiPlugin(),
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {}]
        ]
      }
    })
  ]
})
