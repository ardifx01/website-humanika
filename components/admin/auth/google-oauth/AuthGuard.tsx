import GoogleDriveConnect from "@/components/admin/google-drive/GoogleDriveConnect";
import { getGoogleDriveFiles } from "@/lib/server/google-drive";
import { type AuthGuardProps } from "@/types/google-drive";

export default async function AuthGuard({
  accessToken,
  children,
}: AuthGuardProps) {
  if (!accessToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Please authenticate to access the organizational management system
            </h1>
            <p className="text-gray-600 mb-6">
              Connect your Google Drive account to continue
            </p>
            <div className="flex justify-center">
              <GoogleDriveConnect />
            </div>
          </div>
        </main>
      </div>
    );
  }

  try {
    await getGoogleDriveFiles(accessToken);
  } catch (error) {
    console.error("Failed to fetch Google Drive files:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-red-500 text-xl font-medium">
              Failed to load organizational resources
            </h1>
            <div className="flex justify-center">
              <GoogleDriveConnect />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
