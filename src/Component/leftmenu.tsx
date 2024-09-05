import { FC } from 'react';
import { Link } from 'react-router-dom';
interface MenuItem {
  title: string;
  submenu?: MenuItem[];
  path: string;
}
interface LeftMenuProps {
  items: MenuItem[];
}
const LeftMenu: FC<LeftMenuProps> = ({ items }) => {
  // const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  // const toggleSubmenu = (index: number) => {
  //   setOpenIndexes((prevIndexes) =>
  //     prevIndexes.includes(index)
  //       ? prevIndexes.filter((i) => i !== index)
  //       : [...prevIndexes, index]
  //   );
  // };
  return (
    <div className="left-menu">
      <ul>
        {items.map((item, index) => (

          <li key={index}>
            {item.submenu ? (
              <div
                className="menu-item"
                onClick={() => item.submenu // && toggleSubmenu(index)

                }
              >
                {item.title}
                <ul className="submenu">
                  {item.submenu.map((subitem, subindex) => (
                    <li key={subindex}>
                      <Link to={subitem.path}> {subitem.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>) : (<div className="menu-item"><Link to={item.path}> {item.title}</Link></div>)
            }
          </li>

        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;