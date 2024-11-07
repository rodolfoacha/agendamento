import React, { useState, ChangeEvent } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  Link,
  Text,
  InputLeftElement,
  InputGroup,
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import SidebarLogin from '../components/SidebarLogin';
import { FooterLogin } from '../components/FooterLogin';
import { SignIn } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { loginSchema } from '../validation/auth';
import { useLocation } from 'react-router-dom';

export const Login: React.FC = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const isFuncionario = location.pathname === '/funcionario';

  const navigate = useNavigate();
  const [inputCpf, setInputCpf] = useState('');
  const [inputDataNascimento, setInputDataNascimento] = useState(''); // New state for unformatted date
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({ resolver: yupResolver(loginSchema) });

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    setInputDataNascimento(value); // Store the raw numbers in state for display
  };

  const handleLogin = async (data: SignIn) => {
    try {
      // Submit the raw date without formatting
      const dataToSubmit = {
        ...data,
        password: inputDataNascimento, // Use the unformatted date
      };
      await signIn(dataToSubmit);
      toast({
        title: 'Login realizado com sucesso!',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success',
      });
      navigate('/home');
    } catch (error) {
      toast({
        title: 'Erro ao realizar login',
        description: 'Dados incorretos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    setInputCpf(value.slice(0, 11));
    setValue('cpf', value.slice(0, 11));
  };

  const formatCpf = (cpf: string) => {
    if (cpf.length > 3) {
      cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
    }
    if (cpf.length > 7) {
      cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
    }
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11) + '-' + cpf.slice(11);
    }
    return cpf;
  };

  // Helper to format Date of Birth for display only
  const formatDataNascimento = (data: string) => {
    if (data.length > 2) {
      data = data.slice(0, 2) + '/' + data.slice(2);
    }
    if (data.length > 5) {
      data = data.slice(0, 5) + '/' + data.slice(5);
    }
    return data;
  };

  return (
    <Flex h='100vh' flex={['column', '', '', '']}>
      <SidebarLogin />
      <FooterLogin />
      <Stack
        pt={['60px', '0', '0', '0']}
        pb={['130px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
        // gap={['20px', '20px', '30px', '30px']}
        w={['60%', '60%', '60%', '80%']}
        alignItems='center'
      >
        <Box
          sx={boxStyle}
          maxW={['500px', '500px', '500px', '950px']}
          position={['relative', 'static', 'static', 'static']}
        >
          <Box
            fontSize={['20px', '25px', '30px', '30px']}
            fontWeight='bold'
            mb='10px'
            padding={0}
            alignItems={'center'}
          >
            ENTRAR
          </Box>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={!!errors.cpf}>
              <FormLabel htmlFor='cpf'>CPF</FormLabel>
              <InputGroup>
                <Input
                  id='cpf'
                  placeholder='CPF'
                  size='md'
                  value={formatCpf(inputCpf)}
                  onChange={handleCpfChange}
                  sx={{
                    fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                    bg: 'white',
                    borderRadius: '5px',
                    p: '4px 0',
                    mt: '0px',
                    mb: '0px',
                    paddingLeft: '16px',
                  }}
                  //   {...register('cpf')}
                  // value={inputValue} // Add this line to keep input synced with the state
                  // onChange={handleCpfChange}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.cpf && errors.cpf.message}
              </FormErrorMessage>
            </FormControl>

            <Box sx={textStyle2}></Box>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='dataNascimento'>Data de Nascimento</FormLabel>
              <Input
                {...register('password', {
                  // Use 'password' here to align with cadastro
                  onChange: handleDataNascimentoChange,
                })}
                id='dataNascimento'
                placeholder='DD/MM/AAAA'
                type='text'
                maxLength={10}
                size='md'
                sx={{
                  /* Chakra UI styling */
                  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                  bg: 'white',
                  borderRadius: '5px',
                  p: '4px 0',
                  mt: '0px',
                  mb: '0px',
                  paddingLeft: '16px',
                }}
                value={formatDataNascimento(inputDataNascimento)} // Format for display
                _placeholder={{ paddingLeft: 0 }}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Box sx={textStyle2}></Box>
            <Button
              type='submit'
              style={{ backgroundColor: '#016234' }}
              variant='solid'
              color={'white'}
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
            <Box sx={textStyle2}></Box>
          </form>

          <Box sx={textStyle3}>Não possui uma conta?</Box>
          <Link as={RouterLink} to='/cadastro' sx={textStyle4}>
            Criar minha conta
          </Link>
          <Box sx={textStyle3}></Box>
          {/* <Link as={RouterLink} to='/home' sx={textStyle4}>
            Esqueci minha senha
          </Link> */}
        </Box>
        <Link
          display={['inline', 'none', 'none', 'none']}
          href={isFuncionario ? '/' : '/funcionario'}
          fontSize={'xs'}
        >
          <Text as={'u'}>
            {isFuncionario ? 'Entrar como usuário' : 'Entrar como funcionário'}
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
};

const textStyle2 = {
  fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
  fontWeight: 'bold',
  mt: '10px',
  mb: '3px',
};

const textStyle3 = {
  fontSize: ['0.9rem', '0.9rem', '0.7rem'],
  borderRadius: '5px',
  p: '0px 0',
};

const textStyle4 = {
  fontSize: ['1 rem', '1rem', '1rem'],
  borderRadius: '2px',
  p: '2px 0',
  textDecoration: 'underline',
};

export const boxStyle = {
  // w: '30%',
  maxW: ['300px', '350px', '500px', '950px'],
  minW: '250px',
  boxShadow: '2px 2px 5px hsla(0, 28%, 0%, 0.5)',
  p: ['10px', '10px', '10px', '10px'],
  borderRadius: '25px',
  bg: '#F4F4F4',
  textAlign: 'center',
  alignContent: 'center',
};
export const btnStyle = {
  w: '30%',
  display: '-ms-grid',
  boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
  color: '#fff',
  bg: '#016234',
  maxW: '500px',
  minW: ['100px', '100px', '150px', '150px'],
  fontSize: ['0.8rem', '0.8rem', '0.9rem', '1rem'],
  _hover: {
    bg: '#00963f',
    fontWeight: 'bold',
  },
};
export default Login;
