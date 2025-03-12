// app/loading.tsx
export default function Loading() {
    return (
        <div id="loader"
             className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div
                className="w-12 h-12 border-4 border-t-transparent border-[#f3f3f5] border-solid rounded-full animate-spin"></div>
        </div>
    );
}
