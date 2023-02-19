require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  organization: "org-mRa5t0KWGRiD58SsZqWUwTCA",
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

app.post('/api/prompt', async (req, res) => {
  console.log('Prompt recibido');

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

app.post('/api/image/prompt', async (req, res) => {
  try {
    const prompt = req.body.text;
    console.log('📦 prompt:', prompt);
    
    const response = await openai.createImage({
      prompt: `The drawing must have the style "pencil sketch storyboard" and must follow the following instruction: ${prompt}`,
      n: 1,
      size: "1024x1024",
    });

    res.json({
      image: response.data.data[0].url
    })
  } catch (error) {
    res.status(error.response.status).json({
      message: error.response.data.error
    })
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
