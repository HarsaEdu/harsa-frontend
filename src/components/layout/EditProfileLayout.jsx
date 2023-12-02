import React from 'react'
import EditProfileSidebar from '../Sidebar/EditProfileSidebar'

export default function EditProfileLayout(props) {
    const {children, className} = props
  return (
    <div>
        <div className="flex">
      {/* Sidebar */}
      <div className="w-80 h-screen overflow-auto text-white">
        <EditProfileSidebar />
      </div>

      {/* Content */}
      <div className={`${className} w-full px-8 py-4 mx-auto bg-white grow`}>
        {children}
      </div>
    </div>
    </div>
  )
}
