import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 目录导航组件
 * @param toc
 * @returns {JSX.Element}
 * @constructor
 */
const Catalog = ({ toc, variant }) => {
  // 监听滚动事件
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [])

  // 目录自动滚动
  const tRef = useRef(null)
  const tocIds = []

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      setActiveSection(currentSectionId)
      const index = tocIds.indexOf(currentSectionId) || 0
      tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }, throttleMs)
  )

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return <></>
  }

  const isPostVariant = variant === 'post'

  return (
    <div className={isPostVariant ? '' : 'px-3'}>
      <div
        className={
          isPostVariant
            ? 'post-toc-scroll overflow-y-auto max-h-[60vh] overscroll-none scroll-hidden'
            : 'overflow-y-auto max-h-96 overscroll-none scroll-hidden'
        }
        ref={tRef}>
        <nav
          className={
            isPostVariant
              ? 'post-toc-nav h-full text-gray-800 dark:text-gray-200'
              : 'h-full  text-black dark:text-gray-300'
          }>
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            tocIds.push(id)
            const isActive = activeSection === id
            const levelClass = `catalog-item-level-${tocItem.indentLevel || 0}`
            return (
              <a
                key={id}
                href={`#${id}`}
                className={
                  isPostVariant
                    ? `catalog-item ${levelClass} block rounded-md px-2 py-1 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                        isActive ? 'text-primary font-medium' : 'text-gray-800/80 dark:text-gray-200/80'
                      }`
                    : `notion-table-of-contents-item duration-300 transform font-light
              notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `
                }>
                {isPostVariant ? (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: tocItem.indentLevel * 16
                    }}
                    className='truncate'>
                    {tocItem.text}
                  </span>
                ) : (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: tocItem.indentLevel * 16
                    }}
                    className={`truncate ${
                      activeSection === id ? ' font-bold text-red-400 underline' : ''
                    }`}>
                    {tocItem.text}
                  </span>
                )}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
