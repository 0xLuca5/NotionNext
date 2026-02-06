import { useEffect, useMemo, useState } from 'react'
import SmartLink from '@/components/SmartLink'

export default function PostRandom({ posts, count = 10, excludePosts = [] }) {
  const excludeIds = useMemo(() => {
    if (!Array.isArray(excludePosts)) return new Set()
    return new Set(excludePosts.map(p => p?.id).filter(Boolean))
  }, [excludePosts])

  const candidates = useMemo(() => {
    if (!Array.isArray(posts)) return []
    const filtered = posts.filter(p => !excludeIds.has(p?.id))
    return filtered.length > 0 ? filtered : posts
  }, [posts, excludeIds])

  const [randomPosts, setRandomPosts] = useState([])

  useEffect(() => {
    if (!candidates || candidates.length === 0) {
      setRandomPosts([])
      return
    }

    const list = [...candidates]
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[list[i], list[j]] = [list[j], list[i]]
    }

    setRandomPosts(list.slice(0, count))
  }, [candidates, count])

  if (!Array.isArray(randomPosts) || randomPosts.length === 0) {
    return null
  }

  const leftPosts = randomPosts.slice(0, Math.ceil(count / 2))
  const rightPosts = randomPosts.slice(Math.ceil(count / 2), count)

  return (
    <div className='random-posts mb-6 flex flex-col gap-4'>
      <h2 className='font-semibold text-2xl text-foreground/80 transition-colors duration-300'>
        随机文章
      </h2>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-16'>
        <div className='flex flex-col gap-2'>
          {leftPosts.map((post, index) => (
            <SmartLink
              key={post?.id || post?.href || index}
              href={post?.href}
              className='group flex gap-3 rounded-md p-2 text-sm font-normal no-underline transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/10'
              style={{ fontWeight: 400 }}>
              <span className='shrink-0 font-mono text-foreground/30 transition-colors duration-300 group-hover:text-foreground/30'>
                {index + 1}
              </span>
              <div className='flex min-w-0 flex-col gap-0.5'>
                {post?.category && (
                  <div
                    className='truncate text-foreground/50 text-xs transition-colors duration-300'
                    style={{ fontWeight: 400 }}>
                    {post.category}
                  </div>
                )}
                <div
                  className='line-clamp-2 font-normal text-foreground/80 transition-colors duration-300 group-hover:text-primary'
                  style={{ fontWeight: 400 }}>
                  {post?.title}
                </div>
              </div>
            </SmartLink>
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          {rightPosts.map((post, index) => (
            <SmartLink
              key={post?.id || post?.href || `r-${index}`}
              href={post?.href}
              className='group flex gap-3 rounded-md p-2 text-sm font-normal no-underline transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/10'
              style={{ fontWeight: 400 }}>
              <span className='shrink-0 font-mono text-foreground/30 transition-colors duration-300 group-hover:text-foreground/30'>
                {index + leftPosts.length + 1}
              </span>
              <div className='flex min-w-0 flex-col gap-0.5'>
                {post?.category && (
                  <div
                    className='truncate text-foreground/50 text-xs transition-colors duration-300'
                    style={{ fontWeight: 400 }}>
                    {post.category}
                  </div>
                )}
                <div
                  className='line-clamp-2 font-normal text-foreground/80 transition-colors duration-300 group-hover:text-primary'
                  style={{ fontWeight: 400 }}>
                  {post?.title}
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  )
}
