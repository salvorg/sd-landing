import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('re_WKUhGLhW_EJtEk4WagsQj52EyBhvN9V3V');

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Sanarip Form <onboarding@resend.dev>',
            to: ['sanaripdolbor@gmail.com'],
            subject: `Заявка: ${name}`,
            html: `
                <h3>Новая заявка с сайта</h3>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Контакт:</strong> ${email}</p>
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