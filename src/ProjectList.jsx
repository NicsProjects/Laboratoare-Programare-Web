import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
        const [projects, setProjects] = useState([]);
        const [search, setSearch] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)
        const [title, setTitle] = useState('');
        const [tech, setTech] = useState('');
        const [editingId, setEditingId] = useState(null);
        const [editTitle, setEditTitle] = useState('');
        const [editTech, setEditTech] = useState('');
        const [statusFilter, setStatusFilter] = useState('all');
        const [sortBy, setSortBy] = useState('date');

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

    async function handleDelete(id) {
        if (!window.confirm('Sigur doriti sa stergeti acest proiect?')) {
            return;
        }

        try {
            await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            console.error('Eroare ștergere:', err);
        }
    }
//adăugați în ProjectList:
//• Funcție async handleToggle(id, currentDone) care:
//Face fetch PUT către 'http://localhost:3000/api/projects/' + id cu body: { done: !currentDone }
//Parsează răspunsul: const updatedProject = await response.json()
//Actualizează state-ul: setProjects(projects.map(p => p._id === id ? updatedProject : p))
//• Buton pe card: onClick={() => handleToggle(project._id, project.done)}
    async function handleToggle(id, currentDone) {
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone }),
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
        } catch (err) {
            console.error('Eroare toggle:', err);
        }
    }

    function handleEdit(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    }
//Buton de edit pe card: onClick={() => handleEdit(project)}
    function handleCancelEdit() {
        setEditingId(null);
        setEditTitle('');
        setEditTech('');
    }

    async function handleSaveEdit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/projects/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle, tech: editTech }),
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p._id === editingId ? updatedProject : p));
            handleCancelEdit();
        } catch (err) {
            console.error('Eroare salvare edit:', err);
        }
    }

    if (error) {
        return <p>{error}</p>;
    }
    
    
    if (loading) {
        return <p>Se incarca...</p>;
    }

    const filteredProjects = projects
        .filter(function(project) {
            const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'done' && project.done) ||
                (statusFilter === 'in-progress' && !project.done);
            return matchesSearch && matchesStatus;
        })
        .sort(function(a, b) {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            // sortBy === 'date'
            return a._id.localeCompare(b._id);
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
                        return <li key={project._id}>{project.title}</li>;
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
            <div className="project-filters">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cauta proiect..."
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Toate</option>
                    <option value="done">Finalizate</option>
                    <option value="in-progress">În lucru</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Sortare după dată</option>
                    <option value="title">Sortare după titlu</option>
                </select>
            </div>
            {filteredProjects.map(project => (
                project._id === editingId ? (
                    <form key={project._id} onSubmit={handleSaveEdit}>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Titlu proiect..."
                            required
                        />
                        <input
                            type="text"
                            value={editTech}
                            onChange={(e) => setEditTech(e.target.value)}
                            placeholder="Tehnologii..."
                            required
                        />
                        <button type="submit">Salvează</button>
                        <button type="button" onClick={handleCancelEdit}>Anulează</button>
                    </form>
                ) : (
                    <Card 
                        key={project._id} 
                        title={project.title} 
                        description={project.tech}
                        done={project.done}
                        onDelete={() => handleDelete(project._id)}
                        onToggle={() => handleToggle(project._id, project.done)}
                        onEdit={() => handleEdit(project)}
                    />
                )
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
