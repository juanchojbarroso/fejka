import React from "react";
import { Select } from "@chakra-ui/react";

export default function AxisSelector({ keys, onChange, ...props }) {
  return (
    <Select
      variant="filled"
      placeholder="Select one.."
      size="sm"
      isDisabled={false}
      onChange={(e) => {
        onChange(e);
      }}
      {...props}
    >
      {!!keys ? (
        keys.map((key, index) => {
          return (
            <option key={index} value={key}>
              {key}
            </option>
          );
        })
      ) : (
        <option value="none">Not dataset selected</option>
      )}
    </Select>
  );
}
