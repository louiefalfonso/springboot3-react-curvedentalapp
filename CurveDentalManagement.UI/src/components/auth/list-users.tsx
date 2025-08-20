import React, { useEffect, useState } from 'react';
import AuthService from '@/services/auth-services';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  username: string;
  email: string;
}

const ListAllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AuthService.getusers();
        setUsers(response.data);
      } catch (err) {
        setError(err.message || 'Failed to retrieve users.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl text-center">User List</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-center text-red-500">{error}</div>}
          <ul className="list-disc pl-5">
            {users.map((user, index) => (
              <li key={index} className="py-2">
                <strong>Username:</strong> {user.username}<br />
                <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListAllUsers;
