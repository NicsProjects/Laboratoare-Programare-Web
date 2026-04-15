import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
        const [projects, setProjects] = useState([]);
        const [search, setSearch] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)

        useEffect(function() {
            fetch('/data/projects.json')
                .then(function(response) {
                    return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(function(err) {
                setError(err.message);
                setLoading(false);
            });


    }, []);

    if (error) {
        return <p>{error}</p>;
    }
    
    
    if (loading) {
        return <p>Se incarca...</p>;
    }

    const filteredProjects = projects.filter(function(project) {
        return project.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <h3>Proiecte</h3>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cauta proiect..."
            />
            {filteredProjects.map(project => (
                <Card key={project.id} title={project.title} description={project.description} />
            ))}
        </div>
    );
}
export default ProjectList;