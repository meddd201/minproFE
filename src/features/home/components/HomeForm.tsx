"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { IEvent } from "@/types/events";
import { Sparkles, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import CategoryCard from "./CategoryCard";
import EventCard from "./EventCard";

interface HomeFormProps {
  events?: IEvent[];
  loading: boolean;
  error?: string;
  setpage: (page: number) => void;
}

export default function HomeForm({
  events,
  loading,
  error,
  setpage,
}: HomeFormProps) {
  const router = useRouter();

  const categories = [
    { name: "Sports", image: "/categories/sports.png" },
    { name: "Festivals", image: "/categories/festivals.png" },
    { name: "Concerts", image: "/categories/concerts.png" },
    { name: "Theater", image: "/categories/theater.png" },
  ];

  const handleBrowseEvents = () => router.push("/explore");
  const handleCreateEvent = () => router.push("/dashboard/events/create");
  const handleCategoryClick = (category: string) => {
    router.push(`/explore?category=${category.toLowerCase()}`);
  };

  function renderContent(featuredEvents: IEvent[]) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-yellow-400 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Discover Amazing Events
              </h1>
              <p className="max-w-3xl text-xl md:text-2xl">
                Find and join events that match your interests, or create your
                own.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  onClick={handleBrowseEvents}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10"
                  onClick={handleCreateEvent}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Event
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}

        {/* Events Section */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Events</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents?.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No featured events available.
              </p>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Tabs defaultValue="category" className="w-full">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Browse by Category</h2>
            </div>
            <TabsContent value="category">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <CategoryCard name={category.name} image={category.image} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-yellow-400 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Host Your Own Event?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl">
              Join thousands of event organizers who are creating amazing
              experiences.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100"
              onClick={handleCreateEvent}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Create Your Event
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="p-8 text-center">
          <p className="mb-4 text-xl text-red-500">Failed to load events</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (events) {
    return renderContent(events);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-yellow-600">No event data available</p>
    </div>
  );
}

// Separate loading skeleton component for better organization
const LoadingSkeleton = () => (
  <div className="flex min-h-screen flex-col">
    {/* Hero Section Skeleton */}
    <section className="relative bg-gradient-to-r from-purple-600 to-yellow-400 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mb-4 h-12 w-96" />
        <Skeleton className="mb-8 h-8 w-72" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </section>

    {/* Events Section Skeleton */}
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))}
      </div>
    </section>
  </div>
);
