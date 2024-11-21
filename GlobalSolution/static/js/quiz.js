// Perguntas do quiz
const questions = [
    {
      question: "O que é energia renovável?",
      options: [
        "Energia que pode ser renovada por combustíveis fósseis",
        "Energia derivada de recursos naturais ilimitados",
        "Energia nuclear",
        "Energia gerada por motores de combustão interna",
        "Energia que é usada apenas em indústrias",
      ],
      correct: 1,
    },
    {
      question: "Qual dessas fontes de energia é considerada limpa e renovável?",
      options: [
        "Carvão mineral",
        "Petróleo",
        "Energia solar",
        "Gás natural",
        "Energia térmica de combustão",
      ],
      correct: 2,
    },
    {
      question: "O que significa eficiência energética?",
      options: [
        "Produzir mais energia elétrica",
        "Usar menos energia para realizar a mesma tarefa",
        "Reduzir o custo das contas de luz",
        "Aumentar o consumo de energia renovável",
        "Substituir equipamentos antigos por novos",
      ],
      correct: 1,
    },
    {
      question: "Qual é a principal causa do aquecimento global?",
      options: [
        "Desmatamento",
        "Emissão de gases de efeito estufa",
        "Uso de energia renovável",
        "Construção de grandes cidades",
        "Aumento da temperatura solar",
      ],
      correct: 1,
    },
    {
      question: "Qual dessas práticas ajuda na sustentabilidade energética?",
      options: [
        "Deixar aparelhos eletrônicos em stand-by",
        "Substituir lâmpadas incandescentes por LED",
        "Aumentar o uso de combustíveis fósseis",
        "Usar energia elétrica em horários de pico",
        "Evitar manutenção de equipamentos",
      ],
      correct: 1,
    },
    {
      question: "O que é a pegada de carbono?",
      options: [
        "Quantidade de carbono emitida por veículos",
        "A marca deixada por combustíveis fósseis",
        "A quantidade total de gases de efeito estufa gerados por atividades humanas",
        "A emissão de carbono por indústrias específicas",
        "A medição de carbono atmosférico",
      ],
      correct: 2,
    },
    {
      question: "Qual é o maior benefício da energia eólica?",
      options: [
        "Não depende de ventos constantes",
        "É barata, mas poluente",
        "Produz energia limpa sem emissão de gases de efeito estufa",
        "Não requer grandes áreas para instalação",
        "Pode ser usada em qualquer local do planeta",
      ],
      correct: 2,
    },
    {
      question: "O que é um painel fotovoltaico?",
      options: [
        "Uma tecnologia para armazenar energia elétrica",
        "Um dispositivo que transforma luz solar em eletricidade",
        "Um equipamento para monitorar o uso de energia",
        "Uma alternativa ao uso de baterias",
        "Uma lâmpada eficiente",
      ],
      correct: 1,
    },
    {
      question: "Qual é o objetivo principal do desenvolvimento sustentável?",
      options: [
        "Crescimento econômico sem considerar o meio ambiente",
        "Progresso econômico e social respeitando os limites ambientais",
        "Uso exclusivo de energia renovável",
        "Redução da população mundial",
        "Substituição da tecnologia atual por novas tecnologias",
      ],
      correct: 1,
    },
    {
      question: "Como as empresas podem contribuir para um futuro sustentável?",
      options: [
        "Aumentando o uso de recursos não renováveis",
        "Investindo em tecnologias de energia limpa e práticas sustentáveis",
        "Dependendo exclusivamente de combustíveis fósseis",
        "Ignorando regulamentações ambientais",
        "Focando apenas no lucro a curto prazo",
      ],
      correct: 1,
    },
  ];
  
  // Variáveis globais
  let currentStep = 0;
  let userAnswers = [];
  
  // Elementos DOM
  const quizContainer = document.getElementById("quiz");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  
  // Renderiza a pergunta e opções
  function renderQuestion(step) {
    const questionData = questions[step];
    quizContainer.innerHTML = `
      <div class="question">${questionData.question}</div>
      <ul class="answers">
        ${questionData.options
          .map(
            (option, index) => `
            <li>
              <label>
                <input type="radio" name="answer" value="${index}" 
                ${userAnswers[step] == index ? "checked" : ""}>
                ${option}
              </label>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  
    // Habilitar/Desabilitar botões de navegação
    prevButton.disabled = step === 0;
    nextButton.disabled = !userAnswers[step];
  }
  
  // Atualiza a resposta do usuário e habilita o botão "Próximo"
  function handleAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      userAnswers[currentStep] = parseInt(selectedOption.value);
      nextButton.disabled = false;
    }
  }
  
  // Muda para o próximo ou anterior
  function changeStep(direction) {
    if (direction === "next" && currentStep < questions.length - 1) {
      currentStep++;
    } else if (direction === "prev" && currentStep > 0) {
      currentStep--;
    }
    renderQuestion(currentStep);
  }
  
  // Exibe os resultados finais
  function showResults() {
    const correctAnswers = questions.filter(
      (q, index) => q.correct === userAnswers[index]
    ).length;
  
    quizContainer.innerHTML = `
      <h2>Você terminou o quiz!</h2>
      <p>Você acertou ${correctAnswers} de ${questions.length} perguntas.</p>
    `;
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
  
  // Inicialização
  nextButton.addEventListener("click", () => {
    if (currentStep === questions.length - 1) {
      showResults();
    } else {
      changeStep("next");
    }
  });
  prevButton.addEventListener("click", () => changeStep("prev"));
  quizContainer.addEventListener("change", handleAnswer);
  
  // Renderiza a primeira pergunta
  renderQuestion(currentStep);