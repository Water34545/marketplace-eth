import React from "react";
import {ActiveLink} from "@components/ui/common";

const BreadcrumbItem = ({href, value, index}) => {
  return <li className={`${index === 0 ? 'pr-4' : 'px-4'} font-medium text-gray-500 hover:text-gray-900`}>
  <ActiveLink href={href}>
    <a>{value}</a>
  </ActiveLink>
</li>
}

const Breadcrumbs = ({items, isAdmin}) => {
  return <nav aria-label="breadcrumb">
    <ol className="flex leading-none text-gray-600 divide-x divide-gray-400">
      {items.map((item, i) => 
      <React.Fragment key={item.href}>
        {!item.requireAdmin && 
          <BreadcrumbItem href={item.href} value={item.value} index={i}/>
        }
        {item.requireAdmin && isAdmin &&
          <BreadcrumbItem href={item.href} value={item.value} index={i}/>
        }
      </React.Fragment>
      )}
    </ol>
  </nav>
}

export default Breadcrumbs;