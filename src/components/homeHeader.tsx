import Link from "next/link";

const HomeHeader = () => {
	return (
		<div className="flex justify-between items-center mt-10">
			<Link href="/" className="font-bold text-4xl text-rose-600">
				Home
			</Link>
		</div>
	);
};

export default HomeHeader;
