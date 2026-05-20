import { useEffect, useRef, useState } from "react";
import type { CommentType } from "../types/types";

interface Props {
  onSubmit: (data: CommentType) => void;
  editingData: CommentType | null;
  cancelEdit: () => void;
}

const CommentForm = ({ onSubmit, editingData, cancelEdit }: Props) => {
  const [formData, setformData] = useState<Partial<CommentType>>({
    currentValue: "The quick brown fox jumps over the lazy dog",
    fieldValue: "",
    comment: "",
    file: undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handling input changes for text and textarea fields, updating formData state with the new values and clearing any existing error messages for the changed field
  const handleOnChanege = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setformData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Handling file input change, updating formData with the selected file if it exists
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setformData((prev) => ({ ...prev, file: file }));
    }
  };

  // Validating form data, checking if required fields are filled, setting error messages for any missing fields, and returning a boolean indicating whether the data is valid or not
  const validateData = () => {
    const requiredFields = ["fieldValue", "comment"];
    const error: Record<string, string> = {};

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        error[field] = "This field is required.";
      }
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return false;
    }
    return Object.keys(error).length === 0;
  };


  // Handling form submission, validating data, creating a CommentType object with form data, calling onSubmit with the new comment, resetting the file input and form data to default values
  const handleSubmit = () => {
    if (!validateData()) return;
    const data: CommentType = {
      id: Date.now(),
      user: "John Doe",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      currentValue: formData.fieldValue ?? "",
      fieldValue: formData.fieldValue ?? "",
      comment: formData.comment ?? "",
      file: formData.file instanceof File ? formData.file : undefined,
    };
    onSubmit(data);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setformData({
      currentValue: "The quick brown fox jumps over the lazy dog",
      fieldValue: "",
      comment: "",
      file: undefined,
    });
  };


  // Handling discard action, resetting form data and file input, and calling cancelEdit to exit edit mode if applicable
  const handleDiscard = () => {
    setformData({
      currentValue: "The quick brown fox jumps over the lazy dog",
      fieldValue: "",
      comment: "",
      file: undefined,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    cancelEdit();
  };


  // When editingData changes, update formData with the new values. If editingData is null, reset formData to default values.
  useEffect(() => {
    if (editingData) {
      setformData({
        currentValue: editingData.currentValue,
        fieldValue: editingData.fieldValue,
        comment: editingData.comment,
        file: editingData.file,
      });
    } else {
      setformData({
        currentValue: "The quick brown fox jumps over the lazy dog",
        fieldValue: "",
        comment: "",
        file: undefined,
      });
    }
  }, [editingData]);

  return (
    <div className="bg-[#2e2e45] rounded-xl p-4 text-white">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-300 block mb-1">
            Current value
          </label>

          <p className="text-sm">{formData?.currentValue}</p>
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-1">
            Field label
          </label>

          <input
            type="text"
            placeholder="Placeholder"
            name="fieldValue"
            value={formData?.fieldValue}
            onChange={handleOnChanege}
            className="w-full rounded-lg border border-gray-500 bg-transparent p-3 outline-none"
          />

          {errors.fieldValue && (
            <p className="text-sm mt-1 text-red-400">{errors.fieldValue}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-1">Comment</label>

          <textarea
            placeholder="Please provide a reason for the change"
            name="comment"
            value={formData?.comment}
            onChange={handleOnChanege}
            rows={4}
            className="w-full rounded-lg border border-gray-500 bg-transparent p-3 outline-none resize-none"
          />

          {errors.comment && (
            <p className="text-sm mt-1 text-red-400">{errors.comment}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-300 block mb-1">
            Upload support document
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full border border-gray-500 rounded-lg p-2 text-sm"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between mt-6 gap-4">
        <button
          onClick={handleDiscard}
          className="cursor-pointer flex-1 border border-orange-400 text-orange-400 rounded-lg py-2 hover:bg-orange-400 hover:text-white"
        >
          Discard
        </button>

        <button
          onClick={handleSubmit}
          className="cursor-pointer flex-1 bg-red-500 hover:bg-red-600 rounded-lg py-2"
        >
          {editingData ? "Update Comment" : "Submit Suggestion"}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
