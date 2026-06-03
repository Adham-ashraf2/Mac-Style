import { techStack } from '#constants';
import useWindowStore from '#store/window';
import WindowControls from './WindowControls.jsx';

const Terminal = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const terminalWindow = windows.terminal;

  if (!terminalWindow?.isOpen) return null;

  return (
    <section
      id="terminal"
      style={{ zIndex: terminalWindow.zIndex }}
      onMouseDown={() => focusWindow('terminal')}
    >
      <div id="window-header">
        <WindowControls label="Skills" onClose={() => closeWindow('terminal')} />
        <h2>Skills</h2>
      </div>

      <div className="techstack">
        <p className="label">adham@portfolio ~ % skills</p>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-start">
              <span className="check">+</span>
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>Portfolio console ready.</p>
          <p>Type is simulated, but the skills are real.</p>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
