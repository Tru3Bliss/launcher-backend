import { faArrowUpRightFromSquare, faFolderTree, faGears, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import PrimaryButton, { SideButton } from '../button'

const SideBar = () => {
  return (
    <div className='bg-gray-800 rounded-r-lg h-screen w-300 flex flex-col px-4 pt-6 drop-shadow-[0_5px_6px_rgba(0,0,0,0.5)] mr-6 flex-shrink-0'>
      <img src="assets/image/logo_brand.png" alt='brand' className='w-2/3 mx-auto' />
      <div className='w-full flex flex-col mt-10 flex-1 gap-4'>
        <SideButton target="/channel" icon={faFolderTree}>Channel</SideButton>
        <SideButton target="/users" icon={faUser}>Users</SideButton>
        <SideButton target="/setting" icon={faGears}>Setting</SideButton>
      </div>
      <div className='flex flex-col'>
        <button className='rounded-md lg:rounded-[16px] flex justify-center gap-2 cursor-pointer items-center bg-gradient-to-r 
    to-app-from-app-yellow bg-[length:200%_100%] hover:bg-[center_right_1rem] hover:scale-[1.02] 
    active:scale-[0.98] transition-all duration-700 ease-out text-[18px]
    text-center font-bold drop-shadow-[0_5px_6px_rgba(0,0,0,0.5)] 
    from-app-blue-dark via-app-blue to-app-blue-dark text-white lg:text-xl leading-[22px] lg:leading-[28px] py-2 mb-8'>
          <p>
            Log Out
          </p>
        </button>
      </div>
    </div>
  )
}

export default SideBar