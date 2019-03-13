import { 
  itemsUpdated,
  attCart,
  closeCart,
  addIdToCart
} from './actions'

export const addCart = product => async (dispatch, getState) => {
  const {
    cart: { items, id }
  } = getState();

  console.log('getState', items)
  let itemFound = false;
  let newList = [];
  if(items) {
    newList = items.map(i => {
      if (i.sku === product.sku) {
        i.quantity++;
        itemFound = true;
      }
      return i;
    })
  }
  
  if (!itemFound) {
    product.quantity = 1;
    newList.push(product);
  }

  dispatch(itemsUpdated(newList));

  if(!id) {
    let randomCartId = Math.floor(Math.random() * 10000) + 1;
    dispatch(addIdToCart(randomCartId))
  }
  //let sameProduct = getState().cart.list.filter((i) => i.product === product );
  //console.log('mesmo', sameProduct)
  // Action para adicionar quantidade
  // Array com todos produtos iguais 
  // dispatch(addQuantityToItem(sameProduct.length))

  // Action para adicionar produtos na lista
  //dispatch(addToCart(product))

  return true
}

export const removeCart = sku => async (dispatch, getState) => {
  const {
    cart: { items }
  } = getState();

  let newList = items.map(i => {
    if (i.sku === sku) {
      i.quantity--;
    }
    return i;
  })
  .filter(i => i.quantity > 0);

  console.log('list up', newList)

  dispatch(itemsUpdated(newList));

  return true
}

export const showCart = param => async (dispatch, getState) => {
  dispatch(closeCart(param))
  return true
}