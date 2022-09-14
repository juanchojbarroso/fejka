import React, { useContext } from 'react'
import { useLocalStorage } from "../hooks/local-store";

const DataSetContext = React.createContext()

export const DataSetProvider = ({ children }) => {
  const [dataSet, setDataSet] = useLocalStorage("DataSet", null)

  return (
    <DataSetContext.Provider value={{ dataSet, updateDataSet: setDataSet }}>
      {children}
    </DataSetContext.Provider>
  )
}

export const useDataSet = () => {
  const { dataSet, updateDataSet } = useContext(DataSetContext)
  return { dataSet, updateDataSet }
}