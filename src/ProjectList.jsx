import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
        const [projects, setProjects] = useState([]);
        const [search, setSearch] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)

        useEffect(function() {
            fetch('/api/projects')
                .then(function(response) {
                    return response.json();
            })
            .then(function(data) {
                setProjects(data);
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

    const totalProjects = projects.length;
    const completedProjects = projects.filter(function(project) {
        return project.done;
    }).length;
    const inProgressProjects = projects.filter(function(project) {
        return !project.done;
    }).length;
    const unfinishedProjects = projects.filter(function(project) {
        return !project.done;
    }).map(function(project) {
                        return <li key={project.id}>{project.title}</li>;
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
                <Card key={project._id} title={project.title} description={project.tech} />
            ))}
            <div>
                <h4>Statistici</h4>
                <p>Total proiecte: {totalProjects}</p>
                <p>Finalizate: {completedProjects}</p>
                <p>In lucru: {inProgressProjects}</p>
                <p>Neterminate: {unfinishedProjects.length}</p>
            </div>
        </div>
    );
}
export default ProjectList;