"use client";
import type { Sample } from "@/types/Sample";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetSample from "@/hooks/sample/useGetSample";
import SampleComponent from "./_component/sampleComponent";

export default function Sample() {
  const { data: sample } = useGetSample();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sample?.map((item) => (
          <Card key={item.id} className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold underline decoration-2">
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm underline decoration-2">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">ID: {item.id}</p>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <p className="text-sm font-medium text-gray-700">
                {item.category}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <SampleComponent />
    </div>
  );
}
