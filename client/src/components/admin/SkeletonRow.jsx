// SkeletonRow.jsx
const SkeletonRow = () => {
  return (
    <tr className="border-y border-gray-300 animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
      </td>

      <td className="px-6 py-4 max-s:hidden">
        <div className="h-3 w-24 bg-gray-300 rounded"></div>
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
        </div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
