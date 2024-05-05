import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { useState } from 'react'
import { useAuth } from '../../contexts/authContext.jsx'
import Confirm from '../popups/Confirm.jsx'

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { state: { isLoggedIn, user, jwt }, logout, deleteAccount } = useAuth()

  const handleDelete = async () => {
    await deleteAccount(user.id, jwt)
    setShowConfirm(false)
  }

  return (
    <>
      {
      showConfirm && <Confirm message='Êtes-vous sûr(e) que vous voulez supprimer votre compte ?' onClickDelete={handleDelete} onClickQuit={() => setShowConfirm(false)} />
    }
      <Navbar className='py-4   bg-[#f7f9fb]/[0.5] backdrop-blur-md' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className='font-bold text-inherit text-xl'>Rtizan</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4 ' justify='center'>
          <NavbarItem>
            <Link href='/'>
              Accueil
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/artisans'>
              Artisans
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/about'>
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/services'>
              Services
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/contact'>
              Contact
            </Link>
          </NavbarItem>

        </NavbarContent>
        {
        isLoggedIn
          ? (
            <NavbarContent as='div' justify='end'>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='primary'
                    name='Jason Hughes'
                    size='lg'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>connecté avec</p>
                    <p className='font-semibold'>{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key='logout' color='warning' onPress={logout}>
                    Déconexion
                  </DropdownItem>
                  <DropdownItem href='/profile' color='primary'>
                    Profil
                  </DropdownItem>
                  <DropdownItem color='danger' onPress={() => { setShowConfirm(true) }}>
                    Supprimer mon compte
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
            )
          : (
            <NavbarContent justify='end'>

              <NavbarItem>
                <Button as={Link} color='primary' href='/authentication' variant='flat'>
                  Log In
                </Button>
              </NavbarItem>
            </NavbarContent>

            )
      }

        <NavbarMenu>
          <NavbarMenuItem>
            <Link Link href='/'>
              Accueil
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link Link href='/services'>
              Services
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link Link href='/about'>
              About
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link Link href='/artisans'>
              Artisans
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link Link href='/contact'>
              Contact
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default Header
