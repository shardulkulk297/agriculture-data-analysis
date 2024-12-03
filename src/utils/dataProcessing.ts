import { parseCSV } from './csvParser'; // You'll need to implement this

interface CropData {
  year: number;
  crop: string;
  production: number;
  area: number;
  yield: number;
}

export function processMaxMinCropTable(data: CropData[]) {
  const yearlyResults: { [year: number]: { maxCrop: string; minCrop: string } } = {};

  // Group data by year
  const yearGroups = data.reduce((acc, row) => {
    if (!acc[row.year]) acc[row.year] = [];
    acc[row.year].push(row);
    return acc;
  }, {} as { [year: number]: CropData[] });

  // Find max and min crops per year
  Object.entries(yearGroups).forEach(([year, yearData]) => {
    const sortedByProduction = yearData.sort((a, b) => b.production - a.production);
    yearlyResults[parseInt(year)] = {
      maxCrop: sortedByProduction[0].crop,
      minCrop: sortedByProduction[sortedByProduction.length - 1].crop
    };
  });

  return yearlyResults;
}

export function processAverageCropTable(data: CropData[]) {
  const cropResults: { [crop: string]: { avgYield: number; avgArea: number } } = {};

  // Group data by crop
  const cropGroups = data.reduce((acc, row) => {
    if (!acc[row.crop]) acc[row.crop] = [];
    acc[row.crop].push(row);
    return acc;
  }, {} as { [crop: string]: CropData[] });

  // Calculate averages for each crop
  Object.entries(cropGroups).forEach(([crop, cropData]) => {
    const avgYield = cropData.reduce((sum, row) => sum + row.yield, 0) / cropData.length;
    const avgArea = cropData.reduce((sum, row) => sum + row.area, 0) / cropData.length;

    cropResults[crop] = {
      avgYield: Number(avgYield.toFixed(3)),
      avgArea: Number(avgArea.toFixed(3))
    };
  });

  return cropResults;
}