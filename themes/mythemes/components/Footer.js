import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import DarkModeButton from '@/components/DarkModeButton'
import BLOG from '@/blog.config'

export const Footer = props => {
  const { allPages, postCount, siteInfo } = props

  const posts = Array.isArray(allPages)
    ? allPages.filter(p => p?.type === 'Post' && p?.status === 'Published')
    : []

  const totalWords = posts.reduce((sum, p) => {
    const w = Number.isFinite(p?.wordCount) ? p.wordCount : 0
    return sum + w
  }, 0)

  const totalReadTime = posts.reduce((sum, p) => {
    const t = Number.isFinite(p?.readTime) ? p.readTime : 0
    return sum + t
  }, 0)

  const formattedWords =
    totalWords >= 10000
      ? `${(totalWords / 10000).toFixed(1)}w`
      : `${totalWords}`

  const formattedTime =
    totalReadTime >= 60
      ? `${Math.round(totalReadTime / 60)}h`
      : `${Math.round(totalReadTime)}m`

  const currentYear = new Date().getFullYear()
  const startYear = BLOG.SINCE ? Number(BLOG.SINCE) : currentYear

  return (
    <footer className='mt-auto pb-6'>
      <div className='mx-auto flex flex-col items-center gap-3 px-6 md:pb-10 md:px-3 max-w-7xl'>
     
        <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm md:gap-4'>
          <button
            className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
            title='站点总字数'>
            <i className='fas fa-file-alt' />
            <span className='font-medium'>{formattedWords}</span>
            <span className='text-xs'>字</span>
          </button>

          <div className='bg-muted-foreground/30 h-4 w-px'></div>

          <button
            className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
            title='站点阅读时长'>
            <i className='fas fa-clock' />
            <span className='font-medium'>{formattedTime}</span>
          </button>

          <div className='bg-muted-foreground/30 h-4 w-px'></div>

          <button
            className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
            title='文章总数'>
            <i className='fas fa-pen-nib' />
            <span className='font-medium'>{postCount || posts.length}</span>
            <span className='text-xs'>篇</span>
          </button>
        </div>

        <div className='text-muted-foreground flex items-center gap-0.5 text-sm'>
          <span className='opacity-75'>©</span>
          <span className='font-medium opacity-75'>{startYear}</span>
          {startYear !== currentYear && (
            <>
              <span className='opacity-50'>-</span>
              <span className='font-medium opacity-75'>{currentYear}</span>
            </>
          )}
          <span className='mx-1 opacity-75'>·</span>
          <span className='author font-medium opacity-75'>
            {siteInfo?.title || BLOG.AUTHOR}
          </span>
        </div>

        <div className='text-muted-foreground/80 flex items-center gap-2 text-xs'>
          <span className='opacity-75'>Powered by theme</span>
          <a
            href='https://github.com/tangly1024/NotionNext'
            target='_blank'
            rel='noreferrer'
            className='footer-link font-medium transition-all duration-300'>
            NotionNext
          </a>
          <span className='opacity-50'>·</span>
          <span className='opacity-75'>Inspired by</span>
          <a
            href='https://github.com/cosZone/astro-koharu'
            target='_blank'
            rel='noreferrer'
            className='footer-link font-medium transition-all duration-300'>
            astro-koharu
          </a>
        </div>

        <div className='text-center text-xs'>
          <div className='flex flex-wrap justify-center'>
            <BeiAnSite />
            <BeiAnGongAn />
          </div>
        </div>
      </div>
    </footer>
  )
}
