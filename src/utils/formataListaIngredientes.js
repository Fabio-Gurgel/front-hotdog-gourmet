function formataListaIngredientes(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
      return '';
    }
  
    const ingredientes = lista.map(item => item.nome);
    const ultimoIngrediente = ingredientes.pop();
  
    if (ingredientes.length === 0) {
      return ultimoIngrediente;
    } else {
      return `${ingredientes.join(', ')} e ${ultimoIngrediente}.`;
    }
}

export default formataListaIngredientes;