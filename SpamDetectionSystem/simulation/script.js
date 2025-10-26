// spam keywords used in analysis
const spamWords = ["win", "free", "offer", "click", "money", "lottery", "cash", "reward", "claim", "subscribe"];

function loadEmails() {
  fetch('emails.json')
    .then(response => response.json())
    .then(data => displayEmails(data))
    .catch(err => console.error('Error loading emails:', err));
}

function displayEmails(emails) {
  const tbody = document.querySelector("#emailTable tbody");
  tbody.innerHTML = ""; // clear old entries

  emails.forEach(email => {
    const isSpam = detectSpam(email.subject + " " + email.body);
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${email.from}</td>
      <td>${email.subject}</td>
      <td style="color:${isSpam ? '#ff5555' : '#55ff55'};">
        ${isSpam ? "🚨 Spam" : "✅ Legitimate"}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function detectSpam(text) {
  text = text.toLowerCase();
  let score = 0;
  spamWords.forEach(word => {
    if (text.includes(word)) score++;
  });
  return score >= 2; // threshold
}
