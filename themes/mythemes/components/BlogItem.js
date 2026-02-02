import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 博客列表的单个卡片
 * @param {*} param0
 * @returns
 */
const BlogItem = ({ post, index = 0 }) => {
  const showPageCover =
    siteConfig('EXAMPLE_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  const coverOnLeft = index % 2 === 0

  return (
    <article className='group post-item-card shadow-card hover:shadow-card-darker transition-shadow duration-300 rounded-lg overflow-hidden bg-white/80 dark:bg-black/20 backdrop-blur replace mb-6'>
      <div
        className={`${showPageCover ? 'flex flex-col md:flex-row' : ''} ${showPageCover && !coverOnLeft ? 'md:flex-row-reverse' : ''}`}>
        <div className={`${showPageCover ? 'md:w-7/12 p-5' : 'p-5'}`}>
          <h2 className='mb-3'>
            <SmartLink
              href={post?.href}
              className='text-black dark:text-gray-100 text-xl md:text-2xl no-underline hover:underline'>
              {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
              {post?.title}
            </SmartLink>
          </h2>

          <div className='mb-3 text-xs text-gray-600 dark:text-gray-300 flex flex-wrap gap-x-2 gap-y-1 items-center'>
            <span>
              by{' '}
              <a href='#' className='text-gray-600 dark:text-gray-300'>
                {siteConfig('AUTHOR')}
              </a>
            </span>
            <span>on {post.date?.start_date || post.createdTime}</span>
            <TwikooCommentCount post={post} className='pl-1' />
            {post.category && (
              <SmartLink
                href={`/category/${post.category}`}
                className='text-gray-600 dark:text-gray-300 hover:underline'>
                {post.category}
              </SmartLink>
            )}
          </div>

          {!post.results && (
            <p className='line-clamp-3 text-gray-700 dark:text-gray-200/80 leading-relaxed'>
              {post.summary}
            </p>
          )}
          {post.results && (
            <p className='line-clamp-3 mt-3 text-gray-700 dark:text-gray-200/80 text-sm font-light leading-7'>
              {post.results.map((r, idx) => (
                <span key={idx}>{r}</span>
              ))}
            </p>
          )}
        </div>

        {showPageCover && (
          <div className='md:w-5/12 w-full h-56 md:h-auto overflow-hidden'>
            <SmartLink href={post?.href} passHref legacyBehavior>
              <a href={post?.href}>
                <LazyImage
                  src={post?.pageCoverThumbnail}
                  className='h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-2'
                  alt={post?.title}
                />
              </a>
            </SmartLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogItem
