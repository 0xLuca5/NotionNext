import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * 公告模块
 * 其实就是一篇文章
 * @param {*} param0
 * @returns
 */
const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (!post || Object.keys(post).length === 0) {
    return <></>
  }

  const href = post?.href || (post?.slug ? `/post/${post.slug}` : null)
  return (
    <aside className='rounded shadow overflow-hidden mb-6'>
      <h3 className='text-sm bg-gray-100 text-gray-700 dark:bg-hexo-black-gray dark:text-gray-200 py-3 px-4 dark:border-hexo-black-gray border-b'>
        <i className='mr-2 fas fa-bullhorn' />
        {locale.COMMON.ANNOUNCEMENT}
      </h3>

      {post?.title && href && (
        <div className='border-b border-black/10 bg-white px-4 py-3 text-sm text-gray-900 dark:border-white/10 dark:bg-hexo-black-gray dark:text-gray-100'>
          <SmartLink
            href={href}
            className='line-clamp-1 font-medium text-gray-900 no-underline transition-colors hover:text-primary dark:text-gray-100'>
            {post.title}
          </SmartLink>
        </div>
      )}

      {post && (
        <div id='announcement-content'>
          <NotionPage post={post} className='text-center' />
        </div>
      )}
    </aside>
  )
}
export default Announcement
