"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  onImagesSelected: (images: File[]) => void
  maxImages?: number
}

export default function ImageUploader({ onImagesSelected, maxImages = 5 }: ImageUploaderProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImages = [...selectedImages, ...filesArray].slice(0, maxImages)

      setSelectedImages(newImages)
      onImagesSelected(newImages)

      // Create preview URLs
      const newPreviews = newImages.map((file) => URL.createObjectURL(file))

      // Revoke old preview URLs to avoid memory leaks
      previews.forEach((url) => URL.revokeObjectURL(url))

      setPreviews(newPreviews)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    onImagesSelected(newImages)

    // Revoke the URL of the removed preview
    URL.revokeObjectURL(previews[index])

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary")

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      const newImages = [...selectedImages, ...filesArray].slice(0, maxImages)
      setSelectedImages(newImages)
      onImagesSelected(newImages)

      // Create preview URLs
      const newPreviews = newImages.map((file) => URL.createObjectURL(file))

      // Revoke old preview URLs to avoid memory leaks
      previews.forEach((url) => URL.revokeObjectURL(url))

      setPreviews(newPreviews)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-1 py-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mt-2">Upload Images</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop files or click to browse</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={selectedImages.length >= maxImages}
          >
            Select Files
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Maximum {maxImages} images. Supported formats: JPG, PNG, GIF
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden bg-muted">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {selectedImages.length < maxImages && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors"
            >
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add More</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

