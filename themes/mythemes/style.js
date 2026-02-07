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
      --mythemes-header-offset: 0px;

      /* Semantic colors from astro-koharu */
      --primary: 351 77% 62%;
      --primary-foreground: 355.7 100% 97.3%;
      --muted-foreground: 0 0% 35%;
      --card-foreground: 240 10% 3.9%;
      --foreground: 0 0% 20%;
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

      /* Semantic colors from astro-koharu */
      --primary: 350 77% 70%;
      --primary-foreground: 355.7 100% 97.3%;
      --muted-foreground: 0 0% 63%;
      --card-foreground: 0 0% 95%;
      --foreground: 0 0% 95%;
    }

    body {
      background: var(--gradient-bg);
      font-family: "寒蝉全圆体", "Noto Sans SC", "PingFang SC", -apple-system, BlinkMacSystemFont,
        "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", Helvetica, Arial, sans-serif;
      font-weight: 400;
    }

    #theme-mythemes {
      font-family: "寒蝉全圆体", "Noto Sans SC", "PingFang SC", -apple-system, BlinkMacSystemFont,
        "Hiragino Sans GB", "Microsoft YaHei", "Segoe UI", Helvetica, Arial, sans-serif;
      font-weight: 400;
    }

    #theme-mythemes h1,
    #theme-mythemes h2,
    #theme-mythemes h3,
    #theme-mythemes h4,
    #theme-mythemes h5,
    #theme-mythemes h6 {
      font-family: "寒蝉全圆体", Bitter, "Noto Serif SC", SimSun, "Times New Roman", Times, serif;
    }

    .dark body{
        background: var(--gradient-bg);
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

    .kira-widget-wrap {
      box-shadow: 0 0 1rem rgba(161, 177, 204, 0.4);
      background-color: var(--gradient-bg-start);
      border-radius: 12px;
      overflow: hidden;
      white-space: normal;
    }

    .kira-widget-title {
      font-size: 1em;
      font-weight: 400;
      padding: 24px 18px 12px;
      margin: 0;
      color: var(--gradient-shoka-button-start);
    }

    .kira-widget {
      padding: 0 18px 24px;
    }

    .kira-widget ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .kira-widget ul li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      padding: 12px 0;
    }

    .kira-widget ul li a {
      color: #606266;
    }

    .dark .kira-widget ul li a {
      color: rgba(255, 255, 255, 0.8);
    }

    .kira-widget ul li:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .kira-widget.tagcloud {
      padding: 10px;
      padding-bottom: 18px;
    }

    .kira-widget.tagcloud .kira-tag {
      border-radius: 12px;
      padding: 5px 10px;
      font-size: 12px;
      display: inline-block;
      margin: 0 6px 6px 0;
      background-color: rgba(0, 0, 0, 0.06);
      color: #606266;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .kira-widget.tagcloud .kira-tag::before {
      content: '# ';
    }

    .kira-widget.tagcloud .kira-tag:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dark .kira-widget.tagcloud .kira-tag {
      background-color: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.8);
    }

    .dark .kira-widget.tagcloud .kira-tag:hover {
      background-color: rgba(255, 255, 255, 0.14);
    }

    .kira-post {
      width: 100%;
    }

    .kira-post-cover {
      width: 100%;
      padding-bottom: 40%;
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      min-height: 95px;
      background-color: #eee;
    }

    .kira-post-cover-image {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: transform 500ms ease-out;
    }

    .kira-post:hover .kira-post-cover-image {
      transform: scale(1.05);
    }

    .kira-post-cover h1 {
      color: #fff;
      font-size: 28px;
      font-weight: 400;
      margin: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 18px;
      z-index: 1;
    }

    .kira-post-cover h1::after {
      background-image: linear-gradient(
        to top,
        rgba(16, 16, 16, 0.35) 25%,
        rgba(16, 16, 16, 0) 100%
      );
      pointer-events: none;
      background-size: cover;
      content: '';
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: -1;
    }

    .kira-post-meta {
      margin: 12px 0px;
      font-size: 0;
    }

    .kira-post-meta span {
      border-radius: 20px;
      padding: 10px 14px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
      margin-right: 10px;
      text-decoration: none;
      color: #606266;
      background-color: rgba(0, 0, 0, 0.04);
    }

    .dark .kira-post-meta span {
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(255, 255, 255, 0.08);
    }

    .kira-post-meta i {
      font-size: 12px;
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

    .text-card-foreground {
      color: hsl(var(--card-foreground));
    }

    .dark .text-card-foreground {
      color: hsl(var(--card-foreground));
    }

    .text-primary {
      color: hsl(var(--primary));
    }

    .text-muted-foreground {
      color: hsl(var(--muted-foreground));
    }

    .text-foreground {
      color: hsl(var(--foreground));
    }

    .text-foreground\/80 {
      color: hsl(var(--foreground) / 0.8);
    }

    .text-foreground\/50 {
      color: hsl(var(--foreground) / 0.5);
    }

    .text-foreground\/30 {
      color: hsl(var(--foreground) / 0.3);
    }

    .bg-foreground\/40 {
      background-color: hsl(var(--foreground) / 0.4);
    }

    .bg-foreground\/50 {
      background-color: hsl(var(--foreground) / 0.5);
    }

    .text-foreground\/60 {
      color: hsl(var(--foreground) / 0.6);
    }

    .post-item-card:hover {
      box-shadow: 0 0 2rem var(--box-bg-shadow);
    }

    .clip-path-post-img-left {
      -webkit-clip-path: polygon(0 0, 92% 0%, 100% 100%, 0% 100%);
      clip-path: polygon(0 0, 92% 0%, 100% 100%, 0% 100%);
    }

    .clip-path-post-img-right {
      -webkit-clip-path: polygon(0 0%, 100% 0%, 100% 100%, 8% 100%);
      clip-path: polygon(0 0%, 100% 0%, 100% 100%, 8% 100%);
    }

    .post-item-card {
      flex-direction: row !important;
    }

    .h-15 {
      height: 3.75rem;
    }

    .h-46\.5 {
      height: 11.625rem;
    }

    .max-h-15 {
      max-height: 3.75rem;
    }

    .max-h-46\.5 {
      max-height: 11.625rem;
    }

    .min-h-46\.5 {
      min-height: 11.625rem;
    }

    .mr-18 {
      margin-right: 4.5rem;
    }

    .ml-18 {
      margin-left: 4.5rem;
    }

    @media (max-width: 767px) {
      .post-item-card {
        flex-direction: column !important;
      }

      .clip-path-post-img-left,
      .clip-path-post-img-right {
        -webkit-clip-path: none !important;
        clip-path: none !important;
      }

      .post-item-card .post-cover {
        width: 100% !important;
        order: 0 !important;
      }

      .post-item-card .post-content {
        width: 100% !important;
        order: 1 !important;
      }

      .post-item-card .post-more {
        left: auto !important;
        right: -0.25rem !important;
      }
    }

    .horizontal-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
    }

    .horizontal-scrollbar::-webkit-scrollbar {
      height: var(--scrollbar-width, 0.25rem);
    }

    .horizontal-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.25);
      border-radius: 9999px;
    }

    .dark .horizontal-scrollbar {
      scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
    }

    .dark .horizontal-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.22);
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

    /* Paginator styles - migrated from astro-koharu */
    .paginator-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      transition: colors 0.2s;
      height: 2.5rem;
      min-width: 2.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: none;
      cursor: pointer;
      color: hsl(var(--card-foreground));
    }

    .paginator-button:hover:not(:disabled) {
      background-color: hsl(var(--foreground) / 0.1);
      color: hsl(var(--card-foreground));
    }

    .dark .paginator-button:hover:not(:disabled) {
      background-color: hsl(var(--foreground) / 0.15);
    }

    .paginator-button:disabled {
      pointer-events: none;
      opacity: 0.5;
      cursor: not-allowed;
    }

    .paginator-button-active {
      color: hsl(var(--primary));
      opacity: 1 !important;
      cursor: default;
    }

    .paginator-button i {
      font-size: 0.875rem;
    }

    .random-posts {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-synthesis: none;
    }

    .footer-link {
      opacity: 0.75;
      position: relative;
    }

    .footer-link:hover {
      opacity: 1;
    }

    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
    }

    .footer-link:hover::after {
      width: 100%;
    }

    @media (prefers-reduced-motion: no-preference) {
      @keyframes shake {
        0%,
        100% {
          transform: rotate(0deg);
        }

        10% {
          transform: rotate(2deg);
        }

        15%,
        25%,
        35% {
          transform: rotate(-4deg);
        }

        20%,
        30%,
        40% {
          transform: rotate(4deg);
        }

        45% {
          transform: rotate(-2deg);
        }

        50% {
          transform: rotate(2deg);
        }

        55%,
        90% {
          transform: rotate(0deg);
        }
      }

      .hover-animate-shake:hover {
        animation: shake 0.82s both;
        transform-origin: center;
      }
    }

    .post-toc-nav {
    }

  `}</style>
}

export { Style }
