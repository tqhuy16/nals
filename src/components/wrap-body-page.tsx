import React from 'react'

const WrapBodyPage = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => {
  return <div className="container">{props.children}</div>
}

export default WrapBodyPage
