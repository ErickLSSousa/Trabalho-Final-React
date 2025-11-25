
// SISTEMA DE LIXEIRA
export function getDeletedProducts() {
    return JSON.parse(localStorage.getItem("deleted_products") || "[]");
  }
  

  function saveDeletedProducts(list) {
    localStorage.setItem("deleted_products", JSON.stringify(list));
  }
  
 
  export function addDeletedProduct(id) {
    const list = getDeletedProducts();
  
    if (!list.includes(id)) {
      list.push(id);
      saveDeletedProducts(list);
    }
  }
  

  export function restoreProduct(id) {
    const list = getDeletedProducts().filter(item => item !== id);
    saveDeletedProducts(list);
  }
  