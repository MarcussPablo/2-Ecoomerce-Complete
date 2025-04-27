import { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsCartDash } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";

const App = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => (setProducts(data)))
  }, [])

  const [cart, setCart] = useState([])
  const addToCart = (id) => {
    const selectedProduct = products.find(product => id === product.id)
    const existIncart = cart.find(product => id === product.id)

    if (selectedProduct) {
      if (existIncart) {
        setCart(cart.map((product) => (
          product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        )))
      } else {
        setCart([...cart, { ...selectedProduct, quantity: 1 }])
      }
    }
  }

  const removeFromCart = (id) =>{
    const productToRemove = cart.find(product => id === product.id)
    if(productToRemove.quantity > 1){
      setCart(cart.map((product)=>(
        product.id === id ? {...product, quantity:product.quantity -1} : product
      )))
    }else{
      setCart(cart.filter((product)=>(
        product.id !== id
      )))
    }
  }

  const [show, setShow] = useState('hide')

  const toogleCartVisible = () => {
    setShow((prev) =>
      prev === "hide" ? "show" : "hide")
  }
  return (
    <div >
      <div className="container">
        <header>
          <h1>My E-commerce</h1>
          <ul>
            <li>HOME</li>
            <li onClick={toogleCartVisible}><MdOutlineShoppingCart style={{fontSize:'x-large'}}/>
            <span style={{color:'orange'}}>{cart.reduce((acc, product)=>acc + product.quantity,0)}</span></li>
          </ul>
        </header>
        <div className={` ${show}`}>
          <h4>Your cart</h4>
          {cart.map((product) => (
            <p key={product.id} className='cart-line'>
              <img src={product.image} alt="" style={{ height: '2em', width: '2em' }} />
              <span className='cart-p'>{product.title}.</span> R${product.price.toFixed(2)}<div>
                <button className='product-button' onClick={()=>removeFromCart(product.id)}>-</button> X {product.quantity}
                <button className='product-button' onClick={() => addToCart(product.id)}>+</button></div>
            </p>
            
          ))}
          <h4 className="total">Total em compras = R${cart.reduce((acc, product)=>acc + (product.price*product.quantity),0).toFixed(2)}</h4>
        </div>
        <div className="roww">
          {products.map((product) => (
            <div className="coll">
              <div className="cardd">
                <img src={product.image} alt="" className="cards-img-top" />
                <div className="cardd-body">
                  <div className="ttitle">
                    <p className='p-title'>{product.title}</p>
                  </div>
                  <div className="ttitle">
                    <p className='p-price'>R$:{product.price.toFixed(2)}</p>
                  </div>
                  <div className="ttitle">
                    <button onClick={() => addToCart(product.id)} className="cardd-btn">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default App