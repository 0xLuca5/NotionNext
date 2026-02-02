/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    @import url("/fonts/ChillRoundFRegular/result.css");
    @import url("/fonts/ChillRoundFBold/result.css");

    // 底色
    :root {
      --gradient-bg-start: #fdfbfb;
      --gradient-bg-end: #ebedee;
      --gradient-bg: linear-gradient(
        180deg,
        var(--gradient-bg-start) 10%,
        var(--gradient-bg-end) 100%
      );
      --gradient-header: linear-gradient(-225deg, #e3fdf5 0, #ffe6fa 100%);
      --gradient-shoka-button-start: #ed6ea0;
      --gradient-shoka-button-end: #ec8c69;
      --gradient-shoka-button: linear-gradient(
        to right,
        var(--gradient-shoka-button-start) 0,
        var(--gradient-shoka-button-end) 100%
      );
      --box-bg-shadow: rgba(0, 0, 0, 0.1);
      --grey-1-a5: rgba(253, 253, 253, 0.5);
    }

    .dark {
      --gradient-bg-start: #21252b;
      --gradient-bg-end: #000;
      --gradient-bg: linear-gradient(
        180deg,
        var(--gradient-bg-start) 10%,
        var(--gradient-bg-end) 100%
      );
      --gradient-header: linear-gradient(-225deg, #2d3230 0, #322d31 100%);
      --gradient-shoka-button-start: #f18bb3cc;
      --gradient-shoka-button-end: #f0a387cc;
      --gradient-shoka-button: linear-gradient(
        to right,
        var(--gradient-shoka-button-start) 0,
        var(--gradient-shoka-button-end) 100%
      );
      --box-bg-shadow: rgba(0, 0, 0, 0.5);
      --grey-1-a5: rgba(34, 34, 34, 0.5);
    }

    body {
      background: var(--gradient-bg);
    }

    #theme-example {
      font-family: "寒蝉全圆体", "Noto Sans SC", "PingFang SC", -apple-system, BlinkMacSystemFont,
        "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", Helvetica, Arial, sans-serif;
    }

    #theme-example h1,
    #theme-example h2,
    #theme-example h3,
    #theme-example h4,
    #theme-example h5,
    #theme-example h6 {
      font-family: "寒蝉全圆体", Bitter, "Noto Serif SC", SimSun, "Times New Roman", Times, serif;
    }

    .dark body{
        background: var(--gradient-bg);
    }

    .bg-gradient-start {
      background-color: var(--gradient-bg-start);
    }

    .bg-gradient-header {
      background-image: var(--gradient-header);
    }

    .bg-gradient-shoka-button {
      background-image: var(--gradient-shoka-button);
    }

    .hover-bg-gradient-shoka-button:hover {
      background-image: var(--gradient-shoka-button);
    }

    .nav-dropdown-glass {
      background: var(--grey-1-a5);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    .dark .nav-dropdown-glass {
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .header-glass {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .hero-bottom-fade {
      background: linear-gradient(to bottom, transparent 0%, var(--gradient-bg-start) 90%);
    }

    #site-header::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--gradient-header);
      opacity: 0;
      transition: opacity 300ms;
      z-index: -1;
    }

    #site-header.with-background::before {
      opacity: 1;
    }

    #sidebar-drawer {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-right: 1px solid rgba(255, 255, 255, 0.5);
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
    }

    .dark #sidebar-drawer {
      background: rgba(0, 0, 0, 0.55);
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
    }

    #sidebar-drawer-background {
      background: rgba(0, 0, 0, 0.55);
    }

    .wave-wrap {
      width: 100%;
      height: 15dvh;
      min-height: 3.125rem;
      max-height: 9.375rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .wave-wrap .wave {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .wave-wrap .parallax > use {
      animation: move-forever 12s linear infinite;
    }

    .wave-wrap .parallax > use:nth-child(1) {
      animation-delay: -2s;
      transform: translate(-160px, 0%);
      fill: var(--gradient-bg-start);
      opacity: 0.75;
      filter: brightness(1.1);
    }

    .wave-wrap .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 7s;
      fill: var(--gradient-bg-start);
      opacity: 0.6;
      filter: brightness(1.25);
    }

    .wave-wrap .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 4s;
      transform: translate(-75px, 0%);
      opacity: 1;
      fill: var(--gradient-bg-start);
    }

    @keyframes move-forever {
      0% {
        transform: translate(-90px, 0%);
      }
      100% {
        transform: translate(85px, 0%);
      }
    }

    .shadow-box {
      box-shadow: var(--box-bg-shadow) 0px 50px 50px -50px;
    }

    .shadow-card {
      box-shadow: var(--box-bg-shadow) 0px 5px 15px;
    }

    .shadow-card-darker {
      box-shadow: 0 0 2rem var(--box-bg-shadow);
    }

    .shadow-home-sider {
      box-shadow: var(--box-bg-shadow) 50px -10px 30px -50px;
    }

    .shadow-text {
      text-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.5);
    }

    .scroll-gutter-stable {
      scrollbar-gutter: stable;
    }

  `}</style>
}

export { Style }
