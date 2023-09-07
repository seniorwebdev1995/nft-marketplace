import {
  InputAdornment,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { ReactNode } from "react";
import { ICategory } from "../../../props/IArtist";

// const currencies = [
//   {
//     value: "USD",
//     label: "Rap",
//   },
//   {
//     value: "EUR",
//     label: "Rap",
//   },
//   {
//     value: "BTC",
//     label: "Rap",
//   },
//   {
//     value: "JPY",
//     label: "Rap",
//   },
// ];

interface Props {
  options?: ICategory[];
  icon?: ReactNode;
  textFieldProps?: Partial<TextFieldProps>;
  isSort?: boolean;
  withDefault?: boolean;
  onChange?: (value: string) => void;
}

export const ExploreOptionsSelectInput = ({
  options,
  icon,
  isSort,
  textFieldProps,
  withDefault,
  onChange,
}: Props) => {
  const [value, setValue] = React.useState(
    withDefault ? "All" : options?.[0]?.value
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      {...textFieldProps}
      select
      value={value}
      onChange={handleChange}
      SelectProps={{
        MenuProps: {
          MenuListProps: {
            style: {
              backgroundColor: "rgba(25, 18, 37, 1)",
            },
          },
        },
      }}
      InputLabelProps={{shrink: textFieldProps?.label === " " ? false : true}}
      variant="outlined"
      sx={() => ({
        "& .MuiInputBase-root": {
          borderRadius: "64px",
          minWidth: isSort ? 180 : "inherit",
          color: "white",
          textTransform: "capitalize",
          "& .MuiSelect-select": {
            paddingRight: 2,
          },
          "& .MuiSelect-icon": {
            display: "none",
          },
        },
      })}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : undefined
      }
    >
      {withDefault && (
        <MenuItem
          sx={{
            background: "rgba(25, 18, 37, 1)",
          }}
          key={"All"}
          value={"All"}
        >
          {"All"}
        </MenuItem>
      )}

      {options?.map((option) => (
        <MenuItem
          sx={{
            background: "rgba(25, 18, 37, 1)",
          }}
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
