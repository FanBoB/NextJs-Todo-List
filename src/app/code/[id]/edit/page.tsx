"use client";

import { useCallback, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { GetDataById, UpdateDataById } from "@/actions";
import { todo } from "@prisma/client";
import HomeHeader from "@/components/homeHeader";

type TodoType = todo;
interface Props {
	params: {
		id: string;
	};
}
const EditPage = (props: Props) => {
	const id = Number(props.params.id);

	const [data, setData] = useState<TodoType | null>({
		title: "Title",
		code: "Code",
		id
	});

	const initList = useCallback(async () => {
		let result = await GetDataById({ id });
		setData(result);
	}, [id]);

	useEffect(() => {
		initList();
	}, [initList]);

	if (data === null) {
		notFound();
	}

	const UpdateDataByIdFn = UpdateDataById.bind(null, {
		id,
		data: {
			code: data.code,
			title: data.title
		}
	});

	return (
		<section className="container mx-auto px-60">
			<HomeHeader />
			<h1 className="font-bold my-4 text-4xl">Edit Page {data?.title}</h1>
			<form action={UpdateDataByIdFn} className="flex flex-col gap-4">
				<div>
					<h3 className="font-bold text-2xl text-black-500 my-2">Title</h3>
					<input
						name="title"
						value={data?.title}
						className="border border-sky-500 rounded-md w-full h-10 px-2"
						onChange={(e) => {
							setData({ ...data, title: e.target.value });
						}}
					/>
				</div>
				<div>
					<h3 className="font-bold text-2xl text-black-500 my-2">Code</h3>
					<textarea
						name="code"
						value={data?.code}
						className="border border-sky-500 rounded-md w-full h-40 p-2 bg-gray-200"
						onChange={(e) => {
							setData({ ...data, code: e.target.value });
						}}
					/>
				</div>
				<button type="submit" className="bg-sky-600 text-white rounded-md mb-4 h-10">
					Save
				</button>
			</form>
		</section>
	);
};
export default EditPage;
