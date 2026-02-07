import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
    const onHashChange = () => {
      const hash = window?.location?.hash
      const id = hash ? hash.replace(/^#/, '') : null
      if (id) {
        setActiveSection(id)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  // 目录自动滚动
  const tRef = useRef(null)
  const tocIdsRef = useRef([])
  const manualActiveRef = useRef(null)
  const manualLockUntilRef = useRef(0)

  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  const throttleMs = 200
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      // 点击目录触发的平滑滚动过程中，短暂锁定高亮，避免被 scrollSpy 覆盖到上一节
      if (Date.now() < manualLockUntilRef.current && manualActiveRef.current) {
        const locked = manualActiveRef.current
        setActiveSection(prev => (prev === locked ? prev : locked))
        const index = tocIdsRef.current.indexOf(locked) || 0
        tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
        return
      }

      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = null
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) currentSectionId = section.getAttribute('data-id')
        const bbox = section.getBoundingClientRect()
        const offset = 120
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        // No need to continue loop, if last element has been detected
        break
      }
      if (!currentSectionId) return
      setActiveSection(prev => {
        if (prev === currentSectionId) return prev
        return currentSectionId
      })
      const index = tocIdsRef.current.indexOf(currentSectionId) || 0
      tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }, throttleMs)
  )

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return <></>
  }

  const isPostVariant = variant === 'post'

  const { tocGroups, parentIdById } = useMemo(() => {
    const groups = []
    const parentMap = new Map()
    if (!Array.isArray(toc) || toc.length === 0) {
      return { tocGroups: groups, parentIdById: parentMap }
    }

    let currentGroup = null
    for (const item of toc) {
      const level = Number.isFinite(item?.indentLevel) ? item.indentLevel : 0
      if (level <= 0 || !currentGroup) {
        currentGroup = { parent: item, children: [] }
        groups.push(currentGroup)
      } else {
        currentGroup.children.push(item)
      }
    }

    for (const group of groups) {
      const parentId = uuidToId(group.parent.id)
      parentMap.set(parentId, parentId)
      for (const child of group.children) {
        parentMap.set(uuidToId(child.id), parentId)
      }
    }

    return { tocGroups: groups, parentIdById: parentMap }
  }, [toc])

  const [expandedParents, setExpandedParents] = useState(() => new Set())

  useEffect(() => {
    if (!isPostVariant) return
    if (!activeSection) return
    const parentId = parentIdById.get(activeSection)
    if (!parentId) return
    setExpandedParents(prev => {
      if (prev.has(parentId)) return prev
      const next = new Set(prev)
      next.add(parentId)
      return next
    })
  }, [activeSection, isPostVariant, parentIdById])

  const toggleParent = useCallback(parentId => {
    setExpandedParents(prev => {
      const next = new Set(prev)
      if (next.has(parentId)) {
        next.delete(parentId)
      } else {
        next.add(parentId)
      }
      return next
    })
  }, [])

  const onTocNavigate = useCallback(
    (id, parentId) => {
      if (id) {
        setActiveSection(id)
        setTimeout(() => {
          setActiveSection(id)
        }, 0)
        manualActiveRef.current = id
        manualLockUntilRef.current = Date.now() + 1200
      }
      if (isPostVariant && parentId) {
        setExpandedParents(prev => {
          if (prev.has(parentId)) return prev
          const next = new Set(prev)
          next.add(parentId)
          return next
        })
      }
    },
    [isPostVariant]
  )

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
          {(() => {
            const ids = []

            if (!isPostVariant) {
              const nodes = toc.map(tocItem => {
                const id = uuidToId(tocItem.id)
                ids.push(id)
                const isActive = activeSection === id
                const levelClass = `catalog-item-level-${tocItem.indentLevel || 0}`
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`notion-table-of-contents-item duration-300 transform font-light
              notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `}>
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: tocItem.indentLevel * 16
                      }}
                      className={`truncate ${
                        isActive ? ' font-bold text-primary underline' : ''
                      }`}>
                      {tocItem.text}
                    </span>
                  </a>
                )
              })

              tocIdsRef.current = ids
              return nodes
            }

            const nodes = []
            tocGroups.forEach(group => {
              const parent = group.parent
              const parentId = uuidToId(parent.id)
              const hasChildren = group.children.length > 0
              const expanded = expandedParents.has(parentId)
              const isActiveParent = activeSection === parentId

              ids.push(parentId)

              nodes.push(
                <div key={parentId}>
                  <div className='flex items-center gap-1'>
                    {hasChildren && (
                      <button
                        type='button'
                        onClick={() => toggleParent(parentId)}
                        className='shrink-0 rounded px-1 py-1 text-gray-800/70 hover:bg-black/5 dark:text-gray-200/70 dark:hover:bg-white/10'
                        aria-label={expanded ? 'collapse' : 'expand'}>
                        <i
                          className={`fas fa-chevron-right text-xs transition-transform ${
                            expanded ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                    )}

                    <a
                      href={`#${parentId}`}
                      onClick={() => onTocNavigate(parentId, parentId)}
                      className={`catalog-item catalog-item-level-${
                        parent.indentLevel || 0
                      } block flex-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                        isActiveParent
                          ? 'text-primary font-medium'
                          : 'text-gray-800/80 dark:text-gray-200/80'
                      }`}>
                      <span className='truncate'>{parent.text}</span>
                    </a>
                  </div>

                  {hasChildren && expanded && (
                    <div className='mt-1'>
                      {group.children.map(child => {
                        const childId = uuidToId(child.id)
                        ids.push(childId)
                        const isActive = activeSection === childId
                        const levelClass = `catalog-item-level-${
                          child.indentLevel || 1
                        }`
                        return (
                          <a
                            key={childId}
                            href={`#${childId}`}
                            onClick={() => onTocNavigate(childId, parentId)}
                            className={`catalog-item ${levelClass} block rounded-md px-2 py-1 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                              isActive
                                ? 'text-primary font-medium'
                                : 'text-gray-800/80 dark:text-gray-200/80'
                            }`}>
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: (child.indentLevel || 1) * 16
                              }}
                              className='truncate'>
                              {child.text}
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })

            tocIdsRef.current = ids
            return nodes
          })()}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
