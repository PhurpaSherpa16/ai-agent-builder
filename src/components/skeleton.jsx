import React from "react";

export const Skeleton = ({ className }) => (
  <div className={`skeleton rounded-md ${className}`}></div>
);

export const ProfileSkeleton = () => (
  <div className="flex gap-4 flex-wrap">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-3 p-2 px-6 border border-gray-100 rounded-xl w-40 h-12">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>
);

export const ItemSkeleton = () => (
  <div className="flex flex-wrap gap-4 2xl:gap-6 p-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm w-48 h-14">
        <Skeleton className="size-6 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
    ))}
  </div>
);

export const SectionSkeleton = ({ title, description }) => (
  <div className="space-y-4">
    <div className="block mb-4">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-64" />
    </div>
    <div className="h-60 bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <ItemSkeleton />
    </div>
  </div>
);
