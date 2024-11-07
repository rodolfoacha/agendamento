import React, { useState, ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RegisterUserModel } from '../types/auth-data';
import { useAuth } from '../hook/useAuth';
import { RegisterUserSchema } from '../validation/auth';
import { Cras, TipoUsuario } from '../interface/User';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchEmployeeData: () => void;
}

const ModalAddFuncionario: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  fetchEmployeeData,
}) => {
  const { registerUser } = useAuth();
  const toast = useToast();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserModel>({
    resolver: yupResolver(RegisterUserSchema),
    defaultValues: {
      tipo_usuario: TipoUsuario.admin,
      ativo: true,
      endereco: {
        bairro: 'Não se aplica',
        rua: 'Não se aplica',
        numero: 0,
      },
    },
  });

  const [inputDataNascimento, setInputDataNascimento] = useState('');
  const [inputCpf, setInputCpf] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const CrasEntries = Object.entries(Cras)
    .filter(([_, value]) => typeof value === 'number')
    .map(([key, value]) => [value, key] as [Cras, string]);

  const handleRegister = async (data: RegisterUserModel) => {
    try {
      await registerUser(data);
      toast({
        title: 'Usuário cadastrado com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success',
      });
      fetchEmployeeData();
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar usuário',
        description: (error as Error).message,
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

  const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    setInputDataNascimento(value.slice(0, 8));
    setValue('data_nascimento', value.slice(0, 8));
  };

  const formatDataNascimento = (data: string) => {
    if (data.length > 2) {
      data = data.slice(0, 2) + '/' + data.slice(2);
    }
    if (data.length > 5) {
      data = data.slice(0, 5) + '/' + data.slice(5);
    }
    return data;
  };

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);

    if (value.length > 2) {
      value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }

    setInputTelefone(value);
    setValue('telefone', value);
  };

  const handleCrasChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setValue('cras', value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader my={2} fontWeight={'bold'} textAlign={'center'}>
          ADICIONAR FUNCIONÁRIO
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor='name'>Nome completo</FormLabel>
              <InputGroup>
                <Input
                  id='name'
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
                  {...register('name')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.cpf} mt={4}>
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
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.cpf && errors.cpf.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                id='password'
                placeholder='Senha'
                value={senha}
                {...register('password', {
                  onChange: e => setSenha(e.target.value),
                })}
                maxLength={8}
              />
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.data_nascimento}>
              <FormLabel htmlFor='data-de-nascimento'>
                Data de nascimento
              </FormLabel>
              <InputGroup>
                <Input
                  id='data-de-nascimento'
                  placeholder='DD/MM/AAAA'
                  value={formatDataNascimento(inputDataNascimento)}
                  {...register('data_nascimento', {
                    onChange: handleDataNascimentoChange,
                  })}
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
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.data_nascimento && errors.data_nascimento.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.telefone}>
              <FormLabel htmlFor='telefone'>Celular</FormLabel>
              <InputGroup>
                <Input
                  id='telefone'
                  placeholder='(22) 98765-4321'
                  size='md'
                  value={inputTelefone}
                  onChange={handleTelefoneChange}
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
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.telefone && errors.telefone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <InputGroup>
                <Input
                  id='email'
                  placeholder='Email'
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
                  {...register('email')}
                  _placeholder={{ paddingLeft: 0 }}
                />
                <InputLeftElement pointerEvents='none' children={' '} />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.cras} mb={4}>
              <FormLabel htmlFor='cras'>Cras</FormLabel>
              <Select
                id='cras'
                onChange={handleCrasChange}
                value={watch('cras')}
              >
                {CrasEntries.map(([value, key]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                    {errors.cras && errors.cras.message} {' '}
              </FormErrorMessage>
            </FormControl>

            <input type='hidden' {...register('tipo_usuario')} />
            <input type='hidden' {...register('ativo')} />
            <input type='hidden' {...register('endereco.bairro')} />
            <input type='hidden' {...register('endereco.rua')} />
            <input type='hidden' {...register('endereco.numero')} />

            <ModalFooter mb={4}>
              <Flex justifyContent={'right'} gap={2}>
                <Button
                  minW={'110px'}
                  colorScheme='red'
                  variant='ghost'
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  minW={'110px'}
                  type='submit'
                  bg={'#016234'}
                  variant='solid'
                  isLoading={isSubmitting}
                  color={'white'}
                  _hover={{
                    bg: '#00963f',
                    fontWeight: 'bold',
                  }}
                >
                  Cadastrar
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddFuncionario;
