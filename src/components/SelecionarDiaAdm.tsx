import { useContext, useEffect, useState, useRef } from 'react';
import {
  Button,
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  useToast,
  Divider,
  Textarea,
} from '@chakra-ui/react';
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import { format, addDays, getDay, differenceInDays, isAfter } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import {
  ISchedulingModel,
  ISchedulingResponse,
} from '../interface/Schedulling';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import {
  BloqueioAgendamentoModel,
  RegisterSchedullingModel,
} from '../types/auth-data';
import { btnStyle } from '../pages/loginPage';
import { updateBlock } from 'typescript';
import { updateBlockRequest } from '../services/auth-request';

registerLocale('pt-BR', ptBR);

const SelecionarDiaAdm: React.FC = () => {
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [showCancelar, setShowCancelar] = useState(false);
  const [idBloqueio, setIdBloqueio] = useState<number | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(
    addDays(new Date(), 1)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    payload,
    getAllSchedullingCras,
    cpfData,
    registerBlock,
    updateBlock,
    getSchedullingBlock,
  } = useContext(AuthContext);
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [diasBloqueados, setDiasBloqueados] = useState<
    BloqueioAgendamentoModel[]
  >([]);
  const isMounted = useRef(true);
  const toast = useToast();
  const [motivo, setMotivo] = useState<string>('');
  const [periodoSelecionado, setPeriodoSelecionado] = useState<
    'manha' | 'tarde' | 'dia_inteiro' | null
  >(null);
  const [periodoReservado, setPeriodoReservado] = useState<
    'manha' | 'tarde' | 'dia_inteiro' | null
  >(null);
  const showBlueButtons = differenceInDays(selectedDate, new Date()) >= 15;

  const mapPeriodoToTipoBloqueio = (
    periodo: 'manha' | 'tarde' | 'dia_inteiro'
  ): 'matutino' | 'vespertino' | 'diario' => {
    switch (periodo) {
      case 'manha':
        return 'matutino';
      case 'tarde':
        return 'vespertino';
      case 'dia_inteiro':
        return 'diario';
      default:
        throw new Error('Período inválido');
    }
  };

  const handleOpen = (periodo: 'manha' | 'tarde' | 'dia_inteiro') => {
    const tipoBloqueio = mapPeriodoToTipoBloqueio(periodo);
    const reservaExistente = diasBloqueados.find(
      d =>
        new Date(d.data).toDateString() === selectedDate.toDateString() &&
        d.tipo_bloqueio === tipoBloqueio
    );

    if (reservaExistente) {
      setPeriodoReservado(periodo);
      if (reservaExistente.id !== undefined) {
        setIdBloqueio(Number(reservaExistente.id));
      }
      setShowCancelar(true);
    } else {
      setPeriodoSelecionado(periodo);
      onOpen();
    }
  };

  const blocksArray: Date[] = [];
  diasBloqueados
    .filter(d => d.cras === payload?.cras && d.ativo === true)
    .forEach(d => blocksArray.push(new Date(d.data)));

  const futureBlockDates = blocksArray
    .filter((date: Date) => isAfter(date, new Date()))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime());

  const closestDate = futureBlockDates.length > 0 ? futureBlockDates[0] : null;

  const getSelectedDay = () => {
    if (getDay(selectedDate) === 6) {
      setSelectedDate(addDays(selectedDate, 2));
      return;
    }
    if (getDay(selectedDate) === 0) {
      setSelectedDate(addDays(selectedDate, 1));
      return;
    }
  };
  getSelectedDay();

  useEffect(() => {
    const fetchBlockDays = async () => {
      try {
        const data = await getSchedullingBlock();
        setDiasBloqueados(data.contas);
      } catch (error) {
        console.error('Erro ao buscar dias bloqueados:', error);
      }
    };
    fetchBlockDays();
  }, [getSchedullingBlock]);

  const { setValue } = useForm<RegisterSchedullingModel>();

  const confirmarBloqueio = async () => {
    if (!periodoSelecionado || !selectedDate) return;

    const tipoBloqueio = mapPeriodoToTipoBloqueio(periodoSelecionado);

    if (payload) {
      const bloqueioData: BloqueioAgendamentoModel = {
        usuario_id: payload?.id,
        cras: payload?.cras,
        data: selectedDate,
        tipo_bloqueio: tipoBloqueio,
        motivo,
        ativo: true,
      };

      try {
        await registerBlock(bloqueioData);
        toast({
          title: 'Reserva realizada com sucesso',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          variant: 'custom-success',
        });
      } catch (error) {
        toast({
          title: 'Erro ao realizar reserva',
          description: (error as Error).message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  const cancelarBloqueio = async (
    id: number,
    usuario_id: string,
    updates: Partial<BloqueioAgendamentoModel>
  ) => {
    try {
      await updateBlockRequest(id, usuario_id, updates);
      toast({
        title: 'Reserva cancelada com sucesso',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        variant: 'custom-success',
      });
      setDiasBloqueados(prevData =>
        prevData.map(agendamento =>
          agendamento.ativo === true
            ? {
                ...agendamento,
                ativo: false,
              }
            : agendamento
        )
      );
    } catch (error) {
      toast({
        title: 'Erro ao cancelar o reserva',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    isMounted.current = true;
    const fetchSchedullingData = async () => {
      if (payload?.cras) {
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

    fetchSchedullingData();

    return () => {
      isMounted.current = false;
    };
  }, [payload?.cras, getAllSchedullingCras]);

  useEffect(() => {
    if (cpfData) {
      setValue('name', cpfData.name);
      setValue('cras', cpfData.cras);
      setValue('usuario_id', cpfData.id);
    }
  }, [cpfData, setValue]);

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex
      className='container__date'
      justifyContent={'center'}
      alignItems={'center'}
      gap={'10px'}
      pl={['0%', '30%', '25%', '20%']}
      w='100%'
      flexDir={'column'}
      mb={12}
    >
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
          w={'80%'}
        >
          <Text fontWeight={'bold'} fontSize={['2xl', '3xl', '4xl', '5xl']}>
            RESERVAR DIA
          </Text>
          <Divider mb={3} />
          <Flex gap={2} flexDirection={'column'}>
            <Box
              flexDir={['column', 'column', 'row', 'row']}
              mx={'auto'}
              className='box__dia'
              alignItems={'center'}
              display={'flex'}
              columnGap={2}
            >
              <Text
                fontWeight='bold'
                fontSize={['12px', '12px', '15px', '15px']}
              >
                DIA SELECIONADO:
              </Text>
              <Box
                alignItems={'center'}
                w={'min-content'}
                borderRadius={5}
                border={'1px solid #999'}
                p={'1px'}
              >
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  locale={'pt-BR'}
                  selected={selectedDate}
                  filterDate={date =>
                    date.getDay() !== 0 && date.getDay() !== 6
                  }
                  onChange={(date: Date) => setSelectedDate(date)}
                  minDate={addDays(new Date(), 1)}
                  className='customInput'
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
            </Box>
            <Flex flex={1} gap={1} justifyContent={'center'}>
              {selectedDate &&
                ['manha', 'tarde', 'dia_inteiro'].map(periodo => {
                  const tipoBloqueio = mapPeriodoToTipoBloqueio(
                    periodo as 'manha' | 'tarde' | 'dia_inteiro'
                  );
                  const reservaExistente = diasBloqueados.find(
                    d =>
                      new Date(d.data).toDateString() ===
                        selectedDate.toDateString() &&
                      d.tipo_bloqueio === tipoBloqueio &&
                      d.ativo === true
                  );
                  return (
                    <Button
                      key={periodo}
                      w={'max-content'}
                      colorScheme={
                        reservaExistente
                          ? 'red'
                          : showBlueButtons
                          ? 'blue'
                          : 'gray'
                      }
                      onClick={() => {
                        if (reservaExistente) {
                          setPeriodoReservado(
                            periodo as 'manha' | 'tarde' | 'dia_inteiro'
                          );
                          if (reservaExistente.id !== undefined) {
                            setIdBloqueio(Number(reservaExistente.id));
                          }
                          setShowCancelar(true);
                        } else if (showBlueButtons) {
                          handleOpen(
                            periodo as 'manha' | 'tarde' | 'dia_inteiro'
                          );
                        }
                      }}
                      isDisabled={!showBlueButtons && !reservaExistente}
                    >
                      {periodo.toUpperCase().replace('_', ' ')}
                    </Button>
                  );
                })}
            </Flex>
            <Flex flexDir={'column'} justifyContent={'center'}>
              <Text>O próximo dia reservado desse CRAS é:</Text>
              <Text fontSize={['xl', '2xl', '3xl', '4xl']}>
                <strong>
                  {closestDate
                    ? format(closestDate, 'dd/MM/yy')
                    : 'Nenhuma reserva futura'}
                </strong>
              </Text>
            </Flex>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                setShowConfirmar(false);
                setMotivo('');
              }}
              isCentered
              size={['xs', 'sm', 'md', 'lg']}
            >
              <ModalOverlay />
              <ModalContent
                minW={['90%', '27em', '30em', '48em']}
                textAlign={'center'}
              >
                <ModalHeader mt={5}>TEM CERTEZA DISSO?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    {periodoSelecionado === 'manha' &&
                      `Ao confirmar, todos os atendimentos marcados para a manhã do dia ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} serão cancelados. ⚠`}
                    {periodoSelecionado === 'tarde' &&
                      `Ao confirmar, todos os atendimentos marcados para a tarde do dia ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} serão cancelados. ⚠`}
                    {periodoSelecionado === 'dia_inteiro' &&
                      `Ao confirmar, todos os atendimentos marcados para o dia ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} serão cancelados. ⚠`}
                  </Text>
                  <Radio
                    mt={4}
                    onChange={() => {
                      setShowConfirmar(true);
                    }}
                  >
                    Tenho certeza!
                  </Radio>
                </ModalBody>
                <ModalFooter justifyContent={'center'}>
                  <Flex gap={4} flexDir={'column'}>
                    {showConfirmar && (
                      <Textarea
                        placeholder='Qual o motivo?'
                        minH='unset'
                        overflow='hidden'
                        w='100%'
                        h={'100px'}
                        value={motivo}
                        onChange={e => setMotivo(e.target.value)}
                      />
                    )}
                    <Flex
                      justifyContent={'center'}
                      minW={['250px', '300px', '400px', '400px']}
                    >
                      <Button
                        minW={['100px', '100px', '150px', '150px']}
                        boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
                        fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
                        colorScheme='red'
                        variant='solid'
                        mr={3}
                        onClick={() => {
                          onClose();
                          setShowConfirmar(false);
                        }}
                      >
                        Cancelar
                      </Button>
                      {showConfirmar && (
                        <Button
                          onClick={() => {
                            confirmarBloqueio();
                            onClose();
                            setMotivo('');
                            setShowConfirmar(false);
                          }}
                          sx={btnStyle}
                          type='submit'
                        >
                          Confirmar
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal
              isOpen={showCancelar}
              onClose={() => {
                setShowCancelar(false);
                setMotivo('');
                setShowConfirmar(false);
              }}
              isCentered
              size={['xs', 'sm', 'md', 'lg']}
            >
              <ModalOverlay />
              <ModalContent
                minW={['90%', '27em', '30em', '48em']}
                textAlign={'center'}
              >
                <ModalHeader mt={5}>CANCELAR RESERVA?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    {periodoReservado === 'manha' &&
                      `Ao confirmar, a reserva para a manhã do dia ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} será cancelada.`}
                    {periodoReservado === 'tarde' &&
                      `Ao confirmar, a reserva para a tarde do dia ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} será cancelada.`}
                    {periodoReservado === 'dia_inteiro' &&
                      `Ao confirmar, a reserva para o dia inteiro de ${format(
                        selectedDate,
                        'dd/MM/yy'
                      )} será cancelada.`}
                  </Text>
                  <Radio
                    mt={4}
                    onChange={() => {
                      setShowConfirmar(true);
                    }}
                  >
                    Tenho certeza!
                  </Radio>
                </ModalBody>
                <ModalFooter justifyContent={'center'}>
                  <Flex gap={4} flexDir={'column'}>
                    <Flex
                      justifyContent={'center'}
                      minW={['250px', '300px', '400px', '400px']}
                    >
                      <Button
                        minW={['100px', '100px', '150px', '150px']}
                        boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
                        fontSize={['0.8rem', '0.8rem', '0.9rem', '1rem']}
                        colorScheme='red'
                        variant='solid'
                        mr={3}
                        onClick={() => {
                          setShowCancelar(false);
                          setShowConfirmar(false);
                        }}
                      >
                        Cancelar
                      </Button>
                      {showConfirmar && payload?.id && idBloqueio && (
                        <Button
                          onClick={() => {
                            cancelarBloqueio(idBloqueio, payload.id, {
                              ativo: false,
                            });
                            setShowCancelar(false);
                            setMotivo('');
                            setShowConfirmar(false);
                          }}
                          sx={btnStyle}
                          type='submit'
                        >
                          Confirmar
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default SelecionarDiaAdm;
