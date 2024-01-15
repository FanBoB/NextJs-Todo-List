"use server";

import { revalidatePath } from "next/cache";
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
	revalidatePath(`/code/${id}`);
	redirect(`/code/${id}`);
};

const DeleteDataById = async ({ id }: { id: number }) => {
	await db.todo.delete({
		where: {
			id
		}
	});
	revalidatePath("/");
	redirect("/");
};

const createSnippet = async (formState: { message?: string }, formData: FormData) => {
	try {
		// console.log(formData, "");
		// throw new Error("Not implemented-666");

		let title = formData.get("title");
		let code = formData.get("code");

		if (typeof title !== "string" || title.length < 3) {
			return {
				message: "最少输入3个字符！！"
			};
		}

		if (typeof code !== "string" || code.length < 3) {
			return {
				message: "最少输入3个字符！！"
			};
		}

		await db.todo.create({
			data: {
				title,
				code
			}
		});
	} catch (error) {
		// 错误处理 让他不会刷新页面 保存form 已填写的信息
		if (error instanceof Error) {
			return {
				message: error.message
			};
		} else {
			return {
				message: "未知错误"
			};
		}
	}

	//服务器组件 刷新页面缓存
	revalidatePath("/");

	// 重定向 必须放到 try catch 外面 否则会出发异常
	redirect("/");
};

export { GetDataById, UpdateDataById, DeleteDataById, createSnippet };
