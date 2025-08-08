const inputValorInicial = document.getElementById("valor-inicial");
const inputValorMensal = document.getElementById("valor-mensal");
const inputTaxaJuros = document.getElementById("taxa-juros");
const inputJurosPeriodo = document.getElementById("juros-periodo");

const selectPorcentagemJuros = document.getElementById("porcentagem-select");
const selectPeriodo = document.getElementById("periodo-select");

const botaoCalcular = document.getElementById("calcular");

const modal = document.querySelector(".modal");

const valorInicialModal = document.querySelector(".valor-inicial-modal");
const valorMensalModal = document.querySelector(".valor-mensal-modal");
const taxaJurosModal = document.querySelector(".taxa-juros-modal");
const periodoQuantidadeModal = document.querySelector(
  ".periodo-quantidade-modal"
);
const taxaPeriodoModal = document.querySelector(".taxa-periodo-modal");
const rendimentoTotalModal = document.querySelector(".rendimento-total-modal");

const fecharModal = document.getElementById("fechar-modal");

botaoCalcular.addEventListener("click", () => {
  let valorMensal = inputValorMensal.value;
  let valorInicial = inputValorInicial.value;
  let taxaJuros = inputTaxaJuros.value;
  let periodoJuros = inputJurosPeriodo.value;

  valorInicial = valorInicial === "" ? 0 : Number(valorInicial);
  taxaJuros = taxaJuros === "" ? 0 : Number(taxaJuros);
  periodoJuros = periodoJuros === "" ? 0 : Number(periodoJuros);
  valorMensal = valorMensal === "" ? 0 : Number(valorMensal);

  const taxaPeriodo = selectPorcentagemJuros.value;
  const periodoTempo = selectPeriodo.value;

  taxaJuros = taxaJuros / 100;
  let taxaParaExibicao = taxaJuros;

  if (taxaPeriodo === "anual") {
    taxaPeriodoModal.innerHTML = "Ao Ano";
    taxaJuros = (1 + taxaJuros) ** (1 / 12) - 1; // Para cálculo
  } else {
    taxaPeriodoModal.innerHTML = "Ao Mês";
  }

  if (periodoTempo === "periodo-anos") {
    periodoJuros *= 12;
  }

  let resultadoBruto = 0;
  if (valorInicial === 0 || taxaJuros === 0 || periodoJuros === 0) {
    resultadoBruto = 0;
  } else {
    resultadoBruto = calcularJuros(
      valorInicial,
      taxaJuros,
      periodoJuros,
      valorMensal
    );
  }

  let resultado = resultadoBruto.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  valorInicial = valorInicial.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  valorMensal = valorMensal.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  valorInicialModal.innerHTML = valorInicial;
  valorMensalModal.innerHTML = valorMensal;
  taxaJurosModal.innerHTML = (taxaParaExibicao * 100).toFixed(2);
  periodoQuantidadeModal.innerHTML = periodoJuros;
  rendimentoTotalModal.innerHTML = resultado;

  modal.style.display = "flex";

  console.log(resultado);
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function calcularJuros(vInicial = 0, tJ = 0, periodo = 0, vMensal = 0) {
  resultado =
    vInicial * (1 + tJ) ** periodo + vMensal * (((1 + tJ) ** periodo - 1) / tJ);

  return resultado;
}

// 07/08 21:41
// Para amanhã: arredondar resultado p 2 casas decimais só e ajeitar os selects - feito 17:23 08/08

// 08/08 17:23 començando: formatação de texto - deixado de lado, corrigido erros de valores NaN etc.

// 08/08 17:57 
// para amanhã: responsivo sob
