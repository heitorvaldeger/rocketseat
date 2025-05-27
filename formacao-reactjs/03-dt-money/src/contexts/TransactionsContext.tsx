import { PropsWithChildren, useEffect, useState, useCallback } from "react";
import { Transaction } from "../models/transaction";
import { api } from "../libs/axios";
import { createContext, useContext } from "use-context-selector";

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome'
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export const TransactionsProvider = ({ children }: PropsWithChildren) => {
  const [ transactions, setTransactions ] = useState<Transaction[]>([])
  
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query,
        _sort: 'id',
        _order: 'desc'
      }
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date().toISOString()
    })

    setTransactions(prevState => [response.data, ...prevState])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const transactionsContext = useContext(TransactionsContext)

  if (!transactionsContext) {
    throw new Error('transactionsContext don\'t created')
  }

  return transactionsContext
}