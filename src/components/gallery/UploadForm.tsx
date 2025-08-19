import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../store";
import { uploadArtwork } from "../../store/slices/artworkSlice";
import { addNotification } from "../../store/slices/uiSlice";
import { FILE_UPLOAD } from "../../utils/constants";
import {
  CloudArrowUpIcon,
  XMarkIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "../common/LoadingSpinner";

interface UploadFormProps {
  onSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.artworks);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        let message = "Erro no arquivo selecionado";

        if (error.code === "file-too-large") {
          message = "Arquivo muito grande. Máximo 5MB.";
        } else if (error.code === "file-invalid-type") {
          message = "Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.";
        }

        dispatch(
          addNotification({
            type: "error",
            message,
          })
        );
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Clear file validation error
        if (validationErrors.file) {
          setValidationErrors((prev) => ({
            ...prev,
            file: "",
          }));
        }
      }
    },
    [dispatch, validationErrors.file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: FILE_UPLOAD.MAX_SIZE,
    multiple: false,
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      errors.title = "Título é obrigatório";
    } else if (formData.title.length < 3) {
      errors.title = "Título deve ter pelo menos 3 caracteres";
    }

    if (!selectedFile) {
      errors.file = "Selecione uma imagem";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(
        uploadArtwork({
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          image: selectedFile!,
        })
      ).unwrap();

      onSuccess();
    } catch (error) {
      // Error já é tratado no slice
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-4">
          Imagem da Obra <span className="text-red-500">*</span>
        </label>

        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? "border-primary-500 bg-primary-500/10"
                : "border-border hover:border-primary-500 hover:bg-primary-500/5"
            } ${validationErrors.file ? "border-red-500" : ""}`}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive
                ? "Solte a imagem aqui"
                : "Clique ou arraste uma imagem"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Suporta JPEG, PNG e WebP até 5MB
            </p>
            <div className="btn-secondary inline-flex">Selecionar Arquivo</div>
          </div>
        ) : (
          <div className="card p-4">
            <div className="flex items-start space-x-4">
              {/* Preview */}
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={removeFile}
                className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {validationErrors.file && (
          <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{validationErrors.file}</span>
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Título da Obra <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={`input w-full ${
            validationErrors.title ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="Digite o título da sua obra..."
        />
        {validationErrors.title && (
          <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Descrição (Opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="input w-full resize-none"
          placeholder="Conte a história por trás da sua criação..."
        />
        <p className="mt-1 text-sm text-muted-foreground">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading || !selectedFile || !formData.title.trim()}
          className="btn-primary flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="w-5 h-5" />
              <span>Publicar Obra</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
