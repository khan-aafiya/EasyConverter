import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5FF] text-gray-600 py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Easy Convertor. All rights reserved.</p>
        <div className="mt-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">|</span>
            <Link href="/convertor" className="hover:underline">Convertor</Link>
        </div>
      </div>
    </footer>
  );
}
