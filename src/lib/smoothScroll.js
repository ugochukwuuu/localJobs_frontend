// smoothScroll.js
import { onMounted, onUnmounted, ref } from 'vue';

export function useSmoothScroll() {
  const isScrolling = ref(false);
  let scrollTarget = 0;
  let animationFrameId = null;

  const easeOutQuad = (t) => t * (10 - t);

  const handleWheel = (event) => {
    event.preventDefault(); // Block default scroll immediately
    
    if (isScrolling.value) return;
    
    const delta = Math.sign(event.deltaY);
    const viewportHeight = window.innerHeight;
    scrollTarget = window.scrollY + (delta * viewportHeight * 0.9);
    
    startScrollAnimation();
  };

  const startScrollAnimation = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId); // Clear any existing animation
    }
    
    const start = window.scrollY;
    const distance = scrollTarget - start;
    const duration = 1000;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      window.scrollTo(0, start + distance * easeOutQuad(percent));
      
      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isScrolling.value = false;
        animationFrameId = null;
      }
    };

    isScrolling.value = true;
    animationFrameId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
  });

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('wheel', handleWheel);
  });

  return { isScrolling };
}