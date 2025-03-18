import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
         <h1>Monster Hunter Database</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monster-hunter-wilds/*" element={<MonsterHunterWilds />} />
      </Routes>
    </div>
  );
}

function Home() {
  const games = [
    { name: "Monster Hunter Wilds", path: "/monster-hunter-wilds" },
    { name: "Monster Hunter World", path: "#" },
    { name: "Monster Hunter Rise", path: "#" },
    { name: "Monster Hunter Generations", path: "#" },
    { name: "Monster Hunter 4 Ultimate", path: "#" },
    { name: "Monster Hunter Freedom Unite", path: "#" },
  ];

  return (
    <div className="game-grid">
      {games.map((game, index) => (
        <Link
          key={index}
          to={game.path !== "#" ? game.path : "#"}
          className={`game-button ${game.path === "#" ? "disabled" : ""}`}
        >
          {game.name}
        </Link>
      ))}
    </div>
  );
}

function MonsterHunterWilds() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="monster-wilds-container">
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/monster-hunter-wilds/objetos" className="sidebar-link" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/item_icon.webp" alt="objetos" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                Items
              </Link>
            </li>
            <li>
              <Link to="/monster-hunter-wilds/monstruos" className="sidebar-link" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/monster_icon.webp" alt="monstruos" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                Monsters
              </Link>
            </li>
            <li>
              <Link to="/monster-hunter-wilds/misiones" className="sidebar-link" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/src/assets/quest_icon.webp" alt="monstruos" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                Quests
              </Link>
            </li>
          </ul>
        </aside>

      <section className="content">
        {/* Aquí se gestionan las rutas para mostrar el contenido central */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/objetos" element={<Objetos />} />
          <Route path="/monstruos" element={<Monstruos />} />
          <Route path="/misiones" element={<Misiones />} />
        </Routes>
      </section>
    </div>

    <button className="home-button" onClick={handleGoHome}>Volver al Home</button>
    </>
    
  );
}

function Objetos() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(""); // Estado para el filtro
  const itemsPerPage = 10; // Cantidad de objetos por página

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('https://wilds.mhdb.io/en/items');
      const data = await response.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  // Filtrar los objetos por nombre
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()) // Filtrar por nombre
  );

  // Calcular los índices de los objetos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para manejar el cambio en el filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      {/* Campo de filtro */}
      <div className="filter">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="items-container">
        {currentItems.map((item) => (
          <div key={item.id} className="item">
            <p><strong>Name: </strong>{item.name}</p>
            <p><strong>Description: </strong>{item.description}</p>
            <p><strong>Rarity: </strong>{item.rarity}</p>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredItems.length / itemsPerPage)}>Siguiente</button>
      </div>
    </div>
  );
}


// No devuelve nada pero parece ser que es problema de la API
function Monstruos() {
  const [monsters, setMonsters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const monstersPerPage = 10; // Cantidad de monstruos por página

  useEffect(() => {
    async function fetchMonsters() {
      try {
        const response = await fetch('https://wilds.mhdb.io/en/monsters');
        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica los datos recibidos
        setMonsters(data);
      } catch (error) {
        console.error("Error al obtener los monstruos:", error);
      }
    }
    fetchMonsters();
  }, []);

  // Si no hay datos, se evita el filtro
  const filteredMonsters = monsters;  // Eliminado filtro temporalmente

  // Verificar el estado de filteredMonsters
  console.log("Monstruos filtrados:", filteredMonsters);

  // Calcular los índices de los monstruos a mostrar
  const indexOfLastMonster = currentPage * monstersPerPage;
  const indexOfFirstMonster = indexOfLastMonster - monstersPerPage;
  const currentMonsters = filteredMonsters.slice(indexOfFirstMonster, indexOfLastMonster);

  // Verificar el estado de currentMonsters
  console.log("Monstruos a mostrar en la página actual:", currentMonsters);

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredMonsters.length / monstersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="monsters-container">
        {currentMonsters.length > 0 ? (
          currentMonsters.map((monster) => (
            <div key={monster.id} className="monster">
              <p><strong>Name: </strong>{monster.name}</p>
              <p><strong>Species: </strong>{monster.species}</p>
              <p><strong>Description: </strong>{monster.description}</p>
              <p><strong>Kind: </strong>{monster.kind}</p>
              <p><strong>Resistances:</strong></p>
              <ul>
                {monster.resistances.map((resistance, index) => (
                  <li key={index}>
                    {resistance.kind === "element" ? `Element: ${resistance.element}` : `Status: ${resistance.status}`} - {resistance.condition ? `Condition: ${resistance.condition}` : 'Always active'}
                  </li>
                ))}
              </ul>
              <p><strong>Weaknesses:</strong></p>
              <ul>
                {monster.weaknesses.map((weakness, index) => (
                  <li key={index}>
                    {weakness.kind === "element" ? `Element: ${weakness.element}` : `Status: ${weakness.status}`} - Level: {weakness.level} - {weakness.condition ? `Condition: ${weakness.condition}` : 'Always active'}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No monsters to display</p>
        )}
      </div>

      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredMonsters.length / monstersPerPage)}>Siguiente</button>
      </div>
    </div>
  );
}




function Misiones() {
  const misiones = [
    { titulo: "[Assignments 1★] Hot on Their Tails", hrp: 50, monstruos: ["Quematrice", "Quematrice"], hp: ["4,000HP", "4,000HP"] },
    { titulo: "[Assignments 1★] A Stage of Rose and Thorn", hrp: 50, monstruos: ["Lala Barina", "Lala Barina"], hp: ["4,000HP", "4,000HP"] },
    { titulo: "[Assignments 1★] Drive Off the Congalala!", hrp: 55, monstruos: ["Congalala", "Congalala"], hp: ["5,000HP", "5,000HP"] },
    { titulo: "[Assignments 1★] Balahara of the Sandsea", hrp: 60, monstruos: ["Balahara", "Balahara"], hp: ["4,400HP", "5,148HP"] },
    { titulo: "[Assignments 2★] A Feast in the Deep", hrp: 90, monstruos: ["Uth Duna", "Uth Duna"], hp: ["7,975HP", "7,975HP"] },
    { titulo: "[Assignments 2★] A Fuse Ignited", hrp: 55, monstruos: ["Rompopolo", "Rompopolo"], hp: ["6,525HP", "6,525HP"] },
    { titulo: "[Assignments 2★] A Merciless Glare", hrp: 90, monstruos: ["Rey Dau", "Rey Dau"], hp: ["7,250HP", "7,250HP"] },
    { titulo: "[Assignments 2★] The Quiet, Cunning Assassin", hrp: 65, monstruos: ["Nerscylla", "Nerscylla"], hp: ["6,380HP", "6,380HP"] },
    { titulo: "[Assignments 3★] Guardian Zoh Shia", hrp: 225, monstruos: ["Zoh Shia", "Zoh Shia"], hp: ["16,200HP", "16,200HP"] },
  ];

  return (
    <div className="misiones-container">
      <h3>Misiones</h3>
      <div className="misiones-list">
        {misiones.map((mision, index) => (
          <div key={index} className="mision">
            <span className="titulo">{mision.titulo}</span>
            <span className="hrp">{mision.hrp}HRP</span>
            <span className="monstruos">{mision.monstruos.join(", ")}</span>
            <span className="hp">{mision.hp.join(", ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function Welcome() {
  return <h2>Bienvenido a Monster Hunter Wilds</h2>;
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
