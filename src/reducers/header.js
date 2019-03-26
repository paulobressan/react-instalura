export function notificacao(state = '', action) {
    if (action.type === 'NOTIFICAR') {
        console.log('teste header reducer');
        
        return action.mensagem;
    }

    return state;
}