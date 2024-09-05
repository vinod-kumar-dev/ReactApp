import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { postApi } from '../../ApiHandler';
import { apiBaseUrl } from '../../config';
interface User {
    id: number;
    fName: string;
    lName: string;
    email: string;
    role: string,
    phone: string
}
const createUser = async (newUser: User): Promise<number> => {
    const url = `${apiBaseUrl}/api/user`;
    return postApi<number>({ url, body: newUser });
};
const AddUser: FC = () => {
    const roles = ['Admin', 'Student', 'Employee', 'Manager'];
    const validationSchema = Yup.object({
        fName: Yup.string().required('First Name is required'),
        lName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        role: Yup.string().required('Role is required'),
        phone: Yup.string().required('Phone is required'),
    });

    const formik = useFormik<User>({
        initialValues: {
            id: 0,
            fName: '',
            lName: '',
            email: '',
            role: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const userId = await createUser(values);
                console.log('User created with ID:', userId);
                // You can handle success here, e.g., show a success message or redirect
              } catch (error) {
                console.error('Error creating user:', error);
                // You can handle errors here, e.g., show an error message
              }
        },
    });
    return (
        <div className="dvMainClss">
            <form className="fMainClss" onSubmit={formik.handleSubmit}>
                <TextField
                    label="First Name"
                    name="fName"
                    value={formik.values.fName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fName && Boolean(formik.errors.fName)}
                    helperText={formik.touched.fName && formik.errors.fName}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lName"
                    value={formik.values.lName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lName && Boolean(formik.errors.lName)}
                    helperText={formik.touched.lName && formik.errors.lName}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal" error={formik.touched.role && Boolean(formik.errors.role)}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select a role</FormHelperText>
                </FormControl>
                <TextField
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    required
                    fullWidth
                    margin="normal"
                />
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
                <Button type="submit" variant="contained" color="primary">
                    Add User
                </Button>
            </form>
        </div>
    );
}
export default AddUser;