import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
        </div>
        <Link to="/" className="text-lg bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 group">
            <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-all duration-200"/>
            Go Back
        </Link>
    </div>
  )
}