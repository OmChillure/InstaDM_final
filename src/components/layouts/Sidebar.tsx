"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/actions/auth';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const {data, status} = useSession()
  
  const menuItems = [
    { name: 'Dashboard', icon: '/home.png', href: '/dashboard' },
    { name: 'Audience', icon: '/profile.png', href: '/dashboard/audiences' },
    { name: 'Sequence', icon: '/message.png', href: '/dashboard/sequence' },
    { name: 'Campaign', icon: '/rocket.png', href: '/dashboard/campaigns' },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white p-4 rounded-r-3xl shadow-[rgba(0,0,15,0.5)_10px_1px_4px_0px] mr-3">
      <div className="flex items-center mb-8 mt-4">
        <Image src={'/wave.png'} height={0} width={150} alt='logo'></Image>
      </div>

      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className={`flex items-center p-3 mb-2 rounded-lg hover:bg-purple-600`}>
              <Image src={item.icon} width={24} height={24} alt={item.name} className="mr-3" />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-auto mb-8">
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-800">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              src={data?.user?.image ?? '/default-image.png'} 
              alt="Image" 
              width={40} 
              height={40}
            />
          </div>
          <div>
            <div className="font-semibold">{data?.user?.name}</div>
            <div className="text-sm text-gray-400">{data?.user?.email}</div>
          </div>
        </div>
      </div>

      <div>
        <Link href="/dashboard/setting">
          <div className="flex items-center p-3 rounded-lg hover:bg-purple-600">
            <Image src="/setting.png" width={24} height={24} alt="Settings" className="mr-3" />
            <span>Settings</span>
          </div>
        </Link>
        <Link href={""}>
          <div className="flex items-center p-3 rounded-lg hover:bg-purple-600" onClick={logout}>
            <Image src="/logout.png" width={24} height={24} alt="Logout" className="mr-3" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;