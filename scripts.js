/* MENU LATERAL */
function openMenu() {
  document.getElementById("menu_aba").classList.add("show");
}
function closeMenu() {
  document.getElementById("menu_aba").classList.remove("show");
}

/* TEMAS */
function temaLim() {
  const root = document.documentElement;
  root.style.setProperty("--cor-click", "#38184C");
  root.style.setProperty("--cor-sombra", "#9b0a59");
  root.style.setProperty("--cor-text", "black");
  root.style.setProperty("--cor-back1", "#CEF09D");
  root.style.setProperty("--cor-back2", "#4f6a93");
  root.style.setProperty("--md-sys-color-primary", "#38184C");
}
function temaInatel() {
  const root = document.documentElement;
  root.style.setProperty("--cor-click", "#126ae2");
  root.style.setProperty("--cor-sombra", "#0a599b");
  root.style.setProperty("--cor-text", "black");
  root.style.setProperty("--cor-back1", "#edf2f4");
  root.style.setProperty("--cor-back2", "#6a937a");
  root.style.setProperty("--md-sys-color-primary", "#126ae2");
}
function temaDark() {
  const root = document.documentElement;
  root.style.setProperty("--cor-click", "#CEF09D");
  root.style.setProperty("--cor-sombra", "#9b0a59");
  root.style.setProperty("--cor-text", "black");
  root.style.setProperty("--cor-back1", "#38184C");
  root.style.setProperty("--cor-back2", "#4f6a93");
  root.style.setProperty("--md-sys-color-primary", "#CEF09D");
}

/* CARROSSEL */
const eventos = [
  {id:1,title:"Semana do Software 2025",date:"12/05",time:"10:00",location:"Salão de Eventos",type:"tech",description:"Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",image:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400"},
  {id:2,title:"Workshop de IoT",date:"12/01",time:"08:00",location:"Laboratório CS&I",type:"tech",description:"Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400"},
  {id:3,title:"Festa dos Alunos 2025",date:"18/05",time:"19:00",location:"Área Esportiva",type:"cultural",description:"Venha comemorar a melhor Festa dos Alunos de todos os tempos!",image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400"},
  {id:4,title:"Feira de Oportunidades",date:"04/05",time:"10:00",location:"Salão de Eventos",type:"academic",description:"Venha conhecer empresas e projetos com destaque na área da engenharia.",image:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400"}
];

const carousel = document.querySelector(".carousel");
function createCards() {
  eventos.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="info">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
      </div>`;
    carousel.appendChild(card);
  });
}
let index = 0;
function nextCard() { index = (index + 1) % eventos.length; updateCarousel(); }
function prevCard() { index = (index - 1 + eventos.length) % eventos.length; updateCarousel(); }
function updateCarousel() { carousel.style.transform = `translateX(-${index * 100}%)`; }
document.getElementById("nextBtn").addEventListener("click", nextCard);
document.getElementById("prevBtn").addEventListener("click", prevCard);
setInterval(nextCard, 5000);
let startX;
carousel.addEventListener("touchstart", e => startX = e.touches[0].clientX);
carousel.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextCard();
  if (endX - startX > 50) prevCard();
});
createCards();

/* AULAS COMPONENTE */
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.aulas = [
      {id:1,disciplina:"S05 - Interface Homem-máquina",data:"ter",horario:"10:00",local:"P1-S17",prova_alert:false,prova:"12/05",frequencia:"10/25",nota:"10"},
      {id:2,disciplina:"E01 - Circuitos Elétricos em Corrente Contínua",data:"ter",horario:"10:00",local:"P1-S17",prova_alert:true,prova:"12/05",frequencia:"10/25",nota:"5"},
      {id:3,disciplina:"M02 - Álgebra e Geometria Analítica",data:"qua",horario:"10:00",local:"P1-S17",prova_alert:true,prova:"12/05",frequencia:"10/25",nota:"7"}
    ];
    this.hoje = "ter";
  }

  connectedCallback() { this.render(); }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje);
    this.shadowRoot.innerHTML = `
      <style>
        :host { font-family: Arial, sans-serif; }
        .comp-aula {background:white;padding:15px;margin:20px;border-radius:10px;box-shadow:0px 4px 8px rgba(0,0,0,0.1);}
        .titulo_aula {font-weight:bold;font-size:15px;color:var(--cor-text);}
        p {font-size:11px;color:var(--cor-text);}
        .lables {display:flex;}
        .lable-prova,.lable-frequencia,.lable-nota {padding:7px 15px;margin-right:10px;border-radius:500px;color:white;}
      </style>
      <div>
        ${aulasDia.map(a => {
          let nota = Number(a.nota);
          let notaColor = nota < 6 ? "#e53e3e" : nota < 8 ? "#f59e0b" : "#16a34a";
          return `
            <div class="comp-aula">
              <div class="lable-prova" style="${a.prova_alert ? "" : "display:none"}; background:#126ae2;">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p>Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia" style="background:#0a599b;">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota" style="background:${notaColor}">CR: <b>${nota}</b></div>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }
}
customElements.define("aulas-component", AulasComponent);

/* AUXÍLIOS */
const auxilios = [
  {nome:"Bolsa Mérito",valorMensal:450,status:"Ativo",proximaDataPagamento:"10/12/2025",descricao:"Auxílio concedido com base no desempenho acadêmico."},
  {nome:"Auxílio Alimentação",valorMensal:250,status:"Pendente",proximaDataPagamento:"Aguardando atualização",descricao:"Auxílio para custeio de refeições no campus."}
];

function abrirAuxilios() {
  document.getElementById("tela_principal").style.display = "none";
  document.getElementById("tela_auxilios").style.display = "block";
  carregarAuxilios();
}

function voltarHome() {
  document.getElementById("tela_auxilios").style.display = "none";
  document.getElementById("tela_principal").style.display = "block";
}

function carregarAuxilios() {
  const lista = document.getElementById("lista_auxilios");
  lista.innerHTML = "";
  auxilios.forEach(a => {
    const card = document.createElement("div");
    card.className = "card_auxilio";
    card.innerHTML = `<h3>${a.nome}</h3>
      <p><b>Valor Mensal:</b> R$ ${a.valorMensal}</p>
      <p><b>Status:</b> ${a.status}</p>
      <p><b>Próx. Pagamento:</b> ${a.proximaDataPagamento}</p>
      <p>${a.descricao}</p>`;
    lista.appendChild(card);
  });
}
