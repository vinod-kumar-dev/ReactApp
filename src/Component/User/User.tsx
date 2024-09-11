import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../../ApiHandler';
import { apiBaseUrl } from '../../config';
import { useWebSocket } from '../../WebsocketProvider';

interface WebSocketMessage<T> {
  page: string;
  message: T;
}

interface User {
  id: number;
  fName: string;
  lName: string;
  email: string;
  Role: string;
  Phone: string;
}

const fetchUsers = async () => {
  const url = `${apiBaseUrl}/api/user`;
  try {
    const { status, body } = await getApi<User[]>({ url });
    if (status == 200) {
      console.log(body);
      return body;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; 
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fName', headerName: 'First Name', width: 150 },
  { field: 'lName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'role', headerName: 'Role', width: 100 },
  { field: 'phone', headerName: 'Phone', width: 100 }
];

const UserComponent: FC = () => {
  const { messages } = useWebSocket<WebSocketMessage<User>>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 2,
  });
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData ?? []);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (messages.length === 0) return;

    console.log('Received WebSocket messages:', messages);

    const updateUsers = () => {
      const newUsers = messages
        .filter((msg) => msg.page === 'user')
        .map((msg) => {
          // Assuming `msg.Message` has the properties you need
          const user = msg.message;
          return {
            id: user?.id, // Ensure the id property matches what the DataGrid expects
            fName: user?.fName,
            lName: user?.lName,
            email: user?.email,
            role: user?.role,
            phone: user?.phone
          };
        });

      setUsers((prevUsers) => {
        console.log("Previous users:", prevUsers);
        const usersMap = new Map(prevUsers.map(user => [user.id, user]));
        newUsers.forEach(user => {
          usersMap.set(user.id, user); // Extract user data and update map
        });
        return Array.from(usersMap.values());
      });

      console.log('Updated user list:', newUsers);
    };

    updateUsers();
  }, [messages]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleClick = () => {
    navigate('/adduser');
  };

  return (
    <Container>
      <h1>Data Grid View</h1>
      <div>
        <div>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Click Me
          </Button>
        </div>
        <div className="data-grid-container">
          <DataGrid rows={users} columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pagination />
        </div>
      </div>
    </Container>
  );
};

export default UserComponent;
