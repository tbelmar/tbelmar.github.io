import { c as create_ssr_component, v as validate_component, d as add_attribute } from './index-3ce6e6d7.js';
import 'pixi.js';

const css$1 = {
  code: "@font-face{font-family:edunline;src:url('https://fonts.cdnfonts.com/s/7348/edunline.woff')}@font-face{font-family:o4b;src:url('https://fonts.cdnfonts.com/s/7340/04B_03__.woff')}.info-container.svelte-13rugg0{display:inline-block;position:absolute;left:50%;transform:translate(-50%, 0);width:100%;text-align:center;user-select:none;margin-top:10px;font-family:edunline;text-align:center}.name.svelte-13rugg0{color:#d8d9ba;text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,\n            5px 5px 0 #000;font-size:55px;margin-top:10px;margin-bottom:-10px;line-height:55px;letter-spacing:3px}.job-title.svelte-13rugg0{display:inline-block;font-family:o4b;color:#d8d9ba;text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,\n            1px 1px 0 #000;font-size:20px;letter-spacing:1px;border-style:solid;border-color:#351c24;background-color:rgb(141, 74, 60, 1);border-radius:10px;padding:5px 10px 3px 10px;box-shadow:2px 2px #000}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"info-container svelte-13rugg0"}"><h1 class="${"name svelte-13rugg0"}">TOMÁS BELMAR</h1>
    <p class="${"job-title svelte-13rugg0"}">Software Developer</p>
</div>`;
});
const css = {
  code: "#body.svelte-5ngowm{background-image:url('images/background.gif');background-position:right;background-size:cover;background-repeat:no-repeat;height:100vh}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  $$result.css.add(css);
  return `<div id="${"body"}" class="${"svelte-5ngowm"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

    <div class="${"app"}"><canvas${add_attribute("this", canvas, 0)}></canvas></div>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-3823f511.js.map
