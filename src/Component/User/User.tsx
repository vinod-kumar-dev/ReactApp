import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef,GridPaginationModel  } from '@mui/x-data-grid';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../../ApiHandler';
import { apiBaseUrl } from '../../config';
import { useWebSocket } from '../../WebsocketProvider';

interface WebSocketMessage<T> {
  Page: string;
  Message: T;
}

interface User {
  id: number;
  fName: string;
  lName: string;
  email: string;
  role: string;
  phone: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const url = `${apiBaseUrl}/api/user`;
  return getApi<User[]>({ url });
};

const columns: GridColDef[] = [
  { field: 'Id', headerName: 'ID', width: 90 },
  { field: 'FName', headerName: 'First Name', width: 150 },
  { field: 'LName', headerName: 'Last Name', width: 150 },
  { field: 'Email', headerName: 'Email', width: 250 },
  { field: 'Role', headerName: 'Role', width: 100 },
  { field: 'Phone', headerName: 'Phone', width: 100 }
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
  const handlePaginationModelChange = (model:GridPaginationModel) => {
    setPaginationModel(model);
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    
    console.log('Received WebSocket messages:', messages);
    
    const updateUsers = () => {
      const newUsers = messages
        .filter((msg) => msg.Page === 'user')
        .map((msg) => {
          // Assuming `msg.Message` has the properties you need
          const user = msg.Message;
          return {
            id: user.Message.id, // Ensure the id property matches what the DataGrid expects
            fName: user.Message.fName,
            lName: user.Message.lName,
            email: user.Message.email,
            role: user.Message.role,
            phone: user.Message.phone
          };
        });
  
      setUsers((prevUsers) => {
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
