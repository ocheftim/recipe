const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

// Copy the /api/parse-recipe route from the code above

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});