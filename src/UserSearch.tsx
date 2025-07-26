import { useState, useMemo } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
}

export const initialUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
];

interface UserSearchProps {
    users?: User[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users = initialUsers }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // TODO: Implement the filteredUsers logic
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    
    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>
                        {user.name.toLowerCase()} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;
