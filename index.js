// Salva no LocalStorage
function salvarDados() {
    const dataSinistro = document.getElementById("data-sinistro").value;
    const tipoSinistro = document.getElementById("tipo-sinistro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const pais = document.getElementById("pais").value;
  
    const sinistro = {
      dataSinistro,
      tipoSinistro,
      endereco: {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        pais,
      },
    };
  
    let dadosArmazenados = localStorage.getItem("sinistros");
    if (dadosArmazenados) {
        dadosArmazenados = JSON.parse(dadosArmazenados);
    } else {
        throw Error('Campos obrigatórios precisam ser preenchidos.');
      //dadosArmazenados = [];
    }
  
    // adiciona novo sinistro
    dadosArmazenados.push(sinistro);
  
    // salva dado no LocalStorage
    localStorage.setItem("sinistros", JSON.stringify(dadosArmazenados));
  
    // Limpa os campos
    document.getElementById("data-sinistro").value = "";
    document.getElementById("tipo-sinistro").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("pais").value = "";
  
  }
  
// Evento de click do btn enviar
document.getElementById("enviar").addEventListener("click", function (event) {
    //event.preventDefault();
    salvarDados();
});
  
// Exibe Dados
function exibirDados() {
    const dadosArmazenados = localStorage.getItem("sinistros");
    if (dadosArmazenados) {
        const sinistros = JSON.parse(dadosArmazenados);
        const resposta = document.getElementById("exibe-sinistros");
        resposta.innerHTML = ""; 

        sinistros.forEach((sinistro, index) => {
        var elemento = document.createElement('div'); 

            elemento.innerHTML = `
                <p class="d-flex justify-content-start">Id: ${index + 1}</p>
                <p class="d-flex justify-content-start">Data do Sinistro: ${sinistro.dataSinistro}</p>
                <p class="d-flex justify-content-start">Tipo de Sinistro: ${sinistro.tipoSinistro}</p>
                <p class="d-flex justify-content-start">Rua: ${sinistro.endereco.rua}</p>
                <p class="d-flex justify-content-start">Número: ${sinistro.endereco.numero}</p>
                <p class="d-flex justify-content-start">Bairro: ${sinistro.endereco.bairro}</p>
                <p class="d-flex justify-content-start">Cidade: ${sinistro.endereco.cidade}</p>
                <p class="d-flex justify-content-start">Estado: ${sinistro.endereco.estado}</p>
                <p class="d-flex justify-content-start">Pais: ${sinistro.endereco.pais}</p>
                <button id="editar" class="btn btn-warning editar-btn" data-index="${index}">Editar</button>
                <button type="button" id="excluir" class="btn btn-danger" data-index="${index}">Excluir</button>
            `;
            resposta.appendChild(elemento);
        });

        const btnsExcluir = document.querySelectorAll("#excluir");
        btnsExcluir.forEach(btn => {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                const indexExcluir = parseInt(this.getAttribute("data-index"));
                excluirSinistro(indexExcluir);
            });
        });  
        
        const btnsEditar = document.querySelectorAll("#editar");
        btnsEditar.forEach(btn => {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                const indexEditar = parseInt(this.getAttribute("data-index"));
                abrirModalEdicao(indexEditar);
            });
        });

    } else {
        alert('Não existem itens Armazenados.');
    }
}
  
document.getElementById("exibirDados").addEventListener("click", function (event) {
    event.preventDefault();
    exibirDados();
});
  
//Exclui Sinistro no LocalStorage
function excluirSinistro(index) {
    const dadosArmazenados = localStorage.getItem("sinistros");
    if (dadosArmazenados) {
      const sinistros = JSON.parse(dadosArmazenados);
  
      // Remove o sinistro da lista 
      sinistros.splice(index, 1);
      localStorage.setItem("sinistros", JSON.stringify(sinistros));
  
      // Atualiza tela
      exibirDados();
    }
}

// Abri Modal
function abrirModalEdicao(index) {
    const dadosArmazenados = localStorage.getItem("sinistros");
    if (dadosArmazenados) {
        const sinistros = JSON.parse(dadosArmazenados);
        const sinistro = sinistros[index];

        document.getElementById("data-sinistro-editar").value = sinistro.dataSinistro;
        document.getElementById("tipo-sinistro-editar").value = sinistro.tipoSinistro;
        document.getElementById("rua-editar").value = sinistro.endereco.rua;
        document.getElementById("numero-editar").value = sinistro.endereco.numero;
        document.getElementById("bairro-editar").value = sinistro.endereco.bairro;
        document.getElementById("cidade-editar").value = sinistro.endereco.cidade;
        document.getElementById("estado-editar").value = sinistro.endereco.estado;
        document.getElementById("pais-editar").value = sinistro.endereco.pais;

        indiceEditar = index;

        // Abre o modal
        const myModal = new bootstrap.Modal(document.getElementById('modalEditarSinistro'));
        myModal.show();
    }
}

// Clique do btn de Salvar no Modal
document.getElementById("salvarEdicaoSinistro").addEventListener("click", function (event) {
    event.preventDefault();
    salvarEdicaoSinistro();
    
});

let indiceEditar = -1;

// Função que salva dados editados
function salvarEdicaoSinistro() {
    const dataSinistro = document.getElementById("data-sinistro-editar").value;
    const tipoSinistro = document.getElementById("tipo-sinistro-editar").value;
    const rua = document.getElementById("rua-editar").value;
    const numero = document.getElementById("numero-editar").value;
    const bairro = document.getElementById("bairro-editar").value;
    const cidade = document.getElementById("cidade-editar").value;
    const estado = document.getElementById("estado-editar").value;
    const pais = document.getElementById("pais-editar").value;

    const sinistroEditado = {
        dataSinistro,
        tipoSinistro,
        endereco: {
            rua,
            numero,
            bairro,
            cidade,
            estado,
            pais,
        },
    };

    const dadosArmazenados = localStorage.getItem("sinistros");
    if (dadosArmazenados) {
        const sinistros = JSON.parse(dadosArmazenados);

        // Atualiza o sinistro na lista de sinistros
        sinistros[indiceEditar] = sinistroEditado;

        // Salva no LocalStorage
        localStorage.setItem("sinistros", JSON.stringify(sinistros));

        // Fecha o modal
        const myModal = new bootstrap.Modal(document.getElementById('modalEditarSinistro'));
        myModal.hide();

        // Atualiza a exibição dos sinistros
        exibirDados();
    }
}
