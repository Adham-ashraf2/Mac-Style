import { blogPosts } from '#constants';
import useWindowStore from '#store/window';
import WindowControls from './WindowControls.jsx';

const Safari = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const safariWindow = windows.safari;

  if (!safariWindow?.isOpen) return null;

  return (
    <section
      id="safari"
      style={{ zIndex: safariWindow.zIndex }}
      onMouseDown={() => focusWindow('safari')}
    >
      <div id="window-header">
        <WindowControls label="Articles" onClose={() => closeWindow('safari')} />
        <div className="search">
          <img src="/icons/search.svg" alt="" className="size-4" />
          <input
            type="text"
            value="https://portfolio.local/articles"
            aria-label="Address"
            readOnly
          />
        </div>
      </div>

      <div className="blog">
        <h2>Articles</h2>
        <ul className="space-y-8">
          {blogPosts.map(({ id, date, title, image, link }) => (
            <li key={id} className="blog-post">
              <img src={image} alt="" />
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noreferrer">
                  Read article
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Safari;
