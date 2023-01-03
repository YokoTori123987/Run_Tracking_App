import React, { Fragment } from 'react'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu as AntMenu } from 'antd'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import logo from './thairun.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavbarLayout = ({ children }) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()

  const navigationUser = [
    { name: 'Parks', href: '/parks', current: false },
  ]

  const navigationAdmin = [
    {
      label: (
        <Link to="/admin/parks" target="_blank" rel="noopener noreferrer">
          Park
        </Link>
      ),
      key: 'manu-1',
      // icon: <MailOutlined />,
    },
    {
      label: (
        <Link to="/admin/checkpoints" target="_blank" rel="noopener noreferrer">
          Checkpoints
        </Link>
      ),
      key: 'manu-2',
      // icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Link to="/admin/paths" target="_blank" rel="noopener noreferrer">
          Paths
        </Link>
      ),
      key: 'manu-3',
    },
    {
      label: (
        <Link to="/admin/users" target="_blank" rel="noopener noreferrer">
          Users
        </Link>
      ),
      key: 'menu-4',
    },
    {
      lable: 'sub menu',
      key: 'summenu',
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: (
            <Link to="/admin/logs" target="_blank" rel="noopener noreferrer">
              Logs
            </Link>
          ),
          key: 'summenu-2',
        },
        {
          label: (
            <Link to="/admin/laps" target="_blank" rel="noopener noreferrer">
              Laps
            </Link>
          ),
          key: 'summenu-3',
        },
        {
          label: (
            <Link to="/admin/runs" target="_blank" rel="noopener noreferrer">
              Runs
            </Link>
          ),
          key: 'summenu-4',
        },
        {
          label: (
            <Link
              to="/admin/path-checkpoints"
              target="_blank"
              rel="noopener noreferrer"
            >
              PathCheckpoints
            </Link>
          ),
          key: 'summenu-5',
        },
        {
          label: (
            <Link
              to="/admin/checkPath"
              target="_blank"
              rel="noopener noreferrer"
            >
              CheckPath
            </Link>
          ),
          key: 'summenu-5',
        },
      ],
    },
  ]

  const navigationGovernor = [
    { name: 'GovernorParks', href: '/governor', current: false },
  ]

  const navigationOwner = [
    { name: 'OwnerParks', href: '/owner', current: false },
  ]

  const userNavigation = [
    { name: 'My Statistic', href: '/statistic', state: false },
    { name: 'EditProfile', href: '/edit-profile', state: false },
    { name: 'Sign out', href: '#', state: true },
  ]
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={routes.home()}>
                        <img className="h-8 w-auto" src={logo} alt="Thairun" />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {isAuthenticated && (
                          <>
                            {currentUser.roles === 'admin' ? (
                              <>
                                <AntMenu
                                  className=""
                                  mode="horizontal"
                                  items={navigationAdmin}
                                />
                              </>
                            ) : (
                              <>
                                {currentUser.roles === 'user' ? (
                                  <>
                                    {navigationUser.map((item) => (
                                      <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                          item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        aria-current={
                                          item.current ? 'page' : undefined
                                        }
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {currentUser.roles === 'governor' ? (
                                      <>
                                        <h1>governor</h1>
                                        {navigationGovernor.map((item) => (
                                          <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                              item.bg
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                              'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={
                                              item.bg ? 'page' : undefined
                                            }
                                          >
                                            {item.name}
                                          </Link>
                                        ))}
                                      </>
                                    ) : (
                                      <>
                                        {navigationOwner.map((item) => (
                                          <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                              item.bg
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                              'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={
                                              item.bg ? 'page' : undefined
                                            }
                                          >
                                            {item.name}
                                          </Link>
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden text-gray-300 md:block">
                    <div className='flex items-center md:ml-6'>
                      <div className='ml-4 flex items-center md:ml-6'>
                        {isAuthenticated && (
                          <>
                            <span className='pr-2'>{currentUser.firstName}</span>
                            <span className='pr-2'>{currentUser.lastName}</span>
                          </>
                        )}
                      </div>
                      {isAuthenticated ? (
                        <div className="grid grid-rows-1">
                          <Menu
                            as="div"
                            className="relative ml-3 grid grid-cols-1"
                          >
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={currentUser.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        onClick={
                                          item.name === 'Sign out'
                                            ? logOut
                                            : undefined
                                        }
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      ) : (
                        <Link to={routes.login()}>Login</Link>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {isAuthenticated && (
                    <>
                      {currentUser.roles === 'admin' ? (
                        <>
                          {navigationAdmin.map((item) => (
                            <>
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'block px-3 py-2 rounded-md text-base font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </Disclosure.Button>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {currentUser.roles === 'user' ? (
                            <>
                              {navigationUser.map((item) => (
                                <Disclosure.Button
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                                >
                                  {item.name}
                                </Disclosure.Button>
                              ))}
                            </>
                          ) : (
                            <>
                              {currentUser.roles === 'governor' ? (
                                <>
                                  {navigationGovernor.map((item) => (
                                    <Disclosure.Button
                                      key={item.name}
                                      as="a"
                                      href={item.href}
                                      className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}
                                    >
                                      {item.name}
                                    </Disclosure.Button>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {navigationOwner.map((item) => (
                                    <Disclosure.Button
                                      key={item.name}
                                      as="a"
                                      href={item.href}
                                      className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}
                                    >
                                      {item.name}
                                    </Disclosure.Button>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                {isAuthenticated && (

                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={currentUser.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={
                          item.name === 'Sign out'
                            ? logOut
                            : undefined
                        }
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>

                )}

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <main>{children}</main>
    </>
  )
}

export default NavbarLayout
