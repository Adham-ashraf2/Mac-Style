import React from 'react';
import gsap from 'gsap';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { dockApps } from '#constants';
import useWindowStore from '#store/window';

const Dock = ({ onOpen = () => {} }) => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = React.useRef(null);

  React.useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return undefined;

    const icons = dock.querySelectorAll('.dock-icon');

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power1.out',
        });
      });
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', resetIcons);
      gsap.killTweensOf(icons);
    };
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    if (windows[app.id]?.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
      onOpen(app.id);
    }
  };

  return (
    <section id="dock" aria-label="Application dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              data-tooltip-delay-show={150}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                loading="lazy"
                className={`size-full ${app.canOpen ? '' : 'opacity-60'}`}
              />
            </button>
          </div>
        ))}
      </div>
      <Tooltip id="dock-tooltip" place="top" className="tooltip" />
    </section>
  );
};

export default Dock;
