import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface UploadFileProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi file: tipe dan ukuran
      if (!file.type.startsWith('image/') || file.size > 1024 * 1024) {
        setErrorMessage(
          'File harus berupa gambar (PNG, JPG, dll) dan tidak lebih dari 1MB.'
        );
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      setSelectedFile(file);
      setErrorMessage(null); // Reset error message
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      setPreview(null);
      onClose();
    }
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setPreview(null);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleClose = () => {
    handleDeleteImage();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="max-w-md w-full bg-white rounded-lg p-5">
        <h2 className="text-lg font-semibold">Upload Gambar Profil</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="mt-2"
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        {preview && (
          <div className="mt-4 flex justify-center items-center">
            <img
              src={preview}
              alt="Preview"
              className="w-[300px] h-[300px] object-cover rounded-lg"
            />
            <Button
              className="ml-4"
              variant="outline"
              onClick={handleDeleteImage}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button className="ml-2" onClick={handleUploadClick}>
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
