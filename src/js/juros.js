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

let vIBruto = 0 
let vMBruto = 0;
let tJBruto = 0;


botaoCalcular.addEventListener("click", () => {
  let valorMensal = vMBruto;
  let valorInicial = vIBruto;
  let taxaJuros = tJBruto;
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

inputValorInicial.addEventListener("input", (e) => {
  let value = e.target.value;

  // 1. Remove tudo que não for dígito
  value = value.replace(/\D/g, "");

  vIBruto = value === "" ? 0 : Number(value) / 100;

  // 2. Se o valor estiver vazio, não faz nada
  if (value === "") {
    e.target.value = "";
    return;
  }

  // 3. Garante que o valor tem pelo menos 3 dígitos para as casas decimais
  if (value.length < 3) {
    value = value.padStart(3, "0");
  }

  // 4. Separa a parte inteira e decimal
  const integerPart = value.slice(0, -2);
  const decimalPart = value.slice(-2);

  // 5. Adiciona os pontos de milhar na parte inteira
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // 6. Remove zeros à esquerda da parte inteira (ex: "001" vira "1", "00" vira "0")
  formattedInteger = formattedInteger.replace(/^0+/, "");

  // 7. Se a parte inteira ficar vazia, define como "0"
  if (formattedInteger === "") {
    formattedInteger = "0";
  }

  // 8. Combina as partes e adiciona a moeda
  let formattedValue = formattedInteger + "," + decimalPart;

  // 9. Atualiza o valor do input
  e.target.value = formattedValue;
});

inputValorMensal.addEventListener("input", (e) => {
  let value = e.target.value;

  // 1. Remove tudo que não for dígito
  value = value.replace(/\D/g, "");

  vMBruto = value === "" ? 0 : Number(value) / 100;

  // 2. Se o valor estiver vazio, não faz nada
  if (value === "") {
    e.target.value = "";
    return;
  }

  // 3. Garante que o valor tem pelo menos 3 dígitos para as casas decimais
  if (value.length < 3) {
    value = value.padStart(3, "0");
  }

  // 4. Separa a parte inteira e decimal
  const integerPart = value.slice(0, -2);
  const decimalPart = value.slice(-2);

  // 5. Adiciona os pontos de milhar na parte inteira
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // 6. Remove zeros à esquerda da parte inteira (ex: "001" vira "1", "00" vira "0")
  formattedInteger = formattedInteger.replace(/^0+/, "");

  // 7. Se a parte inteira ficar vazia, define como "0"
  if (formattedInteger === "") {
    formattedInteger = "0";
  }

  // 8. Combina as partes e adiciona a moeda
  let formattedValue = formattedInteger + "," + decimalPart;

  // 9. Atualiza o valor do input
  e.target.value = formattedValue;
});

inputTaxaJuros.addEventListener("input", (e) => {
  let value = e.target.value;

  // 1. Remove tudo que não for dígito
  value = value.replace(/\D/g, "");

  tJBruto = value === "" ? 0 : Number(value) / 100;

  // 2. Se o valor estiver vazio, limpa o input e retorna
  if (value === "") {
    e.target.value = "";
    return;
  }

  // 3. Garante que o valor tenha pelo menos 3 dígitos para as casas decimais
  if (value.length < 3) {
    value = value.padStart(3, "0");
  }

  // 4. Separa a parte inteira e decimal
  const integerPart = value.slice(0, -2);
  const decimalPart = value.slice(-2);

  // 5. Remove zeros à esquerda da parte inteira (ex: "001" vira "1", "00" vira "0")
  let formattedInteger = integerPart.replace(/^0+/, "");

  // 6. Se a parte inteira ficar vazia, define como "0"
  if (formattedInteger === "") {
    formattedInteger = "0";
  }

  // 7. Combina as partes com o ponto e o símbolo de porcentagem
  let formattedValue = formattedInteger + "." + decimalPart;

  // 8. Atualiza o valor do input
  e.target.value = formattedValue;
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
// para amanhã: responsivo sob - feito 15:20 11/

// 15:56 reportado: formtação mobile
// 16:27 corrigido formatação mobile