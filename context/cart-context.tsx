"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  brand: string
  image: string
  price: number
  quantity: number
  weight?: string
  flavor?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
    setItems(prev => {
      // Create unique key with id and flavor
      const cartKey = item.flavor ? `${item.id}-${item.flavor}` : item.id
      const existingItem = prev.find(i => {
        const existingKey = i.flavor ? `${i.id}-${i.flavor}` : i.id
        return existingKey === cartKey
      })
      if (existingItem) {
        return prev.map(i => {
          const iKey = i.flavor ? `${i.id}-${i.flavor}` : i.id
          return iKey === cartKey
            ? { ...i, quantity: i.quantity + quantity }
            : i
        })
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
