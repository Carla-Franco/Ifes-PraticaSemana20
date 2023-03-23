const axios = require('./api.js');
const fs = require('fs');

function cadastrarTarefa(id, descricao) {
    axios.api.post('/tarefas', {
        id: id,
        descricao: descricao,
        status: 'Pendente'
    })
}

function alterarTarefa(id, novaDescricao) {
    axios.api.get(`tarefas/${id}`) 
        .then((resposta) => {
            const tarefaAtual = resposta.data;
            const dadosAtualizados = {
                descricao: novaDescricao,
                status: tarefaAtual.status
            };  
        axios.api.put(`tarefas/${id}`, dadosAtualizados)
    })
}

function concluirTarefa(id) {
    axios.api.get(`tarefas/${id}`)
        .then((resposta) => {
            const tarefaAtual = resposta.data;
            const statusConcluido = {
                descricao: tarefaAtual.descricao,
                status: 'Concluido'
            };
            axios.api.put(`tarefas/${id}`, statusConcluido)
    })
}

function excluirTarefa(id) {
    axios.api.delete(`/tarefas/${id}`)
}

function listarTarefasPendentes(){
    axios.api.get('/tarefas')
        .then(function (response) {
            const tarefasPendentes = response.data.filter(tarefa => tarefa.status === 'Pendente');
            console.log(tarefasPendentes);
            console.log('Enter para continuar...');
    })
}        

function listarTarefasConcluidas() {
    axios.api.get('/tarefas')
        .then(function (response) {
            const tarefasConcluidas = response.data.filter(tarefa => tarefa.status === 'Concluido');
            console.log(tarefasConcluidas);
            console.log('Enter para continuar...');
    })
}

async function menu() {
    console.log('Bem vindo ao sistema de Gerenciamento de Tarefas!');
    console.log('1 - Cadastrar nova tarefa');
    console.log('2 - Alterar uma tarefa');
    console.log('3 - Marcar tarefa como concluída');
    console.log('4 - Excluir uma tarefa');
    console.log('5 - Listar tarefas pendentes');
    console.log('6 - Listar tarefas concluídas');
    console.log('0 - Sair do sistema');
}

async function main() {
    while (true) {
        menu();
        const opcao = Number(await question('O que deseja fazer? '));
        switch (opcao) {
            case 0:
                console.log('Saindo do sistema... Até a próxima!');
                process.exit(0);
                break;
            case 1:
                try {
                    const id = await question('Digite o id da tarefa: ');
                    const descricao = await question('Digite a descrição da tarefa: ');
                    const tarefa = await cadastrarTarefa(id, descricao);
                    console.log('Tarefa cadastrada com sucesso!');
                    console.log('Enter para continuar...');  
                } catch (erro) {
                    console.error('Erro ao cadastrar nova tarefa!', erro);
                }
                break;
            case 2:
                try {
                    const idTarefa = await question('Digite o id da tarefa que deseja alterar: ');
                    const novaDescricao = await question('Digite a nova descrição da tarefa: ');
                    const tarefa = await alterarTarefa(idTarefa, novaDescricao);
                    console.log('Tarefa alterada com sucesso!');
                    console.log('Enter para continuar...');
                } catch (erro) {
                    console.error('Erro ao alterar uma tarefa!', erro);
                }
                break;
            case 3:
                try {
                    const idTarefa = await question('Digite o id da tarefa que deseja concluir: ');
                    const tarefa = await concluirTarefa(idTarefa);
                    console.log('Tarefa concluída com sucesso!');
                    console.log('Enter para continuar...');
                } catch (erro) {
                    console.error('Erro ao concluir uma tarefa!', erro);
                }
                break; 
            case 4:
                try {
                    const idTarefa = await question('Digite o id da tarefa que deseja excluir: ');
                    const tarefa = await excluirTarefa(idTarefa);
                    console.log('Tarefa deletada com sucesso!');
                    console.log('Enter para continuar...');
                } catch (erro) {
                    console.error('Erro ao excluir uma tarefa!', erro);
                }
                break; 
            case 5:
                try {
                    listarTarefasPendentes();  
                } catch (erro) {
                    console.error('Erro ao listar tarefas pendentes!', erro);
                }
                break;  
            case 6:
                try {
                    listarTarefasConcluidas();
                } catch (erro) {
                    console.error('Erro ao listar tarefas concluidas!', erro);
                }
                break;              
            default:
                console.log('Opção inválida...');
        }
        await question('');
    }
}

function question(text) {
    return new Promise((resolve, reject) => {
        const { stdin, stdout } = process;
        stdin.resume();
        stdout.write(text);
        stdin.on('data', (data) => {
            const resposta = data.toString().trim();
            resolve(resposta);
        });
        stdin.on('error', (erro) => {
            reject(erro);
        });
    });
}

main();







