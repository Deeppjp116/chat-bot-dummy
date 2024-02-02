// app.js
require('dotenv').config();
const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');

const app = express();
const PORT = 9999;
const credentialsPath = path.join(
  __dirname,
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

const sessionClient = new SessionsClient({
  keyFilename: credentialsPath,
});

app.use(express.json());


app.get('/', (req, res) => {
  async function detectIntent(projectId, sessionId, query) {
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US',
        },
      },
    };

    try {
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      console.log('Response:', result);
      res.send(result);
    } catch (error) {
      console.error('Error processing request:', error);
    }
  }

  const projectId = 'deno-chatbot-grfc';
  const sessionId = 'your-unique-session-id';
  const query = 'two lassi';

  detectIntent(projectId, sessionId, query);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} `);
});
