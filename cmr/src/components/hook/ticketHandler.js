import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMasterTicket } from "../store/foodSlice";

function useTicketHandler(fieldConfig) {
  const { initialValue, sectionName, elementId, fieldName } = fieldConfig;
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const editedMap = useSelector((state) => state.food.editedMap);

  useEffect(() => {
    const ticketId = `${sectionName}?-?${elementId}?-?${fieldName}`;
    if (editedMap && editedMap[ticketId] !== undefined) {
      setValue(editedMap[ticketId]);
    }
  }, [editedMap, sectionName, elementId, fieldName]);

  const handleTicketUpdate = () => {
    dispatch(
      updateMasterTicket({
        sectionName,
        elementId,
        fieldName,
        newValue: value,
      })
    );
  };

  return [value, setValue, handleTicketUpdate];
}

export default useTicketHandler;
