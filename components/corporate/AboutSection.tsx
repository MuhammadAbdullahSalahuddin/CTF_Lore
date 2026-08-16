// components/corporate/AboutSection.tsx
"use client";

const LEADERSHIP = [
  {
    name: "Dr. Farrukh Hameed",
    role: "Chief Executive Officer",
    image: "/images/exec-1.jpg",
  },
  {
    name: "Dr. Ayesha Naveed",
    role: "Chief Scientific Officer",
    image: "/images/exec-2.jpg",
  },
  {
    name: "Imran Qureshi",
    role: "Chief Financial Officer",
    image: "/images/exec-3.jpg",
  },
];

export default function AboutSection() {
  return (
    <section className="px-8 py-24 md:px-16">
      <div className="mb-16 grid gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0f4c81]">
            Our Story
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Three Decades of Pharmaceutical Excellence
          </h2>
        </div>
        <p className="self-center text-base leading-relaxed text-slate-600">
          Founded in 1994, TASMOC has grown from a regional distributor into a
          fully integrated pharmaceutical manufacturer, operating
          state-of-the-art production facilities and a dedicated research
          division committed to affordable, high-quality healthcare solutions
          for every patient.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {LEADERSHIP.map((person) => (
          <div key={person.name} className="text-center">
            <div className="mx-auto mb-4 aspect-square w-32 overflow-hidden rounded-full bg-slate-100">
              <img
                src={person.image}
                alt={person.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              {person.name}
            </h3>
            <p className="text-sm text-slate-500">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
