// Função para alternar a visibilidade do pop-up
function toggleChatPopup() {
  const popup = document.getElementById("chat-popup");
  const overlay = document.getElementById("popup-overlay");
  const isVisible = popup.style.display === "flex";

  if (isVisible) {
      popup.style.display = "none";
      overlay.style.display = "none";
  } else {
      popup.style.display = "flex";
      overlay.style.display = "block";
  }
}

// Evento para abrir ou fechar o pop-up
document.getElementById("open-chat").addEventListener("click", toggleChatPopup);

// Evento para fechar o pop-up ao clicar no overlay
document.getElementById("popup-overlay").addEventListener("click", toggleChatPopup);

// Função para adicionar mensagens ao chat
function addMessageToChatbox(message, type) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `<p>${message}</p>`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight; // Rolagem automática
}

// Evento para lidar com o envio do chat
document.getElementById("chatForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o reload da página

  const userResponse = document.getElementById("respostaCliente").value.trim();

  if (userResponse !== "") {
      // Adiciona a mensagem do usuário ao chat
      addMessageToChatbox(userResponse, "user");

      // Faz a requisição ao servidor para obter a resposta do chatbot
      fetch("/chatbot", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `respostaCliente=${encodeURIComponent(userResponse)}`
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Erro ${response.status}: ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          // Adiciona a resposta do bot ao chat
          addMessageToChatbox(data.response, "bot");
      })
      .catch(error => {
          console.error("Erro na comunicação com o servidor:", error);
          addMessageToChatbox("Desculpe, ocorreu um erro ao se comunicar com o servidor.", "bot");
      });

      // Limpa o campo de entrada
      document.getElementById("respostaCliente").value = "";
  }
});
