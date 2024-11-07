import { Menu, MenuButton, MenuList, MenuItem, Box, IconButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HamburgerMenu: React.FC = () => {
	const { payload, signOut } = useContext(AuthContext);

	const buttonSingleOut = () => {
		signOut();
		window.location.href = '/';
	};

	return (
		<Box display={['flex', 'none', 'none', 'none']} zIndex={200} top={0} pos={'fixed'}>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HamburgerIcon color={'white'} />}
					bg={'#016234'}
					variant="outline"
					m={'10px'}
					boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
					border={'none'}
					_hover={{
						bg: '#00963f',
						fontWeight: 'bold',
					}}
					_active={{}}
				/>
				<MenuList bg={'#016234'}>
					<NavLink to={'/home'}>
						<MenuItem
							bg={'none'}
							_hover={{
								bg: '#00963f',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							Início
						</MenuItem>
					</NavLink>

					{payload?.tipo_usuario === 3 && (
						<NavLink to={'/dashboard'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#00963f',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Dashboard
							</MenuItem>
						</NavLink>
					)}

					{payload?.tipo_usuario === 3 && (
						<NavLink to={'/gerenciamento'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#00963f',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Gerenciamento
							</MenuItem>
						</NavLink>
					)}

					{payload?.tipo_usuario !== 1 && (
						<NavLink to={'/agendamentos'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#00963f',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Agendamentos
							</MenuItem>
						</NavLink>
					)}
					{payload?.tipo_usuario !== 1 && (
						<NavLink to={'/editar'}>
							<MenuItem
								bg={'none'}
								_hover={{
									bg: '#00963f',
									fontWeight: 'bold',
								}}
								color={'white'}
							>
								Editar Usuário
							</MenuItem>
						</NavLink>
					)}

					<NavLink to={''}>
						<MenuItem
							onClick={buttonSingleOut}
							bg={'none'}
							_hover={{
								bg: '#00963f',
								fontWeight: 'bold',
							}}
							color={'white'}
						>
							Sair
						</MenuItem>
					</NavLink>
				</MenuList>
			</Menu>
		</Box>
	);
};
