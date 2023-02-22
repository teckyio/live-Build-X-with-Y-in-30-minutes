import React, { useState, useContext, createContext } from 'react'
import './App.css'

const defaultMainMenus = [
  {
    id: 1,
    name: 'Main Dish',
    foods: [
      { id: 1, name: 'Double Cheese Burger', quantity: 0 },
      { id: 2, name: 'French Fried', quantity: 0 },
      { id: 3, name: 'Fish Burger', quantity: 0 },
    ],
  },
  {
    id: 2,
    name: 'Drink',
    foods: [
      { id: 4, name: 'Coco Cola', quantity: 0 },
      { id: 5, name: 'Zero', quantity: 0 },
      { id: 6, name: 'Pepsi', quantity: 0 },
      { id: 7, name: 'Water', quantity: 0 },
    ],
  },
]

type CartState = typeof defaultMainMenus
type Food = typeof defaultMainMenus[number]['foods'][number]

type CartContextValue = {
  mainMenus: CartState
  setMainMenus: (mainMenus: CartState) => void
}

const CartContext = createContext<null | CartContextValue>(null)

function CartPage(props: {
  gotoCheckoutPage: () => void
  gotoCartPage: () => void
}) {
  const cartContextValue = useContext(CartContext)
  if (cartContextValue == null) {
    throw new Error('missing <CartContext.Provider/> in the parent')
  }
  const { mainMenus, setMainMenus } = cartContextValue
  const [mainMenuName, setMainMenuName] = useState('Drink')
  const foods = mainMenus.find(menu => menu.name === mainMenuName)?.foods

  function updateCart(food: Food, delta: number) {
    setMainMenus(
      mainMenus.map(menu => {
        if (menu.name === mainMenuName) {
          return {
            ...menu,
            foods: menu.foods.map(menuFood => {
              if (menuFood === food) {
                return {
                  ...food,
                  quantity: Math.max(0, food.quantity + delta),
                }
              } else {
                return menuFood
              }
            }),
          }
        } else {
          return menu
        }
      }),
    )
  }

  return (
    <div>
      <div>
        <button onClick={props.gotoCheckoutPage}>Checkout</button>
      </div>
      <h1>Category Menu</h1>
      <div className="cat-menu">
        {mainMenus.map(menu => (
          <div
            key={menu.id}
            className="cat-menu-item"
            onClick={() => setMainMenuName(menu.name)}
          >
            {menu.name}
          </div>
        ))}
      </div>
      <h1>{mainMenuName} Menu</h1>
      <div className="food-list">
        {foods?.map(food => (
          <div className="food-item" key={food.id}>
            <div className="food-title">{food.name}</div>
            <div className="cart-container">
              <button
                onClick={() => {
                  // food.quantity--
                  updateCart(food, -1)
                }}
              >
                -
              </button>
              <span className="cart-count">{food.quantity}</span>
              <button
                onClick={() => {
                  // food.quantity++
                  updateCart(food, +1)
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <CheckoutPage gotoCartPage={props.gotoCartPage} />
    </div>
  )
}

function CheckoutPage(props: { gotoCartPage: () => void }) {
  const cartContextValue = useContext(CartContext)
  if (cartContextValue == null) {
    throw new Error('missing <CartContext.Provider/> in the parent')
  }
  const { mainMenus, setMainMenus } = cartContextValue
  return (
    <div>
      <div>
        <button onClick={props.gotoCartPage}>Cart</button>
      </div>
      <h1>Checkout Page</h1>
      <ol>
        {mainMenus.flatMap(menu =>
          menu.foods
            .filter(food => food.quantity > 0)
            .map(food => (
              <li key={food.id}>
                {food.name} x {food.quantity}
              </li>
            )),
        )}
      </ol>
    </div>
  )
}

function App() {
  const [page, setPage] = useState('Cart')
  if (page == 'Cart') {
    return (
      <CartPage
        gotoCheckoutPage={() => setPage('Checkout')}
        gotoCartPage={() => setPage('Cart')}
      />
    )
  }
  if (page == 'Checkout') {
    return <CheckoutPage gotoCartPage={() => setPage('Cart')} />
  }
  return <div>Unknown page: {page}</div>
}

export default () => {
  const [mainMenus, setMainMenus] = useState(defaultMainMenus)
  return (
    <CartContext.Provider value={{ mainMenus, setMainMenus }}>
      <App />
    </CartContext.Provider>
  )
}
