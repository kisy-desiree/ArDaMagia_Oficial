exports.handler = async (event, context) => {
    // 1. VERIFICAÇÃO DE SEGURANÇA DA META (GET)
    // Quando a gente for plugar a antena no painel do Facebook, eles vão testar se a antena é nossa mesmo.
    if (event.httpMethod === 'GET') {
        const queryParams = event.queryStringParameters;
        
        // Essa é a nossa senha secreta. Pode deixar assim mesmo.
        const verifyToken = "raposa_magica_vip"; 

        if (queryParams['hub.mode'] === 'subscribe' && queryParams['hub.verify_token'] === verifyToken) {
            console.log("WebHook Verificado com Sucesso!");
            return {
                statusCode: 200,
                body: queryParams['hub.challenge'] // A Meta exige que a gente devolva esse número
            };
        }
        return { statusCode: 403, body: 'Falha na verificação de segurança' };
    }

    // 2. RECEBENDO AS MENSAGENS DOS CLIENTES (POST)
    // Aqui é onde a magia acontece quando alguém manda WhatsApp
    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body);
            console.log("Mensagem recebida do WhatsApp:", JSON.stringify(body, null, 2));

            // Nas próximas etapas, vamos colocar aqui o código que salva no Firebase!
            
            return { statusCode: 200, body: 'EVENT_RECEIVED' };
        } catch (error) {
            console.error("Erro ao ler a mensagem:", error);
            return { statusCode: 400, body: 'Erro no formato' };
        }
    }

    // Se baterem na porta de outro jeito, a gente ignora
    return { statusCode: 405, body: 'Método não permitido' };
};