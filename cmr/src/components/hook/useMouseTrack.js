import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { allowDrag, stopDrag } from "../store/draggableSlice";

const useMouseTrack = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = useCallback(() => {
    if (!isMouseOver) {
      dispatch(stopDrag());
      setIsMouseOver(true);
    }
  }, [dispatch, isMouseOver]);

  const handleMouseLeave = useCallback(() => {
    if (isMouseOver) {
      dispatch(allowDrag());
      setIsMouseOver(false);
    }
  }, [dispatch, isMouseOver]);

  return { handleMouseEnter, handleMouseLeave };
};

export default useMouseTrack;
