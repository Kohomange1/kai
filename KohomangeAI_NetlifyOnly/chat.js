async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userMessage = input.value;

  chatbox.innerHTML += `<div class="message user"><strong>You:</strong> ${userMessage}</div>`;
  input.value = "";

  const response = await fetch("/.netlify/functions/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  chatbox.innerHTML += `<div class="message bot"><strong>KAI:</strong> ${data.reply}</div>`;
}
