import Link from "next/link";
import HomeHeader from "@/components/homeHeader";
import db from "@/db";

export default async function Home() {
	try {
		const GetList = await db.todo.findMany();

		return (
			<div className="container mx-auto px-52">
				<HomeHeader />
				<div className="flex justify-between items-center mt-10">
					<h1 className="font-bold text-2xl">Code Snippets</h1>
					<Link href="/code/new" className="rounded border bg-green-500 px-4 py-2 text-white cursor-pointer">
						Add
					</Link>
				</div>
				<div className="flex justify-between flex-col gap-2 mt-6">
					{GetList.map(({ id, title }) => {
						return (
							<Link
								href={`/code/${id}`}
								key={id}
								className="flex justify-between border rounded-lg px-4 py-2 items-center"
							>
								<h2 className="text-xl font-medium">{title}</h2>
								<div className="text-blue-700">View</div>
							</Link>
						);
					})}

					{/* <div className="flex justify-between border px-4 py-2 items-center rounded-lg">
					<h2 className="text-xl font-medium">Title</h2>
					<div className="text-blue-700">View</div>
				</div> */}
				</div>
			</div>
		);
	} catch (error) {
		return (
			<div className="container mx-auto px-52">
				<HomeHeader />
				<div className="flex justify-between items-center mt-10">
					<h1 className="font-bold text-2xl">Code Snippets</h1>
					<Link href="/code/new" className="rounded border bg-green-500 px-4 py-2 text-white cursor-pointer">
						Add
					</Link>
				</div>
			</div>
		);
	}
}
