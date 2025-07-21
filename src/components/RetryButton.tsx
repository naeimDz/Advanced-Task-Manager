
// ===================================
// app/open-notebook/[uid]/components/RetryButton.tsx
// ===================================

'use client';

export function RetryButton() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      إعادة المحاولة
    </button>
  );
}