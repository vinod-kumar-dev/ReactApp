import { FC } from 'react';
import LeftMenu  from './Component/leftmenu';
const Landing: FC = () => {
  const menuItems = [
    // { title: 'Home',path:"" },
    { title: 'User',path:"/user" },
    {
      title: 'Transport',path:"",
      submenu: [
        { title: 'Van',path:"/transport" },
        // { title: 'Bus' ,path:""},
        // { title: 'Traveller' ,path:""},
      ],
    },
    // { title: 'About',path:"" },
    // {
    //   title: 'Contact',
    //   submenu: [
    //     { title: 'Email',path:"" },
    //     { title: 'Phone',path:"" },
    //   ],
    // },
  ];
  return (
    <div className="landing-page">
      <LeftMenu items={menuItems} />
      <div className="content right-div">
        <h1>Welcome to the Landing Page</h1>
        <p>Content goes here...</p>
      </div>
    </div>
  );
};

export default Landing;