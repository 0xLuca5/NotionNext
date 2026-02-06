import { useGlobal } from '@/lib/global'
import BlogItem from './BlogItem'
import Divider from './Divider'

export default function PostRecommend({ recommendPosts }) {
  const { locale } = useGlobal()

  if (!Array.isArray(recommendPosts) || recommendPosts.length === 0) {
    return null
  }

  return (
    <div className='mb-6'>
      <Divider>{'推荐文章'}</Divider>
      <div id='posts-wrapper' className='w-full'>
        {recommendPosts.map((post, index) => (
          <BlogItem
            key={post?.id || post?.href || index}
            post={post}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
