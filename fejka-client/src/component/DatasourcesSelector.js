import { useQuery } from "react-query";
import { Select } from "@chakra-ui/react";
import { fetchDatasources } from "../api";

export default function DatasourcesSelector({ onSelectChange }) {
  const { isLoading, error, data } = useQuery(
    "datasourcesData",
    fetchDatasources
  );

  if (isLoading)
    return (
      <Select placeholder="Select option">
        <option>Loading</option>;
      </Select>
    );

  if (error)
    return (
      <Select placeholder="Select option">
        <option>{error.message}</option>;
      </Select>
    );

  return (
    <div>
      <Select
        placeholder="Select option"
        onChange={(e) => onSelectChange(data.find( item => item.id === e.target.value))}
      >
        {data.map((option) => {
          return <option value={option.id}>{option.name}</option>;
        })}
      </Select>
    </div>
  );
}
