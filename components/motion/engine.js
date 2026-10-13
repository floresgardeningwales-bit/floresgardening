// Progressive enhancement: content stays visible if JS or animation is unavailable.
export function startSiteMotion() {
  if (typeof window === 'undefined' || !window.IntersectionObserver || !Element.prototype.animate) return () => {};
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet();
  const active = new Set();
  const selector = 'main h1, main h2, main .eyebrow, .pageLede, .editorialStatement > p, .editorialTriptych > img, .editorialService, .serviceItem, .practiceCard, .serviceRows > div, .knowGrid > *, .nextSteps > li, .almanac, .areaGrid > *, .faqList > *, .footerMain';
  function reveal(el) {
    if (preference.matches || !el.isConnected) return;
    const mobile = window.matchMedia('(max-width: 650px)').matches;
    const photo = el.matches('.editorialTriptych > img');
    // Do not replay an entrance after a fast scroll has passed the element.
    if (el.getBoundingClientRect().top < 0) return;
    const siblings = [...el.parentElement.children].filter(child => child.matches(selector));
    const delay = mobile ? 0 : Math.min(Math.max(siblings.indexOf(el), 0) * 65, 195);
    const frames = mobile
      ? [{ opacity: 0.35 }, { opacity: 1 }]
      : [{ opacity: 0, transform: `translateY(${photo ? 14 : 18}px)` }, { opacity: 1, transform: 'translateY(0)' }];
    const animation = el.animate(frames, { duration: mobile ? 350 : photo ? 900 : 720, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    active.add(animation);
    animation.onfinish = animation.oncancel = () => active.delete(animation);
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      reveal(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });
  function scan() {
    if (preference.matches) return;
    for (const el of document.querySelectorAll(selector)) {
      if (seen.has(el)) continue;
      // Avoid animating both a card and its nested heading at the same time.
      if (el.parentElement.closest(selector)) continue;
      seen.add(el);
      // Already-visible content must never flash out after hydration or navigation.
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      observer.observe(el);
    }
  }
  function onPreference() {
    if (preference.matches) {
      observer.disconnect();
      for (const animation of active) animation.cancel();
      active.clear();
    } else scan();
  }
  // Covers client-side navigation and content such as the seasonal panel.
  const mutations = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1 && !node.closest?.('.gv-layer')))) scan();
  });
  mutations.observe(document.body, { childList: true, subtree: true });
  preference.addEventListener('change', onPreference);
  scan();
  return () => {
    observer.disconnect();
    mutations.disconnect();
    preference.removeEventListener('change', onPreference);
    for (const animation of active) animation.cancel();
    active.clear();
  };
}
