import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Eroare la incarcare: ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setUsers(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>Eroare: {error}</p>;
  }

  if (loading) {
    return <p>Se incarca utilizatori...</p>;
  }

  const filteredUsers = users.filter(function (user) {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <h3>Utilizatori API</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cauta utilizator..."
      />
      <ul>
        {filteredUsers.map(function (user) {
          return (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.username}) - {user.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
