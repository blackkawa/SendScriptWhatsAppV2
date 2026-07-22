async function enviarScript(scriptText) {
    const lines = scriptText
        .split(/[\n\r]+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const main = document.querySelector("#main");
    if (!main) throw new Error("Não há nenhuma conversa aberta!");

    const textarea = main.querySelector('div[contenteditable="true"]');
    if (!textarea) throw new Error("Caixa de texto não encontrada!");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log(`Enviando (${i + 1}/${lines.length}): ${line}`);

        textarea.focus();

        // Insere o texto na caixa
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        // Pequena pausa para a interface reagir e ativar o botão
        await new Promise(resolve => setTimeout(resolve, 150));

        // Busca o botão por múltiplos seletores comuns
        const sendButton = 
            main.querySelector('button span[data-icon="send"]')?.closest('button') ||
            main.querySelector('span[data-icon="send"]')?.closest('button') ||
            main.querySelector('button[aria-label="Enviar"]') ||
            main.querySelector('button[aria-label="Send"]') ||
            main.querySelector('[data-testid="send"]');

        if (sendButton) {
            sendButton.click();
        } else {
            // Se o botão não for encontrado, simula o pressionamento do Enter
            textarea.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true
            }));
        }

        // Aguarda 300ms entre o envio de cada linha
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    return lines.length;
}

enviarScript(`

Você é assim
Um sonho pra mim
E quando eu não te vejo

Eu penso em você
Desde o amanhecer
Até quando eu me deito

Eu gosto de você
E gosto de ficar com você
Meu riso é tão feliz contigo
O meu melhor amigo é o meu amor

E a gente canta
E a gente dança
E a gente não se cansa
De ser criança
Da gente brincar
Da nossa velha infância

Seus olhos, meu clarão
Me guiam dentro da escuridão
Seus pés me abrem o caminho
Eu sigo e nunca me sinto só

Você é assim
Um sonho pra mim
Quero te encher de beijos

Eu penso em você
Desde o amanhecer
Até quando eu me deito

Eu gosto de você
E gosto de ficar com você
Meu riso é tão feliz contigo
O meu melhor amigo é o meu amor

E a gente canta
A gente dança
A gente não se cansa
De ser criança
A gente brinca
A nossa velha infância

Seus olhos meu clarão
Me guiam dentro da escuridão
Seus pés me abrem o caminho
Eu sigo e nunca me sinto só

Você é assim
Um sonho pra mim
Você é assim

Você é assim
Um sonho pra mim
Você é assim
Você é assim
Um sonho pra mim

E quando eu não te vejo
Eu penso em você
Desde o amanhecer
Até quando eu me deito

Eu gosto de você
E gosto de ficar com você
Meu riso é tão feliz contigo
O meu melhor amigo é o meu amor

`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error);