# Tattoo Studio Website

A modern, responsive website for a tattoo studio built with Next.js, featuring appointment booking, file uploads, and an admin dashboard.

## Features

- **Modern Design**: Sleek UI with black, red, blue, and white color scheme
- **File Uploads**: Allow clients to upload reference images for tattoo designs
- **Booking System**: Interactive calendar for appointment scheduling
- **Contact Form**: Collect client information and tattoo design ideas
- **Artist Profiles**: Showcase tattoo artists and their work
- **Gallery**: Display tattoo images and process videos
- **Dark/Light Mode**: Toggle between color schemes
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Uploadthing
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Notifications**: Sonner for toast messages

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd tattoo-studio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env` to `.env.local`
   - Update the variables with your own values for:
     - Database connection
     - Uploadthing credentials
     - NextAuth secret

4. Run database migrations:

```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions, validators, and server actions
- `/prisma` - Database schema
- `/public` - Static assets including images and videos

## Deployment

This project is ready to deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

For production, consider using:
- Vercel Postgres or Neon for the database
- Vercel Blob Storage or maintain Uploadthing for file storage

## Customization

### Color Scheme

The black, red, blue, and white color scheme is defined in:
- `tailwind.config.js` - Color definitions
- `src/styles/globals.css` - Theme variables

### Images and Videos

Replace the placeholder images in the `/public` directory with your own tattoo images and videos.

### Content

Update the content in the page files to match your studio's information:
- Artist information
- Studio details
- Gallery images
- Services offered

## License

This project is licensed under the MIT License - see the LICENSE file for details.
