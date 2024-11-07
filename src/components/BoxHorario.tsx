import React from 'react';
import { Button } from '@chakra-ui/react';
import { format } from 'date-fns';
import { UseFormSetValue } from 'react-hook-form';
import { RegisterSchedullingModel } from '../types/auth-data';

interface Horario {
  hora: string;
  disponivel: boolean;
}

interface BoxHorarioProps {
  horario: Horario;
  selectedDate: Date | null;
  onHorarioSelect: (date: Date) => void;
  setValue: UseFormSetValue<RegisterSchedullingModel>;
}

const BoxHorario: React.FC<BoxHorarioProps> = ({
  horario,
  selectedDate,
  onHorarioSelect,
  setValue,
}) => {
  const handleOpenModal = () => {
    if (horario.disponivel && selectedDate) {
      const newDate = new Date(selectedDate);
      const [horas, minutos] = horario.hora.split(':').map(Number);
      newDate.setHours(horas);
      newDate.setMinutes(minutos);

      onHorarioSelect(newDate); // Chama a função para atualizar a data e abrir o modal no componente pai
      setValue('data_hora', format(newDate, 'yyyy-MM-dd HH:mm'));
    }
  };

  return (
    <Button
      bg={horario.disponivel ? '#016234' : 'red.500'}
      color='white'
      _hover={{
        bg: horario.disponivel ? '#00963f' : 'red.500',
        cursor: horario.disponivel ? 'pointer' : 'auto',
      }}
      onClick={handleOpenModal}
    >
      {horario.hora}
    </Button>
  );
};

export default BoxHorario;
