import { useEffect, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [show, setShow] = useState('hide')
  const [searchItem, SetsearchItem] = useState('')
  const [searchQuery, SetsearchQuery] = useState('')
  const [adicionado, setAdicionado] = useState("")

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => (setProducts(data)))
  }, [])

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
    setAdicionado('Produto adicionado')
  }

  useEffect(() => {
    if (adicionado) {
      const timer = setInterval(() => {
        setAdicionado('')
      }, 1000);
      return () => clearTimeout(timer)
    }
  }, [adicionado])

  const removeFromCart = (id) => {
    const productToRemove = cart.find(product => id === product.id)
    if (productToRemove.quantity > 1) {
      setCart(cart.map((product) => (
        product.id === id ? { ...product, quantity: product.quantity - 1 } : product
      )))
    } else {
      setCart(cart.filter((product) => (
        product.id !== id
      )))
    }
  }

  const toogleCartVisible = () => {
    setShow((prev) =>
      prev === "hide" ? "show" : "hide")
  }

  const handleSearchQuery = () => {
    SetsearchQuery(searchItem)
    SetsearchItem('')
  }

  return (
    <div>
      <div className="container">
        <header className="bg-primary rounded d-flex justify-content-between align-items-center">
          <h1>My E-commerce</h1>
          <div className="search-bar d-flex">
            <input
              type="text"
              className="form-control"
              value={searchItem}
              onChange={(e) => SetsearchItem(e.target.value)}
            />
            <button className='btn btn-primary ms-2' onClick={handleSearchQuery}><CiSearch /></button>
          </div>
          <ul className="d-flex list-unstyled">
            <li>HOME</li>
            <li onClick={toogleCartVisible} className="d-flex align-items-center ms-3">
              <MdOutlineShoppingCart style={{ fontSize: '1.5em' }} />
              <span className="badge bg-warning ms-2">{cart.reduce((acc, product) => acc + product.quantity, 0)}</span>
            </li>
          </ul>
        </header>

        <div className={`cart-container ${show} mt-4`}>
          <h4>Your cart</h4>
          {cart.map((product) => (
            <div key={product.id} className='cart-line d-flex justify-content-between align-items-center'>
              <img src={product.image} alt="" style={{ height: '2em', width: '2em' }} />
              <span className='p-cart'>{product.title}.</span> R${product.price.toFixed(2)}
              <div>
                <button  onClick={() => removeFromCart(product.id)}>-</button>
                X {product.quantity}
                <button  onClick={() => addToCart(product.id)}>+</button>
              </div>
            </div>
          ))}
          <h4 className="total mt-3">Total em compras = R${cart.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</h4>
        </div>

        <div className={`${adicionado}`} role="alert">{adicionado}</div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products
            .filter(product =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <div key={product.id} className="col">
                <div className="card shadow-sm cardd d-flex flex-column justify-content-between">
                  <img src={product.image} alt="" className="card-img-top" />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <p className='card-title'>{product.title}</p>
                    <p className='card-text'>R$:{product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product.id)} className="btn btn-primary w-100">
                      Add to cart
                    </button>
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
