import React, { useState } from 'react'
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

type Food = typeof defaultMainMenus[number]['foods'][number]

function App() {
  const [mainMenus, setMainMenus] = useState(defaultMainMenus)

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
    </div>
  )
}

export default App
