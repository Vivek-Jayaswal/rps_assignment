import { DownloadIcon, Eye, File, User } from "lucide-react";
import type { CommentType } from "../types/types";

interface Props {
  item: CommentType;
  onDelete: (id: number) => void;
  onEdit: (item: CommentType) => void;
}

const CommentItem = ({ item, onDelete, onEdit }: Props) => {
  // Handling view file action, creating a temporary URL for the file and opening it in a new tab, then revoking the URL after a short delay to free up resources
  const handleViewFile = () => {
    if (!item.file) return;

    const fileURL = URL.createObjectURL(item.file);

    window.open(fileURL, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 1000);
  };

  // Handling download file action, creating a temporary URL for the file and triggering a download, then revoking the URL after a short delay to free up resources
  const handleDownloadFile = () => {
    if (!item.file) return;

    const fileURL = URL.createObjectURL(item.file);

    const link = document.createElement("a");

    link.href = fileURL;
    link.download = item.file.name;

    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 1000);
  };

  return (
    <div className="bg-[#3b3b54] p-4 rounded-xl mb-4 text-white">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <p className="p-2 bg-[#2e2e45] rounded-full">
            <User size={14} />
          </p>
          <h3 className="font-semibold">{item.user}</h3>
        </div>
        <span className="text-sm text-gray-300">{item.time}</span>
      </div>

      <div className=" space-y-5 md:space-y-3 text-sm">
        <div>
          <p className="text-gray-300 mb-1">Current value</p>
          <p>{item.currentValue}</p>
        </div>

        {/* <div>
          <p className="text-gray-300 mb-1">Field value</p>
          <p>{item.fieldValue}</p>
        </div> */}

        <div>
          <p className="text-gray-300 mb-1">Comment</p>
          <p>{item.comment}</p>
        </div>

        {item.file && (
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center border px-4 py-3 rounded-lg">
            <div className="space-y-1 flex items-center gap-4">
              <div>
                <File size={30} className="text-red-500" />
              </div>
              <div className="">
                <div className="text-[13px] text-gray-300">
                  <span>{item.file.name}</span>
                </div>
                <div className="text-[13px] text-gray-300">
                  <span>{(item.file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={handleViewFile}
                className="cursor-pointer p-2 border rounded-sm text-sm"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={handleDownloadFile}
                className="cursor-pointer p-2 border rounded-sm text-sm"
              >
                <DownloadIcon size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-3 mt-5">
        <button
          onClick={() => onDelete(item.id)}
          className=" w-full md:w-fit cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm"
        >
          Delete Comment
        </button>

        <button
          onClick={() => onEdit(item)}
          className=" w-full md:w-fit cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
        >
          Edit Comment
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
