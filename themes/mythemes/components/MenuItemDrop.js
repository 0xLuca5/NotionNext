import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

const ArchiveIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      width='16'
      height='16'
      className={className}
      aria-hidden='true'>
      <path d='M20 7v13H4V7' />
      <path d='M2 4h20v3H2z' />
      <path d='M10 11h4' />
    </svg>
  )
}

const FolderIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      width='16'
      height='16'
      className={className}
      aria-hidden='true'>
      <path d='M3 6h6l2 2h10v10a2 2 0 0 1-2 2H3z' />
    </svg>
  )
}

const TagIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      width='16'
      height='16'
      className={className}
      aria-hidden='true'>
      <path d='M20 10l-8 8-9-9V4h5l9 9z' />
      <path d='M7 7h.01' />
    </svg>
  )
}

const KoharuNavIcon = ({ href, className }) => {
  const cleanHref = (href || '').split('?')[0]
  if (cleanHref.startsWith('/archive')) return <ArchiveIcon className={className} />
  if (cleanHref.startsWith('/category')) return <FolderIcon className={className} />
  if (cleanHref.startsWith('/tag')) return <TagIcon className={className} />
  return <DotIcon className={className} />
}

const MenuIcon = ({ icon, href, className }) => {
  // icon 来自 NotionNext 菜单配置：支持 iconfont 或 FontAwesome class
  if (icon) {
    return <i className={`${icon} ${className}`} aria-hidden='true' />
  }
  return <KoharuNavIcon href={href} className={className} />
}

/**
 * 支持下拉二级的菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemDrop = ({ link, isHome }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const router = useRouter()

  const menuIconClassName = 'mr-1.5 shrink-0 inline-block w-4 h-4 opacity-90 text-current'

  const itemClassName =
    'relative inline-flex h-10 items-center px-4 py-2 text-base tracking-wider after:absolute after:bottom-1 after:left-1/2 after:block after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-9/12'

  const itemColorClassName = isHome
    ? 'text-white/90 hover:text-white after:bg-white'
    : 'text-gray-800/90 dark:text-gray-100/90 hover:text-gray-900 dark:hover:text-white after:bg-gray-800 dark:after:bg-gray-100'

  return (
    <li
      className='relative cursor-pointer'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <div className={`${itemClassName} ${itemColorClassName}`}>
          <SmartLink
            href={link?.href}
            target={link?.target}
            className='flex items-center gap-1.5'>
            <MenuIcon icon={link?.icon} href={link?.href} className={menuIconClassName} />
            <span>{link?.name}</span>
            {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
          </SmartLink>
        </div>
      )}

      {hasSubMenu && (
        <div className={`${itemClassName} ${itemColorClassName} ${show ? 'after:w-9/12' : ''}`}>
          <span className='flex items-center gap-1.5'>
            <MenuIcon icon={link?.icon} href={link?.href} className={menuIconClassName} />
            <span>{link?.name}</span>
          </span>
          <DropdownArrowIcon
            className={`absolute -right-1.5 h-6 w-6 transition-transform duration-300 ${show ? 'rotate-180' : ''}`}
          />
        </div>
      )}

      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          className={`${show ? 'visible opacity-100 top-12' : 'invisible opacity-0 top-10'} transition-all duration-200 z-20 absolute left-1/2 -translate-x-1/2 block overflow-hidden whitespace-nowrap rounded-ss-2xl rounded-ee-2xl shadow-card nav-dropdown-glass`}> 
          {link.subMenus.map((sLink, index) => {
            const currentPath = router?.asPath?.split?.('?')?.[0]
            const isActive = currentPath === sLink.href

            return (
              <li key={index}>
                <SmartLink href={sLink.href} target={link?.target}>
                  <div
                    className={`group px-4 py-2 text-base outline-none transition-colors duration-300 hover-bg-gradient-shoka-button ${isActive ? 'bg-gradient-shoka-button text-white/80' : ''}`}>
                    <div className='flex items-center gap-2 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white'>
                      <MenuIcon
                        icon={sLink?.icon}
                        href={sLink?.href}
                        className='shrink-0 inline-block w-4 h-4 opacity-90 text-white/90'
                      />
                      {sLink.title}
                    </div>
                  </div>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
