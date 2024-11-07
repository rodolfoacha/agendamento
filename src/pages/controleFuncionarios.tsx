import { Flex } from '@chakra-ui/react';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SelecionarDiaFuncionario from '../components/SelecionarDiaFuncionario';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SidebarHome from '../components/SidebarHome';

const Agendamentos: React.FC = () => {
	return (
		<Flex className="flex" h="100vh" w="100%">
			<SidebarHome />
			<HamburgerMenu />
			<SelecionarDiaFuncionario />
		</Flex>
	);
};

export default Agendamentos;
