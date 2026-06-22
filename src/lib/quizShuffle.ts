import type { QuizQuestion } from "@/lib/lessonContent";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Randomize question order and shuffle answer choices within each question. */
export function shuffleQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffleArray(questions).map((q) => {
    const order = shuffleArray(q.options.map((_, i) => i));
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correctIndex: order.indexOf(q.correctIndex),
    };
  });
}
