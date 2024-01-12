import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMasterTicket } from "../store/foodSlice";

function useTicketHandler(fieldConfig) {
  const { initialValue, pathKey, fieldName } = fieldConfig;
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const editedMap = useSelector((state) => state.food.editedMap);

  useEffect(() => {
    const ticketId = `${pathKey}?-?${fieldName}`;
    if (editedMap && editedMap[ticketId] !== undefined) {
      setValue(editedMap[ticketId]);
    }
  }, [editedMap, pathKey, fieldName]);

  const handleTicketUpdate = () => {
    dispatch(
      updateMasterTicket({
        pathKey,
        fieldName,
        newValue: value,
      })
    );
  };

  return [value, setValue, handleTicketUpdate];
}

export default useTicketHandler;
