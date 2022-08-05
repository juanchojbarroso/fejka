import React, { useState, useContext } from 'react'

const DataSourceContext = React.createContext()

export const DataSourceProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState(null)

  return (
    <DataSourceContext.Provider value={{ dataSource, updateDataSource: setDataSource }}>
      {children}
    </DataSourceContext.Provider>
  )
}

export const useDataSource = () => {
  const { dataSource, updateDataSource } = useContext(DataSourceContext)
  return { dataSource, updateDataSource }
}