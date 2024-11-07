import React, { useState } from 'react';
import { Flex, Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface CrasData {
  nome: string;
  data: PieChartData[];
  averageDuration?: string;
}

interface CrasPieChartProps {
  crasData: CrasData[];
  crasNome?: string;
}

const CrasPieChart: React.FC<CrasPieChartProps> = ({ crasData, crasNome }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <Box p={2} bg='gray.100' borderRadius='md'>
          <Text fontWeight='bold'>{name}:</Text>
          <Text>{value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Flex m={4} mt='20px' flexDir={'column'} alignItems={'center'}>
      <Text fontWeight='bold' fontSize='xl' mb={2}>
        {crasNome || 'VisÃ£o Geral'}
      </Text>
      <Flex>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(1, 1fr)' }} gap={3}>
          {crasData.map(cras => (
            <React.Fragment key={cras.nome}>
              <GridItem key={cras.nome}>
                <Box height='200px'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <Pie
                        data={cras.data}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        fill='#8884d8'
                        activeIndex={
                          activeIndex !== null ? activeIndex : undefined
                        }
                        activeShape={{ fill: 'gold' }}
                      >
                        {cras.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={customTooltip} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box alignItems='center' mt={4}>
                  <Grid
                    templateColumns='10px 1fr 1fr'
                    gap={2}
                    alignItems='center'
                    rowGap={1}
                  >
                    {cras.data.map(entry => (
                      <React.Fragment key={entry.name}>
                        <GridItem>
                          <Box
                            w='10px'
                            h='10px'
                            borderRadius='50%'
                            bg={entry.color}
                          />
                        </GridItem>
                        <GridItem>
                          <Text fontSize='sm'>{entry.name}</Text>
                        </GridItem>
                        <GridItem>
                          <Text fontSize='sm' textAlign='right'>
                            {entry.value}
                          </Text>
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default CrasPieChart;
