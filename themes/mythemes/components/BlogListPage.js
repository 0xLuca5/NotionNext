import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import BlogItem from './BlogItem'
import Divider from './Divider'
import Paginator from './Paginator'
/**
 * 使用分页插件的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListPage = props => {
  const { page = 1, posts, postCount } = props
  const { NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  )
  const currentPage = +page

  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    <div className='w-full mb-12'>
      <Divider>文章列表</Divider>
      <div id='posts-wrapper'>
        {posts?.map((post, index) => (
          <BlogItem key={post.id} post={post} index={index} />
        ))}
      </div>

      <Paginator 
        currentPage={currentPage}
        totalPage={totalPage}
        pagePrefix={pagePrefix}
      />
    </div>
  )
}
