type Props  = {
    onAdd: (event: MouseEvent) => void
}
const FloatingActionButton = ({ onAdd }: Props) => {
    return (
        <div className="group fixed bottom-8 right-8 p-2 flex items-end justify-end w-24 h-24">
            {/* 메인 버튼 */}
            <input
                type="checkbox"
                id="fab-toggle"
                className="peer hidden"
            />
            <label
                htmlFor="fab-toggle"
                className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute cursor-pointer transition-transform peer-checked:rotate-45"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </label>

            {/* 서브 버튼 1 */}
            <div
                className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-x-16 flex p-2 hover:p-3 bg-green-300 hover:bg-green-400 text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                    />
                </svg>
            </div>

            {/* 서브 버튼 2 */}
            <div
                className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-y-16 flex p-2 hover:p-3 bg-blue-300 hover:bg-blue-400 text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                    />
                </svg>
            </div>

            {/* 서브 버튼 3 */}
            <div
                className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-y-14 peer-checked:-translate-x-14 flex p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white"
                onClick={() => onAdd()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default FloatingActionButton;