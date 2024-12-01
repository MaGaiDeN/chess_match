import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { useEffect } from 'react';
import Board from '../components/Board/Board';
import Header from '../components/Header/Header';

const Home = () => {
  useEffect(() => {
    console.log('Home montado');
    const buttons = document.querySelectorAll('.game-button');
    console.log('Botones encontrados:', buttons.length);
  }, []);
  
  console.log('Renderizando componente Home');
  console.log('Estilos cargados:', document.styleSheets);
  
  return (
    <div className="page-container">
      <Header />
      <div className="home-container">
        <div className="game-options">
          <h1>Play Chess Online on the #1 Site!</h1>
          <div className="stats">
            <span className="games-today">13,562,492 Games Today</span>
            <span className="playing-now">118,172 Playing Now</span>
          </div>
          
          <div className="game-buttons">
            <Link to="/play/online" className="game-button primary">
              <span className="icon">👥</span>
              <div className="button-content">
                <h3>Play Online</h3>
                <p>Play with someone at your level</p>
              </div>
            </Link>

            <Link to="/play/computer" className="game-button">
              <span className="icon">🖥️</span>
              <div className="button-content">
                <h3>Play Computer</h3>
                <p>Play vs customizable training bots</p>
              </div>
            </Link>
          </div>

          <div className="puzzle-section">
            <h2>Solve Chess Puzzles</h2>
            <div className="mini-board">
              <Board isPuzzle={true} />
            </div>
            <div className="quote">
              <p>
                "En Ajedrez, el vencedor es quien hace la siguiente jugada al último error." <br/> GM S. Tartakower
              </p>
            </div>
            <button className="game-button">Solve Puzzles</button>
          </div>

          <button className="game-button chess-today">Chess Today</button>
        </div>
      </div>
    </div>
  );
};

export default Home; 