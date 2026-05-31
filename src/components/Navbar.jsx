import logo from '../assets/logo.svg';
import { navLinks, navIcons } from '#constants';

const Navbar = () => {
  const currentTime = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());

  return (
    <nav>
      <div>
        <img src={logo} alt="logo" />
        <p className="font-bold">Name</p>
      </div>

      <ul>
        {navLinks.map(({ id, name }) => (
          <li key={id}>
            <p>{name}</p>
          </li>
        ))}
      </ul>

      <div>
        {navIcons.map(({ id, img }) => (
          <img className="icon size-7" key={id} src={img} alt="" />
        ))}
        <time dateTime={new Date().toISOString()}>{currentTime}</time>
      </div>
    </nav>
  );
};

export default Navbar;
