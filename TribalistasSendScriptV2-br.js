async function enviarScript(scriptText){

    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
    main = document.querySelector("#main"),
    textarea = main.querySelector(`div[contenteditable="true"]`)
    
    if(!textarea) throw new Error("Não há uma conversa aberta")
    
    for(const line of lines){
        console.log(line)
    
        textarea.focus();
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('change', {bubbles: true}));
    
        setTimeout(() => {
            (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
        }, 100);
        
        if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
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

`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)
