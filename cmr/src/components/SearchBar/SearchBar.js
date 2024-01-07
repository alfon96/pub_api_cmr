import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const onChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(searchKeyword);
    props.onSubmit();
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          aria-label="Search for a food item"
          aria-describedby="basic-addon2"
          value={searchKeyword}
          onChange={onChangeHandler}
        />
        <Button
          variant="outline-secondary"
          id="search-keyword"
          type="submit"
          className="d-flex align-items-center justify-content-center"
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
