import { NextResponse } from "next/server";

export const POST =async (request)=>{
    try {
        console.log('enter the post request of the signout')
        // Clear authentication cookie
        const response = NextResponse.json({type:'success', message: "Signed out successfully" },{status:200});
        await response.cookies.set("authToken", "", { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          expires: new Date(0) // Expire immediately
        });
    
        return response;
      } catch (error) {
        return NextResponse.json({ type:'error',message: "Failed to sign out" ,error:error}, { status: 500 });
      }
}