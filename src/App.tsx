import { useState } from "react";
import "./App.css";
import CommentModal from "./components/CommentModal";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-white border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-xl font-semibold hover:bg-purple-500 hover:text-white transition"
      >
        Comments ({commentCount})
      </button>

      <CommentModal
        commentCount={setCommentCount}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default App;
