import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from 'react-router-dom'

const test = '>'

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: '/:category', breadcrumb: category },
    { path: '/', breadcrumb: 'Home' },
    { path: '/:category/:pid/:title', breadcrumb: title }
  ]
  const breadcrumb = useBreadcrumbs(routes)
  return (
    <div className="text-sm">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link className='hover:text-main' key={match.pathname} to={match.pathname}>
            <span className='capitalize'>{breadcrumb} </span>
            {index !== self.length - 1 && <span> {test} </span>}
          </Link>
        ))}
    </div>
  )
}

export default Breadcrumb
