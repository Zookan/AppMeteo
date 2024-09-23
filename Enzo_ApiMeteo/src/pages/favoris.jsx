import React from 'react';
import DisplayFavorite from "../components/DisplayFavoris";

const Favoris = () => {
    return (
        <>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Liste des favoris</h1>
            <div style={{ display: 'flex'}}>
              <DisplayFavorite />
            </div>
          </div>
        </>
      );
};

export default Favoris;