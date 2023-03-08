import React from "react";
import "./index.css";

const ProductList = ({ 
  products,
  onSetProducts,
  onSetCart,
 }) => {
  const handleSetCart = (product) => {
    onSetCart(prevCart => {
      if (prevCart.map(p => p.item).includes(product.name)) {
        return [...prevCart].map(p => {
          if (p.item === product.name) {
            return {
              item: p.item,
              quantity: p.quantity + 1,
            };
          }

          return p;
        })
      }

      return [
        ...prevCart,
        {
          item: product.name,
          quantity: product.cartQuantity + 1,
        }
      ]
    })
  };

  const handleAddToCart = (productId) => {
    onSetProducts(prevProducts => (
      [...prevProducts].map(p => {
        if (p.id === productId) {
          handleSetCart(p);

          return {
            ...p,
            cartQuantity: p.cartQuantity + 1,
          }
        }

        return p;
      })
    ));
  };

  const handleResetCart = (product, cartQuantity) => {
    if (cartQuantity === 0) {
      onSetCart(prevCart => {
        return [...prevCart].filter(p => (
          p.item !== product.name
        ))
      })
    } else {
      onSetCart(prevCart => {
        return [...prevCart].map(p => {
          if (p.item === product.name) {
            return {
              item: p.item,
              quantity: p.quantity - 1,
            };
          }
  
          return p;
        })
      })
    }
  };

  const handleRemoveFromCart = (productId) => {
    onSetProducts(prevProducts => (
      [...prevProducts].map(p => {
        if (p.id === productId) {
          handleResetCart(p, (p.cartQuantity - 1));

          return {
            ...p,
            cartQuantity: p.cartQuantity - 1 ,
          }
        }

        return p;
      })
    ));
  };

  return (
    <div className="layout-row wrap justify-content-center flex-70 app-product-list">
        {products.map((product, i) => {
            return (
                <section className="w-30"
                         data-testid={'product-item-' + i}
                         key={product.id}>
                    <div className="card ma-16">
                        <img alt="Your Cart" src={product.image}
                             className="d-inline-block align-top product-image"/>
                        <div className="card-text pa-4">
                            <h5 className="ma-0 text-center">{product.name}</h5>
                            <p className="ma-0 mt-8 text-center">${product.price}</p>
                        </div>
                        <div className="card-actions justify-content-center pa-4">

                            {
                              (product.cartQuantity === 0)
                                ? (
                                  <button 
                                    className="x-small outlined" 
                                    data-testid="btn-item-add"
                                    onClick={() => handleAddToCart(product.id)}
                                  >
                                      Add To Cart
                                  </button>
                                )
                                : (
                                  <div className="layout-row justify-content-between align-items-center">
                                    <button 
                                      className="x-small icon-only outlined"
                                      data-testid="btn-quantity-subtract"
                                      onClick={() => handleRemoveFromCart(product.id)}

                                    >
                                        <i className="material-icons">remove</i>
                                    </button>

                                    <input 
                                      type="number"    
                                      disabled
                                      className="cart-quantity" 
                                      data-testid="cart-quantity"
                                      value={product.cartQuantity}
                                    />

                                    <button
                                      className="x-small icon-only outlined"
                                      data-testid="btn-quantity-add"
                                      onClick={() => handleAddToCart(product.id)}
                                    >
                                        <i className="material-icons">add</i>
                                    </button>
                                  </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            )
        })}

    </div>
  );
};

export default ProductList;
