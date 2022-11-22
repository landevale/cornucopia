import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import Cards from "./Cards";

function SearchCard({ addFav, favs }) {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState("idle");
  const [searchParams, setSearchParams] = useSearchParams();

  const types = searchParams.get("types");
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const request = await fetch(
          `https://api.magicthegathering.io/v1/cards?types=${types}`
        );
        if (!request.ok) {
          throw new Error("Network error");
        }
        const data = await request.json();
        setCards(data.cards);
        setStatus("done");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    setStatus("loading");
    fetchCards();
  }, [types]);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setSearchParams(data);
  };

  return (
    <>
      <h2>Search</h2>
      <Form onSubmit={handleSearch}>
        <fieldset>
          <Form.Group>
            <Form.Label>Type:</Form.Label>
            <Form.Control name="types" type="search" defaultValue={types} />
            <Button type="submit">Search</Button>
          </Form.Group>
        </fieldset>
      </Form>
      {status === "loading" ? (
        <progress />
      ) : (
        <Cards cards={cards} favs={favs} addFav={addFav} />
      )}
    </>
  );
}

export default SearchCard;
