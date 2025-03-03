"use client";

import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

const CLOUD_NAME = "db8l1ulfq";
const UPLOAD_PRESET = "bicycle";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
}

interface CustomFile {
  file: File;
  previewUrl: string;
  id: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const { file } of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const { data } = await axios.post(CLOUDINARY_URL, formData);
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error("Upload Error:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    toast.success("All images uploaded successfully!");
    onUploadComplete(uploadedUrls);
    setFiles([]);
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Select Images</label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-white file:cursor-pointer"
        />
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {files.map(({ previewUrl, id }) => (
          <div
            key={id}
            className="relative group overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700"
          >
            <Image
              src={previewUrl}
              alt="Preview"
              className="w-full h-24 object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(id)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className={cn(
          "w-full flex items-center gap-2 justify-center",
          uploading && "opacity-50 cursor-not-allowed"
        )}
      >
        {uploading ? "Uploading..." : "Upload Images"}
        {!uploading && <UploadCloud className="w-5 h-5" />}
      </Button>
    </div>
  );
};

export default ImageUpload;
