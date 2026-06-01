import React from 'react';
import gsap from 'gsap';

const FONT_WEIGHTS = {
  subtitle: { min: 300, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 100 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};
const setupTextHover = (container, type) => {
  if (!container) return undefined;

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const handleMouseMove = (event) => {
    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const letterCenter = rect.left + rect.width / 2;
      const distance = Math.abs(event.clientX - letterCenter);
      const influence = Math.max(0, 1 - distance / 120);
      const weight = Math.round(min + (max - min) * influence);

      gsap.to(letter, {
        fontVariationSettings: `"wght" ${weight}`,
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    gsap.to(letters, {
      fontVariationSettings: `"wght" ${base}`,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};


const Welcome = () => {
  const titleRef = React.useRef(null);
  const subtitleRef = React.useRef(null);

  React.useEffect(() => {
    const cleanupTitle = setupTextHover(titleRef.current, 'title');
    const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      cleanupTitle?.();
      cleanupSubtitle?.();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'text-3xl font-georama',
          500,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText('portfolio', 'text-9xl italic font-georama')}
      </h1>
      <div className="small-screen">
        <p>Designed for desktop/tablet only</p>
      </div>
    </section>
  );
};

export default Welcome;
