
// Número que receberá a mensagem no WhatsApp
const numeroWhatsApp = "5543999612169";

let tamanhoSim = 1;
let cliquesNao = 0;

function recusar() {
    cliquesNao++;

    // Aumenta o botão SIM
    tamanhoSim += 0.25;

    document.getElementById("botaoSim").style.transform =
        `scale(${tamanhoSim})`;

    // Explode depois de 4 cliques
    if (cliquesNao >= 4) {
        const botaoNao = document.getElementById("botaoNao");

        botaoNao.classList.add("explodir");

        setTimeout(() => {
            botaoNao.style.display = "none";
        }, 500);
    }
}

function aceitar() {
    document.getElementById("telaInicial").classList.add("escondida");
    document.getElementById("telaCalendario").classList.remove("escondida");
}

function confirmarData() {

    const data = document.getElementById("dataEscolhida").value;

    if (!data) {
        alert("Escolha uma data primeiro! ❤️");
        return;
    }

    const opcoesSelecionadas = document.querySelectorAll(
        'input[name="ideias"]:checked'
    );

    let ideias = [];

    opcoesSelecionadas.forEach(opcao => {
        if (opcao.id !== "outraOpcao") {
            ideias.push(opcao.value);
        }
    });

    const outraIdeia = document
        .getElementById("ideiaPersonalizada")
        .value.trim();

    if (document.getElementById("outraOpcao").checked) {
        if (!outraIdeia) {
            alert("Escreva qual seria sua outra ideia! ❤️");
            return;
        }

        ideias.push("Outra ideia: " + outraIdeia);
    }

    if (ideias.length === 0) {
        alert("Escolha pelo menos uma opção de date! 💗");
        return;
    }

    // Formata a data
    const dataFormatada = new Date(data + "T12:00:00")
        .toLocaleDateString("pt-BR");

    // Mostra a tela final
    document.getElementById("telaCalendario").classList.add("escondida");
    document.getElementById("telaFinal").classList.remove("escondida");

    document.getElementById("dataFinal").textContent = dataFormatada;
    document.getElementById("ideiasFinais").textContent = ideias.join(" + ");

    // Cria a mensagem do WhatsApp
    const mensagem =
        `Oi! ❤️ Escolhi a data ${dataFormatada} para nosso date!\n\n` +
        `As ideias que escolhi foram: ${ideias.join(", ")}.\n\n` +
        `Estou ansiosa(o) para esse encontro! 🥰`;

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    document.getElementById("linkWhatsApp").href = link;

    // Abre o WhatsApp
    window.open(link, "_blank");
}
