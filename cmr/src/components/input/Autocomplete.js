import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import allDietOptions from "../../food.json"; // Full list of options
import { buildTrieFromWords } from "../utils/Trie"; // Adjust the path

const MultiValueLabel = ({ children, ...props }) => {
  return (
    <components.MultiValueLabel {...props}>
      {children}
    </components.MultiValueLabel>
  );
};

const Autocomplete = () => {
  const trie = buildTrieFromWords(allDietOptions); // Usa tutto l'array di oggetti

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dietOptions, setDietOptions] = useState(allDietOptions.slice(0, 10)); // Initial subset

  const handleInputChange = (input) => {
    setInputValue(input);
    if (!input) {
      setDietOptions(allDietOptions.slice(0, 10));
    } else {
      const filteredWords = trie.search(input.trim().toLowerCase());
      const filteredOptions = allDietOptions.filter((option) =>
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
    allDietOptions.push(newValue); // Add the new option to the full list
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
