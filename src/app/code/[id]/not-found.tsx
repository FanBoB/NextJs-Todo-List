import Link from "next/link";

export default function notFound() {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<h1 className="text-4xl text-rose-500">Not Found ! ! !</h1>
			<Link className="my-10 font-bold text-2xl text-white border px-4 py-1 rounded bg-blue-500" href="/">
				Go Home
			</Link>
		</div>
	);
}
