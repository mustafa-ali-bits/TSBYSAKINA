import { NextResponse } from 'next/server';
import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_SHEET_ID: z.string().min(1, 'GOOGLE_SHEET_ID is required'),
  GOOGLE_API_KEY: z.string().min(1, 'GOOGLE_API_KEY is required'),
});

// Validate environment variables
const envVars = envSchema.safeParse({
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
});

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', envVars.error.format());
}

const GOOGLE_SHEETS_CONFIG = envVars.success ? envVars.data : null;

async function getSheetNames() {
  if (!GOOGLE_SHEETS_CONFIG) throw new Error('Google Sheets config not available');

  const { GOOGLE_SHEET_ID: SHEET_ID, GOOGLE_API_KEY: API_KEY } = GOOGLE_SHEETS_CONFIG;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?key=${API_KEY}&_=${Date.now()}`;

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Cache for 60 seconds (1 minute)
  });
  if (!response.ok) {
    throw new Error('Failed to fetch spreadsheet metadata');
  }

  const data = await response.json();
  return data.sheets.map((sheet: any) => sheet.properties.title);
}

async function fetchFromGoogleSheets() {
  if (!GOOGLE_SHEETS_CONFIG) throw new Error('Google Sheets config not available');

  const { GOOGLE_SHEET_ID: SHEET_ID, GOOGLE_API_KEY: API_KEY } = GOOGLE_SHEETS_CONFIG;

  try {
    // First, get available sheet names
    const sheetNames = await getSheetNames();

    // Use 'Products' sheet if it exists, otherwise use the first sheet
    const sheetName = sheetNames.includes('Products') ? 'Products' : sheetNames[0];
    console.log(`SHEET NAME ${sheetName}`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}&_=${Date.now()}`;
    console.log(url);
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds (1 minute)
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from sheet "${sheetName}"`);
    }

    const data = await response.json();
    const rows = data.values;

    console.log(`Total rows received: ${rows.length}`);

    if (!rows || rows.length < 2) {
      throw new Error('No data found in the sheet');
    }

    const dataRows = rows.slice(1);
    console.log(`Data rows after slicing header: ${dataRows.length}`);

    const filteredRows = dataRows.filter((row: string[]) => row && row.length > 0 && row[0] && row[0].trim() !== '');
    console.log(`Rows after filtering empty rows: ${filteredRows.length}`);

    const products = filteredRows.map((row: string[], index: number) => ({
      id: index + 1,
      name: row[0] || '',
      mrp: parseFloat(row[1]) || 0,
      price: parseFloat(row[2]) || 0,
      category: row[3] || '',
      subcategory: row[4] || '',
      description: row[5] || '',
      image: row[6] || '',
      rating: parseFloat(row[7]) || 4.5,
      inventory: (row[8] || '').toLowerCase() === 'yes',
      customizationNote: row[10] || '',
    }));

    console.log(`Final products count: ${products.length}`);

    return products;
  } catch (error) {
    throw new Error(`Google Sheets API error: ${(error as Error).message}`);
  }
}

export async function GET() {
  try {
    if (!GOOGLE_SHEETS_CONFIG) {
      // Return demo data if env vars are not configured
      return NextResponse.json(getDemoData(), {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    const products = await fetchFromGoogleSheets();
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    // Return demo data on error
    return NextResponse.json(getDemoData(), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}

function getDemoData() {
  return [
    {
      id: 1,
      name: 'Dark Chocolate Truffles',
      mrp: 29.99,
      price: 24.99,
      category: 'Chocolates',
      subcategory: 'Truffles',
      description: 'Rich 70% dark chocolate ganache dusted with cocoa powder',
      image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400',
      rating: 4.8,
      inventory: true,
      customizationNote: 'Add personalized message or choose from available toppings like nuts, fruits, or edible flowers.',
    },
    {
      id: 2,
      name: 'Premium Dark Bar',
      mrp: 11.99,
      price: 8.99,
      category: 'Chocolates',
      subcategory: 'Dark Chocolate',
      description: '85% single-origin dark chocolate bar',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4a056a59?w=400',
      rating: 4.9,
      inventory: true,
      customizationNote: 'Can be engraved with custom text or logo. Available in different cocoa percentages.',
    }
  ];
}
