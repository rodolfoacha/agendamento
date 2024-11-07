import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  ISchedulingModel,
  ISchedulingResponse,
  Status,
} from '../interface/Schedulling';
import { format, isAfter, parseISO, isValid, compareAsc } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CardShowAgendamento: React.FC = () => {
  const { payload, getAllSchedullingCras, updateScheduling } =
    useContext(AuthContext);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMounted = useRef(true);
  const hoje = new Date();
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>(
    []
  );

  // Feature flag to control the visibility of the cancel button
  const showCancelButton = false; // Set to 'true' when you want to display the button

  const handleModalClose = () => {
    onClose();
    setShowConfirmar(false);
  };

  const getDataHoraAsDate = (data_hora: string | Date): Date => {
    return typeof data_hora === 'string' ? parseISO(data_hora) : data_hora;
  };

  const agendamentosFuturos = schedullingData
    .filter(agendamento => {
      if (
        (typeof agendamento.data_hora === 'string' &&
          agendamento.status === 2) ||
        agendamento.data_hora instanceof Date
      ) {
        const dataAgendamento =
          typeof agendamento.data_hora === 'string'
            ? parseISO(agendamento.data_hora)
            : agendamento.data_hora;

        return (
          isValid(dataAgendamento) &&
          agendamento.usuario_id === payload?.id &&
          isAfter(dataAgendamento, hoje)
        );
      }
      return false;
    })
    .sort((a, b) => {
      const dataA =
        typeof a.data_hora === 'string' ? parseISO(a.data_hora) : a.data_hora;
      const dataB =
        typeof b.data_hora === 'string' ? parseISO(b.data_hora) : b.data_hora;
      return compareAsc(dataA, dataB);
    });

  const primeiroAgendamento =
    agendamentosFuturos.length > 0 ? agendamentosFuturos[0] : null;
  const showAgendamento = agendamentosFuturos?.length > 0;

  const handleUpdateScheduling = async (
    id: number,
    usuario_id: string | undefined,
    newStatus: Status
  ) => {
    if (usuario_id) {
      try {
        await updateScheduling(id, usuario_id, {
          status: newStatus,
        });
        toast({
          title: 'Atendimento cancelado com sucesso',
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
    }
  };

  useEffect(() => {
    isMounted.current = true;
    const fetchSchedullingData = async () => {
      if (payload?.cras) {
        try {
          const response: ISchedulingResponse = await getAllSchedullingCras(
            payload?.cras
          );
          if (isMounted?.current) {
            setSchedullingData(response?.agendamentos);
          }
        } catch (error) {
          if (isMounted?.current) {
            console.error('Falha ao buscar dados', error);
          }
        }
      }
    };

    fetchSchedullingData();

    return () => {
      isMounted.current = false;
    };
  }, [payload?.cras, getAllSchedullingCras]);

  return (
    <Flex
      justifyContent={'center'}
      ml={['0%', '30%', '25%', '20%']}
      w={['100%', '70%', '75%', '80%']}
      textAlign={'center'}
    >
      {showAgendamento && (
        <Card
          alignItems={'center'}
          w={'80%'}
          boxShadow='2px 2px 5px hsla(0, 28%, 0%, 0.5)'
          bg={'#f4f4f4'}
        >
          <CardHeader>
            <Text fontWeight={'bold'} fontSize={['xl', 'xl', '2xl', '3xl']}>
              VOCÊ POSSUI UM AGENDAMENTO
            </Text>
          </CardHeader>
          <CardBody fontSize={'xl'} pt={0}>
            <Divider mb={2} />
            <Text>Próximo atendimento:</Text>
            <Text>
              dia{' '}
              <strong>
                {primeiroAgendamento &&
                  format(
                    getDataHoraAsDate(primeiroAgendamento.data_hora),
                    'dd/MM',
                    {
                      locale: ptBR,
                    }
                  )}
              </strong>{' '}
              às{' '}
              <strong>
                {primeiroAgendamento &&
                  format(
                    getDataHoraAsDate(primeiroAgendamento.data_hora),
                    "HH'h'",
                    {
                      locale: ptBR,
                    }
                  )}
              </strong>
            </Text>
            <Text>
              Caso deseje alterar seu agendamento, entre em contato com seu
              CRAS.
            </Text>

            {/* Conditionally render the Cancel Appointment button */}
            {showCancelButton && (
              <Button mt={4} colorScheme='red' onClick={onOpen}>
                Cancelar Agendamento
              </Button>
            )}
          </CardBody>
        </Card>
      )}

      {/* Conditionally render the Modal */}
      {showCancelButton && (
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          isCentered
          size={['xs', 'sm', 'md', 'lg']}
        >
          <ModalOverlay />
          <ModalContent
            minW={['90%', '27em', '30em', '48em']}
            textAlign={'center'}
          >
            <ModalHeader mt={5}>
              Deseja realmente cancelar seu atendimento?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Radio onChange={() => setShowConfirmar(true)}>
                Sim, desejo cancelar!
              </Radio>
            </ModalBody>
            <ModalFooter gap={2} justifyContent={'center'}>
              <Button onClick={handleModalClose} colorScheme='red'>
                Cancelar
              </Button>
              {showConfirmar && (
                <Button
                  onClick={() => {
                    handleModalClose();
                    handleUpdateScheduling(
                      primeiroAgendamento?.id as number,
                      primeiroAgendamento?.usuario_id,
                      Status.cancelado
                    );
                  }}
                  colorScheme='green'
                >
                  Confirmar
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default CardShowAgendamento;
