import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MenuList } from './MenuList'
import { SideBar } from './SideBar'
import CONFIG from '../config'

const SearchIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className || 'h-5 w-5'}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='11' cy='11' r='8' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  )
}

const PaletteIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className || 'h-5 w-5'}>
      <path d='M12 22a10 10 0 1 1 10-10c0 2.2-1.8 4-4 4h-1a2 2 0 0 0-2 2c0 2.2-1.8 4-4 4Z' />
      <circle cx='7.5' cy='10.5' r='1' />
      <circle cx='12' cy='7.5' r='1' />
      <circle cx='16.5' cy='10.5' r='1' />
      <circle cx='9.5' cy='15.5' r='1' />
    </svg>
  )
}

const clamp01 = n => Math.max(0, Math.min(1, n))

const hexToRgb = hex => {
  const value = (hex || '').trim().replace('#', '')
  if (value.length !== 6) return null
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return null
  return { r, g, b }
}

const rgbToHsl = (r, g, b) => {
  const rn = clamp01(r / 255)
  const gn = clamp01(g / 255)
  const bn = clamp01(b / 255)
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6
        break
      case gn:
        h = (bn - rn) / delta + 2
        break
      default:
        h = (rn - gn) / delta + 4
        break
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) }
}

const applyThemeColor = hex => {
  if (typeof document === 'undefined') return
  const rgb = hexToRgb(hex)
  if (!rgb) return
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`)
  document.documentElement.style.setProperty('--gradient-shoka-button-start', hex)
  document.documentElement.style.setProperty('--gradient-shoka-button-end', hex)
}

const KoharuSearchModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const inputRef = useRef(null)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = e => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const doSearch = () => {
    const k = (keyword || '').trim()
    if (!k) {
      onClose?.()
      return
    }
    router.push({ pathname: '/search/' + encodeURIComponent(k) }).then(() => {})
    onClose?.()
  }

  return (
    <div className='fixed inset-0 z-50' aria-hidden='false'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => onClose?.()}
      />
      <div className='fixed inset-0 grid place-items-center px-4'>
        <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white dark:bg-[#0b0f1a] shadow-box'>
          <div className='p-6 md:p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='flex items-center gap-2 font-semibold text-lg md:text-base text-gray-900 dark:text-gray-100'>
                <SearchIcon className='w-5 h-5 md:w-4 md:h-4' />
                搜索文章
              </h2>
              <button
                type='button'
                onClick={() => onClose?.()}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-black/5 transition-colors duration-300 hover:bg-black/10 md:h-7 md:w-7 dark:bg-white/10 dark:hover:bg-white/20'
                aria-label='关闭搜索'>
                <span className='text-base leading-none'>×</span>
              </button>
            </div>

            <div className='mt-4 flex items-center rounded-lg bg-black/5 dark:bg-white/10 overflow-hidden'>
              <input
                ref={inputRef}
                type='text'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    doSearch()
                  }
                }}
                placeholder='输入关键词搜索博客文章'
                className='w-full bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none'
              />
              <button
                type='button'
                onClick={doSearch}
                className='px-4 py-3 text-gray-900/70 hover:text-gray-900 dark:text-gray-100/70 dark:hover:text-gray-100 transition-colors'
                aria-label='搜索'>
                <SearchIcon className='w-4 h-4' />
              </button>
            </div>

            <div className='mt-4 flex items-center justify-center gap-4 text-xs text-black/50 dark:text-white/50'>
              <span>
                <kbd className='rounded bg-black/10 px-1.5 py-0.5 font-mono dark:bg-white/10'>Enter</kbd> 搜索
              </span>
              <span>
                <kbd className='rounded bg-black/10 px-1.5 py-0.5 font-mono dark:bg-white/10'>ESC</kbd> 关闭
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const KoharuThemeToggle = ({ className }) => {
  const { isDarkMode, toggleDarkMode } = useGlobal()

  const stopEvent = e => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
  }

  return (
    <button
      className={`theme-toggle cursor-pointer transition duration-300 hover:scale-105 ${className || ''}`}
      tabIndex={0}
      aria-label='toggle theme'
      type='button'
      onPointerDown={stopEvent}
      onMouseDown={stopEvent}
      onTouchStart={stopEvent}
      onClick={e => {
        stopEvent(e)
        toggleDarkMode()
      }}>
      {isDarkMode ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-6 h-6'>
          <circle cx='12' cy='12' r='4' />
          <path d='M12 2v2' />
          <path d='M12 20v2' />
          <path d='M4.93 4.93l1.41 1.41' />
          <path d='M17.66 17.66l1.41 1.41' />
          <path d='M2 12h2' />
          <path d='M20 12h2' />
          <path d='M6.34 17.66l-1.41 1.41' />
          <path d='M19.07 4.93l-1.41 1.41' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-6 h-6'>
          <path d='M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z' />
        </svg>
      )}
    </button>
  )
}

/**
 * 网站顶部
 * LOGO 和 菜单
 * @returns
 */
export const Header = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  const [themeColor, setThemeColor] = useState(CONFIG?.THEME_PRIMARY_COLOR || '#ec4899')
  const isHome =
    router?.pathname === '/' ||
    router?.pathname === '/page/[page]' ||
    router?.asPath === '/' ||
    (router?.asPath && router.asPath.startsWith('/page/'))

  const brandLogo = '/luca5_logo.svg'

  const headerRef = useRef(null)
  const lastScrollYRef = useRef(0)

  const [withBackground, setWithBackground] = useState(!isHome)
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [drawerMenuOpenMap, setDrawerMenuOpenMap] = useState({})
  const [drawerTab, setDrawerTab] = useState('menu')
  const [isHidden, setIsHidden] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage?.getItem('mythemes_theme_color')
    if (saved) {
      setThemeColor(saved)
      applyThemeColor(saved)
    } else {
      const fallback = CONFIG?.THEME_PRIMARY_COLOR || themeColor
      if (fallback) {
        setThemeColor(fallback)
        applyThemeColor(fallback)
      }
    }
    const media = window.matchMedia('(max-width: 719px)')
    const onChange = e => setIsMobile(!!e.matches)
    setIsMobile(!!media.matches)
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!drawerOpen) {
      return
    }
    setDrawerTab(props?.post ? 'article' : 'menu')
  }, [drawerOpen, props?.post])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const el = headerRef.current
    if (!el) {
      return
    }

    const update = () => {
      setHeaderHeight(el?.offsetHeight || 0)
    }

    update()

    let ro = null
    if (typeof window.ResizeObserver !== 'undefined') {
      ro = new window.ResizeObserver(update)
      ro.observe(el)
    }

    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect?.()
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const offset = isHidden ? 0 : headerHeight
    document.documentElement.style.setProperty('--mythemes-header-offset', `${offset}px`)
  }, [isHidden, headerHeight])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0

        if (!isHome) {
          setWithBackground(true)
        } else {
          setWithBackground(y > 20)
        }

        const lastY = lastScrollYRef.current
        const delta = y - lastY

        if (y < 10) {
          setIsHidden(false)
        } else if (delta > 8) {
          setIsHidden(true)
        } else if (delta < -8) {
          setIsHidden(false)
        }

        lastScrollYRef.current = y
        ticking = false
      })
    }

    lastScrollYRef.current = window.scrollY || 0
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
      }
      if (e.key?.toLowerCase?.() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    const close = () => setDrawerOpen(false)
    router?.events?.on?.('routeChangeStart', close)
    return () => router?.events?.off?.('routeChangeStart', close)
  }, [router?.events])

  const effectiveWithBackground = withBackground || isMobile
  const isTransparentHome = isHome && !effectiveWithBackground

  const stopEvent = e => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
  }

  let links = [
    {
      id: 2,
      icon: 'fas fa-archive',
      name: locale?.NAV?.ARCHIVE || '归档',
      href: '/archive',
      show: siteConfig('EXAMPLE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-folder',
      name: locale?.COMMON?.CATEGORY || '分类',
      href: '/category',
      show: siteConfig('EXAMPLE_MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-tag',
      name: locale?.COMMON?.TAGS || '标签',
      href: '/tag',
      show: siteConfig('EXAMPLE_MENU_TAG', null, CONFIG)
    }
  ]

  if (props?.customNav) {
    links = links.concat(props.customNav)
  }
  if (siteConfig('CUSTOM_MENU')) {
    links = props?.customMenu || []
  }
  links = (links || []).filter(l => l?.show !== false && l?.href !== '/search')

  const normalizeHref = href => {
    if (typeof href !== 'string') {
      return href
    }
    const cleaned = href.split('?')[0].replace(/\/+$/, '')
    return cleaned === '' ? '/' : cleaned
  }

  const activePath = router?.asPath?.split?.('?')?.[0]
  const avatar = siteConfig('AVATAR') || props?.siteInfo?.icon || '/avatar.svg'
  const authorName =
    siteConfig('AUTHOR') || siteConfig('TITLE') || props?.siteInfo?.title
  const description = (CONFIG?.AUTHOR_DESCRIPTION && CONFIG.AUTHOR_DESCRIPTION.trim()) || props?.siteInfo?.description || siteConfig('DESCRIPTION')
  const categoryCount = Array.isArray(props?.categoryOptions)
    ? props.categoryOptions.length
    : 0
  const tagCount = Array.isArray(props?.tagOptions) ? props.tagOptions.length : 0
  const postCount = props?.postCount || 0

  const articleSubMenus = [
    {
      icon: 'fas fa-folder',
      title: locale?.COMMON?.CATEGORY || '分类',
      href: '/category',
      show: siteConfig('EXAMPLE_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      title: locale?.COMMON?.TAGS || '标签',
      href: '/tag',
      show: siteConfig('EXAMPLE_MENU_TAG', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      title: locale?.NAV?.ARCHIVE || '归档',
      href: '/archive',
      show: siteConfig('EXAMPLE_MENU_ARCHIVE', null, CONFIG)
    }
  ].filter(i => i?.show !== false)

  const reservedHrefs = new Set(['/','/archive','/category','/tag'])
  const reservedNames = [locale?.COMMON?.POST, '文章', 'Posts', 'Post']
    .filter(Boolean)
    .map(s => String(s).trim())

  const extraLinks = (links || []).filter(l => {
    const href = normalizeHref(l?.href)
    if (!href) {
      return false
    }
    if (href === '#' || reservedHrefs.has(href)) {
      return false
    }
    if (Array.isArray(l?.subMenus) && l.subMenus.length > 0) {
      return false
    }
    const name = String(l?.name || l?.title || '').trim()
    if (name && reservedNames.includes(name)) {
      return false
    }
    return true
  })

  const drawerLinksRaw = [
    {
      id: 'home',
      icon: 'fas fa-home',
      name: locale?.NAV?.INDEX || '首页',
      href: '/'
    },
    {
      id: 'articles',
      icon: 'fas fa-pen-nib',
      name: locale?.COMMON?.POST || '文章',
      href: '#',
      subMenus: articleSubMenus
    },
    ...extraLinks
  ].filter(Boolean)

  const drawerLinks = drawerLinksRaw.filter((item, idx, arr) => {
    const href = normalizeHref(item?.href)
    if (!href) {
      return true
    }
    return arr.findIndex(i => normalizeHref(i?.href) === href) === idx
  })

  const toggleDrawerMenu = idx => {
    setDrawerMenuOpenMap(prev => ({
      ...(prev || {}),
      [idx]: !prev?.[idx]
    }))
  }

  const SocialIcons = () => {
    const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
    const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
    const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
    const ENABLE_RSS = siteConfig('ENABLE_RSS')

    const items = [
      CONTACT_GITHUB && {
        key: 'github',
        href: CONTACT_GITHUB,
        icon: 'fab fa-github'
      },
      CONTACT_EMAIL && {
        key: 'email',
        href: `mailto:${CONTACT_EMAIL}`,
        icon: 'fas fa-envelope'
      },
      CONTACT_TWITTER && {
        key: 'twitter',
        href: CONTACT_TWITTER,
        icon: 'fab fa-twitter'
      },
      ENABLE_RSS && {
        key: 'rss',
        href: '/feed',
        icon: 'fas fa-rss'
      }
    ].filter(Boolean)

    if (!items.length) {
      return null
    }

    return (
      <div className='mt-4 flex items-center justify-center gap-4'>
        {items.map(it => (
          <SmartLink
            key={it.key}
            href={it.href}
            target='_blank'
            className='inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 text-gray-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/15'>
            <i className={it.icon} />
          </SmartLink>
        ))}
      </div>
    )
  }

  return (
    <header
      id='site-header'
      ref={headerRef}
      className={`shadow-text fixed inset-x-0 top-0 z-30 select-none transition-[transform,colors] duration-300 overflow-visible transform-gpu ${isHidden ? 'md:-translate-y-full' : ''} ${effectiveWithBackground ? 'with-background header-glass text-gray-900 dark:text-gray-100' : 'text-white'}`}>
      <div className='mx-auto max-w-7xl relative flex items-center justify-between gap-2 px-3 md:px-6 py-2.5'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            aria-label='打开菜单'
            className='md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10'
            onClick={() => setDrawerOpen(true)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-6 w-6'>
              <path d='M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z' />
            </svg>
          </button>
          <SmartLink href='/' passHref legacyBehavior>
            <a className='logo -my-1 flex cursor-pointer items-center justify-center whitespace-nowrap no-underline md:mr-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0'>
              <LazyImage
                src={brandLogo}
                alt='LUCAS'
                className='h-10 md:h-12 w-auto object-contain'
              />
            </a>
          </SmartLink>
          <div className='hidden md:block'>
            <MenuList {...props} isHome={isTransparentHome} />
          </div>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <button
            type='button'
            aria-label='搜索'
            className='cursor-pointer transition duration-300 hover:scale-105 md:hover:scale-110'
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            onTouchStart={stopEvent}
            onClick={e => {
              stopEvent(e)
              setSearchOpen(true)
            }}>
            <SearchIcon className='w-6 h-6 md:w-7 md:h-7' />
          </button>
          <label
            aria-label='主题颜色'
            className={`relative cursor-pointer transition duration-300 hover:scale-105 md:hover:scale-110 ${isTransparentHome ? 'text-white' : ''}`}>
            <PaletteIcon className='w-6 h-6' />
            <input
              type='color'
              value={themeColor}
              onClick={e => e?.stopPropagation?.()}
              onChange={e => {
                const val = e?.target?.value
                if (!val) return
                setThemeColor(val)
                applyThemeColor(val)
                if (typeof window !== 'undefined') {
                  window.localStorage?.setItem('mythemes_theme_color', val)
                }
              }}
              className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            />
          </label>
          <KoharuThemeToggle className={isTransparentHome ? 'text-white' : ''} />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`bg-white dark:bg-[#0b0f1a] tablet:flex fixed inset-y-0 left-0 z-50 hidden h-screen w-[70vw] min-w-64 transform px-4 pt-6 shadow-lg backdrop-blur-sm transition-transform duration-300 md:px-0 flex-col overflow-y-auto rounded-r-3xl ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <button
          type='button'
          aria-label='关闭菜单'
          className='absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-red-500 dark:bg-white/10'
          onClick={() => setDrawerOpen(false)}>
          <span className='text-2xl leading-none'>×</span>
        </button>

        {!props?.post && (
          <div className='mt-10 flex flex-col items-center px-2'>
            <div className='relative h-28 w-28 overflow-hidden rounded-full bg-black/5 shadow-card-darker dark:bg-white/10'>
              <LazyImage
                src={avatar}
                alt='avatar'
                className='hover-animate-shake h-full w-full rounded-full object-cover transition'
              />
            </div>
            <p className='mt-3 text-base font-semibold text-gray-900 dark:text-gray-100'>
              {authorName}
            </p>
            {description && (
              <p className='mt-3 whitespace-pre-line text-center text-xs text-gray-700/80 dark:text-white/80'>
                {description}
              </p>
            )}

            <SocialIcons />

            <div className='mt-4 flex justify-center text-center text-sm/4 whitespace-nowrap select-none text-gray-700/80 dark:text-white/80'>
              <SmartLink
                href='/'
                className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
                <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>
                  {postCount}
                </span>
                文章
              </SmartLink>
              <div className='mx-3 w-px bg-black/10 dark:bg-white/20' />
              <SmartLink
                href='/category'
                className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
                <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>
                  {categoryCount}
                </span>
                分类
              </SmartLink>
              <div className='mx-3 w-px bg-black/10 dark:bg-white/20' />
              <SmartLink
                href='/tag'
                className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
                <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>
                  {tagCount}
                </span>
                标签
              </SmartLink>
            </div>
          </div>
        )}

        {props?.post ? (
          <div className='mt-12 w-full pb-10'>
            <SideBar {...props} post={props.post} />
          </div>
        ) : (
          <nav className='mt-6 flex w-full flex-col items-center gap-2.5 pb-10'>
            {drawerLinks.map((item, index) => {
            const hasSubMenu = Array.isArray(item?.subMenus) && item.subMenus.length > 0
            const isActive = item?.href && activePath === item.href
            const isOpen = !!drawerMenuOpenMap?.[index]

            const baseBtn =
              'h-12 w-44 rounded-xl text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2'
            const activeBtn = 'bg-gradient-shoka-button text-white'
            const inactiveBtn =
              'text-gray-700 dark:text-gray-200 bg-transparent hover:bg-black/10 dark:hover:bg-white/10'

            if (!hasSubMenu) {
              return (
                <SmartLink
                  key={item?.id || item?.href || index}
                  href={item?.href}
                  target={item?.target}
                  className={`${baseBtn} ${isActive ? activeBtn : inactiveBtn}`}>
                  <i className={`${item?.icon || ''} inline-block w-4 text-center opacity-90`} />
                  {item?.name}
                </SmartLink>
              )
            }

            return (
              <div
                key={item?.id || item?.href || index}
                className='bg-black/5 dark:bg-white/10 flex w-44 flex-col rounded-xl opacity-90 transition-all duration-300 hover:opacity-100'>
                <button
                  type='button'
                  onClick={() => toggleDrawerMenu(index)}
                  className='relative h-12 w-full rounded-xl text-base tracking-wider transition-all duration-300 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/10'>
                  <div className='flex items-center justify-center gap-2'>
                    <i className={`${item?.icon || ''} inline-block w-4 text-center opacity-90`} />
                    <span>{item?.name}</span>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`absolute right-3 h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}>
                    <path d='M7 10l5 5 5-5H7z' />
                  </svg>
                </button>

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                  <div className='min-h-0 overflow-hidden'>
                    <div className='flex flex-col items-center py-2'>
                      {item.subMenus.map((sLink, subIndex) => {
                        const isSubActive = sLink?.href && activePath === sLink.href
                        const subBtnBase =
                          'h-11 w-40 rounded-xl text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2'
                        const subBtnActive = 'bg-gradient-shoka-button text-white'
                        const subBtnInactive =
                          'text-gray-700/80 dark:text-white/80 bg-transparent shadow-none hover:bg-black/10 dark:hover:bg-white/10'

                        return (
                          <SmartLink
                            key={sLink?.href || subIndex}
                            href={sLink?.href}
                            target={sLink?.target}
                            className={`${subBtnBase} ${
                              isSubActive ? subBtnActive : subBtnInactive
                            }`}>
                            <i
                              className={`${
                                sLink?.icon || ''
                              } shrink-0 inline-block w-4 text-center opacity-90`}
                            />
                            {sLink?.title || sLink?.name}
                          </SmartLink>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
            })}
          </nav>
        )}
      </div>

      <KoharuSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
