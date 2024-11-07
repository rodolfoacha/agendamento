import {
  Box,
  Divider,
  Flex,
  // Image,
  Text,
} from '@chakra-ui/react';
export const FooterLogin: React.FC = () => {
  return (
    <Box
      as='footer'
      display={['', 'none', 'none', 'none']}
      bg='hsla(145, 100%, 29%, 0.80)'
      color='white'
      p={4}
      position='fixed'
      borderRadius='0 50px 0 0 '
      bottom={0}
      w='100%'
      zIndex={2}
    >
      <Flex
        px={4}
        justifyContent='space-between'
        alignItems='center'
        textAlign={'center'}
      >
        <Text fontSize={'20'}>
          Bem vindo(a) à <b>central</b> de <b>agendamento</b> do <b>CadÚnico</b>
        </Text>
        {/*
				<Divider
					mx={'10px'}
					orientation="vertical"
					borderLeftWidth="2px"
					borderLeftColor="white"
					borderRadius={'10'}
					h="80px" // Altura relativa ao container pai
					boxShadow="0px 2px 5px rgba(0, 0, 0, 0.3)"
				/>
				<Flex alignItems={'center'} gap={'5px'}>
					<Image
						boxSize={['75px', '75px', '100px', '100px']}
						objectFit="contain"
						src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Bras%C3%A3o_de_Campos_dos_Goytacazes.png"
						alt="Brasão de Campos dos Goytacazes"
					/>
					<Text
						//  ml={'5px'}
						fontSize={'16'}
					>
						Prefeitura Municipal de Campos dos Goytacazes
					</Text>
				</Flex>
					*/}
      </Flex>
    </Box>
  );
};
