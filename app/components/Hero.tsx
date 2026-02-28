"use client";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Img from "./Img";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const delayed = useRef({ x: 0, y: 0 });

  const [, setTick] = useState(0); // re-render trigger

  useEffect(() => {
    const animate = () => {
      // smooth lag effect
      delayed.current.x += (mouse.current.x - delayed.current.x) * 0.08;
      delayed.current.y += (mouse.current.y - delayed.current.y) * 0.08;

      setTick((prev) => prev + 1); // trigger render
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative md:h-screen bg-[#045458] overflow-hidden pb-20 md:pb-0"
    >
      {/* Inner Core */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-50 blur-2xl"
        style={{
          background: `
            radial-gradient(circle,
            rgba(255,255,255,0.8) 0%,
            rgba(40,171,178,0.4) 50%,
            transparent 75%)
          `,
          transform: `translate3d(${delayed.current.x - 200}px, ${
            delayed.current.y - 200
          }px, 0)`,
        }}
      />

      {/* Content */}
      <Container className="relative flex flex-col gap-8 items-center mt-10 md:flex-row md:gap-12 md:mt-20 lg:mt-20">
        <div className="text w-full md:w-[40%]">
          <h3 className="bg-[#d3ffd0] text-black opacity-90 border-none w-max px-[20px] py-[4px] rounded-[8px] text-[clamp(16px,2.5vw,23px)] font-light mb-[7px]">
            From Launch to Dominate
          </h3>

          <h2 className="text-[#fefeff] opacity-90 text-[clamp(1.4rem,3vw,34px)] font-normal">
            Scalable Amazon Advertising
          </h2>

          <h1 className="md:mt-0  text-[clamp(3.2rem,5vw,5.8125rem)] lg:-mt-4 -mt-1.5 font-normal leading-[1.2] bg-gradient-to-b from-[#61ffe6] from-[24.94%] to-[#008871] to-[86.73%] bg-clip-text text-transparent">
            Management
          </h1>

          <p className="mb-6 text-white opacity-90 text-[clamp(10px,3vw,1.2rem)] font-normal leading-[1.5] text-justify">
            At Ecomclips, our Amazon PPC strategies are built for every stage
            from launch to market domination. No matter where you are in your
            journey, we help scale your brand profitably with data-driven,
            custom campaigns.
          </p>

          <Button
            label="Let's Go Further"
            bgColor="#f5f5f5"
            hoverBgColor="#000000"
          />
        </div>

        <div className="w-full md:w-[60%]">
          <Img src="/Cover.webp" alt="PCPhoto" className="hidden md:block" />
          <Img
            src="/product-presentation.png"
            alt="MobilePhoto"
            className="block md:hidden "
          />
        </div>
      </Container>
      <Container className="flex flex-wrap justify-between gap-y-8 mt-10 lg:mt-25 text-center">
        {[
          {
            img: "/revenue-icon1.png",
            value: "2.7B+",
            label: "REVENUE GENERATED",
          },
          { img: "/ad-icon1.png", value: "335M+", label: "ADS SPEND MANAGED" },
          {
            img: "/brand-icon1.png",
            value: "1000M+",
            label: "BRANDS WE MANAGED",
          },
          {
            img: "/experience-icon1.png",
            value: "15+",
            label: "YEARS OF EXPERIENCE",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 basis-[45%] md:basis-auto "
          >
            <div className="flex items-center justify-center gap-3">
              <Img src={item.img} height={50} width={50} objectFit="contain" />
              <h3 className="text-[clamp(1.9rem,4vw,70px)] font-bold bg-gradient-to-b from-[#60ffe6] to-[#048d76] bg-clip-text text-transparent">
                {item.value}
              </h3>
            </div>
            <p className=" text-[clamp(10px,1vw,0.85rem)] font-medium tracking-widest text-white opacity-70 md:-mt-6 uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
