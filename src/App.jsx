import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cardlist from './components/Cardlist';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // PASO 1: Lista básica
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // PASO 2: Obtener detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detail = await detailResponse.json();
            
            // PASO 3: Transformar para tu Cardlist
            const totalPower = detail.stats.reduce((total, stat) => total + stat.base_stat, 0);
            const types = detail.types.map(typeInfo => typeInfo.type.name).join(', ');
            const image = detail.sprites?.other?.['official-artwork']?.front_default || detail.sprites?.front_default;
            
            return {
              id: detail.id,
              name: detail.name,
              power: totalPower,
              type: types,
              image: image
            };
          })
        );
        
        setCharacters(pokemonDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log(characters);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card-list" element={<Cardlist data={characters} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;