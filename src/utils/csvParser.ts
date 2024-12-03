export function parseCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // This is a basic fetch-based parser for web environment
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(csvText => {
          // Split the CSV into lines
          const lines = csvText.split('\n').filter(line => line.trim() !== '');
          
          // Extract headers
          const headers = lines[0].split(',').map(header => header.trim());
          
          // Parse data rows
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            
            // Create an object mapping headers to values
            return headers.reduce((obj, header, index) => {
              // Convert numeric columns to numbers, treat empty/invalid as 0
              obj[header] = isNaN(Number(values[index])) 
                ? (values[index] || '')  // Keep string values as is
                : (Number(values[index]) || 0);  // Convert to number, default to 0
              return obj;
            }, {});
          });
  
          resolve(data);
        })
        .catch(error => {
          console.error('Error parsing CSV:', error);
          reject(error);
        });
    });
  }
  
  // Alternative for Node.js environment if needed
  import * as fs from 'fs';
  import * as path from 'path';
  
  export function parseCSVNode(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
  
        // Split the CSV into lines
        const lines = data.split('\n').filter(line => line.trim() !== '');
        
        // Extract headers
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Parse data rows
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',').map(value => value.trim());
          
          // Create an object mapping headers to values
          return headers.reduce((obj, header, index) => {
            // Convert numeric columns to numbers, treat empty/invalid as 0
            obj[header] = isNaN(Number(values[index])) 
              ? (values[index] || '')  // Keep string values as is
              : (Number(values[index]) || 0);  // Convert to number, default to 0
            return obj;
          }, {});
        });
  
        resolve(parsedData);
      });
    });
  }
