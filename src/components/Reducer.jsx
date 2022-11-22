const FavsReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAV":
        return [...state, action.payload];
  
      case "DEL_FAV":
        return [];
  
      default:
        return state;
    }
  };

  const [favs, dispatch] = useReducer(FavsReducer, []);

  <Route
  index
  element={<SearchCard favs={favs} addFav={dispatch} />}
/>
<Route path="sets/:id" element={<Cards />} />
<Route
  path="favs"
  element={<Favs favs={favs} delFav={dispatch} />}
/>

function Cards({ cards, favs, addFav }) {
    if (cards.length === 0) {
      return <p>No Cards here</p>;
    }
  
    const handleFav = (card) => () => {
      addFav({ type: "ADD_TO_FAV", payload: card });
    };

function Favs({ favs, delFav }) {
    return (
      <>
        <h2>Favs</h2>
        <ul>
          {favs.map((fav) => (
            <li key={fav.multiverseid}>
              {fav.name}{" "}
              <Button onClick={() => delFav({ type: "DEL_FAV", payload: fav })}>
                Del
              </Button>
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  export default Favs;