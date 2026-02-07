import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { useRouter } from 'next/router'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'
import { useRef, useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Catalog from './Catalog'
const ExampleRecentComments = dynamic(
  () => import('./RecentCommentListForExample')
)

/**
 * 侧边栏
 */
export const SideBar = props => {
  const { locale, isDarkMode } = useGlobal()
  const { latestPosts, categoryOptions, tagOptions, notice, post, siteInfo, customNav, customMenu, postCount } = props
  const router = useRouter()
  // 评论相关
  const COMMENT_WALINE_SERVER_URL = siteConfig(
    'COMMENT_WALINE_SERVER_URL',
    false
  )
  const COMMENT_WALINE_RECENT = siteConfig('COMMENT_WALINE_RECENT', false)

  // 文章详情页特殊布局
  const HIDDEN_NOTIFICATION =
    post && siteConfig('EXAMPLE_ARTICLE_HIDDEN_NOTIFICATION', false, CONFIG)

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL =
    post && siteConfig('EXAMPLE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  let links = []
  if (customNav) {
    links = links.concat(customNav)
  }
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu || []
  }

  links = (links || []).filter(l => l?.href !== '/search')

  const activePath = router?.asPath?.split?.('?')?.[0]
  const avatar = siteConfig('AVATAR') || siteInfo?.icon || '/avatar.svg'
  const authorName = siteConfig('AUTHOR') || siteConfig('TITLE') || siteInfo?.title
  const description = siteInfo?.description || siteConfig('DESCRIPTION')
  const categoryCount = Array.isArray(categoryOptions) ? categoryOptions.length : 0
  const tagCount = Array.isArray(tagOptions) ? tagOptions.length : 0

  const DropdownArrowIcon = ({ className }) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className={className}
        aria-hidden='true'>
        <path d='M7 10l5 5 5-5H7z' />
      </svg>
    )
  }

  const DotIcon = ({ className }) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        width='16'
        height='16'
        className={className}
        aria-hidden='true'>
        <circle cx='12' cy='12' r='6' />
      </svg>
    )
  }

  const MenuIcon = ({ icon, className }) => {
    if (icon) {
      return <i className={`${icon} ${className}`} aria-hidden='true' />
    }
    return <DotIcon className={className} />
  }

  const SocialGrid = () => {
    const CONTACT_GITHUB = siteConfig('CONTACT_GITHUB')
    const CONTACT_TWITTER = siteConfig('CONTACT_TWITTER')
    const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
    const ENABLE_RSS = siteConfig('ENABLE_RSS')
    const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')
    const CONTACT_LINKEDIN = siteConfig('CONTACT_LINKEDIN')
    const CONTACT_WEIBO = siteConfig('CONTACT_WEIBO')
    const CONTACT_INSTAGRAM = siteConfig('CONTACT_INSTAGRAM')
    const CONTACT_BILIBILI = siteConfig('CONTACT_BILIBILI')
    const CONTACT_YOUTUBE = siteConfig('CONTACT_YOUTUBE')
    const CONTACT_XIAOHONGSHU = siteConfig('CONTACT_XIAOHONGSHU')
    const CONTACT_ZHISHIXINGQIU = siteConfig('CONTACT_ZHISHIXINGQIU')
    const CONTACT_WEHCHAT_PUBLIC = siteConfig('CONTACT_WEHCHAT_PUBLIC')

    const emailIcon = useRef(null)

    const githubColor = isDarkMode ? '#e5e7eb' : '#191717'

    const SocialSvg = ({ type, className }) => {
      const offsetClass = (() => {
        switch (type) {
          case 'telegram':
            return 'translate-x-px translate-y-px'
          case 'rss':
            return 'translate-x-px translate-y-px'
          default:
            return ''
        }
      })()

      const common = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'currentColor'
      }

      switch (type) {
        case 'github':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M12 .5C5.73.5.5 5.87.5 12.43c0 5.25 3.44 9.7 8.2 11.27.6.12.82-.27.82-.59v-2.2c-3.34.76-4.04-1.67-4.04-1.67-.55-1.44-1.34-1.83-1.34-1.83-1.1-.78.08-.77.08-.77 1.22.09 1.86 1.3 1.86 1.3 1.08 1.93 2.84 1.37 3.53 1.04.11-.81.42-1.37.76-1.68-2.66-.32-5.46-1.38-5.46-6.13 0-1.36.46-2.47 1.22-3.34-.12-.32-.53-1.62.12-3.38 0 0 1-.33 3.3 1.27.96-.28 1.98-.42 3-.42 1.02 0 2.04.14 3 .42 2.3-1.6 3.3-1.27 3.3-1.27.65 1.76.24 3.06.12 3.38.76.87 1.22 1.98 1.22 3.34 0 4.76-2.81 5.8-5.49 6.12.43.39.82 1.15.82 2.33v3.46c0 .33.22.72.83.59 4.75-1.58 8.19-6.02 8.19-11.27C23.5 5.87 18.27.5 12 .5z' />
            </svg>
          )
        case 'twitter':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.2 1.6-2.1-.7.4-1.5.8-2.4.9-.7-.8-1.7-1.2-2.8-1.2-2.1 0-3.8 1.8-3.8 4 0 .3 0 .6.1.9-3.1-.2-5.8-1.7-7.6-4.1-.3.6-.5 1.2-.5 1.9 0 1.4.7 2.6 1.7 3.3-.6 0-1.2-.2-1.7-.5v.1c0 2 1.3 3.6 3.1 4-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.7 2 2.9 3.7 2.9-1.4 1.1-3.1 1.8-5 1.8H2c1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12.1-6.7 12.1-12.6v-.6c.8-.6 1.4-1.2 1.9-2z' />
            </svg>
          )
        case 'telegram':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M3.105 3.105a.75.75 0 0 1 .814-.163l18 7.5a.75.75 0 0 1 0 1.386l-18 7.5a.75.75 0 0 1-1.01-.86l2.25-7.5a.75.75 0 0 1 .72-.53h7.6a.75.75 0 0 0 0-1.5H5.87a.75.75 0 0 1-.72-.53l-2.25-7.5a.75.75 0 0 1 .205-.803z' />
            </svg>
          )
        case 'linkedin':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23.5h4V7.98h-4V23.5zM8 7.98h3.8v2.12h.05c.53-1 1.84-2.12 3.79-2.12 4.05 0 4.8 2.7 4.8 6.22v9.3h-4v-8.25c0-1.97-.04-4.5-2.74-4.5-2.74 0-3.16 2.15-3.16 4.37v8.38H8V7.98z' />
            </svg>
          )
        case 'instagram':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z' />
              <path d='M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' />
              <path d='M17.5 6.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z' />
            </svg>
          )
        case 'weibo':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M18.7 10.3c-1.1-.3-1.9.3-2.1.6-.2.3-.2.7.1.9.4.2 1.1-.2 1.7 0 .6.2.6.7.6.7s.7-.3.8-1.1c.1-.8-.4-1.6-1.1-1.1zM20.2 8.2c-1.7-.5-3.2.3-3.6.9-.3.4-.3 1 .2 1.2.6.3 1.7-.3 2.7 0 1 .3 1 .9 1 .9s1.1-.3 1.2-1.5c.2-1.2-.6-2.2-1.5-1.5z' />
              <path d='M12 8c-6.1 0-11 3.4-11 7.6S5.9 23 12 23s11-3.4 11-7.4S18.1 8 12 8zm0 12.6c-4.7 0-8.5-2.4-8.5-5.3S7.3 10 12 10s8.5 2.3 8.5 5.3-3.8 5.3-8.5 5.3z' />
              <path d='M12.1 12.2c-2.9 0-5.2 1.5-5.2 3.3s2.3 3.3 5.2 3.3 5.2-1.5 5.2-3.3-2.4-3.3-5.2-3.3zm-2 5.4c-1 0-1.8-.6-1.8-1.3s.8-1.3 1.8-1.3 1.8.6 1.8 1.3-.8 1.3-1.8 1.3z' />
            </svg>
          )
        case 'bilibili':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M5 5.5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-13zm4.2-3.2a1 1 0 0 1 1.4 0L12 3.7l1.4-1.4a1 1 0 1 1 1.4 1.4L13.4 5H10.6L9.2 3.7a1 1 0 0 1 0-1.4zM8 10.5c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-4zm2 .5v3h4v-3h-4z' />
            </svg>
          )
        case 'youtube':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M23.5 7.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.8 3.5 12 3.5 12 3.5h0s-4.8 0-8.2.3c-.5.1-1.5.1-2.4 1C.7 5.5.5 7.2.5 7.2S.2 9.1.2 11v1.8c0 1.9.3 3.8.3 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.8 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-1.9.3-3.8V11c0-1.9-.3-3.8-.3-3.8zM9.8 15.6V8.4l6.4 3.6-6.4 3.6z' />
            </svg>
          )
        case 'wechat':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M8.9 3C4.5 3 1 5.9 1 9.5c0 2.1 1.2 3.9 3.1 5.1l-.7 2.1 2.2-1.2c.9.2 1.8.3 2.8.3 4.4 0 7.9-2.9 7.9-6.5S13.3 3 8.9 3zm-2 5.4c-.6 0-1.1-.5-1.1-1.1S6.3 6.2 6.9 6.2 8 6.7 8 7.3 7.5 8.4 6.9 8.4zm4 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1S12 6.7 12 7.3s-.5 1.1-1.1 1.1z' />
              <path d='M16.2 10c-3.8 0-6.8 2.4-6.8 5.4 0 3 3.1 5.4 6.8 5.4.8 0 1.5-.1 2.2-.2l1.8 1 .-0.6-1.7c1.4-1 2.2-2.4 2.2-3.9 0-3-3.1-5.4-6.8-5.4zm-2.1 4.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm4.2 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z' />
            </svg>
          )
        case 'rss':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M6.2 18.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM3 10.5c6.2 0 11.2 5 11.2 11.2H11c0-4.4-3.6-8-8-8v-3.2zM3 3c10.3 0 18.7 8.4 18.7 18.7h-3.2C18.5 13.2 11.5 6.2 3 6.2V3z' />
            </svg>
          )
        case 'email':
          return (
            <svg {...common} className={`${className} ${offsetClass}`.trim()}>
              <path d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z' />
            </svg>
          )
        default:
          return null
      }
    }

    const items = [
      CONTACT_GITHUB && {
        key: 'github',
        href: CONTACT_GITHUB,
        title: 'GitHub',
        svg: 'github',
        color: githubColor
      },
      CONTACT_TWITTER && {
        key: 'twitter',
        href: CONTACT_TWITTER,
        title: 'Twitter',
        svg: 'twitter',
        color: '#4b9ae4'
      },
      CONTACT_TELEGRAM && {
        key: 'telegram',
        href: CONTACT_TELEGRAM,
        title: 'Telegram',
        svg: 'telegram',
        color: '#229ED9'
      },
      CONTACT_LINKEDIN && {
        key: 'linkedin',
        href: CONTACT_LINKEDIN,
        title: 'LinkedIn',
        svg: 'linkedin',
        color: '#0A66C2'
      },
      CONTACT_WEIBO && {
        key: 'weibo',
        href: CONTACT_WEIBO,
        title: 'Weibo',
        svg: 'weibo',
        color: '#E6162D'
      },
      CONTACT_INSTAGRAM && {
        key: 'instagram',
        href: CONTACT_INSTAGRAM,
        title: 'Instagram',
        svg: 'instagram',
        color: '#E4405F'
      },
      CONTACT_BILIBILI && {
        key: 'bilibili',
        href: CONTACT_BILIBILI,
        title: 'Bilibili',
        svg: 'bilibili',
        color: '#00A1D6'
      },
      CONTACT_YOUTUBE && {
        key: 'youtube',
        href: CONTACT_YOUTUBE,
        title: 'YouTube',
        svg: 'youtube',
        color: '#FF0000'
      },
      CONTACT_XIAOHONGSHU && {
        key: 'xiaohongshu',
        href: CONTACT_XIAOHONGSHU,
        title: '小红书',
        img: '/svg/xiaohongshu.svg',
        color: '#FF2442'
      },
      CONTACT_ZHISHIXINGQIU && {
        key: 'zhishixingqiu',
        href: CONTACT_ZHISHIXINGQIU,
        title: '知识星球',
        img: '/svg/zhishixingqiu.svg',
        color: '#00C07A'
      },
      CONTACT_WEHCHAT_PUBLIC && {
        key: 'wechat',
        href: CONTACT_WEHCHAT_PUBLIC,
        title: '微信公众号',
        svg: 'wechat',
        color: '#2AAE67'
      },
      ENABLE_RSS && {
        key: 'rss',
        href: '/rss/feed.xml',
        title: 'RSS',
        svg: 'rss',
        color: '#ff6600'
      }
    ].filter(Boolean)

    if (items.length === 0 && !CONTACT_EMAIL) {
      return null
    }

    return (
      <div className='mt-3 grid grid-cols-3 gap-2'>
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            className='group relative isolate flex items-center justify-center overflow-hidden rounded-xl w-10 h-10 transition-transform duration-200 hover:scale-105 cursor-pointer'
            style={{ color: '#55acd5' }}
            title='Email'
            aria-label='Email'
            ref={emailIcon}>
            <span className='relative z-10 flex items-center justify-center w-6 h-6'>
              <SocialSvg
                type='email'
                className='block w-full h-full leading-none transition-colors duration-300 group-hover:text-black'
              />
            </span>
            <span
              className='absolute inset-0 z-0 origin-center rounded-xl opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100'
              style={{ backgroundColor: '#55acd5' }}
            />
          </a>
        )}
        {items.map(item => (
          <a
            key={item.key}
            className='group relative isolate flex items-center justify-center overflow-hidden rounded-xl w-10 h-10 transition-transform duration-200 hover:scale-105'
            style={{ color: item.color }}
            href={item.href}
            title={item.title}
            aria-label={item.title}
            target={item.href?.startsWith('http') ? '_blank' : undefined}
            rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}>
            <span className='relative z-10 flex items-center justify-center w-6 h-6'>
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className='block w-full h-full leading-none transition duration-300 group-hover:brightness-0'
                />
              ) : item.svg ? (
                <SocialSvg
                  type={item.svg}
                  className='block w-full h-full leading-none transition-colors duration-300 group-hover:text-black'
                />
              ) : (
                <i
                  className={`${item.icon} block text-xl leading-none transition-colors duration-300 group-hover:text-black`}
                />
              )}
            </span>
            <span
              className='absolute inset-0 z-0 origin-center rounded-xl opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100'
              style={{ backgroundColor: item.color }}
            />
          </a>
        ))}
      </div>
    )
  }

  const NavButtons = () => {
    if (!links || links.length === 0) {
      return null
    }

    const [openMap, setOpenMap] = useState(() => {
      const init = {}
      links.forEach((item, index) => {
        if (item?.subMenus?.some(s => s?.href && activePath === s.href)) {
          init[index] = true
        }
      })
      return init
    })

    return (
      <div className='mt-6 flex w-full flex-col items-center gap-2.5'>
        {links.map((item, index) => {
          const hasSubMenu = item?.subMenus?.length > 0
          const itemActive = item?.href && activePath === item.href
          const childActive = hasSubMenu
            ? item.subMenus.some(s => s?.href && activePath === s.href)
            : false
          const active = itemActive || childActive
          const isOpen = Boolean(openMap[index])
          const baseBtn =
            'relative h-12 w-40 rounded-xl text-base tracking-wider opacity-75 shadow-none transition-all duration-300 hover:opacity-100 hover:[box-shadow:var(--box-bg-shadow)_0px_5px_15px] flex items-center px-4'
          const activeBtn = 'bg-gradient-shoka-button text-white'
          const inactiveBtn = 'text-gray-700 dark:text-gray-200 bg-transparent hover:bg-black/10 dark:hover:bg-white/10'

          if (!hasSubMenu) {
            return (
              <SmartLink
                key={index}
                href={item?.href}
                target={item?.target}
                className={`${baseBtn} ${active ? activeBtn : inactiveBtn}`}>
                <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                  <MenuIcon icon={item?.icon} className='inline-block w-4 h-4 opacity-90 text-current' />
                </span>
                <span className='w-full text-center'>{item?.name}</span>
              </SmartLink>
            )
          }

          return (
            <div
              key={index}
              className='bg-black/5 dark:bg-white/10 flex w-40 flex-col rounded-xl opacity-75 transition-all duration-300 hover:opacity-100'>
              <button
                type='button'
                className='relative flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 h-12 w-full cursor-pointer rounded-xl transition-colors'
                onClick={() => {
                  setOpenMap(prev => ({
                    ...prev,
                    [index]: !prev[index]
                  }))
                }}>
                <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                  <MenuIcon icon={item?.icon} className='inline-block w-4 h-4 opacity-90 text-current' />
                </span>
                <span className='w-full text-center text-gray-800 dark:text-gray-100'>{item?.name}</span>
                <DropdownArrowIcon
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 opacity-80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}>
                <div className='min-h-0 overflow-hidden'>
                  <div className='flex flex-col items-center'>
                    {item.subMenus.map((sLink, subIndex) => {
                      const isSubActive = sLink?.href && activePath === sLink.href
                      const subBtnBase =
                        'h-12 w-40 rounded-xl text-base tracking-wider transition-all duration-300 flex items-center justify-center gap-2'
                      const subBtnActive = 'bg-gradient-shoka-button text-white'
                      const subBtnInactive =
                        'text-gray-700/80 dark:text-white/80 bg-transparent shadow-none hover:bg-black/10 dark:hover:bg-white/10'

                      return (
                        <SmartLink
                          key={subIndex}
                          href={sLink?.href}
                          target={item?.target}
                          className={`${subBtnBase} ${
                            isSubActive ? subBtnActive : subBtnInactive
                          }`}>
                          <MenuIcon
                            icon={sLink?.icon}
                            className='shrink-0 inline-block w-4 h-4 opacity-90 text-current'
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
      </div>
    )
  }

  return (
    <>
      <aside className='w-full rounded-xl overflow-hidden mb-6 '>
        <div className='p-5 flex flex-col items-center'>
          <div className='relative h-36 w-36 rounded-full overflow-hidden shadow-card-darker'>
            <LazyImage
              src={avatar}
              alt='avatar'
              className='hover-animate-shake h-full w-full object-cover rounded-full transition'
            />
          </div>
          <p className='mt-3 text-base font-semibold text-gray-900 dark:text-gray-100'>{authorName}</p>
          {description && (
            <p className='mt-3 text-center text-sm text-gray-700/80 dark:text-white/80'>
              {description}
            </p>
          )}
          <SocialGrid />
          <div className='mt-3 flex justify-center text-center text-sm/4 whitespace-nowrap select-none text-gray-700/80 dark:text-white/80'>
            <SmartLink href='/' className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
              <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>{postCount || 0}</span>
              文章
            </SmartLink>
            <div className='mx-3 w-px bg-black/10 dark:bg-white/20' />
            <SmartLink href='/category' className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
              <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>{categoryCount}</span>
              分类
            </SmartLink>
            <div className='mx-3 w-px bg-black/10 dark:bg-white/20' />
            <SmartLink href='/tag' className='hover:text-blue-500 flex cursor-pointer flex-col gap-2 p-1 transition'>
              <span className='text-lg/5 font-bold text-gray-900 dark:text-gray-100'>{tagCount}</span>
              标签
            </SmartLink>
          </div>
          <NavButtons />
        </div>
      </aside>

      {/* 目录 */}
      {post?.toc && post?.toc.length > 2 && (
        <aside className='w-full rounded-xl shadow-card overflow-hidden mb-6 pb-4'>
          <h3 className='text-sm text-gray-700 dark:text-gray-200 py-3 px-4 border-b border-black/10 dark:border-white/10'>
            {locale.COMMON.TABLE_OF_CONTENTS}
          </h3>
          <Catalog toc={post?.toc} />
        </aside>
      )}

      {/* 最近评论 */}
      {COMMENT_WALINE_SERVER_URL && COMMENT_WALINE_RECENT && (
        <aside className='w-full rounded shadow overflow-hidden mb-6'>
          <h3 className='text-sm bg-gray-100 text-gray-700 dark:bg-hexo-black-gray dark:text-gray-200 py-3 px-4 dark:border-hexo-black-gray border-b'>
            {locale.COMMON.RECENT_COMMENTS}
          </h3>

          <div className='p-4'>
            <ExampleRecentComments />
          </div>
        </aside>
      )}
    </>
  )
}
