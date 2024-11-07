import 'react-datepicker/dist/react-datepicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';
import * as React from 'react';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Box, Flex, Text } from '@chakra-ui/react';
import { addDays } from 'date-fns';

registerLocale('pt-BR', ptBR);

const SelecionarDiaDashboard: React.FC = () => {
	const [startDate, setStartDate] = useState(new Date());
	const maxDate = addDays(new Date(), 30);

	return (
		<Flex
			flexDir={['column', 'column', 'row', 'row']}
			mt={'50px'}
			className="container__date"
			justifyContent={'center'}
			alignItems={'center'}
			gap={4}
			pl={['0%', '30%', '25%', '20%']}
			w="100%"
		>
			<Box>
				<Box className="selecionar__dia" textAlign="center">
					<Text
						alignSelf={'center'}
						fontWeight={'bold'}
						fontSize={['14px', '16px', '18px', '20px']}
						textAlign={'center'}
					>
						SELECIONE UM DIA
					</Text>
				</Box>
				<Box borderRadius={5} border={'1px solid #dbdbdb'} p={'7px'}>
					<DatePicker
						locale={'pt-BR'}
						isClearable
						filterDate={date => date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate}
						maxDate={new Date()}
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
					/>
				</Box>
			</Box>
		</Flex>
	);
};

export default SelecionarDiaDashboard;
