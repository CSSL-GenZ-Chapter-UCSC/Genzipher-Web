import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const result = await pool.query(
      'SELECT drive_file_id FROM file_links WHERE slug = $1', 
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const driveFileId = result.rows[0].drive_file_id;


    let downloadUrl;
    if(slug == "parthenon-623991"){

        downloadUrl = `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download&authuser=0`;


    }else{
        downloadUrl = `https://drive.google.com/file/d/${driveFileId}`;

    }
    
    return NextResponse.redirect(downloadUrl);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}