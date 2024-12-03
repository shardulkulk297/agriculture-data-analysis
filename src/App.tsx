import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Title, Stack } from '@mantine/core';
import { parseCSV } from './utils/csvParser';
import { processMaxMinCropTable, processAverageCropTable } from './utils/dataProcessing';
import { MaxMinCropTable } from './components/MaxMinCropTable';
import { AverageCropTable } from './components/AverageCropTable';

const App: React.FC = () => {
  const [maxMinData, setMaxMinData] = useState({});
  const [averageCropData, setAverageCropData] = useState({});

  useEffect(() => {
    async function loadData() {
      const rawData = await parseCSV('/path/to/agriculture_data.csv');
      
      const maxMinResults = processMaxMinCropTable(rawData);
      const averageResults = processAverageCropTable(rawData);

      setMaxMinData(maxMinResults);
      setAverageCropData(averageResults);
    }

    loadData();
  }, []);

  return (
    <MantineProvider>
      <Container>
        <Stack>
          <Title>Indian Agriculture Data Analysis</Title>
          <MaxMinCropTable data={maxMinData} />
          <AverageCropTable data={averageCropData} />
        </Stack>
      </Container>
    </MantineProvider>
  );
};

export default App;