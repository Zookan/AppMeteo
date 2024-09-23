import { useDispatch, useSelector } from "react-redux";
import { removeFav } from "../features/favoriteSlice";

export default function DisplayFavorite() {
  const favorite = useSelector((state) => state.favorite.favorite);
  const dispatch = useDispatch();
  return (
    <>
      {favorite.map((o) => (
        <div key={o.id} style={{ margin: 10}}>
          {o.nom}
          <div>{o.temp} °C</div>
          <button onClick={() => dispatch(removeFav(o))}>Delete</button>
        </div>
      ))}
    </>
  );
}