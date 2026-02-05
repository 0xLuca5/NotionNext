import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { countWords } from '@/lib/plugins/wordCount'
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
  const tags = Array.isArray(post?.tags) ? post.tags : []

  const postDescription = post?.summary || post?.description || ''
  const metaText = `${post?.title || ''} ${postDescription}`.trim()
  const estimated = metaText ? countWords(metaText) : { wordCount: 0, readTime: 0 }
  const wordCount = Number.isFinite(post?.wordCount)
    ? post.wordCount
    : estimated.wordCount
  const readTime = Number.isFinite(post?.readTime)
    ? post.readTime
    : estimated.readTime
  const dateText = post?.date?.start_date || post?.publishDay || post?.createdTime

  // showPageCover 是图片 URL，需要转换为布尔值
  const hasCover = !!showPageCover

  return (
    <article className='hover:shadow-card-darker group text-card-foreground shadow-card relative flex rounded-lg bg-white transition-shadow md:flex-col dark:bg-transparent post-item-card mb-4'>
      {showPageCover && (
        <SmartLink
          href={post?.href}
          className={`post-cover block shrink-0 relative h-46.5 max-h-46.5 md:h-56 md:max-h-56 w-[calc(50%-2rem)] overflow-hidden rounded-lg ${
            coverOnLeft ? 'clip-path-post-img-left order-1' : 'clip-path-post-img-right order-2'
          }`}>
          <LazyImage
            src={post?.pageCoverThumbnail}
            className='h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-3'
            alt={post?.title}
          />
        </SmartLink>
      )}

      <div
        className={`post-content flex flex-col gap-2 pt-3 pb-1 md:pb-4 md:pt-1 px-4 md:px-4 ${
          hasCover ? 'w-[calc(50%+2rem)]' : 'w-full'
        } ${hasCover ? (coverOnLeft ? 'order-2' : 'order-1') : ''}`}>
        
        {/* Category 和元数据在同一行 */}
        <div className='post-meta-row flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 py-1 md:py-2'>
          {post.category && (
            <SmartLink
              href={`/category/${post.category}`}
              className='flex min-w-0 max-w-[52%] items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300'>
              <i className='fas fa-flag' />
              <span className='min-w-0 truncate'>{post.category}</span>
            </SmartLink>
          )}

          <div className='post-meta flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs ml-auto text-gray-500 dark:text-gray-400'>
            {dateText && (
              <span className='flex items-center gap-1'>
                <i className='fas fa-calendar-alt' />
                {dateText}
              </span>
            )}
            {wordCount > 0 && (
              <span className='flex items-center gap-1'>
                <i className='fas fa-pen-nib' />
                {wordCount} 字
              </span>
            )}
            {readTime > 0 && (
              <span className='post-meta-readtime hidden md:flex items-center gap-1'>
                <i className='fas fa-clock' />
                {readTime} 分钟
              </span>
            )}
            <TwikooCommentCount post={post} className='pl-1' />
          </div>
        </div>

        {/* 标题 */}
        <div className='mt-1 flex flex-col space-y-1.5 p-0'>
          <div className='flex items-center gap-2'>
            <SmartLink href={post?.href} aria-label='post-link' className='min-w-0 flex-1'>
              <h1 className='text-primary hover:text-blue-500 line-clamp-1 truncate text-xl font-bold transition-colors duration-300'>
                {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
                {post?.title}
              </h1>
            </SmartLink>
          </div>
        </div>

        {/* 摘要 */}
        {!post.results && postDescription && (
          <p className='text-muted-foreground line-clamp-3 h-15 text-sm md:h-auto md:max-h-15'>
            {postDescription}
          </p>
        )}
        {post.results && (
          <p className='text-muted-foreground line-clamp-3 h-15 text-sm md:h-auto md:max-h-15'>
            {post.results.map((r, idx) => (
              <span key={idx}>{r}</span>
            ))}
          </p>
        )}

        {/* Tag 在底部，为 more 按钮留出空间 */}
        {tags.length > 0 && (
          <div
            className={`post-tags horizontal-scrollbar [--scrollbar-width:0.25rem] flex gap-2 pt-1 pb-1 overflow-auto mt-auto ${
              // mobile: left align and reserve space for the bottom-right more button
              'justify-start pr-16 md:pr-0'
            }${
              hasCover
                ? coverOnLeft
                  ? ' md:justify-start md:mr-16'
                  : ' md:justify-end md:ml-16'
                : ''
            }`}>
            {tags.map(t => (
              <SmartLink
                key={t}
                href={`/tag/${encodeURIComponent(t)}`}
                className='shrink-0 cursor-pointer gap-0.5 px-1 text-xs font-bold whitespace-nowrap transition-colors duration-300 flex items-center rounded bg-transparent text-[#c75b7c] hover:text-[#b34a6a] dark:text-[#f18bb3] dark:hover:text-[#ff9ec4]'>
                <i className='fas fa-tags text-[10px]' /> {t}
              </SmartLink>
            ))}
          </div>
        )}

        {/* More 按钮 - 绝对定位在角落 */}
        <SmartLink
          href={post?.href}
          className={`post-more absolute -bottom-1 ${
            hasCover
              ? coverOnLeft
                ? '-right-1'
                : '-left-1'
              : '-right-1'
          }`}>
          <div
            className={`bg-gradient-shoka-button rounded-2xl transition-all hover:translate-y-1 hover:scale-105 px-4 py-2 text-sm text-white font-medium ${
              hasCover
                ? coverOnLeft
                  ? 'rounded-se-none rounded-es-none hover:translate-x-1 md:rounded-ss-2xl md:rounded-se-none md:rounded-ee-2xl md:rounded-es-none md:hover:translate-x-1'
                  : 'rounded-ss-none rounded-ee-none hover:-translate-x-1 md:rounded-ss-2xl md:rounded-se-none md:rounded-ee-2xl md:rounded-es-none md:hover:translate-x-1'
                : 'rounded-se-none rounded-es-none hover:translate-x-1 md:rounded-ss-2xl md:rounded-se-none md:rounded-ee-2xl md:rounded-es-none md:hover:translate-x-1'
            }`}>
            more...
          </div>
        </SmartLink>
      </div>
    </article>
  )
}

export default BlogItem
