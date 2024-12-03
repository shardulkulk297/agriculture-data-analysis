import React from 'react';
import { Table } from '@mantine/core';

interface MaxMinTableProps {
  data: { [year: number]: { maxCrop: string; minCrop: string } };
}

export const MaxMinCropTable: React.FC<MaxMinTableProps> = ({ data }) => {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Max Production Crop</Table.Th>
          <Table.Th>Min Production Crop</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.entries(data).map(([year, { maxCrop, minCrop }]) => (
          <Table.Tr key={year}>
            <Table.Td>{year}</Table.Td>
            <Table.Td>{maxCrop}</Table.Td>
            <Table.Td>{minCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};