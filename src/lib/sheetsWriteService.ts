import { GoogleAuth } from 'google-auth-library';

export interface OrderData {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: {
        name: string;
        variant?: string;
        quantity: number;
        price: number;
        customization?: string;
    }[];
    subtotal: number;
    couponName?: string;
    discountAmount: number;
    deliveryFee: number;
    total: number;
}

export const SheetsWriteService = {
    async appendOrder(orderData: OrderData): Promise<{ success: boolean; orderId?: string; error?: string }> {
        try {
            const SHEET_ID = process.env.GOOGLE_SHEET_ID;
            const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
            const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

            if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
                console.error('Missing Google Sheets credentials for writing');
                return { success: false, error: 'Configuration error' };
            }

            // Create auth client using service account credentials
            const auth = new GoogleAuth({
                credentials: {
                    client_email: SERVICE_ACCOUNT_EMAIL,
                    private_key: PRIVATE_KEY,
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const authClient = await auth.getClient();
            const accessToken = await authClient.getAccessToken();

            if (!accessToken.token) {
                return { success: false, error: 'Failed to get access token' };
            }

            // Generate order ID (timestamp-based)
            const orderId = `ORD-${Date.now()}`;
            const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Format items as a readable string
            const itemsString = orderData.items
                .map(item => {
                    const variant = item.variant ? ` (${item.variant})` : '';
                    const customization = item.customization ? ` [${item.customization}]` : '';
                    return `${item.name}${variant} x${item.quantity} @ ₹${item.price}${customization}`;
                })
                .join('; ');

            // Prepare row data for the Orders sheet
            const rowData = [
                orderId,
                orderDate,
                orderData.customerName,
                orderData.customerPhone,
                orderData.customerAddress,
                itemsString,
                orderData.subtotal.toFixed(2),
                orderData.couponName || 'NA',
                orderData.discountAmount > 0 ? orderData.discountAmount.toFixed(2) : '0',
                orderData.deliveryFee === 0 ? 'FREE' : orderData.deliveryFee.toFixed(2),
                orderData.total.toFixed(2),
                'WhatsApp Sent',
            ];

            // Append to the Orders sheet
            const sheetName = 'Orders';
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [rowData],
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to append order to sheet:', errorText);
                return { success: false, error: 'Failed to save order' };
            }

            return { success: true, orderId };
        } catch (error) {
            console.error('Error appending order to Google Sheets:', error);
            return { success: false, error: 'Internal error' };
        }
    },
};
