/**
 * WISEGENERATIVE — Animation Engine
 * GSAP + ScrollTrigger + Lenis smooth scroll
 */

(function() {
  'use strict';

  // ── Init Lenis Smooth Scroll ──────────────────────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ── Character Splitter Utility ─────────────────────────────
  function splitTextToChars(element) {
    const text = element.textContent;
    element.innerHTML = '';
    let charIndex = 0;
    
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
      charIndex++;
    });
    
    return element.querySelectorAll('.char');
  }

  function splitLinesToChars(element) {
    const lines = element.innerHTML.split('\n');
    element.innerHTML = '';
    let totalChars = 0;
    const allChars = [];
    
    lines.forEach((line, lineIndex) => {
      const lineDiv = document.createElement('span');
      lineDiv.style.display = 'block';
      lineDiv.style.overflow = 'hidden';
      
      line.split('').forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateX(-18px)';
        lineDiv.appendChild(span);
        allChars.push({ el: span, lineIndex, charIndex, totalIndex: totalChars++ });
      });
      
      element.appendChild(lineDiv);
    });
    
    return allChars;
  }

  // ── Hero Character Animation ──────────────────────────────
  function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const chars = splitLinesToChars(heroTitle);
    const charDelay = 0.03; // 30ms
    const initialDelay = 0.2; // 200ms

    chars.forEach(({ el, lineIndex, charIndex, totalIndex }) => {
      const delay = initialDelay + (lineIndex * lineIndex * charDelay) + (charIndex * charDelay);
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: delay,
        ease: 'expo.out',
      });
    });
  }

  // ── Fade Up Elements ─────────────────────────────────────
  function initFadeUpAnimations() {
    const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
    
    fadeUpElements.forEach((el, index) => {
      const delay = parseFloat(el.dataset.delay) || 0;
      const stagger = parseFloat(el.dataset.stagger) || 0;
      
      gsap.fromTo(el, 
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay + (index * stagger),
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }

  // ── Card Fan Animation (Ecosystem) ──────────────────────
  function initCardFanAnimations() {
    const cards = document.querySelectorAll('.eco-card');
    
    gsap.fromTo(cards,
      { opacity: 0, y: 40, rotateX: 15, transformOrigin: 'center bottom' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.eco-grid',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }

  // ── Slide In Alternating (Examples) ─────────────────────
  function initSlideAnimations() {
    const leftElements = document.querySelectorAll('[data-animate="slide-left"]');
    const rightElements = document.querySelectorAll('[data-animate="slide-right"]');

    leftElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    rightElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });
  }

  // ── Navbar Scroll Behavior ──────────────────────────────
  function initNavbarScroll() {
    const navbar = document.querySelector('.wise-nav');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      },
    });
  }

  // ── Problem Section Phone Pulse ─────────────────────────
  function initProblemAnimation() {
    const phoneIcon = document.querySelector('.problem-phone-icon');
    if (!phoneIcon) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#probleme',
        start: 'top 70%',
        once: true,
      },
    });

    tl.fromTo(phoneIcon,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
    )
    .to(phoneIcon, {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 2,
      ease: 'power2.inOut',
    })
    .to('.scenario-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
    }, '-=0.2');
  }

  // ── Bilan Columns Slide ──────────────────────────────────
  function initBilanAnimation() {
    const bilanCols = document.querySelectorAll('.bilan-col');
    if (bilanCols.length < 2) return;

    gsap.fromTo(bilanCols[0],
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#bilan',
          start: 'top 70%',
          once: true,
        },
      }
    );

    gsap.fromTo(bilanCols[1],
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#bilan',
          start: 'top 70%',
          once: true,
        },
      }
    );
  }

  // ── CTA Animation ────────────────────────────────────────
  function initCTAAnimation() {
    const ctaSection = document.querySelector('#contact');
    if (!ctaSection) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 75%',
        once: true,
      },
    });

    tl.fromTo(ctaSection.querySelector('.section-header'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    )
    .fromTo(ctaSection.querySelectorAll('.cta-primary, .cta-secondary'),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=0.3'
    );
  }

  // ── Ambient Floating Shapes ──────────────────────────────
  function initFloatingShapes() {
    const shapes = document.querySelectorAll('.float-shape');
    
    shapes.forEach((shape, index) => {
      const duration = 4 + (index * 0.5);
      const delay = index * 0.8;
      
      gsap.to(shape, {
        y: -20 + (Math.random() * 40),
        x: -10 + (Math.random() * 20),
        rotation: 5 + (Math.random() * 10),
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }

  // ── Initialize All ───────────────────────────────────────
  function init() {
    // Wait for GSAP to be ready
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Run initializers
    initHeroAnimation();
    initFadeUpAnimations();
    initCardFanAnimations();
    initSlideAnimations();
    initNavbarScroll();
    initProblemAnimation();
    initBilanAnimation();
    initCTAAnimation();
    initFloatingShapes();

    console.log('✅ WiseGenerative animations initialized');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
