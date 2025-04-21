import Link from 'next/link';

export default function Home() {
    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-gray-800 to-indigo-900 flex justify-center items-center text-white">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}></div>
            <div className="text-center z-10">
                <h1 className="text-6xl font-bold mb-4">Next.js Compass</h1>
                <p className="text-xl mb-8">This app was built for learning Next.js</p>
                <Link href="/users" passHref>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300 cursor-pointer">
                        Start up
                    </button>
                </Link>
            </div>
        </div>
    );
}
