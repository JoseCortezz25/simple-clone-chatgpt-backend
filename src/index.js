require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/prompt', async (req, res) => {
  console.log('Prompt recibido');
  const configuration = new Configuration({
    organization: "org-mRa5t0KWGRiD58SsZqWUwTCA",
    apiKey: process.env.OPENAI_API_KEY,
  })
  
  const openai = new OpenAIApi(configuration)
  const prompt = req.body.text;
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    max_tokens: 2048,
    temperature: 0.5
  });

  
  console.log('Respuesta enviada');
  res.json({
    message: completion.data.choices[0].text
  })
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
