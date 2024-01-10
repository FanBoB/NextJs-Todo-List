"use server";

import { redirect } from "next/navigation";
import db from "@/db";

const GetDataById = async ({ id }: { id: number }) =>
	await db.todo.findFirst({
		where: {
			id
		}
	});

const UpdateDataById = async ({
	id,
	data
}: {
	id: number;
	data: {
		title: string;
		code: string;
	};
}) => {
	await db.todo.update({
		where: {
			id
		},
		data
	});
	redirect(`/code/${id}`);
};

const DeleteDataById = async ({ id }: { id: number }) => {
	await db.todo.delete({
		where: {
			id
		}
	});
	redirect("/");
};

export { GetDataById, UpdateDataById, DeleteDataById };
