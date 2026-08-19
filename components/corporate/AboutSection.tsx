// components/corporate/AboutSection.tsx
"use client";

const LEADERSHIP = [
  {
    name: "Dr. Farrukh Hameed",
    role: "Chief Executive Officer",
    image: "/images/Dr_Farukh.png",
  },
  {
    name: "Dr. Ayesha Naveed",
    role: "Chief Scientific Officer",
    image: "/images/Doctor_Ayesha.png",
  },
  {
    name: "Imran Qureshi",
    role: "Chief Financial Officer",
    image: "/images/Doctor_imran.png",
  },
];

export default function AboutSection() {
  return (
    <section className="px-8 py-24 md:px-16">
      {/* 1. Title Block (Left Aligned) */}
      <div className="mb-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0f4c81]">
          Our Story
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:w-1/2">
          Three Decades of Pharmaceutical Excellence
        </h2>
      </div>

      {/* 2. The Huge Profile Pictures */}
      {/* Added mb-16 here to create the padding/gap above the text */}
      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {LEADERSHIP.map((person) => (
          <div key={person.name} className="text-center">
            <div className="mx-auto mb-4 aspect-square w-72 overflow-hidden rounded-full bg-slate-100">
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

      {/* 3. The Paragraph (Moved Down) */}
      <div className="mx-auto max-w-4xl text-center pt-8 border-t border-slate-200">
        <p className="text-lg leading-relaxed text-slate-600">
          Founded in 1994, TASMOC has grown from a regional distributor into a
          fully integrated pharmaceutical manufacturer, operating
          state-of-the-art production facilities and a dedicated research
          division committed to affordable, high-quality healthcare solutions
          for every patient.
        </p>
      </div>
    </section>
  );
}
