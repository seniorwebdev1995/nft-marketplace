import { Stack } from "@mui/material";
import React, { useState } from "react";

import { ExploreOptionsSelectInput } from "./options-select-input";
import { ICategory } from "../../../props/IArtist";


interface Props {
  selectedIndex: number;
  options: ICategory[];
  onOptionSelected:any;
}

export const ExploreOptions = ({ selectedIndex, options, onOptionSelected }: Props) => {
 
  const [option, setOption] = useState("All");
  const [sort, setSortValue] = useState("");

  const handleChange = (value:string) => {
    setOption(value);
    onOptionSelected(value, sort);
  }

  const handleSortChange = (value:string) => {
    setSortValue(value);
    onOptionSelected(option, value);
  }

  let optionSorts = [
    {
      label: "New",
      value: "createdAt",
    },
    {
      label: "Most popular",
      value: "popularityScore"
    },
    {
      label: "Trendy",
      value: "trendingScore"
    }
  ]
  if(selectedIndex===1){
    optionSorts.push(    {
      label: "Scarcity",
      value: "Scarcity",
    })
  }
  
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={{ xs: 4, sm: 0 }}
      flexWrap="wrap"
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={{ xs: "space-between", sm: "flex-start" }}
        spacing={{ xs: 0, sm: 3 }}
        flexWrap="wrap"
        width={{ xs: "100%", sm: "auto" }}
      >
        <ExploreOptionsSelectInput
          withDefault={true}
          onChange={handleChange}
          textFieldProps={{
            label: " ",
          }}
          icon={
            <img
              src="/img/music.svg"
              alt="music"
            />
          }
          options={options}
        />
      </Stack>

      {/* <ExploreOptionsSelectInput
        icon={
          <img
            src="/img/filter.svg"
            alt='filter'
          />
        }
        textFieldProps={{
          label: "Filter & sort",
        }}
        isSort
        onChange={handleSortChange}
        options={optionSorts}
      /> */}
    </Stack>
  );
};
