import {
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {  } from "../api";

export default function DatasourcesSelector({ options, onSelectChange }) {

  if (!options.length)
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
          onSelectChange(options.find((item) => item.id === e.target.value))
        }
      >
        {options.map((option, index) => {
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
