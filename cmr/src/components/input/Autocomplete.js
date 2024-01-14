import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { buildTrieFromWords } from "../utils/Trie";
import useTicketHandler from "../hook/useTicketHandler";
import useMouseTrack from "../hook/useMouseTrack";

const Autocomplete = ({ referringData, dish, sliceResults, fieldName }) => {
  const trie = buildTrieFromWords(referringData);
  const values = dish.content;
  const { handleMouseEnter, handleMouseLeave } = useMouseTrack();

  const [selectedOptions, setSelectedOptions, handleSelectedOptionsTicket] =
    useTicketHandler({
      initialValue: values[fieldName],
      fieldName: fieldName,
    });

  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    const transformedData = selectedOptions?.map((item) => ({
      value: item.toLowerCase(),
      label: item,
    }));
    handleSelectedOptionsTicket();
    setTransformedData(transformedData);
  }, [selectedOptions]);

  const [dietOptions, setDietOptions] = useState(
    sliceResults ? referringData.slice(0, 5) : referringData
  );

  const handleInputChange = (input) => {
    if (!input) {
      setDietOptions(sliceResults ? referringData.slice(0, 5) : referringData);
    } else {
      const filteredWords = trie.search(input.trim().toLowerCase());
      const filteredOptions = referringData.filter((option) =>
        filteredWords.includes(option.label.trim().toLowerCase())
      );
      setDietOptions(filteredOptions);
    }
  };

  const handleChange = (options) => {
    if (options.length > 0) {
      if (options.length > selectedOptions.length) {
        setSelectedOptions([
          ...selectedOptions,
          options[options.length - 1].value,
        ]);
      } else {
        setSelectedOptions(options.map((option) => option.value));
      }
    } else {
      setSelectedOptions([]);
    }
  };

  const handleCreate = (inputValue) => {
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    referringData.push(newValue); // Add the new option to the full list
    setSelectedOptions([...selectedOptions, newValue.value]);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CreatableSelect
        classNames={{
          control: (state) =>
            state.isFocused ? "border-red-600" : "border-grey-300",
        }}
        isMulti
        isClearable
        isSearchable
        onInputChange={handleInputChange}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={dietOptions}
        value={transformedData}
        placeholder="Select or create an item."
       
      />
    </div>
  );
};

export default Autocomplete;
