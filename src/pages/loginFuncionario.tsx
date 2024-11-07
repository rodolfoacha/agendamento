import React, { useState, ChangeEvent } from 'react';
import {
  Flex,
  Stack,
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  FormErrorMessage,
  Text,
  FormControl,
  InputRightElement, // Import InputRightElement for the toggle
  IconButton, // Import IconButton for the eye icon
  FormLabel,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Eye icons
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SidebarLoginFuncionario from '../components/SidebarLoginFuncionario';
import { FooterLoginFuncionario } from '../components/FooterLoginFuncionario';
import { SignIn } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { loginSchema } from '../validation/auth';
import { useLocation } from 'react-router-dom';

export const LoginFuncionario: React.FC = () => {
  const location = useLocation();
  const isFuncionario = location.pathname === '/funcionario';

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [inputCpf, setInputCpf] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const toast = useToast();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({ resolver: yupResolver(loginSchema) });

  const handleLogin = async (data: SignIn) => {
    try {
      await signIn(data);
      navigate('/home');
      toast({
        title: 'Login realizado com sucesso!',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success', // Use the custom variant
      });
    } catch (error) {
      toast({
        title: 'Erro ao realizar login',
        description: 'Dados incorretos.',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        variant: 'custom-error', // Use the custom error variant
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

  return (
    <Flex h='100vh' flex={['column', '', '', '']}>
      <SidebarLoginFuncionario />
      <FooterLoginFuncionario />
      <Stack
        pt={['60px', '0', '0', '0']}
        pb={['130px', '0', '0', '0']}
        m='auto'
        paddingLeft={['0', '45%', '50%', '50%']}
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

            <FormControl isInvalid={!!errors.password} sx={{ my: 2 }}>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <InputGroup size='md'>
                <Input
                  {...register('password')}
                  id='password'
                  placeholder='Senha'
                  type={showPassword ? 'text' : 'password'}
                  sx={{
                    fontSize: ['0.7rem', '0.8rem', '0.9rem', '1rem'],
                    bg: 'white',
                    borderRadius: '5px',
                    p: 1, // Use a numerical value for consistent padding
                    mt: 0,
                    mb: 0,
                    paddingLeft: '16px',
                  }}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputRightElement width='4.5rem'>
                  <IconButton
                    h='1.75rem'
                    size='sm'
                    onClick={handleTogglePassword}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    } // Add this line
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Box sx={textStyle2}></Box>
            <Button
              type='submit'
              style={{ backgroundColor: '#1c75bc' }}
              variant='solid'
              isLoading={isSubmitting}
              color={'white'}
              mt={2}
            >
              Entrar
            </Button>
            <Box sx={textStyle2}></Box>
          </form>
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
  fontSize: ['0.6rem', '0.6rem', '0.7rem'],
  borderRadius: '5px',
  p: '0px 0',
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

export default LoginFuncionario;
