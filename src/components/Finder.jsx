import { locations } from '#constants';
import useWindowStore from '#store/window';
import WindowControls from './WindowControls.jsx';

const Finder = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const finderWindow = windows.finder;
  const sidebarItems = Object.values(locations);
  const activeLocation = locations.work;

  if (!finderWindow?.isOpen) return null;

  return (
    <section
      id="finder"
      style={{ zIndex: finderWindow.zIndex }}
      onMouseDown={() => focusWindow('finder')}
    >
      <div id="window-header">
        <WindowControls label="Portfolio" onClose={() => closeWindow('finder')} />
        <p className="font-bold text-gray-600">Portfolio</p>
      </div>

      <div className="flex min-h-[520px]">
        <aside className="sidebar">
          <h3>Locations</h3>
          <ul>
            {sidebarItems.map(({ id, name, icon, type }) => (
              <li key={id} className={type === activeLocation.type ? 'active' : 'not-active'}>
                <img src={icon} alt="" className="size-4" />
                <p>{name}</p>
              </li>
            ))}
          </ul>
        </aside>

        <ul className="content">
          {activeLocation.children.map(({ id, name, icon, position }) => (
            <li key={id} className={`group ${position}`}>
              <img src={icon} alt="" />
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Finder;
