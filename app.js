document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("ano-copyright").textContent = new Date().getFullYear();
});

// QUIZ 

(function () {
    const perguntas = [
        {
            pergunta: "O que é phishing?",
            opcoes: [
                "Um tipo de antivírus",
                "Uma tentativa de enganar pessoas para roubar informações",
                "Um sistema de proteção de senhas",
                "Uma atualização de segurança"
            ],
            correta: 1,
            explicacao: "Phishing utiliza mensagens e páginas falsas para roubar dados."
        },
        {
            pergunta: "Qual característica ajuda a tornar uma senha segura?",
            opcoes: [
                "Usar apenas números",
                "Usar a própria data de nascimento",
                "Combinar letras, números e símbolos, usando uma senha única",
                "Usar a mesma senha em todas as contas"
            ],
            correta: 2,
            explicacao: "Senhas únicas e difíceis de adivinhar reduzem o risco de invasão."
        },
        {
            pergunta: "O que é malware?",
            opcoes: [
                "Um software malicioso",
                "Um programa de edição",
                "Um navegador de internet",
                "Um dispositivo de armazenamento"
            ],
            correta: 0,
            explicacao: "Malware é um software desenvolvido para realizar ações maliciosas."
        },
        {
            pergunta: "Para que serve a autenticação de dois fatores?",
            opcoes: [
                "Deixar a internet mais rápida",
                "Substituir todas as senhas",
                "Criar cópias dos arquivos",
                "Adicionar uma etapa extra de verificação de identidade"
            ],
            correta: 3,
            explicacao: "Ela exige uma segunda confirmação além da senha."
        },
        {
            pergunta: "O que um ransomware pode fazer?",
            opcoes: [
                "Melhorar o desempenho do computador",
                "Bloquear ou criptografar arquivos e exigir resgate",
                "Eliminar anúncios",
                "Atualizar o sistema operacional"
            ],
            correta: 1,
            explicacao: "Ransomware pode bloquear arquivos e exigir pagamento para tentar recuperá-los."
        },
        {
            pergunta: "Qual atitude é mais segura ao receber um link suspeito?",
            opcoes: [
                "Clicar para descobrir o conteúdo",
                "Compartilhar com os contatos",
                "Não clicar e verificar a origem",
                "Informar sua senha para confirmar"
            ],
            correta: 2,
            explicacao: "Verifique a origem do link antes de abrir. Na dúvida, não clique."
        },
        {
            pergunta: "O que é engenharia social?",
            opcoes: [
                "Manipulação psicológica para obter informações ou acesso",
                "Um tipo de hardware",
                "Uma ferramenta de programação",
                "Um método de compactação de arquivos"
            ],
            correta: 0,
            explicacao: "A engenharia social explora a confiança e o comportamento das pessoas."
        },
        {
            pergunta: "Por que é importante manter programas atualizados?",
            opcoes: [
                "Para mudar a aparência dos programas",
                "Para ocupar mais espaço no computador",
                "Para evitar o uso de senhas",
                "Para corrigir falhas e vulnerabilidades de segurança"
            ],
            correta: 3,
            explicacao: "Atualizações frequentemente corrigem falhas que poderiam ser exploradas."
        },
        {
            pergunta: "O que é um ataque DDoS?",
            opcoes: [
                "Uma tentativa de criar uma senha",
                "Uma sobrecarga de um serviço ou rede para deixá-lo indisponível",
                "Uma cópia de segurança",
                "Uma atualização automática"
            ],
            correta: 1,
            explicacao: "Um ataque DDoS tenta sobrecarregar um serviço com grande volume de tráfego."
        },
        {
            pergunta: "O que fazer se suspeitar que sua conta foi invadida?",
            opcoes: [
                "Ignorar o problema",
                "Compartilhar a senha com amigos",
                "Alterar a senha e verificar atividades suspeitas",
                "Desativar todas as atualizações"
            ],
            correta: 2,
            explicacao: "Troque a senha, encerre sessões desconhecidas e ative a autenticação em dois fatores."
        }
    ];

    const $ = id => document.getElementById(id);

    const inicio = $("quiz-inicio");
    const telaPerguntas = $("quiz-perguntas");
    const resultado = $("quiz-resultado");

    const formInicio = $("quiz-form-inicio");
    const formRespostas = $("quiz-form-respostas");

    let participante = { nome: "", email: "" };

    function mostrarTela(tela) {
        inicio.hidden = true;
        telaPerguntas.hidden = true;
        resultado.hidden = true;

        tela.hidden = false;
        tela.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function atualizarProgresso() {
        const respondidas = perguntas.filter((pergunta, indice) =>
            document.querySelector(`input[name="quiz-pergunta-${indice}"]:checked`)
        ).length;

        $("quiz-contador").textContent = `${respondidas}/10`;
        $("quiz-barra").style.width = `${respondidas * 10}%`;
    }

    function montarPerguntas() {
        const lista = $("quiz-lista-perguntas");
        lista.replaceChildren();

        perguntas.forEach((item, indice) => {
            const grupo = document.createElement("fieldset");
            grupo.className = "quiz-pergunta";

            const titulo = document.createElement("legend");
            titulo.textContent = `${String(indice + 1).padStart(2, "0")} — ${item.pergunta}`;
            grupo.appendChild(titulo);

            item.opcoes.forEach((opcao, opcaoIndice) => {
                const label = document.createElement("label");
                label.className = "quiz-opcao";

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `quiz-pergunta-${indice}`;
                radio.value = opcaoIndice;
                radio.addEventListener("change", atualizarProgresso);

                const texto = document.createElement("span");
                texto.textContent = opcao;

                label.append(radio, texto);
                grupo.appendChild(label);
            });

            lista.appendChild(grupo);
        });

        atualizarProgresso();
    }

    formInicio.addEventListener("submit", function (evento) {
        evento.preventDefault();

        $("quiz-erro-inicio").textContent = "";

        if (!formInicio.reportValidity()) return;

        const nome = $("quiz-nome").value.trim().replace(/\s+/g, " ");
        const email = $("quiz-email").value.trim();

        if (nome.split(" ").length < 2) {
            $("quiz-erro-inicio").textContent = "Digite seu nome completo.";
            $("quiz-nome").focus();
            return;
        }

        participante = { nome, email };

        $("quiz-saudacao").textContent =
            `Boa sorte, ${participante.nome}! Responda às 10 perguntas.`;

        montarPerguntas();
        mostrarTela(telaPerguntas);
    });

    formRespostas.addEventListener("submit", function (evento) {
        evento.preventDefault();

        $("quiz-erro-respostas").textContent = "";

        const respostas = perguntas.map((pergunta, indice) =>
            document.querySelector(`input[name="quiz-pergunta-${indice}"]:checked`)
        );

        const primeiraSemResposta = respostas.findIndex(resposta => !resposta);

        if (primeiraSemResposta !== -1) {
            $("quiz-erro-respostas").textContent =
                `Responda à pergunta ${primeiraSemResposta + 1} antes de enviar.`;

            document.querySelectorAll(".quiz-pergunta")[primeiraSemResposta]
                .scrollIntoView({ behavior: "smooth", block: "center" });

            return;
        }

        const acertos = respostas.reduce((total, resposta, indice) => {
            return total +
                (Number(resposta.value) === perguntas[indice].correta ? 1 : 0);
        }, 0);

        mostrarResultado(acertos, respostas);
    });

    function mostrarResultado(acertos, respostas) {
        $("quiz-dados-participante").textContent =
            `Participante: ${participante.nome} | E-mail: ${participante.email}`;

        $("quiz-nota").textContent = `${acertos}/10`;
        $("quiz-percentual").textContent = `${acertos * 10}%`;

        let feedback;

        if (acertos >= 9) {
            feedback = "Excelente! Você demonstra ótimo conhecimento em segurança cibernética.";
        } else if (acertos >= 7) {
            feedback = "Muito bom! Você está no caminho certo. Continue aprendendo!";
        } else if (acertos >= 5) {
            feedback = "Bom esforço! Revise os conceitos e tente novamente.";
        } else {
            feedback = "Continue estudando! Conhecer as ameaças é o primeiro passo para se proteger.";
        }

        $("quiz-feedback").textContent = feedback;

        const revisao = $("quiz-revisao");
        revisao.replaceChildren();

        perguntas.forEach((item, indice) => {
            const acertou =
                Number(respostas[indice].value) === item.correta;

            const bloco = document.createElement("article");
            bloco.className =
                `quiz-revisao ${acertou ? "quiz-correta" : "quiz-incorreta"}`;

            const titulo = document.createElement("h4");
            titulo.textContent = `${indice + 1}. ${item.pergunta}`;

            const status = document.createElement("strong");
            status.textContent = acertou ? "✓ CORRETO" : "✗ INCORRETO";

            const suaResposta = document.createElement("p");
            suaResposta.textContent =
                `Sua resposta: ${item.opcoes[Number(respostas[indice].value)]}`;

            const respostaCorreta = document.createElement("p");
            respostaCorreta.textContent =
                `Resposta correta: ${item.opcoes[item.correta]}`;

            const explicacao = document.createElement("p");
            explicacao.textContent = item.explicacao;

            bloco.append(
                titulo,
                status,
                suaResposta,
                respostaCorreta,
                explicacao
            );

            revisao.appendChild(bloco);
        });

        mostrarTela(resultado);
    }

    $("quiz-refazer").addEventListener("click", function () {
        formInicio.reset();
        formRespostas.reset();

        $("quiz-lista-perguntas").replaceChildren();
        $("quiz-revisao").replaceChildren();

        $("quiz-erro-inicio").textContent = "";
        $("quiz-erro-respostas").textContent = "";

        $("quiz-barra").style.width = "0";
        $("quiz-contador").textContent = "0/10";

        participante = { nome: "", email: "" };

        mostrarTela(inicio);
    });
})();