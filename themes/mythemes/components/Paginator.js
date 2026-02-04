import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 翻页组件 - 迁移自 astro-koharu
 * @param {*} props
 * @returns
 */
const Paginator = ({ currentPage, totalPage, pagePrefix }) => {
  const router = useRouter()

  // 生成页面链接的辅助函数
  const getPageUrl = (pageNum) => {
    if (pageNum === 1) {
      return {
        pathname: `${pagePrefix}/`,
        query: router.query.s ? { s: router.query.s } : {}
      }
    }
    return {
      pathname: `${pagePrefix}/page/${pageNum}`,
      query: router.query.s ? { s: router.query.s } : {}
    }
  }

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPage

  return (
    <div className='flex items-center justify-center gap-1 font-bold'>
      {/* 上一页按钮 */}
      {hasPrev ? (
        <SmartLink href={getPageUrl(currentPage - 1)} aria-label='上一页'>
          <button className='paginator-button'>
            <i className='fas fa-chevron-left' />
          </button>
        </SmartLink>
      ) : (
        <button className='paginator-button' disabled aria-label='上一页'>
          <i className='fas fa-chevron-left' />
        </button>
      )}

      {/* 第一页 */}
      {currentPage !== 1 && currentPage - 1 !== 1 && (
        <SmartLink href={getPageUrl(1)} aria-label='第 1 页'>
          <button className='paginator-button'>1</button>
        </SmartLink>
      )}

      {/* 省略号 */}
      {currentPage > 3 && <span className='mx-1'>...</span>}

      {/* 当前页的前一页 */}
      {currentPage !== 1 && (
        <SmartLink href={getPageUrl(currentPage - 1)} aria-label={`第 ${currentPage - 1} 页`}>
          <button className='paginator-button'>{currentPage - 1}</button>
        </SmartLink>
      )}

      {/* 当前页 */}
      <button
        className='paginator-button paginator-button-active'
        disabled
        aria-current='page'
        aria-label={`第 ${currentPage} 页，当前页`}>
        {currentPage}
      </button>

      {/* 当前页的后一页 */}
      {currentPage !== totalPage && (
        <SmartLink href={getPageUrl(currentPage + 1)} aria-label={`第 ${currentPage + 1} 页`}>
          <button className='paginator-button'>{currentPage + 1}</button>
        </SmartLink>
      )}

      {/* 省略号 */}
      {currentPage < totalPage - 2 && <span className='mx-1'>...</span>}

      {/* 最后一页 */}
      {currentPage !== totalPage && currentPage + 1 !== totalPage && (
        <SmartLink href={getPageUrl(totalPage)} aria-label={`第 ${totalPage} 页`}>
          <button className='paginator-button'>{totalPage}</button>
        </SmartLink>
      )}

      {/* 下一页按钮 */}
      {hasNext ? (
        <SmartLink href={getPageUrl(currentPage + 1)} aria-label='下一页'>
          <button className='paginator-button'>
            <i className='fas fa-chevron-right' />
          </button>
        </SmartLink>
      ) : (
        <button className='paginator-button' disabled aria-label='下一页'>
          <i className='fas fa-chevron-right' />
        </button>
      )}
    </div>
  )
}

export default Paginator
