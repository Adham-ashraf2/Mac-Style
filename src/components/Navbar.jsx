import { useState } from 'react';
import logo from '../assets/logo.svg';
import { navLinks, navIcons } from '#constants';

const Navbar = () => {
  const [isWifiOn, setIsWifiOn] = useState(true);

  const currentTime = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());

  return (
    <nav>
      <div className="brand">
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
        {navIcons.map(({ id, img }) =>
          id === 1 ? (
            <button
              key={id}
              type="button"
              className="icon relative size-7"
              aria-label={isWifiOn ? 'Turn Wi-Fi off' : 'Turn Wi-Fi on'}
              aria-pressed={!isWifiOn}
              onClick={() => setIsWifiOn((current) => !current)}
            >
              <img
                className={`size-full transition-opacity ${isWifiOn ? '' : 'opacity-35 grayscale'}`}
                src={img}
                alt=""
              />
              {!isWifiOn && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-black"
                />
              )}
            </button>
          ) : (
            <img className="icon size-7" key={id} src={img} alt="" />
          )
        )}
        <time dateTime={new Date().toISOString()}>{currentTime}</time>
      </div>
    </nav>
  );
};

export default Navbar;
