import { useQuery } from "react-query";
import { useDataSet } from "../contexts/DataSets";
import { fetchDataSetsKeys } from "../api";


export function useDataSetKeys() {
  const { dataSet } = useDataSet();

  const dataSetID = dataSet?.id;

  return useQuery(
    ["datasetsKeys", dataSetID],
    () => fetchDataSetsKeys(dataSetID),
    { enabled: !!dataSetID }
  );
}
