import { Flex, Input, Box, InputGroup, Button, Select } from '@chakra-ui/react';
import React, { ChangeEvent, useState, useMemo } from 'react';
import { HamburgerMenu } from '../components/HamburgerMenu';
import SidebarHome from '../components/SidebarHome';

export const Adm: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const cras = useMemo(
    () => [
      'CODIN',
      'CUSTODÓPOLIS',
      'JARDIM CARIOCA',
      'PARQUE GUARUS',
      'TRAVESSÃO',
      'GOITACAZES',
      'FAROL',
      'JOCKEY',
      'MATADOURO',
      'PENHA',
      'MORRO DO COCO',
      'ESPLANADA',
      'CHATUBA',
      'URURAÍ',
    ],
    []
  );

  const [selectedBairro, setSelectedBairro] = useState('');

  const handleBairroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBairro(e.target.value);
  };
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Define o tipo do parâmetro
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);

    if (value.length > 3) {
      value = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + '.' + value.slice(7);
    }
    if (value.length > 11) {
      value = value.slice(0, 11) + '-' + value.slice(11);
    }

    setInputValue(value);
  };

  return (
    <Flex h='100vh'>
      <SidebarHome />
      <HamburgerMenu />
      <Box
        alignItems={'center'}
        justifyContent={'center'}
        pl={['0%', '30%', '25%', '20%']}
        w={'100%'}
        display={'flex'}
        flexDir='column'
        gap={3}
      >
        {activeComponent === 'gerenciarConta' ? (
          <InputGroup
            w={['80%', '60%', '50%', '40%']}
            flexDir={'column'}
            gap={3}
          >
            <Box display={'flex'}>
              <Input
                placeholder='Nome completo'
                size='md'
                sx={{
                  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                  bg: 'white',
                  borderRadius: '5px',
                  p: '4px 0',
                  mt: '0px',
                  mb: '0px',
                  paddingLeft: '16px',
                }}
                _placeholder={{ paddingLeft: 0 }}
              />
              <Button
                sx={btnStyle}
                onClick={() => handleButtonClick('gerenciarCras')}
              >
                Pesquisar
              </Button>
            </Box>
            <Box display={'flex'}>
              <Input
                value={inputValue}
                placeholder='CPF'
                onChange={handleCpfChange}
                size='md'
                sx={{
                  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                  bg: 'white',
                  borderRadius: '5px',
                  p: '4px 0',
                  mt: '0px',
                  mb: '0px',
                  paddingLeft: '16px',
                }}
                _placeholder={{ paddingLeft: 0 }}
              />
              <Button
                sx={btnStyle}
                onClick={() => handleButtonClick('gerenciarCras')}
              >
                Pesquisar
              </Button>
            </Box>
          </InputGroup>
        ) : (
          <Button
            sx={btnStyle}
            onClick={() => handleButtonClick('gerenciarConta')}
          >
            Gerenciar conta
          </Button>
        )}

        {activeComponent === 'gerenciarCras' ? (
          <Box display={'flex'}>
            <Select
              w={['80%', '60%', '50%', '40%']}
              placeholder='Selecionar CRAS'
              variant='outline'
              value={selectedBairro}
              onChange={handleBairroChange}
            >
              {cras.map((bairro, index) => (
                <option key={index} value={bairro}>
                  {bairro}
                </option>
              ))}
            </Select>
            <Button
              sx={btnStyle}
              onClick={() => handleButtonClick('gerenciarCras')}
            >
              Confirmar
            </Button>
          </Box>
        ) : (
          <Button
            sx={btnStyle}
            onClick={() => handleButtonClick('gerenciarCras')}
          >
            Gerenciar CRAS
          </Button>
        )}
      </Box>
    </Flex>
  );
};

// const textStyle1 = {
// 	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
// 	bg: 'white',
// 	borderRadius: '5px',
// 	p: '8px 0',
// };

// const textStyle2 = {
// 	fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
// 	fontWeight: 'bold',
// 	mt: '10px',
// 	mb: '3px',
// };

export const boxStyle = {
  w: '60%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['20px', '20px', '30px', '40px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  p: '0',
  w: ['30%', '40%', '40%', '40%'],
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#016234',
  maxW: '950px',
  px: '10px',
  minW: [22, 24, 26, 28],
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#00963f',
    fontWeight: 'bold',
  },
};
export default Adm;
