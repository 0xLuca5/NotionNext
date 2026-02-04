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
          className={`post-cover block shrink-0 relative h-46.5 max-h-46.5 w-[calc(50%-2rem)] overflow-hidden rounded-lg ${
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
        className={`post-content flex flex-col gap-2 pt-4 pb-2 md:pb-4 md:pt-1 px-4 md:px-4 ${
          hasCover ? 'w-[calc(50%+2rem)]' : 'w-full'
        } ${hasCover ? (coverOnLeft ? 'order-2' : 'order-1') : ''}`}>
        
        {/* Category 和元数据在同一行 */}
        <div className='flex w-full justify-between items-center py-2'>
          {post.category && (
            <SmartLink
              href={`/category/${post.category}`}
              className='flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-500 transition-colors duration-300'>
              <i className='fas fa-flag' />
              {post.category}
            </SmartLink>
          )}

          <div className='text-muted-foreground flex items-center gap-4 text-xs ml-auto'>
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
              <span className='flex items-center gap-1 md:hidden'>
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
        {!post.results && post.summary && (
          <p className='text-muted-foreground line-clamp-3 h-15 text-sm md:h-auto md:max-h-15'>
            {post.summary}
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
            style={{
              display: 'flex',
              gap: '0.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              overflowX: 'auto',
              marginTop: 'auto',
              justifyContent: hasCover && !coverOnLeft ? 'flex-end' : 'flex-start',
              marginRight: hasCover && coverOnLeft ? '4.5rem' : '0',
              marginLeft: hasCover && !coverOnLeft ? '4.5rem' : '0'
            }}
            className='horizontal-scrollbar [--scrollbar-width:0.25rem]'>
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
          style={{
            position: 'absolute',
            bottom: '-0.25rem',
            ...(hasCover 
              ? (coverOnLeft ? { right: '-0.25rem', left: 'auto' } : { left: '-0.25rem', right: 'auto' })
              : { right: '-0.25rem', left: 'auto' }
            )
          }}
          className='post-more'>
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
