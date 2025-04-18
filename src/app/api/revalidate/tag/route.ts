import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { env } from "@/env";
type WebhookPayload = {
  tags: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      env.SANITY_REVALIDATE_SECRET,
      true,
    );
    // TODO?: Get post content and create discord and facebook posts

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!Array.isArray(body?.tags) || !body.tags.length) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    body.tags.forEach((tag) => {
      revalidateTag(tag);
    });

    return NextResponse.json({ body });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
