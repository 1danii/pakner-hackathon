// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Quiz = {
  topic: string,
  level: "easy" | "medium" | "hard",
  perQuestionScore: number,
  questions: Question[]
}

type Question = {
  question: string,
  choices: string[],
  correctAnswerIndex: number
}

const quizzes: Quiz[] = [{
  topic: "C#",
  level: "easy",
  perQuestionScore: 5,
  questions: [
    {
      question: "Kterým s těchto příkazů nepatří mezi datové typy?",
      choices: [" int", "string", "float", "double"],
      correctAnswerIndex: 0,
    },
    {
      question: " Který příkaz se v C# nepoužívá pro výpis na konzoli?",
      choices: ["Console.WriteLine()", "Console.Write()", "Console.Read()", "Console.ReadLine()"],
      correctAnswerIndex: 2,
    },
    {
      question: "Jaký je význam klíčového slova static?",
      choices: [" statická třída", "statická metoda", "statická proměnná", "všechny výše uvedené"],
      correctAnswerIndex: 3,
    },
    {
      question: "Jaký je význam slova get v C#?",
      choices: ["get je přístupová metoda", "get je modifikátor", "get je přístupová proměnná", "get je přístupová konstan"],
      correctAnswerIndex: 0,
    },
    {
      question: "Jaký je význam slova set v C#?",
      choices: ["set je přístupová metoda", "set je modifikátor", "set je přístupová proměnná", "set je přístupová konstan"],
      correctAnswerIndex: 0,
    },
    {
      question: "Který příkaz se v C# používá pro výpis na konzoli?",
      choices: ["Console.WriteLine()", "Console.Write()", "Console.Read()", "Console.ReadLine()"],
      correctAnswerIndex: 0,
    }
  ]
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(quizzes)
}
