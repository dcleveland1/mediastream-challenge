import { useState, useEffect } from 'react'
import { discountRules } from '../data'

const useCart = () => {
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 1
    }
  ])
  const [totalDiscount, setTotalDiscount] = useState(0)

  const changeQuantity = (item, action) => {
    return cart.map(cartElement => {
      if (cartElement.id === item.id) {
        let newQuantity
        if (action === '+') {
          newQuantity = cartElement.quantity + 1
        } else {
          newQuantity = cartElement.quantity - 1
        }
        return {
          ...cartElement,
          quantity: newQuantity
        }
      }
      return cartElement
    })
  }

  const setProductQuantity = (item, action) => {
    if (action === '+') {
      setCart(changeQuantity(item, action))
    } else {
      if (item.quantity === 1) {
        const carWithOutElement = cart.filter((cartElement) => cartElement.id !== item.id)
        setCart(carWithOutElement)
      } else {
        setCart(changeQuantity(item, action))
      }
    }
  }

  const addMovie = (item) => {
    cart.find(element => element.id === item.id)
      ? setProductQuantity({
        ...item,
        quantity: 1
      }, '+')
      : setCart([...cart, {
        ...item,
        quantity: 1
      }])
  }

  const arrayContainingArray = (allElements, subElements) => {
    let hasAllElements = true

    for (let i = 0; i < subElements.length; i++) {
      if (allElements.indexOf(subElements[i]) === -1) {
        hasAllElements = false
        break
      }
    }
    return hasAllElements
  }

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
      }, 0)
    )
    discountRules.forEach(element => {
      if (arrayContainingArray(cart.map(c => c.id), element.m)) {
        setTotalDiscount(element.discount)
      }
    })
  }, [cart])

  return {
    cart,
    addMovie,
    setProductQuantity,
    total,
    setTotal,
    totalDiscount
  }
}

export default useCart