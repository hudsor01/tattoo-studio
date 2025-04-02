'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface UploadDropzoneProps {
  onUploadComplete: (/* eslint-disable-next-line @typescript-eslint/no-unused-vars */ urls: string[]) => void
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'))
    const combinedFiles = [...files, ...imageFiles].slice(0, 5)
    setFiles(combinedFiles)

    const newPreviews = combinedFiles.map((file) => URL.createObjectURL(file))
    setPreviews(newPreviews)

    simulateUpload(combinedFiles)
  }

  const removeFile = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)

    URL.revokeObjectURL(previews[index])

    const updatedPreviews = [...previews]
    updatedPreviews.splice(index, 1)
    setPreviews(updatedPreviews)

    onUploadComplete(updatedPreviews)
  }

  const simulateUpload = async (/* eslint-disable-next-line @typescript-eslint/no-unused-vars */ filesToUpload: File[]) => {
    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsUploading(false)
    onUploadComplete(previews)
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4 space-y-4'>
      <div
        className={`flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
          isDragging
            ? 'border-tattoo-red bg-tattoo-red/10'
            : 'border-tattoo-white/20 hover:border-tattoo-white/40 hover:bg-tattoo-white/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id='file-upload'
          type='file'
          multiple
          accept='image/*'
          className='hidden'
          onChange={handleFileInput}
        />

        <Upload
          className={`h-10 w-10 mb-4 ${isDragging ? 'text-tattoo-red' : 'text-tattoo-white/50'}`}
        />

        <p className='text-center text-sm font-medium text-tattoo-white'>
          {isDragging ? 'Drop images here' : 'Drag & drop images here or click to browse'}
        </p>
        <p className='text-xs text-tattoo-white/50 mt-2'>
          Supported formats: JPG, PNG, GIF (Max 5MB)
        </p>
      </div>

      {isUploading && (
        <div className='flex items-center justify-center py-2 px-3 bg-tattoo-blue/10 rounded-md'>
          <div className='animate-spin mr-2 h-4 w-4 border-2 border-tattoo-blue border-t-transparent rounded-full'></div>
          <p className='text-sm text-tattoo-blue'>Uploading files...</p>
        </div>
      )}

      {previews.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4'>
          {previews.map((preview, index) => (
            <div
              key={index}
              className='relative group rounded-md overflow-hidden border border-tattoo-white/10 hover:border-tattoo-white/30 transition-colors'
            >
              <div className='aspect-square relative'>
                <Image src={preview} alt={`Preview ${index + 1}`} fill className='object-cover' />
              </div>
              <button
                type='button'
                onClick={() => removeFile(index)}
                className='absolute top-1 right-1 bg-tattoo-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tattoo-red/80'
              >
                <X className='h-4 w-4 text-tattoo-white' />
              </button>
              <div className='absolute bottom-0 left-0 right-0 bg-tattoo-black/70 py-1 px-2'>
                <p className='text-xs text-tattoo-white truncate'>
                  {files[index]?.name || `Image ${index + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
