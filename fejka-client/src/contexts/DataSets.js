import React, { useState, useContext } from 'react'

const DataSetContext = React.createContext()

export const DataSetProvider = ({ children }) => {
  const [dataSet, setDataSet] = useState(null)

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