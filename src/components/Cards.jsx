import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function Cards({ cards, favs, addFav }) {
  if (cards.length === 0) {
    return <p>No Cards here</p>;
  }

  const handleFav = (card) => () => {
    addFav(card);
  };

  let text = "Fav";
  if (handleFav === true) {
    text = "Not Fav";
  }

  return (
    <>
      <Table striped bordered hover>
        <caption>Cards</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pic</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => {
            const inFavs =
              favs.findIndex(
                (fav) => fav.multiverseid === card.multiverseid
              ) === -1;

            const variant = inFavs ? "success" : "danger";
            const text = inFavs ? "Fav" : "Del Fav";
            return (
              <tr key={card.multiverseid}>
                <td>
                  <dl>
                    <dt>multiverseid</dt>
                    <dd>{card.multiverseid}</dd>
                    <dt>Name</dt>
                    <dd>{card.name}</dd>
                    <dt>Type</dt>
                    <dd>{card.type}</dd>
                    <dt>Color</dt>
                    <dd>{card.colors}</dd>
                    <dt>Fav</dt>
                    <dd>
                      <Button variant={variant} onClick={handleFav(card)}>
                        {text}
                      </Button>
                    </dd>
                  </dl>
                </td>
                <td>
                  <img src={card.imageUrl} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

// Cards.propTypes = {
//   cards: PropTypes.arrayOf(
//     PropTypes.shape({
//       multiverseid: PropTypes.number,
//       name: PropTypes.string,
//       type: PropTypes.string,
//     })
//   ),
// };

export default Cards;
