import React, { useContext } from 'react'
import { useLocalStorage } from "../hooks/local-store";

const SelectedKeysContext = React.createContext()

export const SelectedKeysProvider = ({ children }) => {
  const [selectedKeys, setSelectedKeys] = useLocalStorage("SelectedKeys", [])

  return (
    <SelectedKeysContext.Provider value={{ selectedKeys, updateSelectedKeys: setSelectedKeys }}>
      {children}
    </SelectedKeysContext.Provider>
  )
}

export const useSelectedKeys = () => {
  const { selectedKeys, updateSelectedKeys } = useContext(SelectedKeysContext)
  return { selectedKeys, updateSelectedKeys }
}