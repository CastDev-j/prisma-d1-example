import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from './generated/prisma';

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		const adapter = new PrismaD1(env.DB);
		const prisma = new PrismaClient({ adapter });

		const users = await prisma.user.findMany();
		const result = JSON.stringify(users);

		switch (url.pathname) {
			case '/':
				return new Response(result, {
					headers: {
						'Content-Type': 'application/json',
					},
					status: 200,
				});
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
