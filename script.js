
let imagemColada = null;
let crimes = [];
let participantes = []

function adicionarCrime() {
    let crimeNumero = document.getElementById('crime_numero').value;

    if (!crimeNumero || crimeNumero === 'Selecione o número do Art.:') {
        alert('Por favor, selecione um crime antes de adicionar.');
        return;
    }

    if (!crimes.includes("Art." + crimeNumero)) {
        crimes.push("Art." + crimeNumero);
        document.getElementById('crime_numero').value = '';
        gerarRelatorio();
    } else {
        alert('Este crime já foi adicionado.');
    }
}

function adicionarParticipante() {
    // Obtém o valor selecionado do elemento
    let selectParticipante = document.getElementById('participantes_oficial').value;

    // Verifica se um participante foi selecionado
    if (!selectParticipante || selectParticipante === 'Selecione um participante') {
        alert('Por favor, selecione um participante antes de adicionar.');
        return;
    }

    // Verifica se o participante já está na lista
    if (!participantes.includes("Oficial." + selectParticipante)) {
        // Adiciona o participante à lista
        participantes.push("Oficial." + selectParticipante);
        // Limpa o valor do elemento
        document.getElementById('participantes_oficial').value = '';
        // Atualiza o relatório
        gerarRelatorio();
    } else {
        // Exibe um alerta se o participante já foi adicionado
        alert('Este participante já foi adicionado.');
    }
}


function limparParticipantes() {
    participantes = [];
atualizarBotaoAdvogado();
       gerarRelatorio();
       document.getElementById('participantes_display').textContent = '';
}
function handlePaste(event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            var blob = item.getAsFile();
            var reader = new FileReader();
            reader.onload = function(event){
                var imagemPrevisualizacao2 = document.getElementById('imagemPrevisualizacao2');
                imagemPrevisualizacao2.innerHTML = '<img src="' + event.target.result + '" style="max-width: 200px; max-height: 200px;">';
            };
            reader.readAsDataURL(blob);

            // Armazenar a imagem colada na variável global
            imagemColada = blob;
        }
    }
}

function limparImagem() {
    var imagemInput = document.getElementById('imagemInput');
    var imagemPrevisualizacao = document.getElementById('imagemPrevisualizacao2');
    imagemColada == null;
    imagemInput.value = '';
    imagemPrevisualizacao.innerHTML = '';
}


function enviarRelatorioParaDiscord() {
const relatorioText = document.getElementById('relatorio').textContent;
const imagemInput = document.getElementById('imagemInput');
const imagem = imagemInput.files[0];
const passportOficial = document.getElementById('numero_oficial').value;
const nomeOficial = document.getElementById('nome_oficial').value;

if (passportOficial === "" || nomeOficial === "") {
    alert("Por favor, preencha tanto o nome quanto o passaporte do oficial!");
}else{
    if (imagemColada) {
        // Se sim, enviar a imagem colada
        enviarParaDiscord(relatorioText, imagemColada);
    } else {
        // Caso contrário, enviar a imagem selecionada no input
        enviarParaDiscord(relatorioText, imagem);
    }

}

}


function limparArtigos() {
    crimes = [];
atualizarBotaoAdvogado();
       gerarRelatorio();
}

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function (l) {
        return l.toUpperCase();
    });
}

function calcularMesesPrisao() {
    const mesesPorCrime = {
    'Art.11': 60,
        'Art.12': 5,
        'Art.13': 5,
        'Art.14': 5,
        'Art.15': 5,
        'Art.16': 10,
        'Art.17': 10,
        'Art.18': 10,
        'Art.19': 0,
        'Art.20': 15,
        'Art.21': 0,
        'Art.22': 20,
        'Art.23': 15,
        'Art.24': 15,
        'Art.25': 10,
        'Art.26': 10,
        'Art.27': 10,
        'Art.28': 15,
        'Art.29': 10,
        'Art.30': 10,
        'Art.31': 15,
        'Art.32': 5,
        'Art.33': 5,
        'Art.34': 10,
        'Art.35': 15,
        'Art.36': 15,
        'Art.37': 20,
        'Art.38': 25,
        'Art.39': 25,
        'Art.40': 30,
        'Art.41': 10,
        'Art.42': 10,
        'Art.43': 10,
        'Art.44': 10,
        'Art.45': 10,
        'Art.46': 10,
        'Art.47': 20,
        'Art.48': 15,
        'Art.49': 30,
        'Art.50': 15,
        'Art.51': 0,
        'Art.52': 15,
        'Art.53': 35,
        'Art.54': 20,
        'Art.55': 20,
        'Art.56': 0,
        'Art.57': 35,
        'Art.58': 25,
        'Art.59': 20,
        'Art.60': 10,
        'Art.61': 35,
        'Art.62': 25,
        'Art.63': 10,
        'Art.64': 15,
        'Art.65': 30,
        'Art.66': 15,
        'Art.67': 20,
        'Art.68': 10,
        'Art.69': 15,
        'Art.70': 40,
        'Art.71': 50,
        'Art.72': 60,
        'Art.73': 60,
        'Art.74': 60,
        'Art.75': 60,
        'Art.76': 60,
    };

    const confessouCrime = document.getElementById('confessarCrime').checked;
    const reuPrimario = document.getElementById('reuPrimario').checked;
    const reincidenteMesmoCrime = document.getElementById('reuReincidenteMesmoCrime').checked;
    const reincidenteCrimeDiferente = document.getElementById('reuReincidenteCrimeDiferente').checked;
    const usarVeiculoPublico = document.getElementById('usarVeiculoPublico').checked;
    const desacato = document.getElementById('desacato').checked;
    const chamouAdvogado = document.getElementById('chamouAdvogado').checked;

    const artigosImpedemAdvogado = ['Art.11', 'Art.15', 'Art.18', 'Art.19', 'Art.21', 'Art.24', 'Art.26', 'Art.27', 'Art.28', 'Art.30', 'Art.32', 'Art.48', 'Art.51', 'Art.56', 'Art.61', 'Art.62', 'Art.65', 'Art.67', 'Art.68', 'Art.69', 'Art.70', 'Art.71', 'Art.72', 'Art.73', 'Art.74', 'Art.75', 'Art.76'];
    const impedidoChamarAdvogado = crimes.some(crime => artigosImpedemAdvogado.includes(crime));

    let totalPorcentagens = 0;


    if (confessouCrime) {
        totalPorcentagens -= 0.1; // 10% de desconto
    }

    if (reuPrimario) {
        totalPorcentagens -= 0.1; // 10% de desconto
    }

    totalPorcentagens += (reincidenteCrimeDiferente ? 0.2 : 0);
    totalPorcentagens += (usarVeiculoPublico ? 0.5 : 0);
    totalPorcentagens += (desacato ? 0.5 : 0);


    if (reincidenteMesmoCrime) {
        if (chamouAdvogado && !impedidoChamarAdvogado) {

            totalPorcentagens -= 0.3; // Redução de 30%
        } else {

            totalPorcentagens += 0.3; // Acréscimo de 30%
        }
    }


    if (chamouAdvogado && !impedidoChamarAdvogado && !reincidenteMesmoCrime) {
        totalPorcentagens -= 0.5; // Redução de 50%
    }


    let totalMesesPrisao = crimes.reduce((total, crime) => {
        if (mesesPorCrime.hasOwnProperty(crime)) {
            total += mesesPorCrime[crime];
        }
        return total;
    }, 0);

    totalMesesPrisao = Math.max(0, totalMesesPrisao * (1 + totalPorcentagens));

    return totalMesesPrisao;
}

function atualizarBotaoAdvogado() {
    const chamouAdvogado = document.getElementById('chamouAdvogado');
    const artigosImpedemAdvogado = ['Art.11', 'Art.15', 'Art.18', 'Art.19', 'Art.21', 'Art.24', 'Art.26', 'Art.27', 'Art.28', 'Art.30', 'Art.32', 'Art.48', 'Art.51', 'Art.56', 'Art.61', 'Art.62', 'Art.65', 'Art.67', 'Art.68', 'Art.69', 'Art.70', 'Art.71', 'Art.72', 'Art.73', 'Art.74', 'Art.75', 'Art.76'];

    const algumArtigoImpedeAdvogado = crimes.some(crime => artigosImpedemAdvogado.includes(crime));

    if (algumArtigoImpedeAdvogado) {

        chamouAdvogado.disabled = true;

    } else {

        chamouAdvogado.disabled = false;

    }
}


atualizarBotaoAdvogado();

function gerarRelatorio() {
    let numero_oficial = document.getElementById('numero_oficial').value;
    let nome_oficial = capitalizeFirstLetter(document.getElementById('nome_oficial').value);
    let numero_passaporte = document.getElementById('numero_passaporte').value;


    let totalMesesPrisao = calcularMesesPrisao();
    totalMesesPrisao = Math.floor(totalMesesPrisao);

    document.getElementById('totalMesesVisor').textContent = "Total de Meses: " + Math.floor(totalMesesPrisao);

    let data_hora_atual = new Date();
    let data_hora_formatada = data_hora_atual.toLocaleString();
    let totalMesesPrisaoExibicao = Math.min(totalMesesPrisao, 60);

    const crimesFormatados = crimes.map(crime => {
        if (crime === "Art.11") {
            return "DAR FGDA SEM TER FEITO NADA ILEGAL - PENA MÁXIMA";
        } else {
            return crime;
        }
    });

    const participantesFormatados = participantes.map(participante => {
        if (participante === "Oficial.Guigui") {
            return "<@1205536041415741563>";
        } else {
            return participante;
        }
    });

  
    let relatorio = "***👮‍♂️ OFICIAL***: " + numero_oficial + " | " + nome_oficial + "\n\n";
    relatorio += "[==============PRENDEU==============]\n";
    relatorio += "***📋 PASSAPORTE***: " + numero_passaporte + "\n";
    relatorio += "***⏰ TEMPO***: " + totalMesesPrisaoExibicao.toFixed(0) + " meses\n";
    relatorio += "***🧨 CRIMES***: " + crimesFormatados.join(', ') + "\n";
    relatorio += "***📆 Data***: " + data_hora_formatada + "\n";
    relatorio += "**🤝 Participantes**: " + participantesFormatados.join(', ') + "\n";

    document.getElementById('relatorio').textContent = relatorio;
    atualizarBotaoAdvogado();
}


function exibirPrevisualizacao() {
    const imagemInput = document.getElementById('imagemInput');
    const imagemPreview = document.getElementById('imagemPrevisualizacao');

    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagemPreview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 15px">`;
        };

        reader.readAsDataURL(imagemInput.files[0]);
    }
}



function enviarParaDiscord(relatorio, imagem) {



const webhookURL = 'https://discord.com/api/webhooks/1312200792152739840/d3s6EjQWUzvdypoLGMk0-hASbG0mUVcdrEMa_19yiP2WIck5i51OrZVFlmGLRWN9iP9B';

const formData = new FormData();
formData.append('content', relatorio);
formData.append('file', imagem);

fetch(webhookURL, {
method: 'POST',
body: formData,
})
.then(response => {
if (!response.ok) {
    console.error('Erro ao enviar mensagem e imagem para o Discord:', response.status, response.statusText);
} else {
    console.log('Mensagem e imagem enviadas com sucesso para o Discord!');
}
})
.catch(error => {
console.error('Erro ao enviar mensagem e imagem para o Discord:', error);
});
}



function copiarRelatorio() {
    const relatorioText = document.getElementById('relatorio').textContent;


    const textarea = document.createElement('textarea');
    textarea.value = relatorioText;
    document.body.appendChild(textarea);


    textarea.select();
    document.execCommand('copy');


    document.body.removeChild(textarea);

    alert('Relatório copiado para a área de transferência!');
}

function carregarFotoUpload() {
     const fotocntrl = document.getElementById('meli_cntrl');
     const fotoupload = document.getElementById('fotoupload');
     const btnCarre = document.getElementById('btnCarre');
     const btnCntrl = document.getElementById('btnCntrl');

  
    
     if (fotocntrl.style.display === "none" || fotocntrl.style.display === "") {
        fotocntrl.style.display = "block";
    } else {
        fotocntrl.style.display = "none";
    }
     
     
}



function carregarFotoCntrl() {
    const fotocntrl = document.getElementById('meli_cntrl');
    const fotoupload = document.getElementById('fotoupload');
    const btnCarre = document.getElementById('btnCarre');
    const btnCntrl = document.getElementById('btnCntrl');

 
   
    if (fotoupload.style.display === "none" || fotoupload.style.display === "") {
       fotoupload.style.display = "block";
   } else {
       fotoupload.style.display = "none";
   }
    
    
}


