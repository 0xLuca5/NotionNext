/**
 * 分割线组件
 * @param {*} props
 * @returns
 */
const Divider = ({ children, className = '' }) => {
  return (
    <div className={`my-4 flex items-center ${className}`}>
      <span className='h-px grow bg-foreground/40' />
      {children ? (
        <h1 className='mx-4 font-bold text-2xl text-foreground/60 tracking-widest'>
          {children}
        </h1>
      ) : null}
      <span className='h-px grow bg-foreground/50' />
    </div>
  )
}

export default Divider
