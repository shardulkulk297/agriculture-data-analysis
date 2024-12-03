import React from 'react';
import { Table } from '@mantine/core';

interface AverageCropTableProps {
  data: { [crop: string]: { avgYield: number; avgArea: number } };
}

export const AverageCropTable: React.FC<AverageCropTableProps> = ({ data }) => {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield (1950-2020)</Table.Th>
          <Table.Th>Average Cultivation Area (1950-2020)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.entries(data).map(([crop, { avgYield, avgArea }]) => (
          <Table.Tr key={crop}>
            <Table.Td>{crop}</Table.Td>
            <Table.Td>{avgYield}</Table.Td>
            <Table.Td>{avgArea}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};