"use client";
import { useEffect, useRef } from "react";
import SplitText from "@/components/SplitText";
import gsap from "gsap";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";
const Page = () => {
  useEffect(() => {
    gsap.from("#hero-paragraph", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      delay: 1,
    });

    gsap.from("#explore-btn", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      delay: 1.5,
    });
  }, []);

  return (
    <section>
      <div className="text-2xl md:text-5xl text-center mt-20 font-semibold w-full">
        <SplitText
          text="The Hub for Every Dev Event"
          delay={20}
          duration={0.5}
          ease="power2.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
        />
        <br />
        <SplitText
          text="You Musn't Miss"
          delay={60}
          duration={0.7}
          ease="power2.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
        />
      </div>
      <p className="text-center mt-5" id="hero-paragraph">
        Hackathons, Meetups, and Conferences, All in one place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard
                title={event.title}
                image={event.image}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
