// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const { log } = require('console');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 9999;
const credentialsPath = path.join(
  __dirname,
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

const sessionClient = new SessionsClient({
  keyFilename: credentialsPath,
});

app.post('/', (req, res) => {
  const requestData = req.body && req.body.text;
  console.log(requestData);

  if (!requestData) {
    return res
      .status(400)
      .send({ error: 'Text is required in the request body.' });
  }

  async function detectIntent(projectId, sessionId, requestData) {
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: requestData,
          languageCode: 'en-US',
        },
      },
    };

    try {
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      // console.log('Response:', result);
      res.send(result);
    } catch (error) {
      console.error('Error processing request:', error);
    }
  }

  const projectId = 'deno-chatbot-grfc';
  const sessionId = 'your-unique-session-id';
  const query = 'two lassi';

  detectIntent(projectId, sessionId, requestData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} `);
});
