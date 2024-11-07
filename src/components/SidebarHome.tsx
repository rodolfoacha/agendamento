import { Button, Stack, Box, Image, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const SidebarHome: React.FC = () => {
	const { payload, signOut } = useContext(AuthContext);

	const buttonSingleOut = () => {
		signOut();
		window.location.href = '/';
	};

	const sideBtnStyle = {
		textColor: 'white',
		fontSize: ['18', '18', '20', '22'],
		h: 'fit-content',
		p: ['10px 12px', '10px 12px', '10px 15px', '10px 15px'],
		borderRadius: '0',
		bgColor: '#ffffff50',
		w: '100%',
		justifyContent: 'left',
		_hover: {
			color: '#016234',
			bg: '#ebedf090',
		},
		_focus: {
			color: '#016234',
			bg: 'white',
		},
		_active: {
			color: '#016234',
			bg: 'white',
		},
	};

	return (
		<Box
			position={'fixed'}
			top={'0'}
			left={'0'}
			w={['0', '30vw', '25vw', '20vw']}
			h="100vh"
			borderRadius={['0 70px 0 0', '0 80px 0 0', '0 90px 0 0', '0 100px 0 0']}
			bgImage={
				'https://www.turismo.rj.gov.br/wp-content/uploads/2020/03/Rio-Para%C3%ADba-do-Sul-1.jpg'
			}
			bgSize={'cover'}
			bgPos={'20%'}
			display={['none', 'flex', 'flex', 'flex']}
		>
			<Stack
				p={['100px 0 30px', '100px 0 30px', '130px 0 35px', '150px 0 40px ']}
				justifyContent="space-between"
				background={'linear-gradient(41deg, 0.40,1.00,0.29) 0%, #016234 100%)'}
				// w="20%"
				h="100%"
				borderRadius={['0 70px 0 0', '0 80px 0 0', '0 90px 0 0', '0 100px 0 0']}
				alignItems="center"
				boxSize={'full'}
				bg="hsla(145, 100%, 29%, 0.80)" // transparente
			>
				<Stack p="0" w={'100%'}>
					<NavLink to={'/home'}>
						{({ isActive }) => (
							<Button isActive={isActive} sx={sideBtnStyle}>
								Início
							</Button>
						)}
					</NavLink>

					{/* {payload?.tipo_usuario === 3 && (
            <NavLink to='/dashboard'>
              {({ isActive }) => (
                <Button isActive={isActive} sx={sideBtnStyle}>
                  Dashboard
                </Button>
              )}
            </NavLink>
          )} */}

					{payload?.tipo_usuario === 3 && (
						<NavLink to="/gerenciamento">
							{({ isActive }) => (
								<Button isActive={isActive} sx={sideBtnStyle}>
									Gerenciamento
								</Button>
							)}
						</NavLink>
					)}

					{payload?.tipo_usuario !== 1 && (
						<NavLink to="/agendamentos">
							{({ isActive }) => (
								<Button isActive={isActive} sx={sideBtnStyle}>
									Agendamentos
								</Button>
							)}
						</NavLink>
					)}

					{payload?.tipo_usuario !== 1 && (
						<NavLink to="/editar">
							{({ isActive }) => (
								<Button isActive={isActive} sx={sideBtnStyle}>
									Editar Usuário
								</Button>
							)}
						</NavLink>
					)}
				</Stack>
				<Stack alignItems={'center'}>
					<Image
						boxSize={'100px'}
						objectFit="contain"
						src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Bras%C3%A3o_de_Campos_dos_Goytacazes.png"
						alt="Brasão de Campos dos Goytacazes"
					/>

					<Text fontSize={'16'} color={'white'} textAlign={'center'} maxW={'200px'}>
						Prefeitura Municipal de Campos dos Goytacazes
					</Text>

					<Image
						w={['175px', '200px', '225px', '250px']}
						objectFit="contain"
						src="https://social.campos.rj.gov.br/wp-content/uploads/2022/02/logo-1-1024x277.png"
						alt="Logotipo Secreataria Municipal de Desenvolvimento Humano e Social"
					/>
					<Box mt={['60px', 0, 0, 0]}>
						<Button
							border={'1px solid rgb(255 255 255 / .5)'}
							w={'65px'}
							textColor={'white'}
							bgColor="rgb(255, 0, 0, 0)"
							onClick={buttonSingleOut}
							_hover={{
								fontWeight: 'bold',
								bg: 'rgb(255,255,255, 0.2)',
								border: '1.5px solid rgb(255 255 255 )',
							}}
						>
							Sair
						</Button>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default SidebarHome;
