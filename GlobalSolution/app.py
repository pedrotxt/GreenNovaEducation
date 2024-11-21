import json
from flask import Flask, render_template, request, jsonify
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# Configurações do Watson Assistant
apikey = 'plura0sG4SW9Ui5TEnKNdiiAewnM89EpnnyK5MNBmLqN'
url = 'https://api.us-south.assistant.watson.cloud.ibm.com'
assistant_id = 'f0ec45bc-3081-44d3-b906-b0d7fe7092dc'

# Autenticação com o Watson Assistant
authenticator = IAMAuthenticator(apikey)
assistant = AssistantV2(
    version='2018-09-20',
    authenticator=authenticator
)
assistant.set_service_url(url)
assistant.set_disable_ssl_verification(True)

app = Flask(__name__)

# Variável global para a sessão
session_id = None

# Função para criar uma nova sessão com o Watson Assistant
def create_session():
    global session_id
    try:
        session = assistant.create_session(assistant_id=assistant_id).get_result()
        session_id = session['session_id']
    except Exception as e:
        print(f"Erro ao criar sessão: {e}")
        session_id = None

# Função para enviar uma mensagem ao Watson Assistant
def send_message_to_watson(user_input):
    global session_id

    # Cria uma nova sessão se necessário
    if session_id is None:
        create_session()
        if session_id is None:
            return "Erro: Não foi possível conectar ao Watson Assistant."

    try:
        response = assistant.message(
            assistant_id=assistant_id,
            session_id=session_id,
            input={'message_type': 'text', 'text': user_input}
        ).get_result()

        # Extrai a mensagem de resposta
        if 'output' in response and 'generic' in response['output']:
            return response['output']['generic'][0].get('text', 'Desculpe, não entendi.')
        else:
            return "Desculpe, não consegui processar sua solicitação."
    except Exception as e:
        print(f"Erro ao enviar mensagem: {e}")
        return "Erro: Houve um problema ao comunicar-se com o Watson Assistant."

# Rotas do Flask
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.form.get('respostaCliente', '').strip()

        if not user_input:
            return jsonify({'response': 'Por favor, insira uma mensagem.'}), 400

        # Envia a mensagem do usuário para o Watson Assistant
        chatbot_response = send_message_to_watson(user_input)

        # Retorna a resposta como JSON
        return jsonify({'response': chatbot_response})
    except Exception as e:
        print(f"Erro no endpoint /chatbot: {e}")
        return jsonify({'response': 'Desculpe, ocorreu um erro no servidor.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
