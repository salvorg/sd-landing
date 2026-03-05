import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('re_ZR92AKG6_Pwp2STMUFa11Pmp7FygH4KDL');

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Sanarip Form <onboarding@resend.dev>',
            to: ['red.rokku@gmail.com'],
            subject: `Заявка: ${name}`,
            html: `
                <h3>Новая заявка с сайта</h3>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Контакт:</strong> ${email}</p>
                <p><strong>Сообщение:</strong> ${message}</p>
            `,
        });

        if (error) {
            console.error("Ошибка Resend:", error);
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}