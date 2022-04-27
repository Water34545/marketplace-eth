const Button = ({
  children,
  className,
  hoverable = true,
  variant = 'purple',
  ...rest
}) => {
  const variants = {
    purple: `text-white bg-indigo-600 ${hoverable && 'hover:bg-indigo-700'}`,
    green: `text-white bg-green-600 ${hoverable && 'hover:bg-green-700'}`,
    red: `text-white bg-red-600 ${hoverable && 'hover:bg-red-700'}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${hoverable && 'hover:bg-indigo-200'}`,
    white: `text-indigo-700 bg-white`,
  }
  return <button 
  {...rest}
  className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 p-2 rounded border text-base font-medium ${className} ${variants[variant]}`}>
  {children}
</button>
}

export default Button;