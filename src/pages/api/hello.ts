// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


const quizzes = [{
  topic: 'C#',
  level: 'lehký',
  totalQuestions: 4,
  perQuestionScore: 5,
  questions: [
    {
      question: 'Kterým s těchto příkazů nepatří mezi datové typy?',
      choices: [' int', 'string', 'float', 'double'],
      type: 'MCQs',
      correctAnswer: 'int',
    },
    {
      question: ' Který příkaz se v C# nepoužívá pro výpis na konzoli?',
      choices: ['Console.WriteLine()', 'Console.Write()', 'Console.Read()', 'Console.ReadLine()'],
      type: 'MCQs',
      correctAnswer: 'Console.Read()',
    },
    {
      question: 'Jaký je význam klíčového slova static?',
      choices: [' statická třída', 'statická metoda', 'statická proměnná', 'všechny výše uvedené'],
      type: 'MCQs',
      correctAnswer: 'všechny výše uvedené',
    },
    {
      question: 'Jaký je význam slova get v C#?',
      choices: ['get je přístupová metoda', 'get je modifikátor', 'get je přístupová proměnná', 'get je přístupová konstan'],
      type: 'MCQs',
      correctAnswer: 'get je přístupová metoda',
    },
  ]
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({quizzes: quizzes})
}
