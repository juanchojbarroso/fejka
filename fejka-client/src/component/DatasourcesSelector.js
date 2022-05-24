import { useQuery } from "react-query";
import {
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
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
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Algo fue mal..</AlertTitle>
          <AlertDescription>
            No existen datasource para selecionar
          </AlertDescription>
        </Alert>
      </>
    );

  return (
    <>
      <Select
        placeholder="Select option"
        onChange={(e) =>
          onSelectChange(data.find((item) => item.id === e.target.value))
        }
      >
        {data.map((option, index) => {
          return (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Select>
    </>
  );
}
