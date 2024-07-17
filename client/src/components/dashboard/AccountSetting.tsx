import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import UsernameSetting from './UsernameSetting';
import PasswordSetting from './PasswordSetting';

export default function DefaultSidebar() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleItemClick = (component, event) => {
    event.preventDefault(); // Prevent the default behavior (scrolling to the top)
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="">
        <h1 className="text-3xl mb-[10px] font-medium">Account Settings</h1>
      </div>
      <div className="flex">
        <Sidebar className="w-1/3" aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiOutlineUser}
                onClick={(e) => handleItemClick('username', e)}
              >
                <p>Change Username</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiOutlineLockClosed}
                label="Pro"
                labelColor="dark"
                onClick={(e) => handleItemClick('password', e)}
              >
                <p>Change Password</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="w-2/3 p-4">
          {activeComponent === 'username' && <UsernameSetting />}
          {activeComponent === 'password' && <PasswordSetting />}
        </div>
      </div>
    </div>
  );
}
