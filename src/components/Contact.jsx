import { socials } from '#constants';
import useWindowStore from '#store/window';
import WindowControls from './WindowControls.jsx';

const Contact = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const contactWindow = windows.contact;

  if (!contactWindow?.isOpen) return null;

  return (
    <section
      id="contact"
      style={{ zIndex: contactWindow.zIndex }}
      onMouseDown={() => focusWindow('contact')}
    >
      <div id="window-header">
        <WindowControls label="Contact" onClose={() => closeWindow('contact')} />
        <h2>Contact</h2>
      </div>

      <div className="space-y-5 p-8">
        <div>
          <h3>Let&apos;s build something.</h3>
          <p className="mt-2 text-sm text-gray-500">
            Find me through any of these links and I&apos;ll get back to you.
          </p>
        </div>

        <ul>
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noreferrer">
                <img src={icon} alt="" className="size-8" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
