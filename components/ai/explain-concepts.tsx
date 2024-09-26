import { Concept } from "@/lib/types";

interface Props {
  Concepts: Concept[];
}

export default function ExplainConcepts({ Concepts }: Props) {
  return (
    <section>
      <ul className="space-y-2 list-disc pl-5">
        {Concepts.map((concept, index) => (
          <li key={index}>
            <span className="font-medium">{concept.name}: </span>
            <span>{concept.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}