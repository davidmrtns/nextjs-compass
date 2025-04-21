export async function GET() {
    return new Response(JSON.stringify({ message: "I am alive" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
