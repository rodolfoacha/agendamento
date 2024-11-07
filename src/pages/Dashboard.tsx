import React, { useEffect, useState, useContext } from 'react';
import {
  Flex,
  Divider,
  Tag,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import CrasPieChart, {
  PieChartData,
  CrasData,
} from '../components/CrasPieChart';
import { AuthContext } from '../context/AuthContext';
import { Cras } from '../interface/User';
import { ISchedulingModel } from '../interface/Schedulling';
import SidebarHome from '../components/SidebarHome';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { SearchIcon } from '@chakra-ui/icons';

export const Dashboard: React.FC = () => {
  const { getAllSchedulling, payload } = useContext(AuthContext);
  const [schedullingData, setSchedullingData] = useState<ISchedulingModel[]>(
    []
  );
  const [crasData, setCrasData] = useState<CrasData[]>([]);
  const [totalData, setTotalData] = useState<PieChartData[]>([
    { name: 'Agendamentos Pendentes', value: 0, color: '#016234' },
    { name: 'Atendimentos Realizados', value: 0, color: '#38A169' },
    { name: 'Ausentes', value: 0, color: '#FF5757' },
  ]);
  const [filterText, setFilterText] = useState(''); // Estado para o input

  const filteredCrasData = crasData.filter(cras =>
    cras.nome.toLowerCase().includes(filterText.toLowerCase())
  );
  const formatDuration = (durationStr: string | undefined): string => {
    if (!durationStr) {
      return 'Duração não disponível';
    }
    const duration = parseFloat(durationStr);
    if (isNaN(duration)) {
      return 'Duração não disponível';
    }
    const minutes = Math.floor(duration);
    const seconds = Math.floor((duration - minutes) * 60);
    if (seconds === 0) {
      return `${minutes} min `;
    }
    return `${minutes} min e ${seconds} seg`;
  };
  const getColorScheme = (averageDuration: string | undefined) => {
    if (averageDuration === undefined) {
      return;
    }
    switch (true) {
      case parseInt(averageDuration) < 30:
        return 'blue';
      case parseInt(averageDuration) >= 30 && parseInt(averageDuration) < 45:
        return 'yellow';
      case parseInt(averageDuration) >= 45 && parseInt(averageDuration) < 60:
        return 'red';
    }
  };

  useEffect(() => {
    const fetchSchedullingData = async () => {
      if (payload) {
        const response = await getAllSchedulling();
        setSchedullingData(response.agendamentos);
      }
    };

    fetchSchedullingData();
  }, [payload, getAllSchedulling]);

  useEffect(() => {
    const processCrasData = () => {
      const dataByCras: { [key: number]: PieChartData[] } = {};
      const totalDataTemp = [
        { name: 'Agendamentos Pendentes', value: 0, color: '#016234' },
        { name: 'Atendimentos Realizados', value: 0, color: '#38A169' },
        { name: 'Ausentes', value: 0, color: '#FF5757' },
      ];

      const durationByCras: { [key: number]: number[] } = {};

      schedullingData.forEach(agendamento => {
        if (!dataByCras[agendamento.cras]) {
          dataByCras[agendamento.cras] = [
            { name: 'Agendamentos Pendentes', value: 0, color: '#016234' },
            { name: 'Atendimentos Realizados', value: 0, color: '#38A169' },
            { name: 'Ausentes', value: 0, color: '#FF5757' },
          ];
        }

        if (!durationByCras[agendamento.cras]) {
          durationByCras[agendamento.cras] = [];
        }

        if (agendamento.duracao_atendimento != null) {
          durationByCras[agendamento.cras].push(
            agendamento.duracao_atendimento
          );
        }

        if (agendamento.status === 2) {
          dataByCras[agendamento.cras][0].value += 1; // Pendentes
          totalDataTemp[0].value += 1;
        }
        if (agendamento.status === 1) {
          dataByCras[agendamento.cras][1].value += 1; // Realizados
          totalDataTemp[1].value += 1;
        }
        if (agendamento.status === 3) {
          dataByCras[agendamento.cras][2].value += 1; // Ausentes
          totalDataTemp[2].value += 1;
        }
      });

      const processedData = Object.entries(dataByCras).map(([key, value]) => {
        const durations = durationByCras[Number(key)];
        const averageDuration =
          durations.length > 0
            ? durations.reduce((acc, curr) => acc + curr, 0) / durations.length
            : 0;

        return {
          nome: Cras[Number(key)],
          data: value,
          averageDuration: averageDuration.toFixed(2), // to 2 decimal places
        };
      });

      setCrasData(processedData);
      setTotalData(totalDataTemp);
    };

    processCrasData();
  }, [schedullingData]);

  return (
    <Flex h='100vh' flexDir={'column'}>
      <SidebarHome />
      <HamburgerMenu />
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        ml={['0%', '30%', '25%', '20%']}
        w={['100%', '70%', '75%', '80%']}
      >
        <InputGroup my={4} w={['50%', '55%', '40%', '30%']}>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Pesquisar CRAS'
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </InputGroup>
        <CrasPieChart
          crasData={[{ nome: 'Total', data: totalData }]}
          crasNome='Total'
        />
        <Divider
          boxShadow={'0px 1px 3px 0px #00000070'}
          w={'90%'}
          borderBottom={'1px solid  rgba(112, 112, 112, .5)'}
        />
        {filteredCrasData.map(cras => (
          <Flex
            w={'100%'}
            flexDir={'column'}
            alignItems={'center'}
            key={cras.nome}
          >
            <CrasPieChart crasData={[cras]} crasNome={cras.nome} />
            <Tag
              colorScheme={getColorScheme(cras.averageDuration)}
              mb={3}
              textAlign={'center'}
            >
              Duração Média: {formatDuration(cras.averageDuration)}
            </Tag>
            <Divider
              boxShadow={'0px 1px 3px 0px #00000070'}
              w={'90%'}
              borderBottom={'1px solid rgba(112, 112, 112, .5)'}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
