const React = require("react");

const METRIKA_ID = 104436956;
const METRIKA_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  // Load the tag in <head>
  setHeadComponents([
    <script
      key="ym-tag"
      type="text/javascript"
      // your exact IIFE + init, inlined to run immediately on first paint
      dangerouslySetInnerHTML={{
        __html: `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','${METRIKA_SRC}', 'ym');
ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
        `,
      }}
    />,
  ]);

  // Add the <noscript> fallback pixel before the body (so it’s right in the HTML)
  setPreBodyComponents([
    <noscript key="ym-noscript">
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>,
  ]);
};
