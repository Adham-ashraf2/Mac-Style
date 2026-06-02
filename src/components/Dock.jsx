import React from 'react';
import gsap from 'gsap';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { dockApps } from '#constants';

const Dock = ({ onOpen = () => {} }) => {
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

  const handleOpenApp = (id, canOpen) => {
    if (!canOpen) return;
    onOpen(id);
  };

  return (
    <section id="dock" aria-label="Application dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => handleOpenApp(id, canOpen)}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={`size-full ${canOpen ? '' : 'opacity-60'}`}
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
