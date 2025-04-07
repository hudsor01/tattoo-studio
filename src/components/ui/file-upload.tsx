'use client'

import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useState, useCallback } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface FileUploadProps {
  endpoint: 'tattooDesigns' | 'profilePhotos'
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  maxSize?: string
  acceptedFileTypes?: string[]
}

export function FileUpload({
  endpoint,
  value = [],
  onChange,
  maxFiles = 1,
  maxSize = '4MB',
  acceptedFileTypes = ['image/*'],
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)

  const { startUpload } = useUploadThing(endpoint)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      setIsError(null)

      try {
        const res = await startUpload(acceptedFiles)

        if (!res) {
          setIsError('Failed to upload files')
          return
        }

        const uploadedUrls = res.map((file) => file.url)

        onChange([...value, ...uploadedUrls])
      } catch (error) {
        console.error('Error uploading files:', error)
        setIsError('Error uploading files. Please try again.')
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, startUpload, value]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? generateClientDropzoneAccept(acceptedFileTypes) : undefined,
    maxFiles,
    maxSize: maxSize === '4MB' ? 4 * 1024 * 1024 : 8 * 1024 * 1024,
  })

  const removeFile = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }

  return (
    <div className='space-y-4'>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer transition-all',
          isDragActive ? 'border-primary bg-primary/5' : 'hover:border-primary/50',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className='flex flex-col items-center justify-center gap-2 text-center'>
          {isUploading ? (
            <>
              <Loader2 className='h-10 w-10 text-primary animate-spin' />
              <p className='text-sm text-muted-foreground'>Uploading files...</p>
            </>
          ) : (
            <>
              <Upload className='h-10 w-10 text-muted-foreground' />
              <p className='text-sm font-medium'>Drag &amp; drop files here or click to browse</p>
              <p className='text-xs text-muted-foreground'>
                {acceptedFileTypes.join(', ')} (Max {maxFiles} {maxFiles === 1 ? 'file' : 'files'},{' '}
                {maxSize} each)
              </p>
            </>
          )}
        </div>
      </div>

      {isError && (
        <div className='p-2 bg-destructive/10 border border-destructive text-destructive text-sm rounded'>
          {isError}
        </div>
      )}

      {value.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
          {value.map((url, index) => (
            <div
              key={url}
              className='relative group aspect-square rounded-lg overflow-hidden border'
            >
              <img
                src={url}
                alt={`Uploaded file ${index + 1}`}
                className='w-full h-full object-cover transition-all group-hover:opacity-70'
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={() => removeFile(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
