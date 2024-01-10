import { DeleteDataById } from "@/actions";
import HomeHeader from "@/components/homeHeader";
import db from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
	params: {
		id: string;
	};
}

const PreviewPage = async (props: Props) => {
	let id = Number(props.params.id);
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const datas = await db.todo.findFirst({
		where: {
			id
		}
	});

	if (!datas) {
		notFound();
	}

	const DeleteDataByIdAction = DeleteDataById.bind(null, { id });

	return (
		<div className="container px-60 mx-auto">
			<HomeHeader />
			<div className="flex justify-between items-center mt-10">
				<h1 className="font-bold text-2xl">{datas.title}</h1>

				<div className="flex gap-2">
					<Link
						href={`/code/${id}/edit`}
						className="bg-orange-500 font-bold px-4 py-2 text-white rounded border"
					>
						Edit
					</Link>
					<form action={DeleteDataByIdAction}>
						<button className="bg-red-500 font-bold px-4 py-2 text-white rounded border">Delete</button>
					</form>
				</div>
			</div>

			<div className="mt-6 flex flex-col gap-3">
				<code className="mt-2 bg-gray-200 border-gray-300 rounded-md p-2 h-80">{datas.code}</code>
			</div>
		</div>
	);
};
export default PreviewPage;
