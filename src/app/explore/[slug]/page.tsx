import Loading from "@/components/loading/loading";
import DetailEventPage from "@/features/explore/detailevent";
import { getEventBySlug } from "@/hooks/api/events/getEventBySlug";
import { Suspense } from "react";

// export const generateMetaData = async ({
//   params,
// }: {
//   params: { slug: string };
// }) => {
//   const { slug } = params;
//   const event = await getEventBySlug(slug);

//   return {
//     title: event.name,
//     description: event.description,
//     openGraph: {
//       title: event.name,
//       description: event.description,
//       // url: `${process.env.NEXT_PUBLIC_BASE_URL}/explore/${slug}`,
//       images: [
//         {
//           url: event.image,
//           width: 800,
//           height: 600,
//         },
//       ],
//     },
//   };
// };

const EventDetaiPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  return (
    <main>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loading className=" h-screen" />
          </div>
        }
      >
        <DetailEventPage slug={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetaiPage;
