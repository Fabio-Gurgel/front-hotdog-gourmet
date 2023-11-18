function converterPreco(preco) {
  const numeroFormatado = parseFloat(preco).toFixed(2);

  const precoFormatado = `R$ ${numeroFormatado.replace('.', ',')}`;

  return precoFormatado;
}

export default converterPreco;