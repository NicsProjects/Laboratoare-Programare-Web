import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
        const [projects, setProjects] = useState([]);
        const [search, setSearch] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)
        const [title, setTitle] = useState('');
        const [tech, setTech] = useState('');

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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, tech: tech }),
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setTitle('');
            setTech('');
        } catch (err) {
            console.error('Eroare:', err);
        }
    }

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titlu proiect..."
                    required
                />
                <input
                    type="text"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="Tehnologii..."
                    required
                />
                <button type="submit">Adauga Proiect</button>
            </form>
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
//Totul bine pana aici, dar in loc de project.id ar trebui sa fie project._id pentru ca folosim MongoDB care foloseste _id ca identificator unic.
