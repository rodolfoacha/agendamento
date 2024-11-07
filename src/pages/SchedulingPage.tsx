import { Flex } from '@chakra-ui/react';
import React from 'react';
import { SidebarHome } from '../components/SidebarHome';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SelecionarDia from '../components/SelecionarDia';

const SchedulingPage: React.FC = () => {
	return (
		<>
			<SidebarHome />
			<HamburgerMenu />
			<Flex className="flex" h="100vh" pt={['60px', '0', '0', '0']}>
				<SelecionarDia />
			</Flex>
		</>
	);
};

export default SchedulingPage;
