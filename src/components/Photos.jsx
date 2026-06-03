import { gallery, photosLinks } from '#constants';
import useWindowStore from '#store/window';
import WindowControls from './WindowControls.jsx';

const Photos = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const photosWindow = windows.photos;

  if (!photosWindow?.isOpen) return null;

  return (
    <section
      id="photos"
      style={{ zIndex: photosWindow.zIndex }}
      onMouseDown={() => focusWindow('photos')}
    >
      <div id="window-header">
        <WindowControls label="Gallery" onClose={() => closeWindow('photos')} />
        <h2 className="font-bold text-gray-600">Gallery</h2>
      </div>

      <div className="flex">
        <aside className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt="" />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Photos;
