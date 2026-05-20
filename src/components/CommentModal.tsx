import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import type { CommentType } from "../types/types";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  commentCount: (count: number) => void;
}

const CommentModal = ({ isOpen, onClose, commentCount }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [editingData, setEditingData] = useState<CommentType | null>(null);

  const addComment = (data: CommentType) => {
    if (editingData) {
      setComments((prev) =>
        prev.map((item) => (item.id === editingData.id ? data : item)),
      );

      setEditingData(null);
      return;
    }

    setComments((prev) => [data, ...prev]);
  };

  const deleteComment = (id: number) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const editComment = (item: CommentType) => {
    setEditingData(item);
  };

  useEffect(() => {
    commentCount(comments.length);
  }, [comments, commentCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#25253b] w-full max-w-2xl rounded-2xl text-white max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-600 p-5">
          <h2 className="text-2xl font-semibold">Comment</h2>

          <button onClick={onClose} className="text-2xl cursor-pointer hover:text-red-400">
            <X />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-5">
          {comments.map((item) => (
            <CommentItem
              key={item.id}
              item={item}
              onDelete={deleteComment}
              onEdit={editComment}
            />
          ))}

          <CommentForm
            onSubmit={addComment}
            editingData={editingData}
            cancelEdit={() => setEditingData(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
