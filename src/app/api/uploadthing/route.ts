import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: Request) {
  try {
    // Auth check removed since we're focusing only on marketing pages for now
    // Will add proper authentication later

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check if we're in development or if BLOB_READ_WRITE_TOKEN is not set
    if (process.env.NODE_ENV === 'development' || !process.env.BLOB_READ_WRITE_TOKEN) {
      // In development or without token, return a mock URL
      // This allows deployment without the token
      console.log('Using mock upload in development or missing BLOB token')
      return NextResponse.json({
        url: `https://placeholder-image.vercel.app/${file.name}?mock=true&t=${Date.now()}`
      })
    }

    // Generate a unique filename
    const filename = `user-${Date.now()}-${file.name}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}
