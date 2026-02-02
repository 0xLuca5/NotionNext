'use client'

import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import BlogListArchive from './components/BlogListArchive'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostLock } from './components/PostLock'
import { PostMeta } from './components/PostMeta'
import SearchInput from './components/SearchInput'
import { SideBar } from './components/SideBar'
import TitleBar from './components/TitleBar'
import CONFIG from './config'
import { Style } from './style'

const WaveSvg = () => {
  return (
    <div className='wave-wrap'>
      <svg
        className='wave'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 24 150 28'
        preserveAspectRatio='none'
        aria-hidden='true'>
        <defs>
          <path
            id='gentle-wave'
            d='m -160,44.4 c 30,0 58,-18 87.7,-18 30.3,0 58.3,18 87.3,18 30,0 58,-18 88,-18 30,0 58,18 88,18 l 0,34.5 -351,0 z'
          />
        </defs>
        <g className='parallax'>
          <use xlinkHref='#gentle-wave' x='50' y='0' />
          <use xlinkHref='#gentle-wave' x='50' y='3' />
          <use xlinkHref='#gentle-wave' x='50' y='6' />
        </g>
      </svg>
    </div>
  )
}

const HomeCover = props => {
  const typedRef = useRef(null)
  const title = props?.siteInfo?.title || siteConfig('TITLE')
  const description = props?.siteInfo?.description || siteConfig('DESCRIPTION')
  const bannerImage = props?.siteInfo?.pageCover || siteConfig('HOME_BANNER_IMAGE')

  useEffect(() => {
    if (!isBrowser) return

    const GREETING_WORDS = (siteConfig('GREETING_WORDS') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    let canceled = false

    if (GREETING_WORDS.length > 0 && document.getElementById('typed-mythemes')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (canceled) return
        if (window.Typed && !typedRef.current) {
          typedRef.current = new window.Typed('#typed-mythemes', {
            strings: GREETING_WORDS,
            typeSpeed: 200,
            backSpeed: 100,
            backDelay: 400,
            showCursor: true,
            smartBackspace: true
          })
        }
      })
    }

    return () => {
      canceled = true
      if (typedRef.current?.destroy) {
        typedRef.current.destroy()
      }
      typedRef.current = null
    }
  }, [])

  return (
    <div className='relative flex h-[60dvh] max-h-[800px] overflow-hidden'>
      <div className='absolute inset-0 h-full bg-black/40' />
      <div className='absolute inset-0 bottom-[8vh] flex flex-col items-center justify-center px-5 text-white'>
        <h1 className='shadow-text text-center text-5xl/[1.2] font-bold tracking-widest max-w-7xl'>
          {title}
        </h1>
        {description && <p className='shadow-text mt-4 text-sm'>= {description} =</p>}
        <div className='shadow-text mt-5 text-sm h-6 flex items-center justify-center'>
          <span id='typed-mythemes' />
        </div>
      </div>
      <div className='hero-bottom-fade absolute inset-x-0 bottom-0 h-28' />
      <div className='relative -z-10 h-full min-h-60 w-full'>
        <LazyImage
          src={bannerImage}
          className='h-full w-full object-cover'
          alt='cover'
        />
      </div>
      <WaveSvg />
    </div>
  )
}

/**
 * 基础布局框架
 * 1.其它页面都嵌入在LayoutBase中
 * 2.采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading, fullWidth, locale } = useGlobal()

  const router = useRouter()
  const isHome =
    router?.pathname === '/' ||
    router?.pathname === '/page/[page]' ||
    router?.asPath === '/' ||
    (router?.asPath && router.asPath.startsWith('/page/'))

  const slotCover =
    props.slotCover || (isHome ? <HomeCover siteInfo={props?.siteInfo} /> : null)
  const slotSider = props.slotSider || <SideBar {...props} />

  const hasSider = Boolean(slotSider)

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL =
    post && siteConfig('EXAMPLE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  // 网站左右布局颠倒
  const LAYOUT_SIDEBAR_REVERSE = siteConfig('LAYOUT_SIDEBAR_REVERSE', false)

  return (
    <div
      id='theme-example'
      className={`${siteConfig('FONT_STYLE')} dark:text-gray-300 scroll-smooth`}>
      <Style />

      {/* 页头 */}
      <Header {...props} />
      {/* 标题栏 */}
      <TitleBar {...props} />

      {slotCover}

      {/* 主体 */}
      <div id='container-inner' className='w-full relative z-10'>
        <div
          id='container-wrapper'
          className={`relative mx-auto justify-center md:flex py-8 px-2 ${hasSider ? 'max-w-7xl' : ''}
          ${LAYOUT_SIDEBAR_REVERSE ? 'flex-row-reverse' : ''} 
          ${LAYOUT_VERTICAL ? 'items-center flex-col' : 'items-start'} 
          `}>
          {hasSider && (
            <aside className='hidden md:block w-64 min-w-64 max-w-64 px-2 sticky top-0 self-start h-screen overflow-auto scroll-gutter-stable shadow-home-sider'>
              {slotSider}
            </aside>
          )}
          {/* 内容 */}
          <div
            className={`${hasSider ? 'min-w-0 grow' : ''} ${
              fullWidth
                ? ''
                : LAYOUT_VERTICAL
                  ? 'max-w-5xl'
                  : hasSider
                    ? 'max-w-none'
                    : 'max-w-3xl'
            } w-full xl:px-14 lg:px-4`}>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-16'
              enterTo='opacity-100'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-16'
              unmount={false}>
              {/* 嵌入模块 */}
              {props.slotTop}
              {children}
            </Transition>
          </div>

        </div>
      </div>

      {/* 页脚 */}
      <Footer {...props} />

      {/* 回顶按钮 */}
      <div className='fixed right-4 bottom-4 z-10'>
        <div
          title={locale.POST.TOP}
          className='cursor-pointer p-2 text-center'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className='fas fa-angle-up text-2xl' />
        </div>
      </div>
    </div>
  )
}

/**
 * 首页
 * @param {*} props
 * @returns 此主题首页就是列表
 */
const LayoutIndex = props => {
  return (
    <div className='bg-gradient-start shadow-box flex flex-col gap-4 overflow-hidden rounded-xl px-10 py-8 md:px-6 md:pt-6 md:pb-2'>
      <div className='text-sm font-semibold opacity-80'>文章列表</div>
      <LayoutPostList {...props} />
    </div>
  )
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { category, tag } = props

  return (
    <>
      {/* 显示分类 */}
      {category && (
        <div className='pb-12'>
          <i className='mr-1 fas fa-folder-open' />
          {category}
        </div>
      )}
      {/* 显示标签 */}
      {tag && <div className='pb-12'>#{tag}</div>}

      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : post && (
        <div>
          <PostMeta post={post} />
          <div id='article-wrapper'>
            <NotionPage post={post} />
            <ShareBar post={post} />
          </div>
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
        <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
            <div className='dark:text-gray-200'>
                <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
                <div className='inline-block text-left h-32 leading-10 items-center'>
                    <h2 className='m-0 p-0'>页面无法加载，即将返回首页</h2>
                </div>
            </div>
        </div>
    </>
}

/**
 * 搜索页
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  useEffect(() => {
    if (isBrowser) {
      // 高亮搜索到的结果
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }
    }
  }, [router])

  return (
    <>
      <div className='pb-12'>
        <SearchInput {...props} />
      </div>
      <LayoutPostList {...props} />
    </>
  )
}

/**
 * 归档列表
 * @param {*} props
 * @returns 按照日期将文章分组排序
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <div className='mb-10 pb-20 md:py-12 p-3  min-h-screen w-full'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogListArchive
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <>
      <div id='category-list' className='duration-200 flex flex-wrap'>
        {categoryOptions?.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
            <div
              className={
                'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
              }>
              <i className='mr-4 fas fa-folder' />
              {category.name}({category.count})
            </div>
          </SmartLink>
        ))}
      </div>
    </>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div id='tags-list' className='duration-200 flex flex-wrap'>
        {tagOptions.map(tag => (
          <div key={tag.name} className='p-2'>
            <SmartLink
              key={tag}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}>
              <div className='font-light dark:text-gray-400'>
                <i className='mr-1 fas fa-tag' />{' '}
                {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
              </div>
            </SmartLink>
          </div>
        ))}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
