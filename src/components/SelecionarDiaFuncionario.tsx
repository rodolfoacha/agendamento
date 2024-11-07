import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, getDay } from 'date-fns';
import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import {
  Button,
  Box,
  Flex,
  Text,
  Card,
  Heading,
  CardBody,
  Tag,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import {
  ISchedulingModel,
  ISchedulingResponse,
} from '../interface/Schedulling';

registerLocale('pt-BR', ptBR);

export enum Status {
  cancelado = 0,
  realizado,
  pendente,
  ausente,
}

const SelecionarDiaFuncionario: React.FC = () => {
  const btnStyle = {
    display: '-ms-grid',
    boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
    color: '#fff',
    bg: '#016234',
    minW: ['80px', '80px', '90px', '100px'],
    fontSize: ['0.8rem', '0.8rem', '0.9rem', '0.9rem'],
    _hover: {
      bg: '#00963f',
      fontWeight: 'bold',
    },
  };
  const maxDate = addDays(new Date(), 30);
  const isMounted = useRef(true);
  const toast = useToast();
  const { payload, updateScheduling, getAllSchedullingCras } =
    useContext(AuthContext);
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>(
    []
  );
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  // const [showAgendamento, setShowAgendamento] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const getSelectedDay = () => {
    if (getDay(selectedDate) === 6) {
      setSelectedDate(addDays(selectedDate, 2));
      console.log(typeof selectedDate);
      return;
    }
    if (getDay(selectedDate) === 0) {
      setSelectedDate(addDays(selectedDate, 1));
      return console.log(typeof selectedDate);
    }
  };
  getSelectedDay();

  useEffect(() => {
    isMounted.current = true;
    const fetchUserData = async () => {
      if (payload) {
        try {
          setLoading(true);
          const response: ISchedulingResponse = await getAllSchedullingCras(
            payload.cras
          );
          if (isMounted.current) {
            setSchedullingData(response.agendamentos);
          }
        } catch (error) {
          if (isMounted.current) {
            console.error('Failed to fetch data', error);
          }
        } finally {
          if (isMounted.current) {
            setLoading(false);
          }
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted.current = false;
    };
  }, [payload, getAllSchedullingCras, setSchedullingData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCardId !== null) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCardId]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.cancelado:
        return 'red';
      case Status.realizado:
        return 'green';
      case Status.pendente:
        return 'blue';
      case Status.ausente:
        return 'yellow';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const handleAtendimentoClick = (schedullingId: number) => {
    if (schedullingId === activeCardId) {
      setActiveCardId(null);
      setElapsedTime(0);
    } else {
      setActiveCardId(schedullingId);
      setElapsedTime(0);
    }
  };

  const handleUpdateScheduling = async (
    id: number,
    usuario_id: string,
    newStatus: Status,
    duracaoAtendimento: number
  ) => {
    try {
      await updateScheduling(id, usuario_id, {
        status: newStatus,
        duracao_atendimento: Math.floor(duracaoAtendimento / 60) || 0,
      });
      toast({
        title: 'Status atualizado com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
      variant: 'custom-success',
      });
      setSchedullingData(prevData =>
        prevData.map(agendamento =>
          agendamento.id === id
            ? {
                ...agendamento,
                status: newStatus,
                duracao_atendimento: duracaoAtendimento,
              }
            : agendamento
        )
      );
    } catch (error) {
      toast({
        title: 'Erro ao atualizar o status',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box
      //  w={'100vw'}
      w={['100vw', '70vw', '75vw', '80vw']}
      ml={['0%', '30vw', '25vw', '20vw']}
    >
      {/* {showAgendamento && (
				<Flex
					mt={6}
					w={'100%'}
					//  ml={['0%', '-30%', '-25%', '-20%']}
				>
					<SelecionarDia />
				</Flex>
			)} */}
      <Flex
        className='container__date'
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={'10px'}
        pt={6}
        flexDir={'column'}
      >
        <Flex
          flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
          gap={2}
          justifyContent={'center'}
          alignItems={'center'}
          w={'90%'}
        >
          <Box
            alignItems={'center'}
            w={'min-content'}
            borderRadius={5}
            border={'1px solid #999'}
            p={'1px'}
          >
            <DatePicker
              locale={'pt-BR'}
              dateFormat='dd/MMMM/yyyy'
              filterDate={date =>
                date.getDay() !== 0 && date.getDay() !== 6 && date <= maxDate
              }
              minDate={new Date()}
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              calendarContainer={({ className, children }) => (
                <Box
                  style={{
                    borderRadius: '10px',
                    padding: '16px',
                    background: '#016234',
                    color: '#fff',
                    boxShadow: '1px 1px 10px hsla(0, 28%, 0%, 0.4)',
                  }}
                >
                  <CalendarContainer className={className}>
                    <Text
                      textAlign={'center'}
                      style={{
                        background: '#016234',
                        padding: '4px',
                        color: 'white',
                      }}
                    >
                      Selecione um dia
                    </Text>
                    <Text style={{ position: 'relative' }}>{children}</Text>
                  </CalendarContainer>
                </Box>
              )}
            />
          </Box>
          {/* <Button
						onClick={() => setShowAgendamento(true)}
						sx={{
							display: '-ms-grid',
							boxShadow: '1px 1px 2px hsla(0, 28%, 0%, 0.7)',
							color: '#fff',
							bg: '#016234',
							minW: ['170px', '170px', '195px', '195px'],
							fontSize: ['0.8rem', '0.8rem', '0.9rem', '0.9rem'],
							_hover: {
								bg: '#00963f',
								fontWeight: 'bold',
							},
						}}
					>
						Agendar atendimento
					</Button> */}
        </Flex>

        {selectedDate && (
          <Box
            className='box__cinza'
            boxShadow='2px 2px 5px hsla(0, 28%, 0%, 0.5)'
            textAlign={'center'}
            p={[2, 3, 4, 4]}
            borderWidth='1px'
            display={selectedDate ? 'block' : 'none'}
            borderRadius='md'
            bg={'#F4F4F4'}
            h={'fit-content'}
            alignSelf={'center'}
            w={'90%'}
          >
            <Flex gap={'5px'} flexDirection={'column'}>
              <Box
                className='box__dia'
                alignItems={'center'}
                display={'flex'}
                p={2}
              >
                <Text
                  mr={'5px'}
                  fontWeight='bold'
                  fontSize={['12px', '12px', '15px', '15px']}
                >
                  DIA SELECIONADO:
                </Text>
                <Box
                  bg='#fff'
                  p={'5px'}
                  flex={1}
                  textAlign='center'
                  borderRadius='5px'
                >
                  <Text fontSize={['12px', '12px', '15px', '15px']}>
                    {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
                  </Text>
                </Box>
              </Box>
              <Box className='box__esquerda' flex={1}>
                <Text
                  fontSize={['12px', '12px', '15px', '15px']}
                  fontWeight='bold'
                >
                  HORÁRIOS AGENDADOS
                </Text>

                {schedullingData
                  .filter(schedulling => {
                    if (selectedDate) {
                      const dataAgendamento = new Date(schedulling.data_hora);
                      return (
                        dataAgendamento.toDateString() ===
                        selectedDate.toDateString()
                      );
                    }
                    return false;
                  })
                  .sort(
                    (a, b) =>
                      new Date(a.data_hora).getTime() -
                      new Date(b.data_hora).getTime()
                  )
                  .map(schedulling => {
                    return (
                      <Card key={schedulling.id} mt={1}>
                        <CardBody>
                          <Flex
                            minH={28}
                            justifyContent={'space-between'}
                            flexDir={['column', 'column', 'row', 'row']}
                          >
                            <Flex
                              justifyContent={[
                                'space-around',
                                'space-around',
                                '',
                                '',
                              ]}
                              gap={4}
                              alignItems={'center'}
                              flexDir={['column', 'column', 'row', 'row']}
                            >
                              <Avatar
                                borderRadius='full'
                                bg={'#016234'}
                                color={'white'}
                                boxSize='85px'
                                name={schedulling?.name}
                              />
                              <Flex
                                justifyContent={'center'}
                                alignItems={[
                                  'center',
                                  'center',
                                  'flex-start',
                                  'flex-start',
                                ]}
                                flexDir={'column'}
                              >
                                <Flex gap={2} alignItems={'center'}>
                                  <Heading size='lg'>
                                    {format(
                                      new Date(schedulling.data_hora),
                                      'HH:mm'
                                    )}
                                  </Heading>
                                  <Tag
                                    colorScheme={getStatusColor(
                                      schedulling.status
                                    )}
                                  >
                                    {Status[schedulling.status]}
                                  </Tag>
                                </Flex>
                                <Text textAlign={'left'} pt='2' fontSize='sm'>
                                  {schedulling?.name}
                                </Text>
                                <Text my='2' fontSize='sm'>
                                  <strong>
                                    {(() => {
                                      switch (schedulling.servico) {
                                        case 1:
                                          return 'Cadastramento';
                                        case 2:
                                          return 'Atualização Cadastral';
                                      }
                                    })()}
                                  </strong>
                                </Text>
                              </Flex>
                            </Flex>
                            <Flex
                              justifyContent={'center'}
                              gap={4}
                              alignItems={'center'}
                            >
                              {activeCardId === Number(schedulling.id) && (
                                <Text>
                                  Tempo Decorrido: <br />{' '}
                                  {formatTime(elapsedTime)}
                                </Text>
                              )}
                              {schedulling.status === 2 && (
                                <Flex
                                  gap={2}
                                  flexDir={['row', 'row', 'column', 'column']}
                                >
                                  <Button
                                    maxH={[6, 6, 7, 8]}
                                    sx={btnStyle}
                                    onClick={() => {
                                      handleAtendimentoClick(
                                        Number(schedulling.id)
                                      );
                                      if (
                                        activeCardId === Number(schedulling.id)
                                      ) {
                                        handleUpdateScheduling(
                                          schedulling.id as number,
                                          schedulling.usuario_id,
                                          Status.realizado,
                                          elapsedTime
                                        );
                                      }
                                    }}
                                    isDisabled={
                                      activeCardId !== null &&
                                      activeCardId !== Number(schedulling.id)
                                    }
                                  >
                                    {activeCardId === Number(schedulling.id)
                                      ? 'Encerrar'
                                      : 'Atender'}
                                  </Button>
                                  {activeCardId !== Number(schedulling.id) && (
                                    <Button
                                      maxH={[6, 6, 7, 8]}
                                      onClick={() =>
                                        handleUpdateScheduling(
                                          schedulling.id as number,
                                          schedulling.usuario_id,
                                          Status.ausente,
                                          elapsedTime
                                        )
                                      }
                                      boxShadow={
                                        '1px 1px 2px hsla(0, 28%, 0%, 0.7)'
                                      }
                                      minW={['80px', '80px', '90px', '100px']}
                                      fontSize={[
                                        '0.8rem',
                                        '0.8rem',
                                        '0.9rem',
                                        '0.9rem',
                                      ]}
                                      bg={'#c2bb00'}
                                      textColor={'white'}
                                      _hover={{
                                        bg: '#8a8600',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      Ausente
                                    </Button>
                                  )}
                                  {activeCardId !== Number(schedulling.id) &&
                                    payload?.tipo_usuario === 3 && (
                                      <Button
                                        onClick={() =>
                                          handleUpdateScheduling(
                                            schedulling.id as number,
                                            schedulling.usuario_id,
                                            Status.cancelado,
                                            elapsedTime
                                          )
                                        }
                                        maxH={[6, 6, 7, 8]}
                                        boxShadow={
                                          '1px 1px 2px hsla(0, 28%, 0%, 0.7)'
                                        }
                                        minW={['80px', '80px', '90px', '100px']}
                                        fontSize={[
                                          '0.8rem',
                                          '0.8rem',
                                          '0.9rem',
                                          '0.9rem',
                                        ]}
                                        bg={'#e53e3e'}
                                        textColor={'white'}
                                        _hover={{
                                          bg: '#c53030',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        Cancelar
                                      </Button>
                                    )}
                                </Flex>
                              )}
                            </Flex>
                          </Flex>
                        </CardBody>
                      </Card>
                    );
                  })}
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default SelecionarDiaFuncionario;
