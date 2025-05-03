"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ name, image }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md relative">
      <CardHeader>
        <div className="relative h-[100px] w-full overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder-category.svg"}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-bold text-lg">{name}</h3>
      </CardContent>
      <Link href={`/categories/${name}`} className="absolute inset-0">
        <span className="sr-only">View {name}</span>
      </Link>
    </Card>
  );
};

export default CategoryCard;
