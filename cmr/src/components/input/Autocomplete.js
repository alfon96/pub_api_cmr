import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import allDietOptions from "../../food.json";
import allAllergens from "../../allergens.json";
import { buildTrieFromWords } from "../utils/Trie";

const MultiValueLabel = ({ children, ...props }) => {
  return (
    <components.MultiValueLabel {...props}>
      {children}
    </components.MultiValueLabel>
  );
};

const Autocomplete = (props) => {
  const referringData = props.ingredients ? allDietOptions : allAllergens;

  const trie = buildTrieFromWords(referringData);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dietOptions, setDietOptions] = useState(
    props.sliceResults ? referringData.slice(0, 5) : referringData
  ); // Initial subset

  const handleInputChange = (input) => {
    setInputValue(input);
    if (!input) {
      setDietOptions(
        props.sliceResults ? referringData.slice(0, 5) : referringData
      );
    } else {
      const filteredWords = trie.search(input.trim().toLowerCase());
      const filteredOptions = referringData.filter((option) =>
        filteredWords.includes(option.label.trim().toLowerCase())
      );
      setDietOptions(filteredOptions);
    }
  };

  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  const handleCreate = (inputValue) => {
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    referringData.push(newValue); // Add the new option to the full list
    setSelectedOptions([...selectedOptions, newValue]);
  };

  return (
    <div>
      <CreatableSelect
        isMulti
        isClearable
        isSearchable
        onInputChange={handleInputChange}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={dietOptions}
        value={selectedOptions}
        placeholder="Seleziona o crea una dieta..."
      />
    </div>
  );
};

export default Autocomplete;
