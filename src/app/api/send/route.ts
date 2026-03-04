import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY); // Секретный ключ из .env

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['red.rokku@gmail.com'],
            subject: `Новая заявка от ${name}`,
            text: `Сообщение: ${message} \nОт: ${email}`,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}