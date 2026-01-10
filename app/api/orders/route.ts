import { NextRequest, NextResponse } from 'next/server';
import { SheetsWriteService, OrderData } from '@/lib/sheetsWriteService';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.customerName || !body.customerPhone || !body.customerAddress || !body.items?.length) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const orderData: OrderData = {
            customerName: body.customerName,
            customerPhone: body.customerPhone,
            customerAddress: body.customerAddress,
            items: body.items,
            subtotal: body.subtotal || 0,
            couponName: body.couponName,
            discountAmount: body.discountAmount || 0,
            deliveryFee: body.deliveryFee || 0,
            total: body.total || 0,
        };

        const result = await SheetsWriteService.appendOrder(orderData);

        if (result.success) {
            return NextResponse.json({
                success: true,
                orderId: result.orderId,
                message: 'Order saved successfully',
            });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
