import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Button,
  Flex,
  Heading,
  Table,
  Td,
  Th,
  Tr,
  useDisclosure,
  useToast,
  Select,
  Thead,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import ModalAddFuncionario from '../components/ModalAddFuncionario';
import SidebarHome from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import ConfirmationModal from '../components/ConfirmationModal';
import { TipoUsuario, Cras, IUserModel, IAllUsers } from '../interface/User';
import { AuthContext } from '../context/AuthContext';
import SelecionarDiaAdm from '../components/SelecionarDiaAdm';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Gerenciamento: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllUsers, payload, updateUser } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState<IUserModel[]>([]);
  const [employeeToDeleteIndex, setEmployeeToDeleteIndex] = useState<
    number | null
  >(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const [editingEmployee, setEditingEmployee] = useState<{
    index: number | null;
    data: IUserModel | null;
  }>({ index: null, data: null });
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const toast = useToast();

  const fetchEmployeeData = useCallback(async () => {
    if (payload) {
      try {
        const response: IAllUsers = await getAllUsers();
        const employees: IUserModel[] = (response.contas || []).filter(
          (user: IUserModel) => user.tipo_usuario === TipoUsuario.admin
        );
        setEmployeeData(employees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setEmployeeData([]);
      }
    }
  }, [payload, getAllUsers]);

  useEffect(() => {
    fetchEmployeeData();
  }, [payload, getAllUsers, fetchEmployeeData]);

  const handleEmployeeAction = async (
    employee: IUserModel,
    action: 'authorize' | 'delete'
  ) => {
    try {
      if (action === 'authorize') {
        await updateUser(employee.id!, { ativo: true });
        toast({
          title: 'Funcionário autorizado com sucesso',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          variant: 'custom-success',
        });
      } else if (action === 'delete') {
        if (employee.data_nascimento) {
          const password = employee.data_nascimento.replace(/\//g, '');
          await updateUser(employee.id!, {
            tipo_usuario: TipoUsuario.comum,
            password: password,
          });
          toast({
            title: 'Funcionário excluído com sucesso',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
            status: 'success',
            variant: 'custom-success',
          });
        } else {
          throw new Error(
            'Data de nascimento não disponível para criar a senha.'
          );
        }
      }
      fetchEmployeeData();
    } catch (error) {
      toast({
        title: `Erro ao ${
          action === 'authorize' ? 'autorizar' : 'excluir'
        } funcionário`,
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const confirmDelete = () => {
    if (employeeToDeleteIndex !== null) {
      setEmployeeData(prevEmployeeData =>
        prevEmployeeData.filter((_, i) => i !== employeeToDeleteIndex)
      );
      setEmployeeToDeleteIndex(null);
    }
    onConfirmationClose();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingEmployee(prev => ({
      ...prev,
      data: {
        ...prev.data!,
        [name]: Number(value),
      },
    }));
  };

  const saveEdit = async () => {
    if (editingEmployee.data) {
      try {
        await updateUser(editingEmployee.data.id!, editingEmployee.data);
        toast({
          title: 'Funcionário editado com sucesso',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          variant: 'custom-success',
        });
        setEditingEmployee({ index: null, data: null });
        fetchEmployeeData();
      } catch (error) {
        toast({
          title: 'Erro ao editar funcionário',
          description: (error as Error).message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Flex h='100vh' flexDir={'column'} pt={14}>
      <SidebarHome />
      <HamburgerMenu />
      <SelecionarDiaAdm />
      <Flex
        className='container__content'
        ml={['0vw', '30vw', '25vw', '20vw']}
        flexDir={'column'}
      >
        <Flex
          flexDir={['column', 'column', 'row', 'row']}
          gap={3}
          p={'0px 24px 20px 24px'}
          justifyContent='space-between'
          alignItems={'flex-start'}
        >
          <Heading size={['lg']} fontSize={['18', '20', '22', '24']}>
            Gerenciamento de Funcionários
          </Heading>
          <Button
            minW={'198px'}
            bg={'#016234'}
            color={'white'}
            _hover={{
              bg: '#00963f',
              fontWeight: 'bold',
            }}
            onClick={onOpen}
          >
            Adicionar Funcionário
          </Button>
        </Flex>
        <Flex overflow={'auto'}>
          <Table variant='striped' colorScheme='green'>
            <Thead>
              <Tr>
                <Th pr={2} fontSize={['12px', '12px', '14px', '16px']}>
                  Nome
                </Th>
                <Th px={2} fontSize={['12px', '12px', '14px', '16px']}>
                  CPF
                </Th>
                <Th px={2} fontSize={['12px', '12px', '14px', '16px']}>
                  CRAS
                </Th>
                {editingEmployee.index !== null && (
                  <Th fontSize={['12px', '12px', '14px', '16px']}>Senha</Th>
                )}
                <Th px={2} fontSize={['12px', '12px', '14px', '16px']}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            {/* <tbody>
							{employeeData && employeeData.length > 0 ? (
								employeeData.map((employee, index) => (
									<Tr h={'73px'} key={index}>
										<Td pr={2} fontSize={['12px', '12px', '14px', '16px']}>
											{employee.name}
										</Td>
										<Td px={2} fontSize={['12px', '12px', '14px', '16px']}>
											{employee.cpf
												.replace(/[^\d]/g, '')
												.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
										</Td>
										<Td px={2} fontSize={['12px', '12px', '14px', '16px']}>
											{editingEmployee.index === index ? (
												<Select
													ml={-2}
													size={'md'}
													name="cras"
													value={editingEmployee.data?.cras || ''}
													onChange={handleEditChange}
												>
													{Object.entries(Cras)
														.filter(([key]) => isNaN(Number(key)))
														.map(([key, value]) => (
															<option key={value} value={value}>
																{key}
															</option>
														))}
												</Select>
											) : (
												Cras[employee.cras]
											)}
										</Td>
										{editingEmployee.index === index && (
											<Td pl={2}>
												<InputGroup>
													<Input
														placeholder="Nova senha"
														type={showPassword ? 'text' : 'password'}
														onChange={e =>
															setEditingEmployee(prev => ({
																...prev,
																data: {
																	...prev.data!,
																	password: e.target.value,
																},
															}))
														}
													/>
													<InputRightElement width="4.5rem">
														<IconButton
															h="1.75rem"
															size="sm"
															onClick={handleTogglePassword}
															icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
															aria-label={showPassword ? 'Hide password' : 'Show password'}
														/>
													</InputRightElement>
												</InputGroup>
											</Td>
										)}
										<Td px={2}>
											<Flex
												gap={2}
												justifyContent={'flex-start'}
												flexDir={['column', 'column', 'column', 'row']}
											>
												{editingEmployee.index === index ? (
													<>
														<Button
															minW={'68px'}
															_hover={{ fontWeight: 'bold' }}
															size="sm"
															colorScheme="green"
															onClick={saveEdit}
														>
															Salvar
														</Button>
													</>
												) : (
													<Button
														minW={'68px'}
														size="sm"
														bg={'#016234'}
														color={'white'}
														_hover={{
															bg: '#00963f',
															fontWeight: 'bold',
														}}
														onClick={() => {
															setEditingEmployee({ index, data: employee });
														}}
													>
														Editar
													</Button>
												)}
												<Button
													minW={'68px'}
													size="sm"
													colorScheme="red"
													onClick={onConfirmationOpen}
													_hover={{ fontWeight: 'bold' }}
												>
													Excluir
												</Button>
												<ConfirmationModal
													isOpen={isConfirmationOpen}
													onClose={onConfirmationClose}
													onConfirm={() => {
														onConfirmationClose();
														handleEmployeeAction(employee, 'delete');
													}}
												/>
											</Flex>
										</Td>
									</Tr>
								))
							) : (
								<Tr>
									<Td colSpan={4}>Nenhum funcionário encontrado.</Td>
								</Tr>
							)}
						</tbody> */}
            <tbody>
              {employeeData && employeeData.length > 0 ? (
                employeeData.map((employee, index) => (
                  <Tr h={'73px'} key={index}>
                    <Td pr={2} fontSize={['12px', '12px', '14px', '16px']}>
                      {employee.name}
                    </Td>
                    <Td px={2} fontSize={['12px', '12px', '14px', '16px']}>
                      {employee.cpf
                        .replace(/[^\d]/g, '')
                        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                    </Td>
                    <Td px={2} fontSize={['12px', '12px', '14px', '16px']}>
                      {editingEmployee.index === index ? (
                        <Select
                          ml={-2}
                          size={'md'}
                          name='cras'
                          value={editingEmployee.data?.cras || ''}
                          onChange={handleEditChange}
                        >
                          {Object.entries(Cras)
                            .filter(([key]) => isNaN(Number(key)))
                            .map(([key, value]) => (
                              <option key={value} value={value}>
                                {key}
                              </option>
                            ))}
                        </Select>
                      ) : (
                        Cras[employee.cras]
                      )}
                    </Td>
                    {editingEmployee.index === index && (
                      <Td pl={2}>
                        <InputGroup>
                          <Input
                            placeholder='Nova senha'
                            type={showPassword ? 'text' : 'password'}
                            onChange={e =>
                              setEditingEmployee(prev => ({
                                ...prev,
                                data: {
                                  ...prev.data!,
                                  password: e.target.value,
                                },
                              }))
                            }
                          />
                          <InputRightElement width='4.5rem'>
                            <IconButton
                              h='1.75rem'
                              size='sm'
                              onClick={handleTogglePassword}
                              icon={
                                showPassword ? <ViewOffIcon /> : <ViewIcon />
                              }
                              aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                              }
                            />
                          </InputRightElement>
                        </InputGroup>
                      </Td>
                    )}
                    <Td px={2}>
                      <Flex
                        gap={2}
                        justifyContent={'flex-start'}
                        flexDir={['column', 'column', 'column', 'row']}
                      >
                        {editingEmployee.index === index ? (
                          <>
                            <Button
                              minW={'68px'}
                              _hover={{ fontWeight: 'bold' }}
                              size='sm'
                              colorScheme='green'
                              onClick={saveEdit}
                            >
                              Salvar
                            </Button>
                          </>
                        ) : editingEmployee.index === null ? (
                          <>
                            <Button
                              minW={'68px'}
                              size='sm'
                              bg={'#016234'}
                              color={'white'}
                              _hover={{
                                bg: '#00963f',
                                fontWeight: 'bold',
                              }}
                              onClick={() => {
                                setEditingEmployee({ index, data: employee });
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              minW={'68px'}
                              size='sm'
                              colorScheme='red'
                              onClick={onConfirmationOpen}
                              _hover={{ fontWeight: 'bold' }}
                            >
                              Excluir
                            </Button>
                          </>
                        ) : null}
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>Nenhum funcionário encontrado.</Td>
                </Tr>
              )}
            </tbody>
          </Table>
        </Flex>
        <ModalAddFuncionario
          isOpen={isOpen}
          onClose={onClose}
          fetchEmployeeData={fetchEmployeeData}
        />
      </Flex>
    </Flex>
  );
};

export default Gerenciamento;
