import { useState } from 'react';
import Card from './Card';
import QuickNote from './QuickNote';


function App() {
  const [countxxx, setCount] = useState(0);

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
      <p>Ai apasat de {countxxx} ori</p>
      <button onClick={() => setCount(countxxx + 1)}>+1</button>
      <button onClick={() => setCount(countxxx - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      {projects.map(function (item, index) {
        return <Card key={index} title={item.title} description={item.description} />;
      })}
      <QuickNote /> 
    </div>
  );
}
export default App;