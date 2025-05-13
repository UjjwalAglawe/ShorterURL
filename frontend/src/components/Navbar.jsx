export const Navbar = () => {
    return (
        <nav className="backdrop-blur-sm bg-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div className="text-2xl font-extrabold text-amber-400 tracking-wide">
                    ShorterURL
                </div>

                <div className="hidden md:flex gap-10 text-white text-lg font-medium">
                    <span className="hover:text-amber-300 transition duration-300 cursor-pointer">Home</span>
                    <span className="hover:text-amber-300 transition duration-300 cursor-pointer">About</span>
                </div>
            </div>
        </nav>
    );
};
