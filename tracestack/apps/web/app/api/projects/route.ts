// api/projects/route.ts
import { prisma } from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received POST to /api/projects:', body);

    if (!body.name) { // Only project name is now strictly required if team is optional
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const projectData: any = { // Use 'any' temporarily or define a more specific type
      name: body.name,
      team: body.team
    };

    // If a teamId is provided, connect to it
    if (body.team) { // Assuming body.team is the Team ID
      projectData.team = {
        connect: {
          id: body.team,
        },
      };
    }
    // If body.team is not provided, the teamId will be set to null (optional field)

    const project = await prisma.project.create({
      data: projectData,
    });
    

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    console.error('Error in /api/projects:', err);
    return NextResponse.json({ error: 'Internal server error', details: err.message || 'Unknown error' }, { status: 500 });
  }
}

// api/projects/route.ts
// import { prisma } from "lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     console.log('Received POST to /api/projects:', body)

//     if (!body.name || !body.team) {
//       return NextResponse.json({ error: 'Project name and team are required' }, { status: 400 })
//     }

//     const project = await prisma.project.create({
//       data: {
//         name: body.name,
//         team: body.team,
//       },
//     })

//     return NextResponse.json({ success: true, project })
//   } catch (err: any) { // Use 'any' temporarily to log everything
//     console.error('!!!! FULL PRISMA ERROR IN /api/projects:', err); // LOG THE ENTIRE ERROR OBJECT
//     if (err.code) { // Prisma errors often have a 'code'
//       console.error('Prisma Error Code:', err.code);
//     }
//     if (err.message) {
//         console.error('Prisma Error Message:', err.message);
//     }
//     if (err.stack) {
//         console.error('Prisma Error Stack:', err.stack);
//     }
//     // Return more details to the client for debugging (remove in production)
//     return NextResponse.json({
//         error: 'Internal server error',
//         details: err.message || 'An unknown database error occurred.',
//         prismaError: err.code || null // Optionally expose Prisma error code
//     }, { status: 500 });
//   }
// }

// import { prisma } from "lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     console.log('Received POST to /api/projects:', body)

//     if (!body.name || !body.team) {
//       return NextResponse.json({ error: 'Project name and team are required' }, { status: 400 })
//     }

//     const project = await prisma.project.create({
//       data: {
//         name: body.name,
//         team: body.team,
//       },
//     })

//     return NextResponse.json({ success: true, project })
//   } catch (err) {
//     console.error('Error in /api/projects:', err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }
