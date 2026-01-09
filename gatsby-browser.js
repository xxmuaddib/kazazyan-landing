import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const METRIKA_ID = 104436956;
const METRIKA_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;

export const onClientEntry = () => {
  if (typeof window === "undefined") return;

  // If already loaded, don't load again
  if (document.querySelector(`script[src^="${METRIKA_SRC}"]`)) return;

  // Same bootstrap IIFE you provided (kept intact)
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", METRIKA_SRC, "ym");

  // Initialize with your exact options
  window.ym &&
    window.ym(METRIKA_ID, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true,
    });
};

export const onRouteUpdate = ({ location }) => {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;
  const path = location.pathname + (location.search || "");
  window.ym(METRIKA_ID, "hit", path);
};
