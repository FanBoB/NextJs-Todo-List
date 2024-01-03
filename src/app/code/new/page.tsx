import { redirect } from "next/navigation";
import db from "@/db";

const NewDataPage = () => {
	const createSnippet = async (formdata: FormData) => {
		"use server";
		let title = formdata.get("title") as string;
		let code = formdata.get("code") as string;
		if (title && code) {
			const dataresult = await db.todo.create({
				data: {
					title,
					code
				}
			});

			if (dataresult.id) {
				redirect("/");
			}
		}
	};

	return (
		<div className="container px-60 mx-auto">
			<div className="flex justify-between items-center mt-10">
				<h1 className="font-bold text-4xl">New Data</h1>
			</div>

			<form action={createSnippet}>
				<div className="mt-6 flex flex-col gap-3">
					<div className="flex flex-col">
						<label className="font-bold text-lg">Title</label>
						<input name="title" type="text" className="mt-2 border-2 border-gray-300 rounded-md p-2" />
					</div>

					<div className="flex flex-col">
						<label className="font-bold text-lg">Code</label>
						<textarea name="code" className="mt-2 border-2 border-gray-300 rounded-md p-2" />
					</div>

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
export default NewDataPage;
