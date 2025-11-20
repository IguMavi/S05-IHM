// ===== CONFIGURAÇÕES E DADOS =====
const CONFIG = {
    eventos: [
        {id:1,title:"Semana do Software 2025",date:"12/05",time:"10:00",location:"Salão de Eventos",type:"tech",description:"Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",image:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400"},
        {id:2,title:"Workshop de IoT",date:"12/01",time:"08:00",location:"Laboratório CS&I",type:"tech",description:"Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400"},
        {id:3,title:"Festa dos Alunos 2025",date:"18/05",time:"19:00",location:"Área Esportiva",type:"cultural",description:"Venha comemorar a melhor Festa dos Alunos de todos os tempos!",image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400"},
        {id:4,title:"Feira de Oportunidades",date:"04/05",time:"10:00",location:"Salão de Eventos",type:"academic",description:"Venha conhecer empresas e projetos com destaque na área da engenharia.",image:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400"}
    ],
    
    auxilios: [
        {nome:"Bolsa Mérito",valorMensal:450,status:"Ativo",proximaDataPagamento:"10/12/2025",descricao:"Auxílio concedido com base no desempenho acadêmico."},
        {nome:"Auxílio Alimentação",valorMensal:250,status:"Pendente",proximaDataPagamento:"Aguardando atualização",descricao:"Auxílio para custeio de refeições no campus."}
    ],
    
    temas: {
        inatel: {
            "--cor-click": "#126ae2",
            "--cor-sombra": "#0a599b", 
            "--cor-text": "black",
            "--cor-back1": "#edf2f4",
            "--cor-back2": "#6a937a",
            "--md-sys-color-primary": "#126ae2"
        },
        limao: {
            "--cor-click": "#38184C",
            "--cor-sombra": "#9b0a59",
            "--cor-text": "black", 
            "--cor-back1": "#CEF09D",
            "--cor-back2": "#4f6a93",
            "--md-sys-color-primary": "#38184C"
        },
        dark: {
            "--cor-click": "#CEF09D",
            "--cor-sombra": "#9b0a59",
            "--cor-text": "black",
            "--cor-back1": "#38184C", 
            "--cor-back2": "#4f6a93",
            "--md-sys-color-primary": "#CEF09D"
        }
    }
};

// ===== MENU LATERAL =====
function openMenu() {
    document.getElementById("menu_aba").classList.add("show");
}

function closeMenu() {
    document.getElementById("menu_aba").classList.remove("show");
}

// ===== SISTEMA DE TEMAS =====
function aplicarTema(temaNome) {
    const tema = CONFIG.temas[temaNome];
    const root = document.documentElement;
    
    for (const [variavel, valor] of Object.entries(tema)) {
        root.style.setProperty(variavel, valor);
    }
    closeMenu();
}

// Atalhos diretos para os temas
function temaInatel() { aplicarTema('inatel'); }
function temaLim() { aplicarTema('limao'); }
function temaDark() { aplicarTema('dark'); }

// ===== CARROSSEL =====
class Carrossel {
    constructor() {
        this.index = 0;
        this.carousel = document.querySelector(".carousel");
        this.init();
    }
    
    init() {
        this.criarCards();
        this.adicionarEventos();
        this.iniciarAutoPlay();
    }
    
    criarCards() {
        CONFIG.eventos.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="info">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p>
                        <span class="material-symbols-outlined icon">event</span> 
                        ${event.date} às ${event.time} 
                        <span class="material-symbols-outlined icon">pin_drop</span> 
                        ${event.location}
                    </p>
                </div>`;
            this.carousel.appendChild(card);
        });
    }
    
    proximo() {
        this.index = (this.index + 1) % CONFIG.eventos.length;
        this.atualizar();
    }
    
    anterior() {
        this.index = (this.index - 1 + CONFIG.eventos.length) % CONFIG.eventos.length;
        this.atualizar();
    }
    
    atualizar() {
        this.carousel.style.transform = `translateX(-${this.index * 100}%)`;
    }
    
    adicionarEventos() {
        document.getElementById("nextBtn").addEventListener("click", () => this.proximo());
        document.getElementById("prevBtn").addEventListener("click", () => this.anterior());
        
        // Touch events para mobile
        let startX;
        this.carousel.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        this.carousel.addEventListener("touchend", e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) this.proximo();
            if (endX - startX > 50) this.anterior();
        });
    }
    
    iniciarAutoPlay() {
        setInterval(() => this.proximo(), 5000);
    }
}

// ===== COMPONENTE DE AULAS =====
class AulasComponent extends HTMLElement {
    constructor() {
        super();
        this.aulas = [
            {id:1,disciplina:"S05 - Interface Homem-máquina",data:"ter",horario:"10:00",local:"P1-S17",prova_alert:false,prova:"12/05",frequencia:"10/25",nota:"10"},
            {id:2,disciplina:"E01 - Circuitos Elétricos em Corrente Contínua",data:"ter",horario:"10:00",local:"P1-S17",prova_alert:true,prova:"12/05",frequencia:"10/25",nota:"5"},
            {id:3,disciplina:"M02 - Álgebra e Geometria Analítica",data:"qua",horario:"10:00",local:"P1-S17",prova_alert:true,proximaDataPagamento:"12/05",frequencia:"10/25",nota:"7"}
        ];
        this.hoje = "ter";
    }

    connectedCallback() { 
        this.render(); 
    }

    obterCorNota(nota) {
        nota = Number(nota);
        if (nota < 6) return "#e53e3e";
        if (nota < 8) return "#f59e0b";
        return "#16a34a";
    }

    render() {
        const aulasDia = this.aulas.filter(a => a.data === this.hoje);
        
        this.innerHTML = `
            <style>
                .comp-aula {
                    background: white;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 10px;
                    box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
                }
                .titulo_aula {
                    font-weight: bold;
                    font-size: 15px;
                    color: var(--cor-text);
                    margin-bottom: 8px;
                }
                .info-aula {
                    font-size: 11px;
                    color: var(--cor-text);
                    margin: 5px 0;
                }
                .lables {
                    display: flex;
                    gap: 10px;
                    margin-top: 10px;
                }
                .lable-prova, .lable-frequencia, .lable-nota {
                    padding: 7px 15px;
                    border-radius: 500px;
                    color: white;
                    font-size: 12px;
                }
                .lable-prova { background: #126ae2; }
                .lable-frequencia { background: #0a599b; }
            </style>
            <div>
                ${aulasDia.map(a => `
                    <div class="comp-aula">
                        ${a.prova_alert ? 
                            `<div class="lable-prova">PROVA: <b>${a.prova}</b></div>` : ''
                        }
                        <div class="titulo_aula">${a.disciplina}</div>
                        <p class="info-aula">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                        <div class="lables">
                            <div class="lable-frequencia">FALTAS: <b>${a.frequencia}</b></div>
                            <div class="lable-nota" style="background:${this.obterCorNota(a.nota)}">
                                CR: <b>${a.nota}</b>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>`;
    }
}

// ===== SISTEMA DE AUXÍLIOS =====
function abrirAuxilios() {
    document.getElementById("tela_principal").style.display = "none";
    document.getElementById("tela_auxilios").style.display = "block";
    carregarAuxilios();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarHome() {
    document.getElementById("tela_auxilios").style.display = "none";
    document.getElementById("tela_principal").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function carregarAuxilios() {
    const lista = document.getElementById("lista_auxilios");
    lista.innerHTML = CONFIG.auxilios.map(a => `
        <div class="card_auxilio">
            <h3>${a.nome}</h3>
            <p><b>Valor Mensal:</b> R$ ${a.valorMensal}</p>
            <p><b>Status:</b> ${a.status}</p>
            <p><b>Próx. Pagamento:</b> ${a.proximaDataPagamento}</p>
            <p>${a.descricao}</p>
        </div>
    `).join('');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Registrar componentes
    customElements.define("aulas-component", AulasComponent);
    
    // Iniciar carrossel
    new Carrossel();
    
    // Carregar auxílios se estiver na tela
    if (document.getElementById("tela_auxilios").style.display === "block") {
        carregarAuxilios();
    }
});
