import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MenuList } from './MenuList'

const SearchIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={className}>
      <title>Search</title>
      <path d='M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z' />
    </svg>
  )
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
        <div className='w-full max-w-2xl overflow-hidden rounded-xl  shadow-box'>
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
      className={`theme-toggle scale-80 cursor-pointer transition duration-300 hover:scale-90 ${className || ''}`}
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
      <label className='toggle block cursor-pointer' aria-label='toggle theme'>
        <input type='checkbox' className='hidden' checked={isDarkMode} readOnly />
        <div className='toggle-indicator' />
      </label>

      <style jsx>{`
        .theme-toggle {
          z-index: 10;
          --theme-toggle-color: currentColor;
        }

        .toggle-indicator {
          border-radius: 50%;
          width: 36px;
          height: 36px;
          position: relative;
          box-shadow: inset 16px -16px 0 0 var(--theme-toggle-color, #ffbb52);
          transform: scale(1) rotate(-2deg);
          transition:
            box-shadow 0.5s ease 0s,
            transform 0.4s ease 0.1s;
        }

        .toggle-indicator:before {
          content: '';
          width: inherit;
          height: inherit;
          border-radius: inherit;
          position: absolute;
          left: 0;
          top: 0;
          background: transparent;
          transition: background 0.3s ease;
        }

        .toggle-indicator:after {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: -4px 0 0 -4px;
          position: absolute;
          top: 50%;
          left: 50%;
          box-shadow:
            0 -23px 0 var(--theme-toggle-color, #ffbb52),
            0 23px 0 var(--theme-toggle-color, #ffbb52),
            23px 0 0 var(--theme-toggle-color, #ffbb52),
            -23px 0 0 var(--theme-toggle-color, #ffbb52),
            15px 15px 0 var(--theme-toggle-color, #ffbb52),
            -15px 15px 0 var(--theme-toggle-color, #ffbb52),
            15px -15px 0 var(--theme-toggle-color, #ffbb52),
            -15px -15px 0 var(--theme-toggle-color, #ffbb52);
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .dark .toggle-indicator {
          box-shadow: inset 32px -32px 0 0 var(--theme-background-color, #17181c);
          transform: scale(0.5) rotate(0deg);
          transition:
            transform 0.3s ease 0.1s,
            box-shadow 0.2s ease 0s;
        }

        .dark .toggle-indicator:before {
          background: var(--theme-toggle-color, #ffbb52);
          transition: background 0.3s ease 0.1s;
        }

        .dark .toggle-indicator:after {
          transform: scale(1.5);
          transition: transform 0.5s ease 0.15s;
        }
      `}</style>
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
  const isHome =
    router?.pathname === '/' ||
    router?.pathname === '/page/[page]' ||
    router?.asPath === '/' ||
    (router?.asPath && router.asPath.startsWith('/page/'))

  const brandLogo = '/cosine-logo.svg'

  const [withBackground, setWithBackground] = useState(!isHome)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setWithBackground(true)
      return
    }

    const onScroll = () => {
      setWithBackground(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key?.toLowerCase?.() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const isTransparentHome = isHome && !withBackground

  const stopEvent = e => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
  }

  return (
    <header
      id='site-header'
      className={`shadow-text fixed inset-x-0 top-0 z-30 select-none transition-colors duration-300 overflow-visible ${withBackground ? 'with-background header-glass text-gray-900 dark:text-gray-100' : 'text-white'}`}>
      <div className='mx-auto max-w-7xl flex items-center justify-between gap-4 px-6 py-2.5'>
        <div className='flex items-center gap-2'>
          <SmartLink href='/' passHref legacyBehavior>
            <a className='logo -my-1 mr-2 flex cursor-pointer items-center justify-center whitespace-nowrap no-underline'>
              <LazyImage
                src={brandLogo}
                alt='COSINE'
                className='h-8 w-auto object-contain'
              />
            </a>
          </SmartLink>
          <MenuList {...props} isHome={isTransparentHome} />
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <button
            type='button'
            aria-label='搜索'
            className='cursor-pointer transition duration-300 hover:scale-125'
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            onTouchStart={stopEvent}
            onClick={e => {
              stopEvent(e)
              setSearchOpen(true)
            }}>
            <SearchIcon className='w-8 h-8' />
          </button>
          <KoharuThemeToggle className={isTransparentHome ? 'text-white' : ''} />
        </div>
      </div>

      <KoharuSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
