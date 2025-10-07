// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {

  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // filtrar armários disponíveis e compatíveis com o usuário
  let armariosDisponiveis = armarios.filter(a => 
    a.formato === tipoSelecionado && 
    a.status === true && 
    usuario.acessibilidade === a.acessivel
  );
  
  // caso não exista armário disponível
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = 
      `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // sorteia um armário disponível
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // atualiza o status do armário
  let armarioEmprestado = armarios.find(a => a.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  
  // define pendência do usuário
  usuario.pendencia = true;

  // === 🔹 NOVAS FUNCIONALIDADES ===

  // 1️⃣ Data e hora da reserva
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva;

  // 2️⃣ Data e hora da entrega (24h depois)
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega;

  // 3️⃣ Exibir a data e hora formatadas
  let dataEntregaFormatada = dataEntrega.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });

  document.getElementById("resultado").innerText = 
    `Olá, ${usuario.nome}! O armário ${armarioEmprestado.id} foi reservado com sucesso!\n` +
    `Data de entrega das chaves: ${dataEntregaFormatada}`;

  console.log(usuario);
  console.log(armarios);
}
