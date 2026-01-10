import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; 

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const result = await pool.query(
      'SELECT drive_file_id FROM file_links WHERE slug = $1', 
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const driveFileId = result.rows[0].drive_file_id;

    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

    // 4. Redirect the user
    return NextResponse.redirect(downloadUrl);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}