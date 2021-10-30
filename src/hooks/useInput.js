import { useState, useCallback } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  console.log("value: ", value);

  return [value, handler];
};
