import React, { useState, useContext } from 'react'

const DataSetContext = React.createContext()

export const DataSetProvider = ({ children }) => {
  const [DataSet, setDataSet] = useState(null)

  return (
    <DataSetContext.Provider value={{ DataSet, updateDataSet: setDataSet }}>
      {children}
    </DataSetContext.Provider>
  )
}

export const useDataSet = () => {
  const { DataSet, updateDataSet } = useContext(DataSetContext)
  return { DataSet, updateDataSet }
}