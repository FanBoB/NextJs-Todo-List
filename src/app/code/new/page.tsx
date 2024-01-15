"use client";

import { useFormState } from "react-dom";
import HomeHeader from "@/components/homeHeader";
import { createSnippet } from "@/actions";

const NewDataPage = () => {
	const [formState, formAction] = useFormState(createSnippet, { message: "" });

	return (
		<div className="container px-60 mx-auto">
			<HomeHeader />
			<div className="flex justify-between items-center mt-10">
				<h1 className="font-bold text-4xl">New Data</h1>
			</div>

			<form action={formAction}>
				<div className="mt-6 flex flex-col gap-3">
					<div className="flex flex-col">
						<label className="font-bold text-lg">Title</label>
						<input name="title" type="text" className="mt-2 border-2 border-gray-300 rounded-md p-2" />
					</div>

					<div className="flex flex-col">
						<label className="font-bold text-lg">Code</label>
						<textarea name="code" className="mt-2 border-2 border-gray-300 rounded-md p-2" />
					</div>

					{formState?.message && (
						<div className="px-2 py-2 bg-red-400 border rounded-md border-red-400 ">
							{formState?.message}
						</div>
					)}

					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
export default NewDataPage;
