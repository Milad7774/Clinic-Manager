import { useState, useEffect } from "react";

const useSearchBar = (list, search) =>{

    const [data, setData] = useState([]);

    useEffect(() => {
        if (search === "") {
          setData(list);
        } else {
          let filtered = list.filter((item) =>
            item.name.toLowerCase().startsWith(search.toLowerCase()),
          );
          setData(filtered);
        }
      }, [search]);
      return {data}
}
export default useSearchBar