import { useState } from 'react';
import Card from './Card';

function App() {
  const [count, setCount] = useState(0);

  const projects = [
    { title: 'Proiect 1', description: 'Pagina personala' },
    { title: 'Proiect 2', description: 'Calculator buget' },
    { title: 'Proiect 3', description: 'Dashboard React' },
    { title: 'Proiect 4', description: 'To-do list cu filtrare' },
    { title: 'Proiect 5', description: 'Aplicatie meteo cu API' },
    { title: 'Proiect 6', description: 'Galerie foto responsiva' },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Nechifor Nicolae-Dan</p>
      <p>Ai apasat de {count} ori</p>
      <button onClick={() => setCount(count + 1)}>Click</button>

      {projects.map(function (item, index) {
        return <Card key={index} title={item.title} description={item.description} />;
      })}
    </div>
  );
}
export default App;