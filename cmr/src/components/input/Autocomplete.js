import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { buildTrieFromWords } from "../utils/Trie";
import { useDispatch } from "react-redux";
import { allowDrag, stopDrag } from "../store/draggableSlice";
import useTicketHandler from "../hook/ticketHandler";

const Autocomplete = (props) => {
  const referringData = props.referringData;
  const dispatch = useDispatch();
  const trie = buildTrieFromWords(referringData);

  const [selectedOptions, setSelectedOptions, handleSelectedOptionsTicket] =
    useTicketHandler({
      initialValue: props.foodData[props.fieldName],
      sectionName: props.sectionName,
      elementId: props.foodData.id,
      fieldName: props.fieldName,
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
    props.sliceResults ? referringData.slice(0, 5) : referringData
  );

  const handleInputChange = (input) => {
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
    <div
      onMouseEnter={() => dispatch(stopDrag())}
      onMouseLeave={() => dispatch(allowDrag())}
    >
      <CreatableSelect
        isMulti
        isClearable
        isSearchable
        onInputChange={handleInputChange}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={dietOptions}
        value={transformedData}
        placeholder="Select or create an item."
        // onBlur={handleSelectedOptionsTicket}
      />
    </div>
  );
};

export default Autocomplete;
