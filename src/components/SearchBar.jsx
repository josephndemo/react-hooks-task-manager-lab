import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const inputRef = useRef();
  const [query, setQuery] = useState("");

  function handleSearch() {
    setQuery(inputRef.current.value);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
