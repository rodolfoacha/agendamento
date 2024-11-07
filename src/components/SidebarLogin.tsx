import { Text, Stack, Box, Image, Divider, Flex, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export const SidebarLogin: React.FC = () => {
  const location = useLocation();
  const isFuncionario = location.pathname === '/funcionario';
  return (
    <Box
      className='box'
      position={'fixed'}
      top={'0'}
      left={'0'}
      w={['40%', '45%', '50%', '50%']}
      h={['100vh']}
      borderRadius='0 100px 0 0 '
      bgImage={
        'https://www.turismo.rj.gov.br/wp-content/uploads/2020/03/Rio-Para%C3%ADba-do-Sul-1.jpg'
      }
      bgSize={'cover'}
      bgPos={'20%'}
      display={['none', 'flex', 'flex', 'flex']}
    >
      <Stack
        className='stack'
        // p={['100px 0 30px', '100px 0 30px', '130px 0 35px', '150px 0 40px ']}
        // justifyContent="space-between"
        px={['15px', '15px', '20px', '20px']}
        pt={['50px', '60px', '75px', '90px']}
        pb={10}
        // gap={'50px'}
        bg='hsla(145, 100%, 29%, 0.80)' // transparente
        // background={'linear-gradient(41deg, rgba(28,117,188,1) 0%, rgba(44,161,255,1) 100%)'}
        w='20%'
        h='100%'
        borderRadius='0 100px 0 0 '
        alignItems='center'
        justifyContent={'space-between'}
        boxSize={'full'}
      >
        <Box>
          <Text
            fontFamily={'Poppins, sans-serif'} // Fonte mais moderna e legível
            fontSize={['28px', '28px', '48px', '52px']}
            color={'white'}
            textAlign={'left'}
            w='fit-content'
            maxW={'350px'}
            textShadow='1px 1px 2px rgba(0, 0, 0, 0.5)' // Sombra sutil
          >
            Bem vindo(a) à <b>central</b> de <b>agendamento</b> do{' '}
            <b>CadÚnico</b>
          </Text>
        </Box>
        <Divider
          mt={-8} // Margem superior (opcional)
          borderColor='white'
          borderWidth='2px' // Espessura da linha
          borderRadius={'10'}
          width={['95%', '90%', '95%', '80%']} // Largura da linha (80% da largura do container pai)
          boxShadow='0px 2px 5px rgba(0, 0, 0, 0.3)' // Sombra
        />

        <Flex alignItems={'center'} flexDir={'column'} gap={6}>
          <Flex>
            <Image
              boxSize={['75px', '85px', '150px', '200px']}
              objectFit='contain'
              src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Bras%C3%A3o_de_Campos_dos_Goytacazes.png'
              alt='Brasão de Campos dos Goytacazes'
            />
            <Text
              textShadow='1px 1px 2px rgba(0, 0, 0, 0.5)'
              fontSize={['xl', '2xl', '3xl', '4xl']}
              color={'white'}
              textAlign={'left'}
              // textAlign={'center'}
              maxW={'250px'}
            >
              Prefeitura <br /> Municipal de <br /> Campos dos <br /> Goytacazes
            </Text>
          </Flex>
          <Image
            w={['200px', '250px', '300px', '350px']}
            objectFit='contain'
            src='https://social.campos.rj.gov.br/wp-content/uploads/2022/02/logo-1-1024x277.png'
            alt='Logotipo Secreataria Municipal de Desenvolvimento Humano e Social'
          />
        </Flex>
        {/* <Link
          href={isFuncionario ? '/' : '/funcionario'}
          fontSize={'xs'}
          color='white'
        >
          <Text as={'u'}>
            {isFuncionario ? 'Entrar como usuário' : 'Entrar como funcionário'}
          </Text>
        </Link> */}
      </Stack>
    </Box>
  );
};

export default SidebarLogin;
