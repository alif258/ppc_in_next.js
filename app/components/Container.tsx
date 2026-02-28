import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-0 ${className}`}>
      {children}
    </div>
  );
}