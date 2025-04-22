const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body);

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are KAI, a wise, kind, and intelligent trainer from the Kohomange Institute, helping people grow spiritually, mentally, and emotionally." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  return {
    statusCode: 200,
    body: JSON.stringify({ reply })
  };
};
